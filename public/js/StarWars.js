/*
http://codepen.io/TimPietrusky/pen/eHGfj

 * Star Wars opening crawl from 1977
 *
 * I freaking love Star Wars, but could not find
 * a web version of the original opening crawl from 1977.
 * So I created this one.
 *
 * I wrote an article where I explain how this works:
 * http://timpietrusky.com/star-wars-opening-crawl-from-1977
 *
 * Watch the Start Wars opening crawl on YouTube.
 * http://www.youtube.com/watch?v=7jK-jZo6xjY
 *
 * Stuff I used:
 * - CSS (animation, transform)
 * - HTML audio (the opening theme)
 * - SVG (the Star Wars logo from wikimedia.org)
 *   http://commons.wikimedia.org/wiki/File:Star_Wars_Logo.svg
 * - JavaScript (to sync the animation/audio)
 *
 * Thanks to Craig Buckler for his amazing article
 * which helped me to create this remake of the Star Wars opening crawl.
 * http://www.sitepoint.com/css3-starwars-scrolling-text/
 *
 * Sound copyright by The Walt Disney Company.
 *
 *
 * 2013 by Tim Pietrusky
 * timpietrusky.com
 *
 */
(function(global) {

  /*
   * Constructor
   */
  function StarWarsOpening(args) {
    // Context wrapper
    this.el = $(args.el);

    // Audio to play the opening crawl
    this.audio = this.el.find('audio').get(0);

    // Start the animation

    // The animation wrapper
    this.animation = this.el.find('.animation');

    // Remove animation and shows the start screen
    this.reset();
    this.audio.oncanplay = args.onAudioLoad;

    // var that = this;
    // Reset the animation and shows the start screen
    // $(this.audio).on('ended', function() {
    //   that.audio.currentTime = 0;
    //   that.reset();
    //   setTimeout(function(){
    //       $('body').removeClass('running');
    //   }, 10000);
    // });
    $(this.audio).on('ended', function() {
      $('.page-hide').show();
      $('.page-hide').removeClass('page-hide'); // show footer and social buttons
    });
  }

  /*
   * Resets the animation and shows the start screen.
   */
  StarWarsOpening.prototype.reset = function() {
    // $('.page-hide').show(); // show footer and social buttons
    // reset the animation
    this.cloned = this.animation.clone(true);
    this.animation.remove();
    this.animation = this.cloned;
    $(window).trigger('resize'); // trigger resize to allow scrol in the config form
  };

  StarWarsOpening.prototype.resetAudio = function() {
    this.audio.pause();
    this.audio.currentTime = 0;
  };

  StarWarsOpening.prototype.play = function() {
    $('.page-hide').hide();
    $('.page-loader').hide(); // grants the loader to hide. Sometimes doesn't hide, maybe due to history navigation in browser.
    $('body').removeClass('running');
    $('body').addClass('running');
    $('body').scrollTop(0);
    this.audio.play();
    this.el.append(this.animation);

    // adjust animation speed
    var titles = $('.titles > div', this.animation).get(0);
    if (titles.offsetHeight > 1977) // 1977 is year of the first Star Wars movie.
    {
      var exceedSize = titles.offsetHeight - 1977;
      var animConstant = 0.04041570438799076;
      var animDist = 20 - exceedSize * animConstant;
      var cssRule;
      var ss = document.styleSheets;
      for (var i = 0; i < ss.length; ++i) {
        // loop through all the rules!
        for (var x = 0; x < ss[i].cssRules.length; ++x) {
          var rule = ss[i].cssRules[x];
          if (rule.name == "titles" && rule.type == CSSRule.KEYFRAMES_RULE) {
            cssRule = rule;
          }
        }
      }
      if (cssRule)
        cssRule.appendRule("100% { top: " + animDist + "% }");
    }
  }

  global.StarWarsOpening = StarWarsOpening;
})(this);

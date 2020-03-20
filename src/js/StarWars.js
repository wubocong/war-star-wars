import $ from 'jquery';
export class StarWarsOpening {
  // Context wrapper
  constructor(args) {
    this.el = $(args.el);

    // Audio to play the opening crawl
    this.audio = this.el.find('audio').get(0);

    // Start the animation

    // The animation wrapper
    this.animation = this.el.find('.animation');

    // Remove animation and shows the start screen
    this.reset();
    this.audio.oncanplay = args.onAudioLoad;
  }

  /*
   * Resets the animation and shows the start screen.
   */
  reset() {
    // $('.page-hide').show(); // show footer and social buttons
    // reset the animation
    this.cloned = this.animation.clone(true);
    this.animation.remove();
    this.animation = this.cloned;
    $(window).trigger('resize'); // trigger resize to allow scrol in the config form
  };

  resetAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
  };

  play() {
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
}


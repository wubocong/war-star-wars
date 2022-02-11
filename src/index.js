
import { isTouchScreen } from './js/isTouchScreen'
import './css/styles.scss';

$(window).on('keydown', function (e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
});

$(window).on('load', function () {
  $('.page-loader').hide();
  $('.prompt').show();
  $('.starwars').show();
  // prevent arrow scrolling in firefox
  

  let el = $('.starwars');
  let audio = el.find('audio')[0];
  let animation = el.find('.animation');
  let cloned = animation.clone(true);
  animation.remove();
  animation = cloned;

  audio.oncanplay = function () {
    function play() {
      $('.prompt').hide();
      $(window).off('click');
      $(window).off('touchend');
      $('.page-hide').hide();
      $('.page-loader').hide(); // grants the loader to hide. Sometimes doesn't hide, maybe due to history navigation in browser.
      $('body').removeClass('running');
      $('body').addClass('running');
      $('body').scrollTop(0);
      audio.play();
      el.append(animation);

      // adjust animation speed
      var titles = $('.titles > div', animation).get(0);
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
    if (!isTouchScreen()) {
      $(window).on('click', play);
    } else {
      $(window).on('touchend', play);
    }
  };
  audio.onended = function () {
    $('.starwars').hide();
    $('.page-later').show();
  };
  audio.load();


  function setLogo() {
    var width = $(window).width();
    $('#logoimg').css('width', width);
    $('#logosvg').css('width', width);
  }
  $(window).on('resize', setLogo);
  $(window).on('load', setLogo);
});
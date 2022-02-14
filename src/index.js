
import { isTouchScreen } from './js/isTouchScreen'
import './css/styles.scss';

// prevent arrow scrolling in firefox
$(window).on('keydown', function (e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
});
$(window).on('load', function () {
  $('.page-loader').hide();
  $('.prompt').show();
  $('.starwars').show();

  let el = $('.starwars');
  let audio = el.find('audio')[0];
  let animation = $('#animation-container');
  let cloned = animation.clone(true);
  animation.remove();
  animation = cloned;

  let count = 0;
  let timer;
  function skip() {
    count++;
    if (count >= 2) $('.skip').addClass('active');
    clearTimeout(timer);
    timer = setTimeout(() => {
      count = 0;
      $('.skip').removeClass('active');
    }, 3000);
  }

  function play() {
    $(window).on('click', skip);
    $('.prompt').hide();
    $('.page-hide').hide();
    $('.page-loader').hide(); // grants the loader to hide. Sometimes doesn't hide, maybe due to history navigation in browser.
    $('body').removeClass('running');
    $('body').addClass('running');
    $('body').scrollTop(0);
    audio.play();
    el.append(animation);
  }
  audio.oncanplay = function () {
    if (!isTouchScreen()) {
      $(window).one('click', play);
    } else {
      $(window).one('touchend', play);
    }
  };
  audio.onended = function () {
    $('.skip').removeClass('active');
    $(window).off('click', skip);
    $('.starwars').hide();
    $('.page-later').show();
  };
  audio.load();
});
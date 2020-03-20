
import { StarWarsOpening } from './js/StarWars';
import { isTouchScreen } from './js/isTouchScreen'
import $ from 'jquery';
import './css/styles.scss';

(function () {
  // prevent arrow scrolling in firefox
  $(window).on('keydown', function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  });

  var isLoading = true;
  function toggleLoading() {
    if (isLoading) {
      $('.page-loader').hide();
    } else {
      $('.page-loader').show();
    }
    isLoading = !isLoading;
  }

  var StarWars = new StarWarsOpening({
    el: '.starwars',
    onAudioLoad: function () {
      function play() {
        $(window).off('focus');
        $(window).off('touchend');
        toggleLoading();
        StarWars.play();
        $('#read').on('click', function () {
          window.location = './blog';
        });
      }
      if (!isTouchScreen) {
        if (document.hasFocus()) { // play if has focus
          play();
        } else {
          $(window).on('focus', play);
        }
      } else {
        $(window).on('touchend', play);
      }
    }
  });
  StarWars.audio.load();
  StarWars.audio.onended = function () {
    $('article').hide();
    $('.page-later').show();
  };

  function setLogo() {
    var width = $(window).width();
    $('#logoimg').css('width', width);
    $('#logosvg').css('width', width);
  }
  $(window).on('resize', setLogo);
  $(window).on('load', setLogo);
})();
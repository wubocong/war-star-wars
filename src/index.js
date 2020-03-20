
import { StarWarsOpening } from './js/StarWars';
import { isTouchScreen } from './js/isTouchScreen'
import $ from 'jquery';
import './css/styles.scss';

$(window).on('load', function () {
  $('.page-loader').hide();
  $('.prompt').show();
  // prevent arrow scrolling in firefox
  $(window).on('keydown', function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  });

  var StarWars = new StarWarsOpening({
    el: '.starwars',
    onAudioLoad: function () {
      function play() {
        $('.prompt').hide();
        $(window).off('click');
        $(window).off('touchend');
        StarWars.play();
        $('#read').on('click', function () {
          window.location = './blog';
        });
      }
      if (!isTouchScreen()) {
        $(window).on('click', play);
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
});
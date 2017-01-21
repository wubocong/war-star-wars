$(function() {
  if (!Modernizr.cssanimations) {
    sweetAlert('Incompatible Explorer Detected', 'This website is not compatible with Internet Explorer 9 and below, please use higher version or Chrome. Sorry for the inconvenience.', 'error');
    $('.page-loader').hide();
    return;
  }
  // sweet alerts config
  sweetAlert.setDefaults({
    customClass: 'star-wars-alert'
  });

  // prevent arrow scrolling in firefox
  $(window).on('keydown', function(e) {
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

  var audioLoaded = false;
  var StarWars = new StarWarsOpening({
    el: '.starwars',
    onAudioLoad: function() {
      audioLoaded = true;
      function play() {
        $(window).off('focus');
        $(window).off('touchend');
        toggleLoading();
        StarWars.play();
        $('#read').on('click', function() {
          window.location = './blog';
        });
      }
      if (!Modernizr.touchevents) {
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
  StarWars.audio.onended = function() {
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
})
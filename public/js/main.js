(function() {
  // sweet alerts config
  sweetAlert.setDefaults({
    customClass: 'star-wars-alert'
  });

  // make audio load on mobile devices
  var audioLoaded = false;

  var StarWars = new StarWarsOpening({
    el: '.starwars',
    onAudioLoad: function() {
      audioLoaded = true;
    }
  });
  $(window).on('touchstart', function() {
    if (!audioLoaded) {
      StarWars.audio.load();
      audioLoaded = true;
    }
  });
  // prevent arrow scrolling in firefox
  $(window).on("keydown", function(e) {
    // space and arrow keys
    var type = document.activeElement.type || '';
    if (!type.startsWith('text')) {
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }
  });

  var notPlayed = true;
  var isLoading = false;
  var showFooter = true;

  function toggleLoading() {
    if (isLoading) {
      $('#loader').hide();
    } else {
      $('#loader').show();
    }
    isLoading = !isLoading;
  }

  toggleLoading();
  $(document).ready(function() {

    // logo size calc
    $(window).on('resize', function() {
      $('#logoimg').css('width', $(window).width() + 'px');
      $('#logosvg').css('width', $(window).width() + 'px');

      $("body").css("overflow", "hidden");
      $('body').scrollTop(0);
    });
    $(window).on('load', function() {
      $(window).trigger('resize');
    });
    if (!Modernizr.cssanimations) {
      sweetAlert("Incompatible Explorer Detected", "This website is not compatible with Internet Explorer 9 and below, please use higher version or Chrome. Sorry for the inconvenience.", "error");
      $('#loader').hide();
      return;
    }

    $('body').removeClass('running');

    var play = function() {
      var buffered = StarWars.audio.buffered;
      if (buffered.length === 0 || (buffered.end(buffered.length - 1) === 0 && !audioLoaded)) {
        $('#loader').hide();
        StarWars.audio.oncanplay = function() {
          toggleLoading();
          notPlayed = false;
          StarWars.play();
        };
      } else {
        toggleLoading();
        notPlayed = false;
        StarWars.play();
      }
    };

    if (document.hasFocus()) { // play if has focus
      play();
    } else {
      window.focus(function() { // play when got focus
        if (notPlayed) {
          play();
        }
      });
    }
  });
})()
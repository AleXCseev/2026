var landingFunctions = {
  init: function () {
    this.initLibraris();
    this.timer();
    this.fixed();
  },

  initLibraris: function () {
    $('[href*="#"]').on("click", function (e) {
      var fixedOffset = 0;
      // var cardHeight = $("#order").outerHeight(false);
      // var windowHeight = $(window).height();

      $("html, body")
        .stop()
        .animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
      e.preventDefault();
    });

    // $("[data-fancybox]").fancybox({
    //   loop: true,
    //   infobar: false,
    //   animationEffect: false,
    //   backFocus: false,
    //   hash: false,
    // });
  },

  timer: function () {
    let totalSeconds = 15 * 60;

    const timerInterval = setInterval(function () {
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      $(".minutes").text(minutes);
      $(".seconds").text(seconds);

      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
      } else {
        totalSeconds--;
      }
    }, 1000);
  },

  fixed: function () {
    const $fixedEl = $(".fixed");
    const $targetZones = $(".hide__fixed");

    if ($fixedEl.length && $targetZones.length) {
      const fixedElHeight = $fixedEl.outerHeight();
      const isTopFixed = $fixedEl.css("top") !== "auto";
      const fixedTopOffset = isTopFixed ? parseInt($fixedEl.css("top"), 10) || 0 : 0;

      $(window).on("scroll.multiHide", function () {
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const currentCheckPoint = isTopFixed ? scrollTop + fixedTopOffset + fixedElHeight : scrollTop + windowHeight;
        let shouldHide = false;

        $targetZones.each(function () {
          const $zone = $(this);
          const zoneTop = $zone.offset().top;
          const zoneBottom = zoneTop + $zone.outerHeight();

          if (currentCheckPoint >= zoneTop && scrollTop <= zoneBottom) {
            shouldHide = true;
            return false;
          }
        });

        if (shouldHide) {
          $fixedEl.slideUp(300);
        } else {
          $fixedEl.slideDown(300);
        }
      });

      $(window).trigger("scroll.multiHide");
    }
  },
};

$(document).ready(function () {
  landingFunctions.init();
});

var landingFunctions = {
  init: function () {
    this.initLibraris();
    this.timer();
    // this.nav();
    // this.reels();
    // this.share();
    // this.order();
    // this.modal();
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

    $("[data-fancybox]").fancybox({
      loop: true,
      infobar: false,
      animationEffect: false,
      backFocus: false,
      hash: false,
    });
  },

  timer: function () {
    let totalSeconds = 15 * 60;

    const timerInterval = setInterval(function () {
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      $(".minutes").text(minutes)
      $(".seconds").text(seconds)


      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
      } else {
        totalSeconds--; 
      }
    }, 1000);
  },

  nav: function () {
    $(".nav__trigger").click(function (e) {
      // e.stopPropagation();
      $("body").css("overflow", "auto");
      $(".modal").hide();
      if ($(this).hasClass("active")) return;

      const id = $(this).data("id");

      $(".section").removeClass("active");
      $("#" + id).addClass("active");
      $("html, body").animate({ scrollTop: 0 }, "smooth");
    });
  },

  reels: function () {
    $(".reels__btn-like").click(function () {
      $(this).find("img").hide();
      $(this).find(".active").fadeIn(300);
    });

    $(".reels__btn-comment").click(function () {
      if ($("#comment").hasClass("active")) {
        $("html, body").animate(
          {
            scrollTop: $("#comment").offset().top,
          },
          600,
        );
        return;
      }

      $("#comment").addClass("active");
      $("#comment").show();
      $("html, body").animate(
        {
          scrollTop: $("#comment").offset().top,
        },
        600,
      );
    });

    $(".comment__block-close").click(function () {
      $("#comment").slideUp(600);
      setTimeout(() => {
        $("#comment").removeClass("active");
      }, 600);
      $("html, body").animate({ scrollTop: 0 }, "smooth");
    });
  },

  share: function () {
    $(".profile__share-btn").click(function () {
      if ($("#share").hasClass("active")) {
        $("html, body").animate(
          {
            scrollTop: $("#share").offset().top,
          },
          600,
        );
        return;
      }

      $("#share").addClass("active");
      $("#share").show();
      $("html, body").animate(
        {
          scrollTop: $("#share").offset().top,
        },
        600,
      );
    });

    $(".share__block-close").click(function () {
      $("#share").slideUp(600);
      setTimeout(() => {
        $("#share").removeClass("active");
      }, 600);
      $("html, body").animate({ scrollTop: 0 }, "smooth");
    });
  },

  order: function () {
    $(".shop__item").click(function () {
      const current = $(this).data("count");
      $(".shop__item").removeClass("active");
      $(this).addClass("active");
    });
  },

  modal: function () {
    let currentStories = 1;

    $(".open__modal").click(function () {
      const id = $(this).data("modal");

      $("#modal-" + id).fadeIn(300);

      $(`[data-stories="1"]`).show();
      currentStories = 1;

      $("body").css("overflow", "hidden");
    });

    $(".modal").swipe({
      swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        if (currentStories === 1 && direction === "left") {
          if ($(this).find(`[data-stories="2"]`).length) {
            currentStories = 2;
            $(this).find(`[data-stories="1"]`).fadeOut(300);
            $(this).find(`[data-stories="2"]`).fadeIn(300);
          }
          return;
        }
        if (currentStories === 2 && direction === "right") {
          currentStories = 1;
          $(this).find(`[data-stories="1"]`).fadeIn(300);
          $(this).find(`[data-stories="2"]`).fadeOut(300);
          return;
        }
      },
    });

    $(".modal__close").click(function () {
      $(".modal").fadeOut(300);
      $("body").css("overflow", "auto");
    });
  },
};

$(document).ready(function () {
  landingFunctions.init();
});

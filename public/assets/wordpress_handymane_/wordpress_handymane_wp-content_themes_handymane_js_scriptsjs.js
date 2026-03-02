(function ($) {
  $(document).ready(function () {
    "use strict";


    // TAB
    $(".tab-nav li").on('click', function (e) {
      $(".tab-item").hide();
      $(".tab-nav li").removeClass('active');
      $(this).addClass("active");
      var selected_tab = $(this).find("a").attr("href");
      $(selected_tab).stop().show();
      return false;
    });


    // LOGO HOVER
    $(".site-menu ul li").hover(function () {
        $('.site-menu ul li').not(this).css({
          "opacity": "1"
        });
      },
      function () {
        $('.site-menu ul li').not(this).css({
          "opacity": "1"
        });
      });


    // HAMBURGER MENU
    $(document).ready(function () {
      // Hamburger menü tıklama işlevi
      $('.hamburger-menu').on('click', function (e) {
          e.stopPropagation(); // Tıklamanın dış alanlara yayılmasını engelle
          $(this).toggleClass('open');
          $(".side-widget").toggleClass('active');
          $("body").toggleClass("overflow");
      });
  
      // X işareti veya herhangi bir yere tıklayınca menüyü kapatma
      $(document).on('click', function (e) {
          // Eğer tıklanan alan hamburger menü ya da widget değilse
          if (!$(e.target).closest('.hamburger-menu, .side-widget').length) {
              // Menü ve widget'ı kapat
              $('.hamburger-menu').removeClass('open');
              $(".side-widget").removeClass('active');
              $("body").removeClass("overflow");
          }
      });
  });

    // PAGE TRANSITION - disabled: handled by Next.js SPA router in Layout.js


  });
  // END DOCUMENT READY

  // DATA BACKGROUND IMAGE
  var pageSection = $("*");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css("background", "url(" + $(this).data("background") + ")");
    }
  });



  // DATA BACKGROUND COLOR
  var pageSection = $("*");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css("background", $(this).data("background"));
    }
  });


  // WOW ANIMATION 
  wow = new WOW({
    animateClass: 'animated',
    offset: 0
  });
  wow.init();


  // CAROUSEL CLASSES SLIDER - disabled: handled by _app.js reinitSwiper()
  if (false) var swiper = new Swiper('.carousel-classes', {
    slidesPerView: '4',
    spaceBetween: 30,
    loop: 'true',
    draggable: 'true',
    navigation: {
      prevEl: '.arrow-prev',
      nextEl: '.arrow-next',
    },    
    
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
	   breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    }
  });


  // MAIN SLIDER - disabled: handled by _app.js reinitSwiper()
  if (false) var swiper = new Swiper('.main-slider', {
    slidesPerView: '1',
    spaceBetween: 0,
    speed: 1000,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    draggable: 'true',
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: '.button-prev',
      nextEl: '.button-next',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });


  // COUNTER
  $(document).scroll(function () {
    $('.odometer').each(function () {
      var parent_section_postion = $(this).closest('section').position();
      var parent_section_top = parent_section_postion.top;
      if ($(document).scrollTop() > parent_section_top - 300) {
        if ($(this).data('status') == 'yes') {
          $(this).html($(this).data('count'));
          $(this).data('status', 'no');
        }
      }
    });
  });


  // PRELOADER
  $(window).load(function () {
    $("body").addClass("page-loaded");
  });


})(jQuery);




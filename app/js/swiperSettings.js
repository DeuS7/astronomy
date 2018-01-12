var swiperPresentation = new Swiper ('.presentation', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    speed: 1000,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    effect: "coverflow",
    coverflowEffect: {
      rotate: 90,
      stretch: 0,
      depth: 100,
      modifier: 1,
    }
  });

var swiperPlanetInfo = new Swiper ('.FWImageCar', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    speed: 1000,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    effect: "coverflow",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
    }
  });
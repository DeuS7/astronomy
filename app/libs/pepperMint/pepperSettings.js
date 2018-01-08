var mints = document.getElementsByClassName("peppermintGallery");
var slidersAr = [];

for (var i = 0;i<mints.length;i++) {
  slidersAr.push(Peppermint(mints[i], {
    speed: 300,
    touchSpeed: 300,
    slideshow: true,
    slideshowInterval: 4000,
    stopSlideshowAfterInteraction: true,
    startSlide: 0,
    mouseDrag: false,
    disableIfOneSlide: true,
    cssPrefix: 'peppermint-',
    dots: true,
    dotsPrepend: false,
    dotsContainer: undefined,  
    slidesContainer: undefined,
    onSlideChange: undefined,
    onSetup: undefined
}));
}
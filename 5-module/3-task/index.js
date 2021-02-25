function initCarousel() {
  const getOffset = document.querySelector('div.carousel__slide').offsetWidth;

  const carouselInner = document.querySelector('div.carousel__inner');
  const carouselArrowRight = document.querySelector('div.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('div.carousel__arrow_left');
  carouselArrowLeft.style = 'display: none';

  const getMaxOffset = -getOffset * (document.querySelectorAll('div.carousel__slide').length-1);
  let currentValue = 0;
  carouselArrowRight.addEventListener('click', event => {
    currentValue -= getOffset;
    carouselInner.style.transform = `translateX(${currentValue}px)`;
    carouselArrowLeft.style = 'display';
    if (currentValue == getMaxOffset) {
      carouselArrowRight.style = 'display:none';
    }
  }, false);

  carouselArrowLeft.addEventListener('click', event => {
    currentValue += getOffset;
    carouselInner.style.transform = `translateX(${currentValue}px)`;
    carouselArrowRight.style = 'display';
    if (currentValue == 0) {
      carouselArrowLeft.style = 'display:none';
    }
  }, false);
}
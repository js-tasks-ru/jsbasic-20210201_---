import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    console.log(slides)

    // Начальный dv
		let carousel = document.createElement('div');
		carousel.classList.add('carousel');

    // dv хранящий слайды
		let carouselInner = document.createElement('div');
		carouselInner.classList.add('carousel__inner');
		carousel.append(carouselInner);
    //

    // Вставляем все карточки в dv-слайд
		carouselInner.innerHTML = createAllTemplate();
    function createAllTemplate() {
      let saveAllTemplate = '';
      for (let item in slides) {
        let template = `
          <div class="carousel__slide" data-id="${slides[item].id}">
            <img src="/assets/images/carousel/${slides[item].image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slides[item].price.toFixed(2)}</span>
              <div class="carousel__title">${slides[item].name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
        `;
        saveAllTemplate += template;
      }
      return saveAllTemplate;
    }

    // Создать кастомное событие / описание товара
		let buttons = carouselInner.querySelectorAll('div.carousel__slide > div.carousel__caption > button.carousel__button');
    for (let button of buttons) {
			let slide = button.closest('div.carousel__slide'); // от this.button найти ближайший div.carousel__slide
			let id = slide.dataset.id; // dataset из div.carousel__slide

      button.addEventListener('click', event => { event.target.dispatchEvent(
        new CustomEvent("product-add", {
          detail: id,
          bubbles: true
        })
      )});
    }

    // Добавить стрелки навигации
    carousel.insertAdjacentHTML('beforeEnd', `<div class="carousel__arrow carousel__arrow_right"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></div>`);
    carousel.insertAdjacentHTML('afterBegin', `<div class="carousel__arrow carousel__arrow_left"><img src="/assets/images/icons/angle-left-icon.svg" alt="icon"></div>`);

		// Повесить прокрутку слайдов (взята из раздела 5/3)
    const carouselArrowRight = carousel.querySelector('.carousel__arrow_right');
    const carouselArrowLeft = carousel.querySelector('.carousel__arrow_left');
    carouselArrowLeft.style = 'display: none';

    let currentValue = 0;
    carouselArrowRight.addEventListener('click', event => {
      const getOffset = carouselInner.querySelector('.carousel__slide').offsetWidth;
      const getMaxOffset = -getOffset * (carousel.querySelectorAll('.carousel__slide').length-1);

      currentValue -= getOffset;
      carouselInner.style.transform = `translateX(${currentValue}px)`;
      carouselArrowLeft.style = 'display';
      if (currentValue == getMaxOffset) {
        carouselArrowRight.style = 'display:none';
      }
    }, false);
    carouselArrowLeft.addEventListener('click', event => {
      const getOffset = carouselInner.querySelector('.carousel__slide').offsetWidth;

      currentValue += getOffset;
      carouselInner.style.transform = `translateX(${currentValue}px)`;
      carouselArrowRight.style = 'display';
      if (currentValue == 0) {
        carouselArrowLeft.style = 'display:none';
      }
    }, false);
	
    this.elem = carousel;
  }
}

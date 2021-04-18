import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    // Create: "ribbon"
		const ribbon = document.createElement('div');
		ribbon.classList.add('ribbon');
		this.elem = ribbon;

    // Create: "ribbon__inner"
    const ribbonInner = document.createElement("nav");
    ribbonInner.classList.add("ribbon__inner");
    
    // Create: "ribbon__item"
    for (let category of this.categories) {
      const categorySection = document.createElement("a");
      categorySection.classList.add("ribbon__item");

      categorySection.innerText = category.name;
      categorySection.setAttribute("data-id", category.id);
      ribbonInner.append(categorySection);

      categorySection.addEventListener("click", (event) => {
        event.preventDefault();

        // delete class: ribbon__item_active
        const buttons = document.querySelectorAll(".ribbon__item");
        for (let buttonSection of buttons)
        buttonSection.classList.remove("ribbon__item_active");

        // add class: ribbon__item_active
        categorySection.classList.add("ribbon__item_active")
        this.elem.dispatchEvent(new CustomEvent("ribbon-select", {
          detail: category.id,
          bubbles: true,
        }));
      })
    }
    this.elem.append(ribbonInner);

    // Create: navigation buttons
    ribbon.insertAdjacentHTML('beforeEnd', `<button class="ribbon__arrow ribbon__arrow_left"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>`);
    ribbon.insertAdjacentHTML('afterBegin', `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>`);

    // Create: scroll event
    const ribbonArrowRight = ribbon.querySelector('button.ribbon__arrow_right');
    const ribbonArrowLeft = ribbon.querySelector('button.ribbon__arrow_left');

    ribbonArrowRight.addEventListener('click', () => ribbonInner.scrollBy(350, 0))
		ribbonArrowLeft.addEventListener('click', () => ribbonInner.scrollBy(-350, 0))

    // Create: hiding buttons | left or right
    ribbonInner.addEventListener("scroll", () => {     
      if (ribbonInner.scrollLeft == 0) 
        ribbonArrowLeft.classList.remove("ribbon__arrow_visible");
      else 
        ribbonArrowLeft.classList.add("ribbon__arrow_visible");
 
      let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;
      if (scrollRight <= 1)
        ribbonArrowRight.classList.remove("ribbon__arrow_visible");
      else  
        ribbonArrowRight.classList.add("ribbon__arrow_visible");
    })
  }
}
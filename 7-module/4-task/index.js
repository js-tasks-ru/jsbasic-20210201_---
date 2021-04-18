export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    
		// Create: "slider"
		let slider = document.createElement('div');
		slider.classList.add('slider');
		this.elem = slider;

    // Create: "slider__thumb"
		let sliderThumb = `
			  <div class="slider__thumb">
			  	<span class="slider__value">0</span>
		  	</div>
		    <div class="slider__progress"></div>
		    <div class="slider__steps">
		      <span class="slider__step-active"></span> <!-- Default step -->
		  	  ${'<span></span>'.repeat(this.steps - 1)} <!-- Create: span-step -->
		  	</div>`;
		slider.innerHTML = sliderThumb;

    // Create: event
    this.elem.addEventListener("click", (event) => {
      // Get: Coordinates
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      // Get: Percents (for style)
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercent = value / segments * 100;
      this.value = value;
      
      // Append: Step (value)
      const sliderValue = this.elem.querySelector(".slider__value");
      sliderValue.innerText = value;

      // Edit style
      this.elem.querySelector('.slider__thumb').style.left = `${valuePercent}%`;
      this.elem.querySelector('.slider__progress').style.width = `${valuePercent}%`;

      // Create: active class
      this.elem.querySelector(".slider__step-active").classList.remove("slider__step-active");
      this.elem.querySelector(`.slider__steps > span:nth-child(${value + 1})`).classList.add("slider__step-active");

      // Create: custom event
      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      }))
    })

    //
    // Task 7|4 ↓ Drag-and-Drop.
    // 

    // Create: event
    this.elem.querySelector(".slider__thumb").ondragstart = () => false;
    this.elem.querySelector(".slider__thumb").addEventListener("pointerdown", () => {
      let value = this.value;
      let thumb = this.elem.querySelector(".slider__thumb");
      let progress = this.elem.querySelector('.slider__progress');
      this.elem.classList.add("slider_dragging");
      
      const onPointerMove = (event) => {
        // Get: this.elem
        this.elem = document.querySelector(".slider")

        // Get: Coordinates
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;
        
        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        // Get: Percents (for style)
        let leftPercents = leftRelative * 100;
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        // Get: Step = Value
        let segments = this.steps - 1;
        let approximateValue = leftRelative * segments;
        value = Math.round(approximateValue);
      }
      
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", () => {
        // Remove listener
        document.removeEventListener("pointermove", onPointerMove);

        // Append: Step (value)
        this.value = value;
        this.elem.querySelector(".slider__value").innerText = this.value;  

        // Create: remove class
        this.elem.classList.remove("slider_dragging");

        // Create: custom event
        this.elem.dispatchEvent(new CustomEvent('slider-change', { 
          detail: this.value, 
          bubbles: true 
        }));
      });
    });
  }
}
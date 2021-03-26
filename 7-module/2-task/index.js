import createElement from '../../assets/lib/create-element.js';

export default class Modal {
	constructor() {
    // Создать модальное окно
	this.modal = document.createElement('div');
  	this.modal.classList.add('modal');
	this.createModal = `			
		<div class="modal__overlay"></div>
		<div class="modal__inner">
			<div class="modal__header">	
				<button type="button" class="modal__close">
				<img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
				</button>
				<h3 class="modal__title"></h3>
			</div>
			<div class="modal__body"></div>
		</div>`;
	this.modal.innerHTML = this.createModal;
	this.elem = this.modal;
	}

	// Открытие модального окна
	open() {		
		document.body.append(this.modal);
		document.body.classList.add('is-modal-open');
		// Закрытие X
		const button = document.body.querySelector('.modal__close');
		button.addEventListener('click', event => { 
			this.close();
		});
	}
	// Закрытие модального окна
	listenerDocument = document.body.addEventListener('keydown', event => { 
		if (event.code === 'Escape') this.close();
	});
	close() {
		this.modal.remove();
		document.body.classList.remove('is-modal-open');
	}

	// Вставка Title в modal__title
	setTitle(modalTitle) {
		this.title = modalTitle;
		this.modal.querySelector('.modal__title').innerHTML = modalTitle;
	}
	// Вставка Node в modal__body
	setBody(node) {
		this.body = node.outerHTML;
		this.modal.querySelector('.modal__body').innerHTML = node.outerHTML;
	}
}
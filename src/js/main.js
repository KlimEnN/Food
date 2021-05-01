'use strict';
import 'jquery';
import modal, {openModal} from './modules/modal';
import calc from './modules/calc';
import form from './modules/forms';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';



window.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 120000);

	 modal( '[data-modal]', '.modal', modalTimerId);
	 calc();
	 form('form', modalTimerId);
	 slider({
		 container: '.offer__slider',
		 slide: '.offer__slide',
		 nextArrow: '.offer__slider-next',
		 prevArrow: '.offer__slider-prev',
		 currentCounter: '#current',
		 totalCounter: '#total',
		 wrapper: '.offer__slider-wrapper',
		 field: '.offer__slider-inner',
	 });
	 tabs();
	 timer();


});


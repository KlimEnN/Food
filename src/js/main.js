'use strict';

window.addEventListener('DOMContentLoaded', () => {

	//Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(tab => {
			tab.classList.add('hide');
			tab.classList.remove('show');
		});

		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(index = 0) {
		tabsContent[index].classList.add('show', 'fade');
		tabsContent[index].classList.remove('hide', 'fade');
		tabs[index].classList.add('tabheader__item_active');
	}

	tabsParent.addEventListener('click', (event) => {
		event.preventDefault();
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((tab, index) => {
				if (target === tab) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});

	hideTabContent();
	showTabContent();

	//Timer
	const deadLine = '2021-05-11';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / 1000 * 60 * 60) % 24),
			minutes = Math.floor(((t / 1000 / 60) % 60)),
			seconds = Math.floor((t / 1000) % 60);

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadLine);

	//Modal
	const modal = document.querySelector('.modal');
	const modalShowBtns = document.querySelectorAll('[data-modal]');



	function openModal() {
		modal.classList.add('modal__show');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}


	function modalShow() {
		modalShowBtns.forEach(btn => {
			btn.addEventListener('click', openModal);
		});
	}


	function modalClose() {
		modal.classList.remove('modal__show');
		document.body.style.overflow = '';
	}


	modal.addEventListener('click', (event) => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
			modalClose();
		}
	});


	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('modal__show')) {
			modalClose();
		}
	});

	modalClose();
	modalShow();


	const modalTimerId = setTimeout(openModal, 120000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	//Cards

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');

			if(this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className  => element.classList.add(className));
			}


			element.innerHTML = `
			
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}"</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                
			`;
			this.parent.append(element);
		}

	}

	const getResource = async (url, data) => {
		const res = await fetch(url, );

		if (!res.ok) {
			throw new Error(`No data ${url}, status: ${res.status}`);
		}
		return await res.json();
	};

	// getResource(' http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({img, alt, title, descr, price}) => {
	// 			new MenuCard(img, alt, title, descr, price, '.menu .container').render();
	// 		});
	// 	});

	axios.get(' http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({img, alt, title, descr, price}) => {
				new MenuCard(img, alt, title, descr, price, '.menu .container').render();
			});
		});

	//Forms

	const forms = document.querySelectorAll('form');

	const message = {
		loading: "Загрузка",
		success: "Спасибо, скоро мы с вами свяжемся",
		failure: 'Что-то пошдло не так',
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const statusMassege = document.createElement('div');
			statusMassege.classList.add('status');
			statusMassege.textContent = message.loading;
			form.append(statusMassege);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData(' http://localhost:3000/requests', json)
				.then(data => {
				// console.log(data);
				form.reset();
				showThanksModal(message.success);

				statusMassege.remove();
			}).catch(() => {
				showThanksModal(message.failure);
			});

		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			modalClose();
		}, 2000);
	}

});


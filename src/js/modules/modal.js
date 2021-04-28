
function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('modal__show');
	document.body.style.overflow = 'hidden';

	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}


function modalClose(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.remove('modal__show');
	document.body.style.overflow = '';
}




function modal(triggerSelector, modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	const modalShowBtns = document.querySelectorAll(triggerSelector);




	function modalShow() {
		modalShowBtns.forEach(btn => {
			btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
		});
	}



	modal.addEventListener('click', (event) => {
		if (event.target === modal || event.target.getAttribute('data-close') === '') {
			modalClose(modalSelector);
		}
	});


	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('modal__show')) {
			modalClose(modalSelector);
		}
	});

	modalClose(modalSelector);
	modalShow(modalSelector);


	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector,modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {modalClose};
export {openModal};
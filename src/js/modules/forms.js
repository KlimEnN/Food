import {modalClose, openModal} from "./modal";
import {postData} from "../services/services";

function form(formSelector, modalTimerId) {

	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: "Загрузка",
		success: "Спасибо, скоро мы с вами свяжемся",
		failure: 'Что-то пошдло не так',
	};

	forms.forEach(item => {
		bindPostData(item);
	});


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
		openModal('.modal', modalTimerId);

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
			modalClose('.modal');
		}, 2000);
	}
}

export default form;
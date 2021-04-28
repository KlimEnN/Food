

function slider({container, slide, nextArrow, prevArrow,totalCounter, currentCounter, wrapper, field}) {
	const slides = document.querySelectorAll(slide);
	const prev = document.querySelector(prevArrow);
	const next = document.querySelector(nextArrow);
	const current = document.querySelector(currentCounter);
	const total = document.querySelector(totalCounter);
	const slidesWrapper = document.querySelector(wrapper);
	const slidesField = document.querySelector(field);
	const width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}


	slidesField.style.width = 100 * slides.length +'%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(item => {
		item.style.width = width;
	});

	next.addEventListener('click', () => {

		if (offset === +width.replace(/\D/g, '') * (slides.length -1) ){
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if(slideIndex === slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if(slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dotss.forEach(dot => dot.style.opacity = '0.5');
		dotss[slideIndex - 1].style.opacity = '1';

	});


	prev.addEventListener('click', () => {

		if (offset === 0){
			offset = +width.replace(/\D/g, '') * (slides.length - 1);
		} else {
			offset -= +width.replace(/\D/g, '');
		}

		slidesField.style.transform = `translateX(-${offset}px)`;



		if(slideIndex === 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if(slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dotss.forEach(dot => dot.style.opacity = '0.5');
		dotss[slideIndex - 1].style.opacity = '1';
	});

//Dots

	const slider = document.querySelector(container);
	slider.style.position = 'relative';
	const dots = document.createElement('ol');
	const dotss = [];
	dots.classList.add('carousel-indicators');
	slider.append(dots);

	for (let i = 0; i < slides.length; i++) {
		const dot =document.createElement('li');
		dot.setAttribute('data-slide-two', i + 1);
		dot.classList.add('dot');

		if (i === 0 ) {
			dot.style.opacity = 1;
		}

		dots.append(dot);
		dotss.push(dot);
	}


	dotss.forEach(dot => {
		dot.addEventListener('click', (event) => {
			const slideTo = event.target.getAttribute('data-slide-two');

			slideIndex = slideTo;
			offset = +width.replace(/\D/g, '') * (slides.length - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			if(slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dotss.forEach(dot => dot.style.opacity = '0.5');
			dotss[slideIndex - 1].style.opacity = '1';

		});
	});


}

export default slider;
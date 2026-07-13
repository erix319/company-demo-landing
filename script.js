'use strict';

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});

// Smooth scrolling to elements
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScroll.addEventListener('click', (e) => {
	// Important: this is an old way to scroll
	// window.scrollTo({
	// 	left: section1.getBoundingClientRect().left + window.pageXOffset,
	// 	top: section1.getBoundingClientRect().top + window.pageYOffset,
	// 	behavior: 'smooth',
	// });

	// Modern method to scroll
	section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach((el) =>
// 	el.addEventListener('click', function (e) {
// 		e.preventDefault();
// 		const id = this.getAttribute('href');
// 		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
// 	})
// );

// Делигирование событий
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
	e.preventDefault();

	// Matching strategy
	if (e.target.classList.contains('nav__link')) {
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	}
});

// Отмена событий
// const h1 = document.querySelector('h1');

// function alertH1() {
// 	alert('You clicked on the heading!');
// 	// h1.removeEventListener('mouseenter', alertH1);
// }

// h1.addEventListener('mouseenter', alertH1);

// // Being able to interact with header for the first 5 secs, and then event listener is removed
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);

// Header rgb on interaction
// function randomInt(min, max) {
// 	return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function randomColor() {
// 	return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// }

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const link = document.querySelector('.nav__link');

// nav.addEventListener('click', function (e) {
// 	this.style.backgroundColor = randomColor();
// 	console.log('NAV', e.target, e.currentTarget, e.currentTarget === this);
// 	// Stop propagation of the event to parent elements
// 	e.stopPropagation();
// });

// navLinks.addEventListener('click', function (e) {
// 	this.style.backgroundColor = randomColor();
// 	console.log('NAV LINKS', e.target, e.currentTarget, e.currentTarget === this);
// 	// Stop propagation of the event to parent elements
// 	e.stopPropagation();
// });

// link.addEventListener('click', function (e) {
// 	this.style.backgroundColor = randomColor();
// 	console.log('LINK', e.target, e.currentTarget, e.currentTarget === this);
// 	// Stop propagation of the event to parent elements
// 	e.stopPropagation();
// });

// Adding behaviour to tabs section
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
	e.preventDefault();
	const clicked = e.target.closest('.operations__tab');

	if (!clicked) return;

	// Remove active classes
	tabs.forEach((t) => t.classList.remove('operations__tab--active'));
	tabsContent.forEach((c) => c.classList.remove('operations__content--active'));

	// Activate tab
	clicked.classList.add('operations__tab--active');

	// Also switch tab's content
	// console.log(clicked.dataset.tab);
	document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// Adding opacity to menu on hover
function hover(e) {
	if (e.target.classList.contains('nav__link')) {
		const link = e.target;
		const siblings = link.closest('.nav').querySelectorAll('.nav__link');
		const logo = link.closest('.nav').querySelector('.nav__logo');

		siblings.forEach((el) => {
			if (el !== link) el.style.opacity = this;
		});
		logo.style.opacity = this;
	}
	// console.log(this);
}

nav.addEventListener('mouseover', hover.bind(0.5));
nav.addEventListener('mouseout', hover.bind(1));

// Появление меню после прокрутки
// Old method (too performance heavy)
// const coords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
// 	// console.log(window.scrollY);
// 	if (window.scrollY > coords.top) nav.classList.add('sticky');
// 	else nav.classList.remove('sticky');
// });

// Modern method (Intersection Observer API)
function callBack(entries, observer) {
	console.log(entries);
	console.log(observer);
	if (!entries[0].isIntersecting) nav.classList.add('sticky');
	else nav.classList.remove('sticky');
}

const options = { root: null, threshold: 0, rootMargin: '-90px' };
const observer = new IntersectionObserver(callBack, options);

observer.observe(document.querySelector('.header'));

// Всплытие секций при прокрутке
function revealSection(entries, observer) {
	if (!entries[0].isIntersecting) return;

	entries[0].target.classList.remove('section--hidden');
	observer.unobserve(entries[0].target);
}

const allSections = document.querySelectorAll('.section');
const sectionsObserver = new IntersectionObserver(revealSection, { threshold: 0.15 });

allSections.forEach((section) => {
	sectionsObserver.observe(section);
	section.classList.add('section--hidden');
});

// Lazy image loading with intersection observer
const imgTargets = document.querySelectorAll('img[data-src]');

function loadImg(entries, observer) {
	if (!entries[0].isIntersecting) return;

	entries[0].target.src = entries[0].target.dataset.src;

	entries[0].target.addEventListener('load', function () {
		entries[0].target.classList.remove('lazy-img');
	});
	observer.unobserve(entries[0].target);
}

const imgObserver = new IntersectionObserver(loadImg, { threshold: 0.15 });

imgTargets.forEach((img) => imgObserver.observe(img));

// Adding fucntionality to a slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlides = slides.length - 1;

function createDots() {
	slides.forEach((_, i) => {
		dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
	});
}

function activateDot(slide) {
	document.querySelectorAll('.dots__dot').forEach((dot) => dot.classList.remove('dots__dot--active'));

	document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

function goToSlide(slideIndex) {
	slides.forEach((slide, index) => (slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`));
}

function prevSlide() {
	if (currentSlide === 0) currentSlide = maxSlides;
	else currentSlide--;

	goToSlide(currentSlide);
	activateDot(currentSlide);
}

function nextSlide() {
	if (currentSlide === maxSlides) currentSlide = 0;
	else currentSlide++;

	goToSlide(currentSlide);
	activateDot(currentSlide);
}

goToSlide(0);
createDots();
activateDot(0);

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
	if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
		prevSlide();
		activateDot(currentSlide);
	} else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
		nextSlide();
		activateDot(currentSlide);
	}
});

dotContainer.addEventListener('click', function (e) {
	if (e.target.classList.contains('dots__dot')) {
		const slide = e.target.dataset.slide;
		goToSlide(slide);
	}
});

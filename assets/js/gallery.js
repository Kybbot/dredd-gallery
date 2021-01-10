document.addEventListener("DOMContentLoaded", () => {

	setTimeout(function(){
		const preloader = document.querySelector('.preloader');
		if( !preloader.classList.contains('preloader_finish'))
		{
			preloader.classList.add('preloader_finish');
		}
	}, 1000);

	const images = document.querySelectorAll('.gallery__photo');

	function preloadImage(img) {
		const src = img.getAttribute('data-src');
		if(!src) return;

		img.src = src;
	}

	const imgOptions = {
		root: null,
		rootMargin: '0px',
		treshold: 0.1,
	};

	const imgObserver = new IntersectionObserver((entries, imgObserver) => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) {
				return;
			} else {
				preloadImage(entry.target);
				imgObserver.unobserve(entry.target);
			}
		});
	}, imgOptions);

	images.forEach(image => {
		imgObserver.observe(image);
	});

	const toTop = document.querySelector('.footer__btn');

	toTop.addEventListener('click', () => {
		scrollTo(0, 0);
	});

	const photos = document.querySelectorAll('.gallery__photo');
	const modal = document.querySelector('.modal');
	const modalImg = document.querySelector('.modal__img');
	const previous = document.querySelector('.modal__previous');
	const next = document.querySelector('.modal__next');
	let currentPhoto = '';

	photos.forEach(photo => {
		photo.addEventListener('click', () => {
			currentPhoto = photo;

			modalImg.src = currentPhoto.getAttribute('data-src');
			modalImg.style.cursor = 'zoom-out';
			modal.style.display = 'block';
		});
	});

	next.addEventListener('click', () => {
		if (currentPhoto.nextElementSibling) currentPhoto = currentPhoto.nextElementSibling;
		modalImg.src = currentPhoto.getAttribute('data-src');
	});

	previous.addEventListener('click', () => {
		if (currentPhoto.previousElementSibling) currentPhoto = currentPhoto.previousElementSibling;
		modalImg.src = currentPhoto.getAttribute('data-src');
	});

	modalImg.addEventListener('click', () => {
		modal.style.display = 'none';
		currentPhoto = '';
	});
});
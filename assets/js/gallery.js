window.addEventListener('load', () => {

	setTimeout(function(){
		const preloader = document.querySelector('.preloader');
		if( !preloader.classList.contains('preloader_finish'))
		{
			preloader.classList.add('preloader_finish');
		}
	}, 1000);

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

			modalImg.src = currentPhoto.src;
			modalImg.style.cursor = 'zoom-out';
			modal.style.display = 'block';
		});
	});

	next.addEventListener('click', () => {
		if (currentPhoto.nextElementSibling) currentPhoto = currentPhoto.nextElementSibling;
		modalImg.src = currentPhoto.src;
	});

	previous.addEventListener('click', () => {
		if (currentPhoto.previousElementSibling) currentPhoto = currentPhoto.previousElementSibling;
		modalImg.src = currentPhoto.src;
	});

	modalImg.addEventListener('click', () => {
		modal.style.display = 'none';
		currentPhoto = '';
	});
});
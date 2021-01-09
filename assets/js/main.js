document.addEventListener("DOMContentLoaded", () => {

	setTimeout(function(){
		const preloader = document.querySelector('.preloader');
		if( !preloader.classList.contains('preloader_finish'))
		{
			preloader.classList.add('preloader_finish');
		}
	}, 1000);

	const images = document.querySelectorAll('.card__photo');

	function preloadImage(img) {
		const src = img.getAttribute('data-src');
		if(!src) return;

		img.src = src;
	}

	const imgOptions = {
		root: null,
		rootMargin: '0px',
		treshold: 1.0,
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

	VanillaTilt.init(document.querySelectorAll(".card"), {
		max: 6,
	});
	
	const toTop = document.querySelector('.footer__btn');
	
	toTop.addEventListener('click', () => {
		scrollTo(0, 0);
	});
	
	const colors = [
		'#da4d1d',
		'#2b26c3',
		'#f0e111',
		'#3ee01e',
		'#990a99',
		'#5ddee7',
		'#f04040f1',
		'#ffc6ff',
	];
	
	const circles = document.querySelectorAll('.card__circle');
	
	circles.forEach((circle) => {
		circle.style.backgroundColor = `${colors[Math.floor(Math.random() * colors.length)]}`;
	});
	
	const searchInput = document.querySelector('.search__input');
	const searchBtn = document.querySelector('.search__btn');
	const searchEmpty = document.querySelector('.search__empty');
	const cardTitles = document.querySelectorAll('.card__title');
	
	searchBtn.addEventListener('click', (event) => {
		event.preventDefault();
		let result;
	
		cardTitles.forEach(item => {
			if (item.textContent.toLowerCase() === searchInput.value.toLowerCase()) result = item;
		});
	
		if (result) {
			scrollTo(result.parentElement.offsetLeft, result.parentElement.offsetTop);
			result.parentElement.classList.add('card_focus');
		
			setTimeout(() => {
				result.parentElement.classList.remove('card_focus');
			}, 3000);
		} else {
			searchEmpty.style.opacity = '1';
			searchEmpty.style.transform = 'scale(1)';
	
			setTimeout(() => {
				searchEmpty.style.opacity = '0';
				searchEmpty.style.transform = 'scale(0)';
			}, 4000);
		}
	
		searchInput.value = '';
	});


	const tagBtns = document.querySelectorAll('.filter__btn');
	const allCards = document.querySelector('#all-cards');
	const cards = document.querySelectorAll('.card');

	tagBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			cards.forEach(card => {
				if (!card.getAttribute('data-tag').includes(btn.textContent)) {
					card.style.display = 'none';
				} else {
					card.style.display = 'block';
				}
			});
		});
	});

	allCards.addEventListener('click', () => {
		cards.forEach(card => {
			card.style.display = 'block';
		});
	});

});
// DOM Selectors
const toggleBtn = document.querySelector('.fa-bars');
const backdrop = document.querySelector('.backdrop');
const mobileNav = document.querySelector('.header__mobile-nav');
const dateSpan = document.querySelector('.footer__text-date');
const main = document.querySelector('.main');
const clickMeBtn = document.querySelector('.main__click-me');
const slides = document.querySelectorAll('.main__os-gallery-slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const contactForm = document.getElementById('contact-form');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal__close');

// Footer date
const date = new Date().getFullYear();
dateSpan.innerHTML = `${date}`;

// Open/close mobile nav menu
toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('open-nav-menu');
  backdrop.classList.toggle('show-backdrop');
  mobileNav.classList.toggle('open-mobile-nav');
});

backdrop.addEventListener('click', () => {
  toggleBtn.classList.remove('open-nav-menu');
  backdrop.classList.remove('show-backdrop');
  mobileNav.classList.remove('open-mobile-nav');
});

// Random color generater
const chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

const randomNum = () => {
  return Math.floor(Math.random() * chars.length);
};

const randomColor = () => {
  let bgColor = '#';
  for (let i = 0; i < 6; i++) {
    bgColor += chars[randomNum()];
  }
  main.style.backgroundColor = bgColor;
};

if (clickMeBtn) clickMeBtn.addEventListener('click', randomColor);

// Slide show
if (slides) {
  slides.forEach(function (slide, index) {
    slide.style.left = `${index * 100}%`;
  });

  let counter = 0;

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      counter++;
      carousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      counter--;
      carousel();
    });
  }

  const carousel = () => {
    slides.forEach((slide) => {
      if (counter < slides.length) {
        slide.style.transform = `translateX(-${counter * 100}%)`;
      }

      if (counter < 0) {
        slide.style.transform = `translateX(${counter * 100}%)`;
      }

      if (counter < slides.length - 1) {
        nextBtn.style.display = 'block';
      } else {
        nextBtn.style.display = 'none';
      }

      if (counter > 0) {
        prevBtn.style.display = 'block';
      } else {
        prevBtn.style.display = 'none';
      }
    });
  };
}

// Contact form
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.main-contact__form-button').innerHTML =
      'Sending...';
    const form = new FormData();
    form.name = document.getElementById('name').value;
    form.email = document.getElementById('email').value;
    form.message = document.getElementById('message').value;
    form.access_key = document.querySelector('.access_key').value;
    form.subject = document.querySelector('.subject').value;
    const json = JSON.stringify(form);
    try {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      }).then(async (response) => {
        const data = await response.json();
        if (data.succes === true) {
          modal.classList.add('show-modal');
          backdrop.classList.add('show-backdrop');
          const closeModal = () => {
            modal.classList.remove('show-modal');
            backdrop.classList.remove('show-backdrop');
            location.reload();
          };
          modalCloseBtn.addEventListener('click', closeModal);
          backdrop.addEventListener('click', closeModal);
        } else {
          location.assign('../errorPage/error.html');
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
}

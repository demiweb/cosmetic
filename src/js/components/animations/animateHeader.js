import anime from 'animejs';

export default function animateHeader() {
  return new Promise((resolve) => {
    const {
      header,
      nav,
      contacts,
    } = {
      header: document.querySelector('.header'),
      nav: document.querySelectorAll('.header__nav li'),
      contacts: document.querySelector('.header__contacts'),
    };

    if (!header) return;

    const tl = anime.timeline({ easing: 'easeOutQuad' });

    tl
      .add({
        targets: header,
        opacity: [0, 1],
        duration: 500,
      });
    if (window.matchMedia('(min-width: 768px)').matches) {
      tl
        .add({
          targets: nav,
          opacity: [0, 1],
          translateY: [30, 0],
          delay: anime.stagger(100),
          duration: 500,
        });
    }
    tl
      .add({
        targets: contacts,
        opacity: [0, 1],
        translateX: ['100%', '0%'],
        duration: 500,
      }, '-=500');

    tl.finished.then(resolve);
  });
}

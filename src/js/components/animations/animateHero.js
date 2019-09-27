import anime from 'animejs';

export default function animateHero() {
  return new Promise((resolve) => {
    const {
      hero,
      leftEls,
      img,
      social,
    } = {
      hero: document.querySelector('.hero'),
      leftEls: document.querySelector('.hero__left-top').children,
      img: document.querySelector('.hero__img'),
      social: document.querySelector('.hero__social'),
    };

    if (!hero) return;

    const tl = anime.timeline({ easing: 'easeOutQuad' });

    if (window.matchMedia('(min-width: 768px)').matches) {
      tl
        .add({
          targets: img,
          opacity: [0, 1],
          duration: 750,
        });
    }
    tl
      .add({
        targets: leftEls,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 750,
        delay: anime.stagger(150),
      }, '-=400')
      .add({
        targets: social,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 750,
      }, '-=500');

    tl.finished.then(resolve);
  });
}

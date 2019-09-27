import anime from 'animejs';

class Animator {
  constructor(section, options = {}) {
    this.section = section;
    this.options = options;
    this.tl = anime.timeline({ easing: 'easeOutQuad' });
  }

  get elements() {
    return {
      title: this.section.querySelector('.section__title'),
      subttl: this.section.querySelector('.section__subttl'),
      features: this.section.querySelectorAll('.features__item'),
      sectionLeft: this.section.querySelector('.section-block__left'),
      sectionRight: this.section.querySelector('.section-block__right'),
      testimonials: this.section.querySelector('.testimonials'),
      contactsBlock: this.section.querySelector('.contacts__block'),
      map: this.section.querySelector('.contacts__map'),
    };
  }

  animate(entry, observer) {
    const {
      title,
      subttl,
      features,
      sectionLeft,
      sectionRight,
      testimonials,
      contactsBlock,
      map,
    } = this.elements;

    if (title) {
      this.tl
        .add({
          targets: title,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 500,
        });
    }
    if (subttl) {
      this.tl
        .add({
          targets: subttl,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 500,
        }, '-=200');
    }
    if (features && features.length > 0) {
      this.tl
        .add({
          targets: features,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 500,
          delay: anime.stagger(100),
        });
    }
    if (sectionLeft) {
      this.tl
        .add({
          targets: sectionLeft,
          opacity: [0, 1],
          duration: 750,
        });
    }
    if (sectionRight) {
      this.tl
        .add({
          targets: sectionRight,
          opacity: [0, 1],
          translateX: ['100%', '0%'],
          duration: 500,
        }, '-=500');
    }
    if (testimonials) {
      this.tl
        .add({
          targets: testimonials,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 500,
        });
    }
    if (contactsBlock) {
      this.tl
        .add({
          targets: contactsBlock,
          opacity: [0, 1],
          translateX: ['-100%', '0%'],
          duration: 750,
        });
    }

    this.tl.finished.then(observer.unobserve(entry.target));
  }

  _initAnimations(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.animate(entry, observer);
      }
    });
  }

  _initObserver() {
    this.observer = new IntersectionObserver(
      this._initAnimations.bind(this),
      this.options.observer,
    );
    this.observer.observe(this.section);
  }

  init() {
    this._initObserver();
  }
}

export default function animateSections() {
  const sections = [...document.querySelectorAll('.js-section')];

  if (!sections.length) return;

  sections.forEach((section) => {
    const animator = new Animator(section, {
      observer: {
        threshold: 0.2,
      },
    });
    animator.init();
  });
}

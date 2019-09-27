class Animator {
  constructor(el, options) {
    this.el = el;
    this.defaultParameters = {
      observer: {},
      infinite: false,
    };
    this.options = { ...this.defaultParameters, ...options };
    this.iteration = 1;
    this.enter = false;
  }

  init() {
    this.animate();
  }

  animateEls(entries, observer) {
    entries.forEach((entry) => {
      const el = entry.target;

      const animationName = el.getAttribute('data-anim-name');
      if (!animationName) return;

      const animationDuration = el.getAttribute('data-anim-duration') ? el.getAttribute('data-anim-duration') : '1s';
      const animationDelay = el.getAttribute('data-anim-delay') ? el.getAttribute('data-anim-delay') : '0s';
      const animationIterations = +el.getAttribute('data-anim-iterations');

      el.style.opacity = '0';

      if (entry.isIntersecting) {
        this.enter = true;
        el.classList.add(animationName);
        el.style.animationDuration = animationDuration;
        el.style.animationDelay = animationDelay;

        const DELAY = 1000 * ((+animationDuration.slice(0, -1)) + (+animationDelay.slice(0, -1)));

        setTimeout(() => {
          this.iteration += 1;
          el.style.opacity = '1';

          if (animationIterations) {
            if (animationIterations === this.iteration - 1) {
              observer.unobserve(el);
            }
          } else if (!this.options.infinite) {
            observer.unobserve(el);
          }
        }, DELAY);

        if (this.onEnter) {
          this.onEnter();
        }
      } else {
        el.classList.remove(animationName);
        el.style.animationDuration = '';
        el.style.animationDelay = '';

        if (this.onExit && this.enter) {
          this.onExit();
        }
        this.enter = false;
      }
    });
  }

  animate() {
    const observer = new IntersectionObserver(this.animateEls.bind(this), this.options.observer);
    observer.observe(this.el);
  }
}

export default function animateOnScroll() {
  const els = [...document.querySelectorAll('.js-anim-el')];
  if (!els.length) return;

  els.forEach((el) => {
    const animator = new Animator(el);
    animator.init();
  });
}

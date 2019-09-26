import { tns } from 'tiny-slider/src/tiny-slider';

export default class Slider {
  constructor(container, getOptions) {
    this.container = container;
    this.name = container.dataset.slider;
    this.wrap = container.closest('.slider__wrap');
    this.controls = {
      prev: this.wrap.querySelector('.js-slider-prev'),
      next: this.wrap.querySelector('.js-slider-next'),
    };
    this.slides = [...container.querySelectorAll('.slide')];

    this.options = getOptions({
      container,
      prevButton: this.controls.prev,
      nextButton: this.controls.next,
    })[this.name];
  }

  _initPlugin() {
    this.tns = tns(this.options);
  }

  destroy() {
    if (!this.tns.destroy) return;
    this.tns.destroy();
  }

  init() {
    this._initPlugin();
  }
}

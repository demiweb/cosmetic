import Slider from './Slider';
import setLazy from '../setLazy';
import ItemsToggler from './toggleItems';
import { IS_ACTIVE } from '../../constants';

export default class MySlider {
  constructor(slider) {
    this.sliderClass = slider;
  }

  _getOptions() {
    this.getOptions = ({ container, prevButton, nextButton }) => ({
      events: {
        container,
        prevButton,
        nextButton,
        items: 1,
        mouseDrag: true,
        loop: false,
        onInit: setLazy,
        nav: false,
      },
      testimonials: {
        container,
        prevButton,
        nextButton,
        items: 1,
        mouseDrag: true,
        onInit: setLazy,
        nav: false,
        loop: false,
        gutter: 0,
        responsive: {
          768: {
            items: 2,
            gutter: 15,
          },
          992: {
            items: 3,
            gutter: 20,
          },
          1200: {
            items: 4,
            gutter: 30,
          },
        },
      },
    });
  }

  _initSliders() {
    this.containers = [...document.querySelectorAll(this.sliderClass)];
    if (!this.containers) { this.noSliders = true; return; }

    this.sliders = [];

    this.containers.forEach((container) => {
      const slider = new Slider(container, this.getOptions);
      slider.init();
      this.sliders.push(slider);
    });
  }

  _initTogglers() {
    this.togglerContainers = [...document.querySelectorAll(`.${MySlider.classNames.toggler.wrap}`)];
    if (!this.togglerContainers.length) return;

    this.togglers = [];

    this.togglerContainers.forEach((container) => {
      const itemsToggler = new ItemsToggler(container, MySlider.classNames.toggler);
      itemsToggler.init();
      this.togglers.push(itemsToggler);
    });
  }

  _toggleSlides() {
    this.sliders.forEach((slider, i) => {
      slider.tns.events.on('transitionEnd', (info) => {
        const { slides, items, content } = this.togglers[i];

        const activeSlides = slides.filter((slide) => slide.classList.contains('tns-slide-active'));
        console.log(activeSlides);
        const activeSlide = activeSlides[activeSlides.length - 1];
        const index = activeSlide.getAttribute('data-index');
        const activeItem = content.querySelector(`[data-index="${index}"]`);

        items.forEach((item) => item.classList.remove(IS_ACTIVE));
        activeItem.classList.add(IS_ACTIVE);
      });
    });
  }


  init() {
    if (this.noSliders) return;


    this._getOptions();

    this._initTogglers();
    this._initSliders();
    this._toggleSlides();
  }
}

MySlider.classNames = {
  toggler: {
    wrap: 'js-toggle-items',
    slider: 'js-toggle-items-slider',
    content: 'js-toggle-items-content',
  },
};

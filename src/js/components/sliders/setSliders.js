import Slider from './Slider';
import ItemsToggler from './ItemsToggler';
import setActiveItems from './setActiveItems';
import { isTouch } from '../../helpers';
import classNames from './classNames';

export default class MySlider {
  constructor(slider) {
    this.sliderClass = slider;
  }

  _getOptions() {
    this.getOptions = ({
      container, prevButton, nextButton, onInit,
    }) => ({
      events: {
        container,
        prevButton,
        nextButton,
        onInit,
        items: 1,
        loop: true,
        nav: false,
      },
      testimonials: {
        container,
        prevButton,
        nextButton,
        onInit,
        items: 1,
        nav: false,
        loop: true,
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
      testimonials_one_item: {
        container,
        prevButton,
        nextButton,
        onInit,
        items: 1,
        nav: false,
        loop: true,
        gutter: 0,
      },
    });
  }

  _initSliders() {
    this.containers = [...document.querySelectorAll(this.sliderClass)];
    if (!this.containers.length) { this.noSliders = true; return; }

    this.sliders = [];

    this.containers.forEach((container) => {
      if (container.classList.contains(classNames.plugin.container)) return;

      const slider = new Slider(container, this.getOptions);
      slider.init();
      this.sliders.push(slider);
    });
  }

  _initTogglers() {
    this.togglerContainers = [...document.querySelectorAll(`.${classNames.toggler.wrap}`)];
    if (!this.togglerContainers.length) return;

    this.togglers = [];

    this.togglerContainers.forEach((container) => {
      const itemsToggler = new ItemsToggler(container);
      itemsToggler.init();
      this.togglers.push(itemsToggler);
    });
  }

  _toggleSlides() {
    this.sliders.forEach((slider, i) => {
      const event = isTouch ? 'transitionEnd' : 'transitionStart';

      slider.tns.events.on(event, () => {
        const { slides, items, content } = this.togglers[i];
        const activeSlideClass = classNames.plugin.activeSlide;

        setActiveItems({
          slides, items, content, activeSlideClass,
        });
      });
    });
  }

  init() {
    this._getOptions();
    this._initSliders();
    if (this.noSliders) return;

    setTimeout(() => {
      this._initTogglers();
    }, 200);

    this._toggleSlides();
  }
}

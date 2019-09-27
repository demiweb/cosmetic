import { debounce } from 'throttle-debounce';
import { IS_ACTIVE, IS_CURRENT } from '../../constants';
import setActiveItems from './setActiveItems';
import classNames from './classNames';

export default class ItemsToggler {
  constructor(container) {
    this.container = container;
    this.slider = container.querySelector(`.${classNames.toggler.slider}`);
    this.content = container.querySelector(`.${classNames.toggler.content}`);
    this.items = [...this.content.children];
    this.slides = [...this.slider.querySelectorAll('.slide')];
  }

  _setItemsPosition() {
    const { left } = this.items[0].getBoundingClientRect();

    this.items.forEach((item) => {
      const slide = item;
      slide.style.transform = 'translate(0, 0)';
      const currentLeft = slide.getBoundingClientRect().left;
      const leftOffest = currentLeft - left;
      slide.style.transform = `translate(-${leftOffest}px, 0)`;
    });
  }

  _setFirstItem() {
    const activeSlideClass = classNames.plugin.activeSlide;

    setActiveItems({
      activeSlideClass,
      slides: this.slides,
      items: this.items,
      content: this.content,
    });
  }

  _addResize() {
    this.onResize = debounce(300, this.resize.bind(this));
    window.addEventListener('resize', this.onResize);
  }

  resize() {
    this._setItemsPosition();
  }

  init() {
    this._setItemsPosition();
    this._setFirstItem();
    this._addResize();
  }
}

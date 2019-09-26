import { debounce } from 'throttle-debounce';
import { IS_ACTIVE } from '../../constants';

export default class ItemsToggler {
  constructor(container, classNames) {
    this.container = container;
    this.slider = container.querySelector(`.${classNames.slider}`);
    this.content = container.querySelector(`.${classNames.content}`);
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
    this.items[0].classList.add(IS_ACTIVE);
  }

  init() {
    this._setItemsPosition();
    this.setPositions = debounce(300, this._setItemsPosition.bind(this));
    window.addEventListener('resize', this.setPositions);

    this._setFirstItem();
  }
}

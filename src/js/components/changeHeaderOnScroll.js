import { throttle } from 'throttle-debounce';

const IS_SMALL = 'is-small';

class Header {
  constructor(header) {
    this.header = header;
  }

  toggle(e) {
    if (window.pageYOffset > 10) {
      this.header.classList.add(IS_SMALL);
    } else {
      this.header.classList.remove(IS_SMALL);
    }
  }

  _toggleHeader() {
    this.onScroll = throttle(66, this.toggle.bind(this));
    window.addEventListener('scroll', this.onScroll);
  }

  init() {
    this._toggleHeader();
  }
}

export default function changeHeaderOnScroll() {
  const header = document.querySelector('.js-header');
  if (!header) return;

  const hd = new Header(header);
  hd.init();
}

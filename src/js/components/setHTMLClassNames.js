import { isTouch, isIE } from '../helpers';
import { NO_TOUCH, IS_READY } from '../constants';

function setTouch() {
  if (!isTouch) {
    document.documentElement.classList.add(NO_TOUCH);
  }
}

function setReady() {
  document.documentElement.classList.add(IS_READY);
}

function detectIE() {
  if (isIE) {
    document.documentElement.classList.add('is-ie');
  }
}

export default function setHTMLClassNames() {
  setTouch();
  setReady();
  detectIE();
}

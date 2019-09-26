import 'core-js/features/symbol';
import 'core-js/features/array/from';
import 'core-js/features/promise';
import 'intersection-observer';
import './lib/polyfill';

import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
import { setVhProperty } from './helpers';
import MySlider from './components/sliders/setSliders';
import toggleMenu from './components/toggleMenu';
import changeHeaderOnScroll from './components/changeHeaderOnScroll';

document.addEventListener('DOMContentLoaded', () => {
  sayHello();
  setHTMLClassNames();
  setLazy();
  setVhProperty();

  const mySlider = new MySlider('.js-slider');
  mySlider.init();

  toggleMenu();
  changeHeaderOnScroll();
});

import 'core-js/features/symbol';
import 'core-js/features/array/from';
import 'core-js/features/promise';
import 'core-js/features/object/values';
import 'intersection-observer';
import './lib/polyfill';
import smoothscroll from 'smoothscroll-polyfill';

import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
// import { setVhProperty } from './helpers';
import MySlider from './components/sliders/setSliders';
import burger from './components/toggleMenu';
import changeHeaderOnScroll from './components/changeHeaderOnScroll';
import scrollTo from './components/scrollTo';
import setPopups from './components/setPopups';
import animateOnScroll from './components/animateOnScroll';
import setAnimations from './components/animations/setAnimations';
import setTextareaHeight from './components/setTextareaHeight';

document.addEventListener('DOMContentLoaded', () => {
  smoothscroll.polyfill();
  sayHello();
  setHTMLClassNames();
  setLazy();
  // setVhProperty();

  const mySlider = new MySlider('.js-slider');
  mySlider.init();

  burger.init();
  changeHeaderOnScroll();
  scrollTo();
  setPopups();
  animateOnScroll();
  setAnimations();
  setTextareaHeight();
});

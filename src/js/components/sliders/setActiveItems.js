import { IS_ACTIVE, IS_CURRENT } from '../../constants';

export default function setActiveItems({
  slides, items, content, activeSlideClass,
}) {
  const activeSlides = slides.filter((slide) => slide.classList.contains(activeSlideClass));
  const activeSlide = activeSlides[activeSlides.length - 1];
  const index = activeSlide.getAttribute('data-index');
  if (!index) console.warn('`data-index` attribute should be added to items');
  const activeItem = content.querySelector(`[data-index="${index}"]`);

  items.forEach((item) => item.classList.remove(IS_ACTIVE));
  slides.forEach((slide) => slide.classList.remove(IS_CURRENT));

  activeItem.classList.add(IS_ACTIVE);
  activeSlide.classList.add(IS_CURRENT);
}

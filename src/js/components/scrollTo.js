import burger from './toggleMenu';

export default function scrollTo() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.js-scroll-to');

    if (!btn) return;
    const href = btn.getAttribute('href');
    const target = document.querySelector(href);

    if (!target) return;
    e.preventDefault();
    const offset = 50;
    const top = target.getBoundingClientRect().top - offset;

    window.scrollBy({
      top,
      behavior: 'smooth',
    });

    if (window.matchMedia('(max-width: 767px)').matches) {
      burger.close();
    }
  });
}

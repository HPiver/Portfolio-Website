const carousel = document.querySelector('.carousel');
let scrollTarget = carousel.scrollLeft;
let isScrolling = false;

carousel.addEventListener('wheel', (e) => {
  e.preventDefault();

  scrollTarget += e.deltaY * 1; 
  scrollTarget = Math.max(0, Math.min(scrollTarget, carousel.scrollWidth - carousel.clientWidth));

  if (!isScrolling) {
    isScrolling = true;
    smoothScroll();
  }
});

function smoothScroll() {
  const currentScroll = carousel.scrollLeft;
  const diff = scrollTarget - currentScroll;

  if (Math.abs(diff) < 0.5) {
    carousel.scrollLeft = scrollTarget;
    isScrolling = false;
    return;
  }

  carousel.scrollLeft = currentScroll + diff * 0.2;
  requestAnimationFrame(smoothScroll);
}

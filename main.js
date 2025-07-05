document.addEventListener("DOMContentLoaded", function () {
  // ----- Carousel Scroll Logic -----
  const carousel = document.querySelector('.carousel');
  if (carousel) {
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
  }

  // ----- GitHub Latest Repo Fetch -----
  fetch("https://api.github.com/users/HPiver/repos?sort=updated&per_page=1")
    .then(response => response.json())
    .then(repos => {
      const latestRepo = repos[0];
      const link = document.getElementById("latest-repo");
      if (link) {
        link.href = latestRepo.html_url;
        link.textContent = `${latestRepo.name}`;
      }
    })
    .catch(error => {
      console.error("Error fetching GitHub repo:", error);
      const link = document.getElementById("latest-repo");
      if (link) link.textContent = "Failed to load project.";
    });
});

document.addEventListener("DOMContentLoaded", function () {
  // ----- Carousel Grab Logic -----
    const carousel = document.querySelector('.carousel');
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('active');
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('active');
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // adjust scroll speed
    carousel.scrollLeft = scrollLeft - walk;
  });


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


  // -----no image grab/drag -----
document.querySelectorAll('.carousel img').forEach(img => {
  img.addEventListener('dragstart', e => e.preventDefault());
});


document.addEventListener('DOMContentLoaded', function () {
  /* ===== Sticky nav (guarded) ===== */
  const nav = document.querySelector('.sticky-nav');
  const menuToggle = document.querySelector('.sticky-nav-toggle');
  const menu = document.querySelector('.sticky-nav-menu');

  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function () {
      menu.classList.toggle('mobile-active');
      const icon = menuToggle.querySelector('i');
      if (!icon) return;

      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });

    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          menu.classList.remove('mobile-active');
          const icon = menuToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }

        menuLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && menu && menuToggle) {
      menu.classList.remove('mobile-active');
      const icon = menuToggle.querySelector('i');
      if (icon && icon.classList.contains('fa-times')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });

  /* ===== Resume download (fixed path) ===== */
  window.downloadPDF = function () {
    const link = document.createElement('a');
    link.href = 'assests/Resume.pdf';
    link.download = 'Tanzeela_Fatima.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ===== Languages circles ===== */
  function animateCircle(circle) {
    const target = Math.max(0, Math.min(100, Number(circle.dataset.percent) || 0));
    const span = circle.querySelector('span');
    let current = 0;
    const stepTime = 12;

    circle.classList.add('rotating');

    const timer = setInterval(() => {
      current++;
      if (current >= target) {
        clearInterval(timer);
        current = target;
        circle.classList.remove('rotating');
      }
      circle.style.setProperty('--percent', current);
      if (span) span.textContent = current + '%';
    }, stepTime);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateCircle(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.circle').forEach(c => observer.observe(c));

  /* ===== Project Filters ===== */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.getAttribute("data-filter");
      projectCards.forEach(card => {
        if (category === "all" || card.dataset.category.includes(category)) {
          card.style.display = "block";
          card.classList.add("fade-in");
          card.addEventListener("animationend", () => card.classList.remove("fade-in"), { once: true });
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ===== Project Sorting by Date ===== */
  const grid = document.querySelector(".project-grid");
  if (grid) {
    const cards = Array.from(grid.querySelectorAll(".project-card"));
    cards.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
    cards.forEach(card => grid.appendChild(card));
  }

  /* ===== Contact form popup ===== */
  const form = document.getElementById('contactForm');
  const popup = document.getElementById('popupMsg');
  let popupTimer;

  if (form && popup) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      popup.classList.add('show');
      form.reset();

      clearTimeout(popupTimer); // prevent stacking
      popupTimer = setTimeout(() => {
        popup.classList.remove('show');
      }, 3000);
    });
  }

  window.closePopup = function () {
    popup.classList.remove('show');
    clearTimeout(popupTimer);
  };
});


// Create floating circles
const bg = document.getElementById('animated-bg');
const totalCircles = 20;

for(let i = 0; i < totalCircles; i++) {
    let c = document.createElement('div');
    c.classList.add('bg-circle');

    let size = Math.random() * 80 + 20; // 20px to 100px
    c.style.width = size + 'px';
    c.style.height = size + 'px';

    c.style.left = Math.random() * window.innerWidth + 'px';
    c.style.animationDuration = (Math.random() * 5 + 8) + 's'; // vertical float
    c.style.animationDelay = Math.random() * 5 + 's'; // stagger start
    bg.appendChild(c);
}

// Optional: Adjust circles on resize
window.addEventListener('resize', () => {
    document.querySelectorAll('.bg-circle').forEach(c => {
        c.style.left = Math.random() * window.innerWidth + 'px';
    });
});

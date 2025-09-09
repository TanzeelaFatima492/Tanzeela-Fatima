document.addEventListener('DOMContentLoaded', function () {
        /* ===== Sticky nav (guarded) ===== */
        const nav=document.querySelector('.sticky-nav');
        const menuToggle=document.querySelector('.sticky-nav-toggle');
        const menu=document.querySelector('.sticky-nav-menu');

        if (nav) {
            window.addEventListener('scroll', function () {
                    if (window.scrollY > 50) nav.classList.add('scrolled');
                    else nav.classList.remove('scrolled');
                });
        }

        if (menuToggle && menu) {
            menuToggle.addEventListener('click', function () {
                    menu.classList.toggle('mobile-active');
                    const icon=menuToggle.querySelector('i');
                    if ( !icon) return;

                    if (icon.classList.contains('fa-bars')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    }

                    else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });

            const menuLinks=menu.querySelectorAll('a');

            menuLinks.forEach(link=> {
                    link.addEventListener('click', function () {
                            if (window.innerWidth <=768) {
                                menu.classList.remove('mobile-active');
                                const icon=menuToggle.querySelector('i');

                                if (icon) {
                                    icon.classList.remove('fa-times');
                                    icon.classList.add('fa-bars');
                                }
                            }

                            menuLinks.forEach(item=> item.classList.remove('active'));
                            this.classList.add('active');
                        });
                });
        }

        window.addEventListener('resize', function () {
                if (window.innerWidth > 768 && menu && menuToggle) {
                    menu.classList.remove('mobile-active');
                    const icon=menuToggle.querySelector('i');

                    if (icon && icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });

        /* ===== Resume download (fixed path) ===== */
        window.downloadPDF=function downloadPDF() {
            const link=document.createElement('a');
            link.href='assets/Resume.pdf'; // <-- fixed
            link.download='Tanzeela_Fatima.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        ;

        /* ===== Languages circles ===== */
        function animateCircle(circle) {
            const target=Math.max(0, Math.min(100, Number(circle.dataset.percent) || 0));
            const span=circle.querySelector('span');
            let current=0;
            const stepTime=12; // ms per 1%

            circle.classList.add('rotating'); // start rotating gradient

            const timer=setInterval(()=> {
                    current++;

                    if (current >=target) {
                        clearInterval(timer);
                        current=target;
                        circle.classList.remove('rotating'); // stop rotation at end
                    }

                    circle.style.setProperty('--percent', current);
                    if (span) span.textContent=current + '%';
                }

                , stepTime);
        }

        // Trigger animation when each circle is ~30% visible
        const observer=new IntersectionObserver((entries)=> {
                entries.forEach(entry=> {
                        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                            entry.target.classList.add('animated');
                            animateCircle(entry.target);
                        }
                    });
            }

            , {
            threshold: 0.3
        });

    // Observe all circles AFTER DOM is ready
    document.querySelectorAll('.circle').forEach(c=> observer.observe(c));
});


/* ===== Project Filters ===== */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active class
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.getAttribute("data-filter");

    projectCards.forEach(card => {
      if (category === "all" || card.dataset.category.includes(category)) {
        card.style.display = "block";
        card.classList.add("fade-in");
      } else {
        card.style.display = "none";
      }
    });
  });
});
 

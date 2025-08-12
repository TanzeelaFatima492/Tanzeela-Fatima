// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the navigation element
  const nav = document.querySelector('.sticky-nav');
  const menuToggle = document.querySelector('.sticky-nav-toggle');
  const menu = document.querySelector('.sticky-nav-menu');
  
  // Scroll event listener
  window.addEventListener('scroll', function() {
    // Add 'scrolled' class when page is scrolled
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('mobile-active');
      // Toggle icon between bars and times (X)
      const icon = menuToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Handle clicks on menu links (for mobile)
  const menuLinks = document.querySelectorAll('.sticky-nav-menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      // If current viewport is mobile size
      if (window.innerWidth <= 768) {
        menu.classList.remove('mobile-active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
      
      // Remove active class from all links
      menuLinks.forEach(item => item.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
    });
  });
});

// Resize event handler to reset mobile menu
window.addEventListener('resize', function() {
  const menu = document.querySelector('.sticky-nav-menu');
  const menuToggle = document.querySelector('.sticky-nav-toggle');
  const icon = menuToggle?.querySelector('i');
  
  if (window.innerWidth > 768) {
    menu?.classList.remove('mobile-active');
    if (icon && icon.classList.contains('fa-times')) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }
});


 function downloadPDF() {
      const link = document.createElement('a');
      link.href = 'assests/Resume.pdf'; 
      link.download = 'Tanzeela_Fatima.pdf'; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

function animateCircle(circle){
  const target = Math.max(0, Math.min(100, Number(circle.dataset.percent) || 0));
  const span = circle.querySelector('span');
  let current = 0;
  const stepTime = 12; // ms per increment (adjust speed)
  // start rotating gradient while filling
  circle.classList.add('rotating');

  const timer = setInterval(()=>{
    current++;
    if(current > target) {
      clearInterval(timer);
      current = target;
      // stop rotation after fill finishes
      circle.classList.remove('rotating');
    }
    circle.style.setProperty('--percent', current);
    span.textContent = current + '%';
  }, stepTime);
}

/* scroll-trigger using IntersectionObserver (animates once) */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && !entry.target.classList.contains('animated')){
      entry.target.classList.add('animated');
      animateCircle(entry.target);
    }
  });
}, { threshold: 0.55 });

document.querySelectorAll('.circle').forEach(c => observer.observe(c));

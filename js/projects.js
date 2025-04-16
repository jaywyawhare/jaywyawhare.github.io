// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      if (entry.target.matches('.project-card')) {
        loadImage(entry.target);
      }
    }
  });
}, observerOptions);

// Lazy load images with blur-up technique
function loadImage(card) {
  const img = card.querySelector('img[data-src]');
  if (img && !img.src) {
    img.src = img.dataset.src;
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
  }
}

// Mouse pointer interaction
const mousePointer = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
};

function updateMousePointer() {
  mousePointer.x += (mousePointer.targetX - mousePointer.x) * 0.1;
  mousePointer.y += (mousePointer.targetY - mousePointer.y) * 0.1;
  
  const pointer = document.getElementById('mouse-pointer');
  if(pointer) {
    pointer.style.transform = `translate(${mousePointer.x}px, ${mousePointer.y}px)`;
  }
  
  requestAnimationFrame(updateMousePointer);
}

document.addEventListener('mousemove', (e) => {
  mousePointer.targetX = e.clientX - 10;
  mousePointer.targetY = e.clientY - 10;
});

// Pointer hover actions
$(document).ready(function () {
  $("body").on("mouseenter", ".view-work-container, .view-resume-container, .card-container, .icon, .main-logo, .nav-bar a, .photos a, .hyperlink", function () {
    $("#mouse-pointer").css({
      "background-color": "rgba(255, 152, 0, 0.25)",
      width: '60px',
      height: '60px',
      transform: 'translateX(-20px) translateY(-20px)'
    });
  });

  $("body").on("mouseleave", ".view-work-container, .view-resume-container, .card-container, .icon, .main-logo, .nav-bar a, .photos a, .hyperlink", function () {
    $("#mouse-pointer").css({
      "background-color": "rgba(255, 152, 0, 1)",
      width: '20px',
      height: '20px',
      transform: 'translateX(0px) translateY(0px)'
    });
  });
});

// Initialize observers
document.addEventListener('DOMContentLoaded', () => {
  // Observe project cards
  document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
  });

  // Handle card interactions
  document.querySelectorAll('.card-link').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Initialize mouse pointer animation
  updateMousePointer();
});

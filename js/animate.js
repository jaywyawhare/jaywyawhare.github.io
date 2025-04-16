const mousePointer = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
};

// Use requestAnimationFrame for smooth animations
function animate() {
  // Smooth mouse following
  mousePointer.x += (mousePointer.targetX - mousePointer.x) * 0.1;
  mousePointer.y += (mousePointer.targetY - mousePointer.y) * 0.1;
  
  // Update pointer position
  const pointer = document.getElementById('mouse-pointer');
  if(pointer) {
    pointer.style.transform = `translate(${mousePointer.x}px, ${mousePointer.y}px)`;
  }

  // Parallax effects
  document.querySelectorAll('.circle').forEach(circle => {
    const speed = circle.dataset.speed || 0.1;
    circle.style.transform = `translate(${mousePointer.x * speed}px, ${mousePointer.y * speed}px)`;
  });

  requestAnimationFrame(animate);
}

// Event listeners
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

// Start animation loop
animate();
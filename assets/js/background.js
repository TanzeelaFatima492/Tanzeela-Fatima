// Generate floating circles
const bg = document.getElementById('animated-bg');
const totalCircles = 50; // more circles for full-page effect

for (let i = 0; i < totalCircles; i++) {
    const circle = document.createElement('div');
    circle.classList.add('bg-circle');

    const size = Math.random() * 80 + 20; // 20px to 100px
    circle.style.width = size + 'px';
    circle.style.height = size + 'px';

    circle.style.left = Math.random() * window.innerWidth + 'px';
    circle.style.top = Math.random() * window.innerHeight + 'px';

    circle.style.animationDuration = (Math.random() * 8 + 8) + 's';
    circle.style.animationDelay = Math.random() * 5 + 's';

    bg.appendChild(circle);
}

// Optional: reposition circles on resize
window.addEventListener('resize', () => {
    document.querySelectorAll('.bg-circle').forEach(circle => {
        circle.style.left = Math.random() * window.innerWidth + 'px';
        circle.style.top = Math.random() * window.innerHeight + 'px';
    });
});

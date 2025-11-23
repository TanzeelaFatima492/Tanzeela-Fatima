const bg = document.getElementById('animated-bg');

for(let i = 0; i < 20; i++){
    let c = document.createElement("div");
    let size = Math.random() * 80 + 20;
    c.classList.add("circle");
    c.style.width = size + "px";
    c.style.height = size + "px";
    c.style.left = Math.random() * window.innerWidth + "px";
    c.style.top = Math.random() * window.innerHeight + "px"; // make them visible immediately
    c.style.animationDuration = Math.random() * 5 + 8 + "s";
    bg.appendChild(c);
}

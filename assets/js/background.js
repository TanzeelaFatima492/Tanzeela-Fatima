
    const bg = document.getElementById("animated-bg");

    for (let i = 0; i < 8; i++) {
        let c = document.createElement("div");
        let size = Math.random() * 80 + 20;
        c.classList.add("bg-circle");
        c.style.width = size + "px";
        c.style.height = size + "px";
        c.style.left = Math.random() * window.innerWidth + "px";
        c.style.animationDuration = Math.random() * 5 + 8 + "s";
        bg.appendChild(c);
    }

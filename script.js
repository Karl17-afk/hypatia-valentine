// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const from = params.get("from") || "Alguien";
const to = params.get("to") || "Tú";

// Referencias
const heartRain = document.getElementById("heartRain");
const questionScreen = document.getElementById("questionScreen");
const successScreen = document.getElementById("successScreen");

const questionText = document.getElementById("questionText");
const successTitle = document.getElementById("successTitle");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// Personalizar textos
questionText.textContent = `${to}, ¿quieres ser mi Valentine?`;
successTitle.textContent = `¡Gracias por aceptar, ${to}! 💕`;

// Transición al presionar cualquier tecla
document.addEventListener("keydown", () => {
    heartRain.classList.remove("active");
    questionScreen.classList.add("active");
});

// Botón NO que se mueve
noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

// Botón SÍ
yesBtn.addEventListener("click", () => {
    questionScreen.classList.remove("active");
    successScreen.classList.add("active");
});

// Lluvia de corazones
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

for (let i = 0; i < 50; i++) {
    hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1
    });
}

function drawHeart(x, y, size) {
    ctx.fillStyle = "#ff4d88";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach(h => {
        drawHeart(h.x, h.y, h.size);
        h.y += h.speed;
        if (h.y > canvas.height) {
            h.y = -10;
            h.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animate);
}

animate();

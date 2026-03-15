const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

const letters = "アァカサタナハマヤャラワ0123456789";
const matrix = letters.split("");
const fontSize = 18;
let columns = 0;
let drops = [];

const resize = () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }, () => 1);
};

const draw = () => {
  ctx.fillStyle = "rgba(0,0,0,0.03)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff88";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
};

resize();
setInterval(draw, 40);
window.addEventListener("resize", resize);

const events = document.querySelectorAll(".event");
const canvas = document.getElementById("matrix");
const modalOpens = document.querySelectorAll(".modal-open");
const modalCloses = document.querySelectorAll("[data-close]");

if (canvas) {
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
}

events.forEach((eventItem) => {
  const accept = eventItem.querySelector(".accept");
  const decline = eventItem.querySelector(".decline");

  const setStatus = (text, color) => {
    let status = eventItem.querySelector(".event-status");
    if (!status) {
      status = document.createElement("div");
      status.className = "event-status";
      eventItem.appendChild(status);
    }
    status.textContent = text;
    status.style.color = color;
  };

  accept.addEventListener("click", () => setStatus("Accepted", "#00ffd5"));
  decline.addEventListener("click", () => setStatus("Declined", "#ff8080"));
});

modalOpens.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const target = trigger.getAttribute("data-modal");
    const modal = target ? document.getElementById(target) : null;
    if (modal) modal.classList.remove("hidden");
  });
});

modalCloses.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-close");
    const modal = target ? document.getElementById(target) : null;
    if (modal) modal.classList.add("hidden");
  });
});

const syncMenuLinkPosition = () => {
  const menuLink = document.querySelector(".page-menu .menu-link");
  const playerActions = document.querySelector(".page-menu .player-actions");
  if (!menuLink || !playerActions) return;
  if (window.innerWidth <= 900) {
    menuLink.style.top = "";
    return;
  }
  const rect = playerActions.getBoundingClientRect();
  menuLink.style.top = `${Math.round(rect.top)}px`;
};

let menuLinkRaf = null;
const scheduleMenuLinkSync = () => {
  if (menuLinkRaf) return;
  menuLinkRaf = requestAnimationFrame(() => {
    menuLinkRaf = null;
    syncMenuLinkPosition();
  });
};

scheduleMenuLinkSync();
window.addEventListener("resize", scheduleMenuLinkSync);
window.addEventListener("scroll", scheduleMenuLinkSync, { passive: true });

["marketModal", "craftingModal"].forEach((id) => {
  const modal = document.getElementById(id);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }
});

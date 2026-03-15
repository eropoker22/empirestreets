const chatInput = document.getElementById("allianceChatInput");
const chatSend = document.getElementById("allianceChatSend");
const chatColor = document.getElementById("allianceChatColor");
const chatMessages = document.querySelector(".chat-messages");
const savedColor = localStorage.getItem("allianceChatColor");

const chatColorBtn = document.querySelector(".chat-color-btn");

if (chatColor && savedColor) {
  chatColor.value = savedColor;
}

if (chatColorBtn && chatColor) {
  chatColorBtn.style.background = chatColor.value;
  chatColor.addEventListener("input", () => {
    chatColorBtn.style.background = chatColor.value;
  });
}

const formatTime = (date) => {
  const pad = (v) => String(v).padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const appendMessage = (name, text, color) => {
  if (!chatMessages) return;
  const message = document.createElement("div");
  message.className = "chat-message";
  const timeEl = document.createElement("span");
  timeEl.className = "chat-time";
  timeEl.textContent = formatTime(new Date());
  const nameEl = document.createElement("span");
  nameEl.className = "chat-name";
  nameEl.textContent = name;
  if (color) nameEl.style.color = color;
  const textEl = document.createElement("span");
  textEl.className = "chat-text";
  textEl.textContent = text;
  if (color) textEl.style.color = color;
  message.appendChild(timeEl);
  message.appendChild(nameEl);
  message.appendChild(textEl);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const sendMessage = () => {
  if (!chatInput) return;
  const text = chatInput.value.trim();
  if (!text) return;
  const color = chatColor ? chatColor.value : "";
  if (chatColor && color) {
    localStorage.setItem("allianceChatColor", color);
  }
  appendMessage("PlayerX", text, color);
  chatInput.value = "";
  chatInput.focus();
};

if (chatSend) {
  chatSend.addEventListener("click", sendMessage);
}

if (chatInput) {
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}

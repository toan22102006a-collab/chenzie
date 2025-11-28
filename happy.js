// =================================================================
// SCRIPT.JS - ĐIỀU PHỐI HIỆU ỨNG VÀ HOẠT HÌNH
// =================================================================

// --- 1. Hiệu ứng Confetti (Hạt rơi rơi) ---
function createConfetti() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");

  const size = Math.random() * 5 + 3;
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;

  confetti.style.backgroundColor = Math.random() > 0.5 ? "white" : "#FF69B4";

  confetti.style.left = `${Math.random() * 100}vw`;

  const duration = Math.random() * 5 + 4;
  confetti.style.animationDuration = `${duration}s`;

  confetti.style.animationDelay = `${Math.random() * 5}s`;

  document.getElementById("effect-container").appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, duration * 1000);
}

setInterval(createConfetti, 100);

// --- 2. Bánh kem rơi từng phần ---
function animateCakeParts(callback) {
  const parts = [
    { id: "cake-base", delay: 0.3, yStart: 150 },
    { id: "cake-layer-bottom", delay: 0.5, yStart: 100 },
    { id: "cake-layer-middle", delay: 0.7, yStart: 70 },
    { id: "cake-layer-top", delay: 0.9, yStart: 40 },
    { id: "cake-cream", delay: 1.1, yStart: 20 },
    { id: "cake-candle", delay: 1.3, yStart: -50 },
    { id: "cake-flame", delay: 1.5, yStart: -55 },
  ];

  let partsCompleted = 0;
  parts.forEach((part) => {
    const el = document.getElementById(part.id);
    if (!el) return;

    // QUAN TRỌNG: Thêm xoay ngẫu nhiên ban đầu để khi rơi trông tự nhiên hơn
    const initialRotateX = Math.random() * 20 - 10; // -10 đến 10 độ
    const initialRotateY = Math.random() * 20 - 10;

    el.style.transform = `translateX(-50%) translateY(-${part.yStart}px)`;
    el.style.opacity = 0;

    setTimeout(() => {
      // Drop: Sử dụng timing nảy mượt mà hơn
      el.style.animation = `
            drop 0.8s cubic-bezier(0.17, 0.82, 0.43, 1.2) forwards, 
            cake-pop 0.35s ease-out 0.8s forwards 
        `;
      // Sau khi animation drop kết thúc, reset lại transform để cake-pop hoạt động
      setTimeout(() => {
        el.style.transform = `translateX(-50%) translateY(0)`;
      }, 800);

      el.style.opacity = 1;
      partsCompleted++;
      // Khi nến đã rơi xong, hiện ngọn lửa
      if (part.id === "cake-candle") {
        const flame = document.getElementById("cake-flame");
        if (flame) {
          setTimeout(() => {
            flame.style.opacity = 1; // hiện dần
            flame.style.fontSize = "32px"; // to dần lên
            flame.classList.add("flicker"); // flick
          }, 300); // delay 0.3s sau khi nến cắm xuống
        }
      }
      if (partsCompleted === parts.length && callback) callback();
    }, part.delay * 1000);
  });
}

// --- 3. Hiệu ứng chữ xuất hiện từng ký tự ---
function typeWriterEffect(elementId, text, delayPerChar, totalDelay) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.innerHTML = "";
  let i = 0;

  function typeChar() {
    if (i < text.length) {
      const charSpan = document.createElement("span");
      charSpan.classList.add("message-char");
      charSpan.textContent = text[i];
      charSpan.style.setProperty("--char-delay", `${i * delayPerChar}s`);
      element.appendChild(charSpan);
      i++;
      setTimeout(typeChar, delayPerChar * 1000);
    }
  }

  setTimeout(typeChar, totalDelay * 1000);
}

// --- 4. Nền trái tim lấp lánh ---
function createHeartCharBackground() {
  const heartBg = document.getElementById("heart-char-background");
  if (!heartBg) return;

  const heartShape = [
    "      **** **** ",
    "    ** ** ",
    "   ** ** ",
    "  ** ** ",
    "  ** ** ",
    "  ** ** ",
    "   ** ** ",
    "    ** ** ",
    "      ** ** ",
    "        **** ",
  ];
  const sparkleChars = ["✨", "💖", "🌟", "💫", "❤️"];
  let htmlContent = "";

  heartShape.forEach((line) => {
    line.split("").forEach((char) => {
      if (char === "*") {
        const randomChar =
          sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
        htmlContent += `<span style="--random-delay:${
          Math.random() * 2
        };">${randomChar}</span>`;
      } else htmlContent += "&nbsp;";
    });
    htmlContent += "<br>";
  });
  heartBg.innerHTML = htmlContent;
}

// --- Khởi chạy ---
document.addEventListener("DOMContentLoaded", () => {
  createHeartCharBackground();
  animateCakeParts(() => {
    // Khi nến đã rơi xong, bắt đầu hiện chữ
    typeWriterEffect("birthday-message", "Chúc Mừng Sinh Nhật!!!", 0.1, 0);
    typeWriterEffect("birthday-name", "Chenzie", 0.1, 1.5);
    typeWriterEffect("birthday-date", "Ngày 29 Tháng 11", 0.1, 3);
  });
});

// --- 5. Hiệu ứng Kem chảy trên Canvas ---

// --- 7. Hiệu ứng Pháo Hoa Trái Tim Nổ ---
// --- 7. Hiệu ứng Pháo Hoa Trái Tim Nổ (ĐÃ KHẮC PHỤC) ---
function createHeartBurst() {
  // Vị trí nổ ngẫu nhiên (trên phần nội dung chính)
  const centerX = Math.random() * 60 + 20; // 20% đến 80% chiều rộng
  const centerY = Math.random() * 40 + 20; // 20% đến 60% chiều cao (tránh góc dưới)
  const numParticles = 15;

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement("div");
    particle.classList.add("heart-particle");

    // Thiết lập vị trí bắt đầu
    particle.style.left = `${centerX}vw`;
    particle.style.top = `${centerY}vh`;

    // Tính toán hướng bay ngẫu nhiên
    const angle = Math.random() * 360;
    const distance = Math.random() * 80 + 50;

    const xEnd = distance * Math.cos((angle * Math.PI) / 180);
    const yEnd = distance * Math.sin((angle * Math.PI) / 180);

    // *** QUAN TRỌNG: Cần truyền đơn vị 'px' vào biến CSS ***
    particle.style.setProperty("--x-end", `${xEnd}px`);
    particle.style.setProperty("--y-end", `${yEnd}px`);

    const duration = Math.random() * 1.5 + 1.5;
    particle.style.animation = `heart-burst-move ${duration}s ease-out forwards`;

    document.getElementById("effect-container").appendChild(particle);

    // QUAN TRỌNG: Loại bỏ hạt sau khi animation kết thúc
    setTimeout(() => {
      particle.remove();
    }, duration * 1000); // Dùng duration tính bằng mili giây
  }
}

// Chạy hiệu ứng sau mỗi 3.5 giây
setInterval(createHeartBurst, 3500);

const PLAYLIST_URL = "";

// INTERSECTION OBSERVER - ANIMACOES DE SCROLL
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item) => {
    observer.observe(item);
  });


  const scrollIndicator = document.querySelector(".scroll-indicator");
  let hasScrolled = false;

  window.addEventListener("scroll", () => {
    if (!hasScrolled && window.scrollY > 100) {
      hasScrolled = true;
      if (scrollIndicator) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.transition = "opacity 0.5s ease";
      }
    }
  });


  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const blobs = document.querySelectorAll(".hero-blob");

    blobs.forEach((blob, index) => {
      const speed = 0.1 + index * 0.05;
      blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Ativa as pergytas
  configurarPerguntaPlaylist();
});

// PERGUNTA ANTES DA PLAYLIST
function configurarPerguntaPlaylist() {
  const playlistBtn = document.getElementById("playlistBtn");

  if (!playlistBtn) return;

  const playlistOriginal =
    PLAYLIST_URL && PLAYLIST_URL !== "#"
      ? PLAYLIST_URL
      : playlistBtn.getAttribute("href");

  playlistBtn.addEventListener("click", (e) => {
    e.preventDefault();
    abrirPerguntaDoAmor(playlistOriginal);
  });
}

function abrirPerguntaDoAmor(playlistUrl) {
  let etapa = 1;

  const overlay = document.createElement("div");
  overlay.className = "love-gate-overlay active";

  overlay.innerHTML = `
    <div class="love-gate-card">
      <h2 class="love-gate-title" id="loveTitle">Você me ama?</h2>
      <p class="love-gate-subtitle" id="loveSubtitle">Responda com sinceridade 😏</p>

      <div class="love-gate-buttons" id="loveButtons">
        <button type="button" class="love-btn love-btn-yes" id="loveYes">SIM</button>
        <button type="button" class="love-btn love-btn-no" id="loveNo">NÃO</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const title = overlay.querySelector("#loveTitle");
  const subtitle = overlay.querySelector("#loveSubtitle");
  const buttons = overlay.querySelector("#loveButtons");
  const yesBtn = overlay.querySelector("#loveYes");
  const noBtn = overlay.querySelector("#loveNo");

  function resetarBotaoNao() {
    noBtn.classList.remove("fugindo");
    noBtn.style.left = "";
    noBtn.style.top = "";
    noBtn.style.transform = "";
  }

  function botaoNaoFoge(e) {
    if (e) e.preventDefault();

    noBtn.classList.add("fugindo");

    const margem = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - margem;
    const maxY = window.innerHeight - noBtn.offsetHeight - margem;

    const x = Math.max(margem, Math.random() * maxX);
    const y = Math.max(margem, Math.random() * maxY);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.transform = "none";
  }

  noBtn.addEventListener("mouseenter", botaoNaoFoge);
  noBtn.addEventListener("mouseover", botaoNaoFoge);
  noBtn.addEventListener("pointerenter", botaoNaoFoge);
  noBtn.addEventListener("touchstart", botaoNaoFoge);
  noBtn.addEventListener("click", botaoNaoFoge);

  yesBtn.addEventListener("click", () => {
    resetarBotaoNao();

    if (etapa === 1) {
      etapa = 2;
      title.textContent = "Tem certeza?";
      subtitle.textContent = "Agora pensa bem antes de responder ❤️";
      return;
    }

    title.textContent = "Eu sabia";
    subtitle.textContent = "Agora sim, pode ir para a nossa playlist ❤️";

    buttons.innerHTML = `
      <a href="${playlistUrl}" target="_blank" rel="noopener noreferrer" class="love-final-btn">
        Ir para a playlist
      </a>
    `;
  });
}


// Funcao para adicionar smooth scroll em links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href !== "#") {
      e.preventDefault();

      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});
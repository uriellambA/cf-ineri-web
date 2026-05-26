// ── DATA DE JUGADORES ────────────────────────────────────────────────────────
const PLAYERS = [
  { rank: 1, name: "Coco", goles: 53, asistencias: 35, total: 88, class: "gold" },
  { rank: 2, name: "Gabe", goles: 38, asistencias: 30, total: 68, class: "silver" },
  { rank: 3, name: "Jebedias", goles: 26, asistencias: 28, total: 54, class: "bronze" },
  { rank: 4, name: "Uriel", goles: 22, asistencias: 29, total: 51 },
  { rank: 5, name: "Khazir", goles: 25, asistencias: 20, total: 45 },
  { rank: 6, name: "Mike", goles: 19, asistencias: 16, total: 35 },
  { rank: 7, name: "Rvssian", goles: 12, asistencias: 14, total: 26 },
  { rank: 8, name: "17fxbri", goles: 14, asistencias: 8, total: 22 },
  { rank: 9, name: "Toti", goles: 8, asistencias: 11, total: 19 },
  { rank: 10, name: "EteMike", goles: 6, asistencias: 9, total: 15 },
  { rank: 11, name: "Goteras", goles: 5, asistencias: 7, total: 12 },
  { rank: 12, name: "Chess", goles: 4, asistencias: 5, total: 9 },
  { rank: 13, name: "Alone", goles: 2, asistencias: 4, total: 6 },
  { rank: 14, name: "Azion", goles: 3, asistencias: 2, total: 5 },
  { rank: 15, name: "Carter", goles: 1, asistencias: 3, total: 4 },
  { rank: 16, name: "Iker", goles: 2, asistencias: 1, total: 3 },
  { rank: 17, name: "Ryze", goles: 1, asistencias: 1, total: 2 },
  { rank: 18, name: "Osvaldo", goles: 0, asistencias: 1, total: 1 },
  { rank: 19, name: "Joseluisperez", goles: 0, asistencias: 0, total: 0 }
];

// ── DATA DE PARTIDOS ────────────────────────────────────────────────────────
const MATCHES = [
  // 2021
  { r: "La Banda del Oeste", s: "4 - 2", t: "victoria", m: "Amistoso", y: 2021 },
  { r: "Dep. Touch", s: "3 - 3", t: "empate", m: "Liga TPS", y: 2021 },
  { r: "Los Pibes del Clásico", s: "1 - 2", t: "derrota", m: "Liga TPS", y: 2021 },
  { r: "Furia FC", s: "5 - 1", t: "victoria", m: "Amistoso", y: 2021 },
  
  // 2022
  { r: "Dream Team Touch", s: "6 - 2", t: "victoria", m: "Liga TPS", y: 2022 },
  { r: "Galácticos FC", s: "2 - 1", t: "victoria", m: "Copa Urielneta 🏆", y: 2022 },
  { r: "La Rejunta", s: "4 - 4", t: "empate", m: "Copa Urielneta 🏆", y: 2022 },
  { r: "Los Primos", s: "0 - 3", t: "derrota", m: "Liga TPS", y: 2022 },
  { r: "Inter Touch", s: "3 - 1", t: "victoria", m: "Amistoso", y: 2022 },
  
  // 2023
  { r: "Robloxianos FC", s: "7 - 3", t: "victoria", m: "Copa Urielneta 🏆", y: 2023 },
  { r: "Real Touch", s: "2 - 4", t: "derrota", m: "Liga TPS", y: 2023 },
  { r: "Paso de los Toros", s: "1 - 1", t: "empate", m: "Amistoso", y: 2023 },
  { r: "Atletas del Teclado", s: "4 - 2", t: "victoria", m: "Copa Urielneta 🏆", y: 2023 },
  { r: "Scripters FC", s: "5 - 0", t: "victoria", m: "Liga TPS", y: 2023 },
  { r: "Lag FC", s: "3 - 2", t: "victoria", m: "Copa Urielneta 🏆", y: 2023 },

  // 2024
  { r: "Chopitas FC", s: "4 - 1", t: "victoria", m: "Copa Urielneta 🏆", y: 2024 },
  { r: "Dreamers", s: "5 - 2", t: "victoria", m: "Amistoso", y: 2024 },
  { r: "TPS United", s: "2 - 2", t: "empate", m: "Liga TPS", y: 2024 },
  { r: "Titanes del Mouse", s: "1 - 3", t: "derrota", m: "Liga TPS", y: 2024 },
  { r: "Admin Team", s: "6 - 0", t: "victoria", m: "Copa Urielneta 🏆", y: 2024 }
];

// ── CONFIGURACIÓN DE PAGINACIÓN DE PARTIDOS ─────────────────────────────────
const ITEMS_PER_PAGE = 5;
let currentFilters = { result: "all", year: "all" };
let currentPage = 1;

// ── INICIALIZACIÓN GENERAL ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupPlayerStats();
  setupMatchesYearFilter();
  renderMatches();
  calculateOverviewStats();
  setupChatbot();
  setupFadeInObserver();
});

// ── MENÚ NAV Y MOBILE ───────────────────────────────────────────────────────
function setupNavigation() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links a");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinksItems.forEach(item => {
    item.addEventListener("click", () => {
      menuBtn.classList.remove("open");
      navLinks.classList.remove("open");
      
      navLinksItems.forEach(link => link.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // IntersectionObserver para marcar los enlaces del Nav según Scroll
  const sections = document.querySelectorAll("section, .hero");
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinksItems.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => navObserver.observe(s));
}

// ── SECCIÓN DE ESTADÍSTICAS (FILTRADO INTERACTIVO) ───────────────────────────
function setupPlayerStats() {
  const buttons = document.querySelectorAll("#stat-filters .filter-btn");
  renderPlayerCards("goles"); // Por defecto mostrar Goles

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const statType = btn.getAttribute("data-stat");
      renderPlayerCards(statType);
    });
  });
}

function renderPlayerCards(statType) {
  const grid = document.getElementById("stats-grid");
  grid.innerHTML = "";

  // Ordenar jugadores según el filtro seleccionado
  const sortedPlayers = [...PLAYERS].sort((a, b) => b[statType] - a[statType] || a.rank - b.rank);
  const maxVal = Math.max(...PLAYERS.map(p => p[statType]), 1);

  sortedPlayers.forEach((player, index) => {
    const card = document.createElement("div");
    card.className = "player-card";
    
    // Rank classes
    let rankClass = "";
    if (index === 0) rankClass = "gold";
    else if (index === 1) rankClass = "silver";
    else if (index === 2) rankClass = "bronze";

    const value = player[statType];
    const fillPercent = (value / maxVal) * 100;

    card.innerHTML = `
      <div class="player-rank ${rankClass}">#${index + 1}</div>
      <div class="player-info">
        <div class="player-name">${player.name}</div>
        <div class="player-stats-row">
          <div class="stat-chip">⚽ Goles: <span>${player.goles}</span></div>
          <div class="stat-chip">🎯 Asistencias: <span>${player.asistencias}</span></div>
        </div>
      </div>
      <div class="stat-bar-wrap">
        <span style="font-size:0.8rem; color:var(--oro); font-weight:700;">${statType === 'total' ? 'G+A' : statType.toUpperCase()}</span>
        <div style="font-size: 1.1rem; font-weight: 900; margin-top:2px;">${value}</div>
        <div class="stat-bar">
          <div class="stat-bar-fill" style="width: ${fillPercent}%"></div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── SECCIÓN DE PARTIDOS CON PAGINACIÓN Y FILTRADO ─────────────────────────────
function setupMatchesYearFilter() {
  const yearContainer = document.getElementById("match-year-filters");
  const years = [...new Set(MATCHES.map(m => m.y))].sort((a, b) => b - a);

  years.forEach(year => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.setAttribute("data-y", year);
    btn.innerText = year;
    yearContainer.appendChild(btn);
  });

  // Event listener para resultados
  const resultFilters = document.querySelectorAll("#match-filters .filter-btn");
  resultFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      resultFilters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilters.result = btn.getAttribute("data-f");
      currentPage = 1;
      renderMatches();
    });
  });

  // Event listener para año
  yearContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      const btns = yearContainer.querySelectorAll(".filter-btn");
      btns.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentFilters.year = e.target.getAttribute("data-y");
      currentPage = 1;
      renderMatches();
    }
  });
}

function renderMatches() {
  const list = document.getElementById("matches-list");
  list.innerHTML = "";

  // Filtrado
  const filtered = MATCHES.filter(m => {
    const matchResult = currentFilters.result === "all" || 
                         (currentFilters.result === "copa" && m.m.includes("Copa")) || 
                         m.t === currentFilters.result;
    const matchYear = currentFilters.year === "all" || m.y.toString() === currentFilters.year;
    return matchResult && matchYear;
  });

  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--gris);">No hay partidos con los filtros seleccionados.</div>`;
    document.getElementById("pagination").innerHTML = "";
    return;
  }

  // Paginación
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  paginated.forEach((m, idx) => {
    const row = document.createElement("div");
    row.className = `match-row ${m.t}`;
    row.style.animationDelay = `${idx * 0.05}s`;

    const isCopa = m.m.includes("Copa") ? '<span class="match-copa">🏆 Copa</span>' : '';
    
    row.innerHTML = `
      <div class="match-tipo ${m.t}">${m.t === 'victoria' ? 'V' : m.t === 'derrota' ? 'D' : 'E'}</div>
      <div class="match-rival">${m.r}</div>
      <div class="match-score">${m.s}</div>
      <div class="match-meta">
        <div>${m.m}</div>
        <div>Año ${m.y}</div>
        ${isCopa}
      </div>
    `;
    list.appendChild(row);
  });

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = `page-btn ${currentPage === i ? 'active' : ''}`;
    btn.innerText = i;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderMatches();
      // Scroll hacia la sección partidos
      document.getElementById("partidos").scrollIntoView({ behavior: 'smooth' });
    });
    container.appendChild(btn);
  }
}

// ── RESUMEN GENERAL (CHARTS) ────────────────────────────────────────────────
function calculateOverviewStats() {
  let wins = 0, draws = 0, losses = 0;
  let gf = 0, gc = 0;

  MATCHES.forEach(m => {
    if (m.t === "victoria") wins++;
    else if (m.t === "empate") draws++;
    else if (m.t === "derrota") losses++;

    // Parses goals
    const scores = m.s.split("-").map(s => parseInt(s.trim()));
    if (scores.length === 2) {
      if (m.t === "victoria") {
        gf += Math.max(...scores);
        gc += Math.min(...scores);
      } else if (m.t === "derrota") {
        gf += Math.min(...scores);
        gc += Math.max(...scores);
      } else {
        gf += scores[0];
        gc += scores[1];
      }
    }
  });

  const total = MATCHES.length;
  const winrate = total > 0 ? Math.round((wins / total) * 100) : 0;

  // Actualizar estadísticas del Hero
  document.getElementById("hero-total-partidos").innerText = total;
  document.getElementById("hero-winrate").innerText = `${winrate}%`;

  // Calcular ángulos del Donut Chart
  const winPercent = (wins / total) * 100;
  const drawPercent = (draws / total) * 100;
  const lossPercent = (losses / total) * 100;

  // Segmento 1: Victoria (empieza en offset 25)
  const winDash = `${winPercent} 100`;
  document.getElementById("donut-segment-win").setAttribute("stroke-dasharray", winDash);

  // Segmento 2: Empate
  const drawOffset = 100 - winPercent + 25;
  const drawDash = `${drawPercent} 100`;
  const drawSegment = document.getElementById("donut-segment-draw");
  drawSegment.setAttribute("stroke-dasharray", drawDash);
  drawSegment.setAttribute("stroke-dashoffset", drawOffset);

  // Segmento 3: Derrota
  const lossOffset = 100 - winPercent - drawPercent + 25;
  const lossDash = `${lossPercent} 100`;
  const lossSegment = document.getElementById("donut-segment-loss");
  lossSegment.setAttribute("stroke-dasharray", lossDash);
  lossSegment.setAttribute("stroke-dashoffset", lossOffset);

  // Textos del donut chart
  document.getElementById("donut-percentage").innerText = `${winrate}%`;
  document.getElementById("label-win-text").innerText = `Victorias: ${wins} (${Math.round(winPercent)}%)`;
  document.getElementById("label-draw-text").innerText = `Empates: ${draws} (${Math.round(drawPercent)}%)`;
  document.getElementById("label-loss-text").innerText = `Derrotas: ${losses} (${Math.round(lossPercent)}%)`;

  // Actualizar gráficos de barras
  const maxGoals = Math.max(gf, gc);
  document.getElementById("val-gf").innerText = gf;
  document.getElementById("val-gc").innerText = gc;
  document.getElementById("val-gd").innerText = gf - gc;

  setTimeout(() => {
    document.getElementById("bar-gf").style.width = `${(gf / maxGoals) * 100}%`;
    document.getElementById("bar-gc").style.width = `${(gc / maxGoals) * 100}%`;
    document.getElementById("bar-gd").style.width = `${((gf - gc) / maxGoals) * 100}%`;
  }, 100);
}

// ── IA CHATBOT SIMULADO ─────────────────────────────────────────────────────
function setupChatbot() {
  const messagesContainer = document.getElementById("chat-messages");
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send");
  const suggestedQs = document.getElementById("suggested-qs");

  const sendMsg = (text) => {
    if (!text.trim()) return;

    // Añadir mensaje de usuario
    appendMessage(text, "user");
    input.value = "";
    suggestedQs.style.opacity = "0.5";
    suggestedQs.style.pointerEvents = "none";

    // Mostrar animación de escribiendo
    const typingBubble = document.createElement("div");
    typingBubble.className = "msg bot typing-container";
    typingBubble.innerHTML = `
      <div class="msg-bubble">
        <div class="typing">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simular retraso del Bot Coach
    setTimeout(() => {
      typingBubble.remove();
      const response = getBotResponse(text);
      appendMessage(response, "bot");
      suggestedQs.style.opacity = "1";
      suggestedQs.style.pointerEvents = "auto";
    }, 1200);
  };

  sendBtn.addEventListener("click", () => sendMsg(input.value));
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMsg(input.value);
  });

  // Sugerencias
  suggestedQs.addEventListener("click", (e) => {
    if (e.target.classList.contains("sq")) {
      sendMsg(e.target.innerText);
    }
  });
}

function appendMessage(text, sender) {
  const container = document.getElementById("chat-messages");
  const msg = document.createElement("div");
  msg.className = `msg ${sender}`;
  msg.innerHTML = `<div class="msg-bubble">${text}</div>`;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function getBotResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("goleador") || q.includes("más goles") || q.includes("mas goles")) {
    return "El máximo goleador histórico de <strong>CF Ineri</strong> es <strong>Coco</strong> con un récord increíble de 53 goles anotados.";
  }
  if (q.includes("balón de oro") || q.includes("balon de oro")) {
    if (q.includes("1") || q.includes("primera")) {
      return "En la <strong>Edición 1</strong>, el ganador del Ballon D'Or fue <strong>Coco</strong>. El podio lo completaron Khazir (2°) y Gabe (3°).";
    }
    if (q.includes("2") || q.includes("segunda")) {
      return "En la <strong>Edición 2</strong>, el ganador del Balón de Oro fue <strong>Gabe</strong>, seguido por Jebedias en el segundo lugar.";
    }
    return "En la última entrega (<strong>Edición 3</strong>), el Balón de Oro se lo llevó <strong>17fxbri</strong> en un torneo histórico, dejando en segundo lugar a Jebedias.";
  }
  if (q.includes("winrate") || q.includes("porcentaje") || q.includes("rendimiento")) {
    const total = MATCHES.length;
    const wins = MATCHES.filter(m => m.t === "victoria").length;
    const winrate = Math.round((wins / total) * 100);
    return `Actualmente el club ostenta un <strong>${winrate}%</strong> de victorias generales, sumando ${wins} victorias de un total de ${total} partidos jugados.`;
  }
  if (q.includes("puskas")) {
    return "El prestigioso premio <strong>Puskas</strong> al mejor gol fue ganado por <strong>Khazir</strong> en la primera edición de los premios.";
  }
  if (q.includes("creador") || q.includes("fundó") || q.includes("fundador") || q.includes("urielneta")) {
    return "CF Ineri fue fundado en <strong>2021</strong> bajo el liderazgo de <strong>Uriel</strong>, en la época dorada de la Urielneta.";
  }
  if (q.includes("hola") || q.includes("buenos dias") || q.includes("buenas tardes")) {
    return "¡Hola! ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre los trofeos, los máximos asistentes o el histórico de partidos de CF Ineri.";
  }

  return "Interesante pregunta táctica sobre el club. De momento, mis sensores registran que <strong>Coco</strong> lidera el ataque (53 goles y 35 asistencias) y la solidez defensiva está liderada por <strong>Jebedias</strong> (elegido Best CB en la Edición 3). ¿Te gustaría saber algo más específico?";
}

// ── OBSERVERS PARA ANIMACIÓN FADE-IN ─────────────────────────────────────────
function setupFadeInObserver() {
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Animación ocurre solo una vez
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));
}

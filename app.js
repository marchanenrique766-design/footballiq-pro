const matches = [
  {
    id: 1,
    league: "La Liga",
    home: "Real Madrid",
    away: "Barcelona",
    date: "Hoy - 20:00",
    markets: [
      {
        name: "BTTS / Ambos marcan",
        probability: 68,
        confidence: "Alta",
        level: "high",
        color: "#00ff88",
        text: "Ambos equipos presentan tendencia ofensiva alta en sus últimos partidos."
      },
      {
        name: "Más de 2.5 goles",
        probability: 74,
        confidence: "Alta",
        level: "high",
        color: "#00e5ff",
        text: "El promedio combinado de goles favorece un partido con mínimo 3 goles."
      },
      {
        name: "Más de 9.5 córners",
        probability: 61,
        confidence: "Media",
        level: "medium",
        color: "#ffc107",
        text: "La presión ofensiva de ambos equipos puede generar volumen de córners."
      },
      {
        name: "Tarjetas totales",
        probability: 55,
        confidence: "Media",
        level: "medium",
        color: "#ffc107",
        text: "Partido competitivo con posibilidad moderada de amonestaciones."
      }
    ]
  },
  {
    id: 2,
    league: "Premier League",
    home: "Manchester City",
    away: "Liverpool",
    date: "Mañana - 15:30",
    markets: [
      {
        name: "BTTS / Ambos marcan",
        probability: 72,
        confidence: "Alta",
        level: "high",
        color: "#00ff88",
        text: "Ambos equipos suelen generar ocasiones claras de gol."
      },
      {
        name: "Más de 2.5 goles",
        probability: 70,
        confidence: "Alta",
        level: "high",
        color: "#00e5ff",
        text: "La tendencia ofensiva reciente favorece un marcador abierto."
      },
      {
        name: "Más de 9.5 córners",
        probability: 66,
        confidence: "Media",
        level: "medium",
        color: "#ffc107",
        text: "Alta frecuencia de ataques por bandas y tiros bloqueados."
      },
      {
        name: "Tiros al arco",
        probability: 77,
        confidence: "Alta",
        level: "high",
        color: "#00ff88",
        text: "Ambos equipos registran alto volumen de remates directos."
      }
    ]
  },
  {
    id: 3,
    league: "Champions League",
    home: "PSG",
    away: "Bayern Múnich",
    date: "Viernes - 14:00",
    markets: [
      {
        name: "BTTS / Ambos marcan",
        probability: 63,
        confidence: "Media",
        level: "medium",
        color: "#ffc107",
        text: "Hay potencial ofensivo, aunque depende del planteamiento inicial."
      },
      {
        name: "Más de 2.5 goles",
        probability: 69,
        confidence: "Alta",
        level: "high",
        color: "#00e5ff",
        text: "Los promedios recientes apuntan a un partido con goles."
      },
      {
        name: "Más de 9.5 córners",
        probability: 58,
        confidence: "Media",
        level: "medium",
        color: "#ffc107",
        text: "El mercado de córners tiene tendencia aceptable, pero no dominante."
      },
      {
        name: "Tarjetas totales",
        probability: 48,
        confidence: "Baja",
        level: "low",
        color: "#ff4d6d",
        text: "La proyección disciplinaria es menos estable que otros mercados."
      }
    ]
  }
];

const matchesContainer = document.getElementById("matches");
const analysisContainer = document.getElementById("analysis");
const searchInput = document.getElementById("searchInput");
const leagueFilter = document.getElementById("leagueFilter");

let selectedMatchId = 1;

function renderMatches() {
  const search = searchInput.value.toLowerCase();
  const league = leagueFilter.value;

  const filtered = matches.filter(match => {
    const bySearch =
      match.home.toLowerCase().includes(search) ||
      match.away.toLowerCase().includes(search);

    const byLeague = league === "all" || match.league === league;

    return bySearch && byLeague;
  });

  matchesContainer.innerHTML = "";

  filtered.forEach(match => {
    const card = document.createElement("div");
    card.className = "match-card" + (match.id === selectedMatchId ? " active" : "");
    card.innerHTML = `
      <div class="league">🏆 ${match.league}</div>
      <div class="teams">${match.home}<br><span>vs</span><br>${match.away}</div>
      <div class="date">📅 ${match.date}</div>
    `;

    card.addEventListener("click", () => {
      selectedMatchId = match.id;
      renderMatches();
      renderAnalysis();
    });

    matchesContainer.appendChild(card);
  });
}

function renderAnalysis() {
  const match = matches.find(item => item.id === selectedMatchId);

  if (!match) {
    analysisContainer.innerHTML = "";
    return;
  }

  const bestMarket = [...match.markets].sort((a, b) => b.probability - a.probability)[0];
  const riskMarket = [...match.markets].sort((a, b) => a.probability - b.probability)[0];

  analysisContainer.innerHTML = `
    <section class="panel">
      <h2>${match.home} vs ${match.away}</h2>
      <p class="date">🏆 ${match.league} | 📅 ${match.date}</p>
    </section>

    <section class="panel">
      <h2>Panel de indicadores</h2>
      <div class="market-grid">
        ${match.markets.map(market => `
          <article class="market-card">
            <div class="market-top">
              <h3>${market.name}</h3>
              <span class="confidence ${market.level}">${market.confidence}</span>
            </div>

            <div class="donut" style="--value:${market.probability}; --color:${market.color};">
              <span>${market.probability}%</span>
            </div>

            <p class="description">${market.text}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="panel summary">
      <h2>Resumen inteligente</h2>
      <p><strong>Mejor mercado estadístico:</strong> ${bestMarket.name} (${bestMarket.probability}%).</p>
      <p><strong>Mercado con mayor riesgo:</strong> ${riskMarket.name} (${riskMarket.probability}%).</p>
      <p><strong>Lectura general:</strong> El partido muestra tendencias ofensivas relevantes, pero se recomienda comparar con datos reales antes de tomar una decisión.</p>
      <div class="warning">
        ⚠️ Este análisis no garantiza resultados; solo muestra tendencias estadísticas.
      </div>
    </section>
  `;
}

searchInput.addEventListener("input", renderMatches);
leagueFilter.addEventListener("change", renderMatches);

renderMatches();
renderAnalysis();
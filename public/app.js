// ── State ────────────────────────────────────────────────
const selectedCards = [];
let allCardNames = [];

// ── Card brand colors & icons ────────────────────────────
// Each theme has: gradient colors, short icon text, and a network label
const CARD_THEMES = {
  "Amex Platinum":          { gradient: "linear-gradient(135deg, #8C8C8C 0%, #C0C0C0 40%, #A8A8A8 60%, #6E6E6E 100%)", icon: "AX", network: "AMEX", textColor: "#fff" },
  "Amex Gold":              { gradient: "linear-gradient(135deg, #C49A3C 0%, #E8C96A 35%, #D4A843 65%, #A67C28 100%)", icon: "AX", network: "AMEX", textColor: "#fff" },
  "Amex Green":             { gradient: "linear-gradient(135deg, #1B6B3A 0%, #2D9B55 50%, #1B6B3A 100%)", icon: "AX", network: "AMEX", textColor: "#fff" },
  "Amex Blue Cash Preferred": { gradient: "linear-gradient(135deg, #006FCF 0%, #0051A5 100%)", icon: "AX", network: "AMEX", textColor: "#fff" },
  "Amex Blue Cash Everyday":  { gradient: "linear-gradient(135deg, #4A90D9 0%, #006FCF 100%)", icon: "AX", network: "AMEX", textColor: "#fff" },
  "Chase Sapphire Preferred": { gradient: "linear-gradient(135deg, #1A3A6B 0%, #2B5AA6 50%, #1A3A6B 100%)", icon: "CH", network: "VISA", textColor: "#fff" },
  "Chase Sapphire Reserve":   { gradient: "linear-gradient(135deg, #0A1628 0%, #1A2D50 40%, #0F1F3D 100%)", icon: "CH", network: "VISA", textColor: "#94A3C0" },
  "Chase Freedom Unlimited":  { gradient: "linear-gradient(135deg, #124A9E 0%, #1565C0 50%, #0D47A1 100%)", icon: "CH", network: "VISA", textColor: "#fff" },
  "Chase Freedom Flex":       { gradient: "linear-gradient(135deg, #0D47A1 0%, #1976D2 40%, #0D47A1 100%)", icon: "CH", network: "MC", textColor: "#fff" },
  "Chase Ink Business Preferred": { gradient: "linear-gradient(135deg, #1A237E 0%, #283593 50%, #1A237E 100%)", icon: "CH", network: "VISA", textColor: "#fff" },
  "Capital One Venture X":    { gradient: "linear-gradient(135deg, #1A1A2E 0%, #2D2D44 40%, #1A1A2E 100%)", icon: "C1", network: "VISA", textColor: "#C9A961" },
  "Capital One Venture":      { gradient: "linear-gradient(135deg, #D03027 0%, #E04438 50%, #C02020 100%)", icon: "C1", network: "VISA", textColor: "#fff" },
  "Capital One SavorOne":     { gradient: "linear-gradient(135deg, #1A1A2E 0%, #333355 50%, #1A1A2E 100%)", icon: "C1", network: "MC", textColor: "#fff" },
  "Capital One Savor":        { gradient: "linear-gradient(135deg, #2C2C3E 0%, #44445A 50%, #2C2C3E 100%)", icon: "C1", network: "MC", textColor: "#fff" },
  "Capital One Quicksilver":  { gradient: "linear-gradient(135deg, #6B7B8D 0%, #8E9EAE 50%, #6B7B8D 100%)", icon: "C1", network: "VISA", textColor: "#fff" },
  "Citi Double Cash":         { gradient: "linear-gradient(135deg, #003B70 0%, #005DA6 50%, #003B70 100%)", icon: "CI", network: "MC", textColor: "#fff" },
  "Citi Custom Cash":         { gradient: "linear-gradient(135deg, #00294D 0%, #004D8C 50%, #00294D 100%)", icon: "CI", network: "MC", textColor: "#7EC8E3" },
  "Citi Premier":             { gradient: "linear-gradient(135deg, #1A1A2E 0%, #2E2E48 50%, #1A1A2E 100%)", icon: "CI", network: "MC", textColor: "#C9A961" },
  "Discover it Cash Back":    { gradient: "linear-gradient(135deg, #FF6600 0%, #FF8533 40%, #E65C00 100%)", icon: "DI", network: "DISC", textColor: "#fff" },
  "Discover it Miles":        { gradient: "linear-gradient(135deg, #FF6600 0%, #CC5200 100%)", icon: "DI", network: "DISC", textColor: "#fff" },
  "Wells Fargo Active Cash":  { gradient: "linear-gradient(135deg, #D71E28 0%, #EF3340 50%, #C41825 100%)", icon: "WF", network: "VISA", textColor: "#fff" },
  "Wells Fargo Autograph":    { gradient: "linear-gradient(135deg, #8B1A1A 0%, #B22222 50%, #8B1A1A 100%)", icon: "WF", network: "VISA", textColor: "#D4A843" },
  "US Bank Altitude Go":      { gradient: "linear-gradient(135deg, #D52B1E 0%, #E8453A 50%, #C22519 100%)", icon: "US", network: "VISA", textColor: "#fff" },
  "US Bank Cash+":            { gradient: "linear-gradient(135deg, #002868 0%, #003D99 50%, #002868 100%)", icon: "US", network: "VISA", textColor: "#fff" },
  "Bank of America Customized Cash": { gradient: "linear-gradient(135deg, #012169 0%, #1A3F8F 50%, #012169 100%)", icon: "BA", network: "VISA", textColor: "#E31837" },
  "Bank of America Premium Rewards": { gradient: "linear-gradient(135deg, #4A4A5A 0%, #6A6A7A 40%, #4A4A5A 100%)", icon: "BA", network: "VISA", textColor: "#fff" },
  "JetBlue Plus":             { gradient: "linear-gradient(135deg, #003876 0%, #005EB8 50%, #003876 100%)", icon: "JB", network: "MC", textColor: "#fff" },
  "Apple Card":               { gradient: "linear-gradient(135deg, #E8E8ED 0%, #F5F5F7 40%, #D2D2D7 100%)", icon: "", network: "MC", textColor: "#1D1D1F" },
  "Amazon Prime Visa":        { gradient: "linear-gradient(135deg, #131921 0%, #232F3E 40%, #131921 100%)", icon: "AZ", network: "VISA", textColor: "#FF9900" },
  "Costco Anywhere Visa":     { gradient: "linear-gradient(135deg, #E31837 0%, #005DAA 100%)", icon: "CO", network: "VISA", textColor: "#fff" },
};

// Simpler fallback lookup for results section (by issuer)
const ISSUER_THEMES = {
  "American Express": { color: "#006FCF", colorEnd: "#0051A5", icon: "AX" },
  "Chase":            { color: "#124A9E", colorEnd: "#0A2F6E", icon: "CH" },
  "Capital One":      { color: "#D03027", colorEnd: "#A31F1A", icon: "C1" },
  "Citi":             { color: "#003B70", colorEnd: "#00254A", icon: "CI" },
  "Discover":         { color: "#FF6600", colorEnd: "#CC5200", icon: "DI" },
  "Wells Fargo":      { color: "#D71E28", colorEnd: "#A8151E", icon: "WF" },
  "US Bank":          { color: "#D52B1E", colorEnd: "#A82217", icon: "US" },
  "Bank of America":  { color: "#012169", colorEnd: "#001240", icon: "BA" },
  "Barclays":         { color: "#00AEEF", colorEnd: "#0088C6", icon: "BC" },
  "Goldman Sachs":    { color: "#7B8794", colorEnd: "#5A6470", icon: "GS" },
};

function getTheme(cardName) {
  for (const [issuer, theme] of Object.entries(ISSUER_THEMES)) {
    if (cardName.toLowerCase().includes(issuer.toLowerCase().split(" ")[0].toLowerCase())) {
      return theme;
    }
  }
  if (cardName.includes("Apple")) return { color: "#333", colorEnd: "#111", icon: "AP" };
  if (cardName.includes("Amazon")) return { color: "#FF9900", colorEnd: "#CC7A00", icon: "AZ" };
  if (cardName.includes("Costco")) return { color: "#E31837", colorEnd: "#B31229", icon: "CO" };
  if (cardName.includes("JetBlue")) return { color: "#003876", colorEnd: "#002550", icon: "JB" };
  return { color: "#4f46e5", colorEnd: "#4338ca", icon: "CC" };
}

function getCardTheme(cardName) {
  return CARD_THEMES[cardName] || {
    gradient: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
    icon: "CC",
    network: "VISA",
    textColor: "#fff",
  };
}

/** Build a mini CSS credit card element */
function renderCardVisual(cardName) {
  const theme = getCardTheme(cardName);
  // Split card name into issuer line + card line
  const parts = cardName.split(" ");
  let line1, line2;
  if (cardName.startsWith("Bank of America") || cardName.startsWith("Capital One") || cardName.startsWith("Wells Fargo") || cardName.startsWith("US Bank")) {
    const issuerWords = cardName.startsWith("Bank of America") ? 3 : 2;
    line1 = parts.slice(0, issuerWords).join(" ");
    line2 = parts.slice(issuerWords).join(" ");
  } else {
    line1 = parts[0];
    line2 = parts.slice(1).join(" ");
  }

  const div = document.createElement("div");
  div.className = "cc-visual";
  div.style.background = theme.gradient;
  div.style.color = theme.textColor;
  div.innerHTML = `
    <div class="cc-chip"></div>
    <div class="cc-name">
      <div class="cc-issuer">${line1}</div>
      <div class="cc-product">${line2}</div>
    </div>
    <div class="cc-network">${theme.network}</div>
    <button class="cc-remove" aria-label="Remove">&times;</button>
  `;
  div.querySelector(".cc-remove").addEventListener("click", (e) => {
    e.stopPropagation();
    removeCard(cardName);
  });
  return div;
}

// Simple category marker

// ── DOM ──────────────────────────────────────────────────
const input = document.getElementById("card-input");
const suggestionsEl = document.getElementById("suggestions");
const addBtn = document.getElementById("add-btn");
const optimizeBtn = document.getElementById("optimize-btn");
const tagsContainer = document.getElementById("card-tags");
const walletSection = document.getElementById("wallet");
const walletCardsEl = document.getElementById("wallet-cards");
const resultsSection = document.getElementById("results");
const resultsSubtitle = document.getElementById("results-subtitle");
const topPicksEl = document.getElementById("top-picks");
const cardGroupsEl = document.getElementById("card-groups");
const fallbackEl = document.getElementById("fallback");

// ── Init: fetch card names for autocomplete ──────────────
fetch("/api/cards")
  .then((r) => r.json())
  .then((names) => {
    allCardNames = names;
  });

// ── Autocomplete ─────────────────────────────────────────
input.addEventListener("input", () => {
  const q = input.value.trim().toLowerCase();
  if (q.length < 2) {
    closeSuggestions();
    return;
  }
  const matches = allCardNames.filter(
    (n) =>
      n.toLowerCase().includes(q) &&
      !selectedCards.includes(n)
  );
  renderSuggestions(matches.slice(0, 8));
});

input.addEventListener("keydown", (e) => {
  const items = suggestionsEl.querySelectorAll("li");
  const active = suggestionsEl.querySelector("li.active");

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (!active && items.length) {
      items[0].classList.add("active");
    } else if (active && active.nextElementSibling) {
      active.classList.remove("active");
      active.nextElementSibling.classList.add("active");
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (active && active.previousElementSibling) {
      active.classList.remove("active");
      active.previousElementSibling.classList.add("active");
    }
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (active) {
      addCard(active.textContent);
      closeSuggestions();
    } else if (suggestionsEl.querySelector("li")) {
      addCard(suggestionsEl.querySelector("li").textContent);
      closeSuggestions();
    }
  } else if (e.key === "Escape") {
    closeSuggestions();
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".autocomplete-wrapper")) closeSuggestions();
});

function renderSuggestions(matches) {
  suggestionsEl.innerHTML = "";
  if (matches.length === 0) {
    closeSuggestions();
    return;
  }
  for (const name of matches) {
    const li = document.createElement("li");
    li.textContent = name;
    li.addEventListener("click", () => {
      addCard(name);
      closeSuggestions();
    });
    suggestionsEl.appendChild(li);
  }
  suggestionsEl.classList.add("open");
}

function closeSuggestions() {
  suggestionsEl.classList.remove("open");
  suggestionsEl.innerHTML = "";
}

// ── Add / Remove Cards ──────────────────────────────────
addBtn.addEventListener("click", () => {
  const q = input.value.trim().toLowerCase();
  const match = allCardNames.find(
    (n) => n.toLowerCase().includes(q) && !selectedCards.includes(n)
  );
  if (match) addCard(match);
});

function addCard(name) {
  if (selectedCards.includes(name)) return;
  selectedCards.push(name);
  input.value = "";
  renderTags();
  updateOptimizeBtn();
}

function removeCard(name) {
  const idx = selectedCards.indexOf(name);
  if (idx > -1) selectedCards.splice(idx, 1);
  renderTags();
  updateOptimizeBtn();
}

function renderTags() {
  // Small pill tags in the input section
  tagsContainer.innerHTML = "";
  for (const name of selectedCards) {
    const tag = document.createElement("span");
    tag.className = "card-tag";
    tag.innerHTML = `${name} <button aria-label="Remove">&times;</button>`;
    tag.querySelector("button").addEventListener("click", () => removeCard(name));
    tagsContainer.appendChild(tag);
  }

  // Visual credit cards in the wallet section
  walletCardsEl.innerHTML = "";
  for (const name of selectedCards) {
    walletCardsEl.appendChild(renderCardVisual(name));
  }
}

function updateOptimizeBtn() {
  const hasCards = selectedCards.length > 0;
  optimizeBtn.disabled = !hasCards;
  if (hasCards) {
    walletSection.classList.remove("hidden");
  } else {
    walletSection.classList.add("hidden");
  }
  resultsSection.classList.add("hidden");
}

// ── Optimize ─────────────────────────────────────────────
optimizeBtn.addEventListener("click", async () => {
  optimizeBtn.disabled = true;
  optimizeBtn.textContent = "Optimizing...";

  try {
    const res = await fetch("/api/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cards: selectedCards }),
    });
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Something went wrong.");
      return;
    }

    renderResults(data);
  } catch (err) {
    alert("Failed to reach the server.");
  } finally {
    optimizeBtn.disabled = false;
    optimizeBtn.textContent = "Optimize My Wallet";
  }
});

function rateTier(multiplier) {
  if (multiplier >= 5) return "tier-elite";
  if (multiplier >= 3) return "tier-excellent";
  if (multiplier >= 2) return "tier-great";
  return "tier-good";
}

function getCategoryIcon(category) {
  const icons = {
    "Dining": "🍽️",
    "Groceries": "🛒",
    "Gas": "⛽",
    "Travel": "✈️",
    "Flights": "✈️",
    "Hotels": "🏨",
    "Streaming": "📺",
    "Transit": "🚇",
    "Online Shopping": "🛍️",
    "Amazon": "📦",
    "Drug Stores": "💊",
    "Home Improvement": "🏠",
    "Entertainment": "🎬",
    "EV Charging": "🔌",
    "Select Streaming": "📺",
    "Apple Purchases": "🍎",
    "Costco": "🏪",
    "JetBlue Purchases": "✈️",
    "Wholesale Clubs": "🏪",
    "Rotating Quarterly Category": "🔄",
    "Top Eligible Category": "⭐",
    "Your Choice Category 1": "⭐",
    "Your Choice Category 2": "⭐",
    "Your Choice Category": "⭐",
  };
  const key = Object.keys(icons).find(k => category.toLowerCase().includes(k.toLowerCase()));
  const icon = key ? icons[key] : "·";
  return `<span class="cat-icon">${icon}</span>`;
}

// Plain text version for export
function getCategoryCode(category) {
  return ">";
}

let lastResultData = null;

function renderResults(data) {
  lastResultData = data;
  resultsSubtitle.textContent = `Based on your ${data.cards.length} card${data.cards.length > 1 ? "s" : ""}: ${data.cards.join(", ")}`;

  // ── Top picks: show the 3 highest-multiplier categories ──
  topPicksEl.innerHTML = "";
  const topRecs = data.recommendations.slice(0, 3);
  for (const rec of topRecs) {
    const theme = getTheme(rec.cardName);
    const div = document.createElement("div");
    div.className = "top-pick";
    div.innerHTML = `
      <div class="top-pick-rate ${rateTier(rec.multiplier)}">${rec.multiplier}x</div>
      <div class="top-pick-label">${rec.rewardType}</div>
      <div class="top-pick-category">${getCategoryIcon(rec.category)} ${rec.category}</div>
      <div class="top-pick-card">${rec.cardName}</div>
    `;
    topPicksEl.appendChild(div);
  }

  // ── Group recommendations by card ──
  const groups = {};
  for (const rec of data.recommendations) {
    if (!groups[rec.cardName]) {
      groups[rec.cardName] = { rewardType: rec.rewardType, categories: [] };
    }
    groups[rec.cardName].categories.push(rec);
  }

  cardGroupsEl.innerHTML = "";
  // Sort groups: most categories first
  const sortedGroups = Object.entries(groups).sort((a, b) => b[1].categories.length - a[1].categories.length);

  for (const [cardName, group] of sortedGroups) {
    const theme = getTheme(cardName);
    const div = document.createElement("div");
    div.className = "card-group";

    // Sort categories within group by multiplier descending
    group.categories.sort((a, b) => b.multiplier - a.multiplier);

    const catCount = group.categories.length;
    div.innerHTML = `
      <div class="card-group-header">
        <div class="card-group-icon">${theme.icon}</div>
        <div>
          <div class="card-group-name">${cardName}</div>
          <div class="card-group-reward-type">${group.rewardType}</div>
        </div>
        <div class="card-group-count">${catCount} categor${catCount === 1 ? "y" : "ies"}</div>
      </div>
      <div class="card-group-body">
        ${group.categories.map((rec) => `
          <div class="category-row">
            <span class="category-name">${getCategoryIcon(rec.category)} ${rec.category}</span>
            <span class="category-rate ${rateTier(rec.multiplier)}">${rec.multiplier}x</span>
          </div>
        `).join("")}
      </div>
    `;
    cardGroupsEl.appendChild(div);
  }

  // ── Fallback card: best "everything else" card from API ──
  if (data.fallbackCard) {
    const theme = getTheme(data.fallbackCard.cardName);
    fallbackEl.classList.remove("hidden");
    fallbackEl.innerHTML = `
      <div class="fallback-label">Everything Else</div>
      <div class="fallback-name">${data.fallbackCard.cardName}</div>
      <div class="fallback-rate">${data.fallbackCard.baseRate}x ${data.fallbackCard.rewardType} on all other purchases</div>
    `;
  } else {
    fallbackEl.classList.add("hidden");
  }

  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({ behavior: "smooth" });
}

// ── Export Report ────────────────────────────────────────
function generateReport(data) {
  const lines = [];

  lines.push("Wat Card");
  lines.push(`${data.cards.length} card${data.cards.length > 1 ? "s" : ""}: ${data.cards.join(", ")}`);
  lines.push("");

  // Group by card
  const groups = {};
  for (const rec of data.recommendations) {
    if (!groups[rec.cardName]) {
      groups[rec.cardName] = [];
    }
    groups[rec.cardName].push(rec);
  }

  const sortedGroups = Object.entries(groups).sort(
    (a, b) => b[1].length - a[1].length
  );

  for (const [cardName, cats] of sortedGroups) {
    cats.sort((a, b) => b.multiplier - a.multiplier);
    lines.push(cardName);
    for (const rec of cats) {
      lines.push(`• ${rec.category} — ${rec.multiplier}x`);
    }
    lines.push("");
  }

  if (data.fallbackCard) {
    lines.push(`Everything else — ${data.fallbackCard.cardName} (${data.fallbackCard.baseRate}x)`);
    lines.push("");
  }

  return lines.join("\n").trim();
}

function exportReport() {
  if (!lastResultData) return;
  const report = generateReport(lastResultData);

  // Try clipboard first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(report).then(() => {
      showExportFeedback("COPIED TO CLIPBOARD");
    }).catch(() => {
      showExportModal(report);
    });
  } else {
    showExportModal(report);
  }
}

function showExportFeedback(msg) {
  const btn = document.getElementById("export-btn");
  const original = btn.innerHTML;
  btn.innerHTML = `<span class="export-icon">[OK]</span> ${msg}`;
  btn.classList.add("exported");
  setTimeout(() => {
    btn.innerHTML = original;
    btn.classList.remove("exported");
  }, 2000);
}

function showExportModal(report) {
  // Fallback: show in a modal textarea
  let modal = document.getElementById("export-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "export-modal";
    modal.className = "export-modal";
    modal.innerHTML = `
      <div class="export-modal-content">
        <div class="export-modal-header">
          <span>[REPORT]</span>
          <button class="export-modal-close">&times;</button>
        </div>
        <textarea class="export-textarea" readonly></textarea>
        <button class="btn btn-primary export-copy-btn">COPY</button>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".export-modal-close").addEventListener("click", () => {
      modal.classList.remove("open");
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
    modal.querySelector(".export-copy-btn").addEventListener("click", () => {
      const ta = modal.querySelector(".export-textarea");
      ta.select();
      document.execCommand("copy");
      showExportFeedback("COPIED TO CLIPBOARD");
      modal.classList.remove("open");
    });
  }

  modal.querySelector(".export-textarea").value = report;
  modal.classList.add("open");
  modal.querySelector(".export-textarea").select();
}

// Wire up export button
document.addEventListener("click", (e) => {
  if (e.target.closest("#export-btn")) exportReport();
});

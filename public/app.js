// ── State ────────────────────────────────────────────────
const selectedCards = [];
let allCardNames = [];

// ── Card brand colors & icons ────────────────────────────
const CARD_THEMES = {
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
  for (const [issuer, theme] of Object.entries(CARD_THEMES)) {
    if (cardName.toLowerCase().includes(issuer.toLowerCase().split(" ")[0].toLowerCase())) {
      return theme;
    }
  }
  // fallback by card name keywords
  if (cardName.includes("Apple")) return { color: "#333", colorEnd: "#111", icon: "AP" };
  if (cardName.includes("Amazon")) return { color: "#FF9900", colorEnd: "#CC7A00", icon: "AZ" };
  if (cardName.includes("Costco")) return { color: "#E31837", colorEnd: "#B31229", icon: "CO" };
  if (cardName.includes("JetBlue")) return { color: "#003876", colorEnd: "#002550", icon: "JB" };
  return { color: "#4f46e5", colorEnd: "#4338ca", icon: "CC" };
}

const CATEGORY_ICONS = {
  "Dining": "🍽️", "Groceries": "🛒", "Gas": "⛽", "Travel": "✈️",
  "Flights": "🛫", "Hotels": "🏨", "Streaming": "📺", "Transit": "🚇",
  "Entertainment": "🎭", "Online Shopping": "🛍️", "Drugstores": "💊",
  "Amazon": "📦", "Concerts & Events": "🎶", "Shipping": "📬",
  "Home Improvement": "🔨", "Fitness": "💪",
};

// ── DOM ──────────────────────────────────────────────────
const input = document.getElementById("card-input");
const suggestionsEl = document.getElementById("suggestions");
const addBtn = document.getElementById("add-btn");
const optimizeBtn = document.getElementById("optimize-btn");
const tagsContainer = document.getElementById("card-tags");
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
  tagsContainer.innerHTML = "";
  for (const name of selectedCards) {
    const tag = document.createElement("span");
    tag.className = "card-tag";
    tag.innerHTML = `${name} <button aria-label="Remove">&times;</button>`;
    tag.querySelector("button").addEventListener("click", () => removeCard(name));
    tagsContainer.appendChild(tag);
  }
}

function updateOptimizeBtn() {
  optimizeBtn.disabled = selectedCards.length === 0;
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

function getCategoryIcon(category) {
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (category.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return "💳";
}

function renderResults(data) {
  resultsSubtitle.textContent = `Based on your ${data.cards.length} card${data.cards.length > 1 ? "s" : ""}: ${data.cards.join(", ")}`;

  // ── Top picks: show the 3 highest-multiplier categories ──
  topPicksEl.innerHTML = "";
  const topRecs = data.recommendations.slice(0, 3);
  for (const rec of topRecs) {
    const theme = getTheme(rec.cardName);
    const div = document.createElement("div");
    div.className = "top-pick";
    div.style.setProperty("--card-color", theme.color);
    div.innerHTML = `
      <div class="top-pick-rate">${rec.multiplier}x</div>
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
    div.style.setProperty("--card-color", theme.color);
    div.style.setProperty("--card-color-end", theme.colorEnd);

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
            <span class="category-rate">${rec.multiplier}x</span>
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
    fallbackEl.style.setProperty("--card-color", theme.color);
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

import express from "express";
import path from "path";
import { findCards, getCardNames } from "./database";
import { optimize } from "./optimizer";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// ── API routes ──────────────────────────────────────────

/** Return every card name in the database (for autocomplete). */
app.get("/api/cards", (_req, res) => {
  res.json(getCardNames());
});

/** Search cards by partial name. */
app.get("/api/cards/search", (req, res) => {
  const q = (req.query.q as string) || "";
  const results = findCards(q).map((c) => c.name);
  res.json(results);
});

/**
 * POST /api/optimize
 * Body: { cards: ["Amex Platinum", "Chase Freedom Flex", ...] }
 * Returns the optimization result.
 */
app.post("/api/optimize", (req, res) => {
  const { cards: cardNames } = req.body as { cards: string[] };

  if (!Array.isArray(cardNames) || cardNames.length === 0) {
    return res.status(400).json({ error: "Provide at least one card name." });
  }

  // Resolve each name to a card in the DB
  const resolved = cardNames.flatMap((name) => findCards(name));

  if (resolved.length === 0) {
    return res
      .status(404)
      .json({ error: "None of those cards were found in our database." });
  }

  const result = optimize(resolved);
  res.json(result);
});

// ── Serve frontend for all other routes ─────────────────
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Wat Card running at http://localhost:${PORT}`);
});

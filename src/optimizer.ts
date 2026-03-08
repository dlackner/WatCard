import { CardRewards, Recommendation, OptimizationResult } from "./types";

/**
 * Common spending categories that most people care about.
 * We always evaluate these so the report feels complete,
 * plus any extra categories that the user's cards specifically boost.
 */
const COMMON_CATEGORIES = [
  "Dining",
  "Groceries",
  "Gas",
  "Travel",
  "Flights",
  "Streaming",
  "Online Shopping",
  "Transit",
  "Drugstores",
  "Entertainment",
  "Amazon",
];

/**
 * Given a set of cards the user owns, figure out the best card to use
 * for every relevant spending category.
 */
export function optimize(userCards: CardRewards[]): OptimizationResult {
  // Collect every category that matters: common ones + any bonus categories
  // from the user's specific cards.
  const relevantCategories = new Set(COMMON_CATEGORIES);
  for (const card of userCards) {
    for (const cat of Object.keys(card.categories)) {
      relevantCategories.add(cat);
    }
  }

  const recommendations: Recommendation[] = [];

  for (const category of relevantCategories) {
    let bestCard: CardRewards | null = null;
    let bestRate = 0;

    for (const card of userCards) {
      const rate = card.categories[category] ?? card.baseRate;
      if (rate > bestRate) {
        bestRate = rate;
        bestCard = card;
      }
    }

    if (bestCard) {
      recommendations.push({
        category,
        cardName: bestCard.name,
        multiplier: bestRate,
        rewardType: bestCard.rewardType,
      });
    }
  }

  // Sort: highest multiplier first, then alphabetically by category
  recommendations.sort((a, b) => {
    if (b.multiplier !== a.multiplier) return b.multiplier - a.multiplier;
    return a.category.localeCompare(b.category);
  });

  // Find the best "everything else" card (highest base rate)
  let fallbackCard = null;
  let bestBase = 0;
  for (const card of userCards) {
    if (card.baseRate > bestBase) {
      bestBase = card.baseRate;
      fallbackCard = {
        cardName: card.name,
        baseRate: card.baseRate,
        rewardType: card.rewardType,
      };
    }
  }

  return {
    recommendations,
    cards: userCards.map((c) => c.name),
    fallbackCard,
  };
}

/**
 * Build a plain-text summary of which card to use everywhere.
 * Also highlights the "everything else" fallback card.
 */
export function summarize(result: OptimizationResult): string {
  const lines: string[] = [`Your optimized wallet (${result.cards.length} cards):\n`];

  for (const rec of result.recommendations) {
    lines.push(
      `  ${rec.category}: Use ${rec.cardName} (${rec.multiplier}x ${rec.rewardType})`
    );
  }

  return lines.join("\n");
}

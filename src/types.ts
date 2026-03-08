export interface CardRewards {
  /** Display name, e.g. "Chase Sapphire Preferred" */
  name: string;
  /** Issuer / network */
  issuer: string;
  /** Reward type label shown to user */
  rewardType: string;
  /** Multiplier per spending category (e.g. { "Dining": 3 } means 3x) */
  categories: Record<string, number>;
  /** Fallback multiplier for anything not listed */
  baseRate: number;
  /** Optional annual fee for display */
  annualFee?: number;
}

export interface Recommendation {
  category: string;
  cardName: string;
  multiplier: number;
  rewardType: string;
}

export interface FallbackCard {
  cardName: string;
  baseRate: number;
  rewardType: string;
}

export interface OptimizationResult {
  recommendations: Recommendation[];
  cards: string[];
  fallbackCard: FallbackCard | null;
}

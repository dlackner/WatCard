import { CardRewards } from "./types";

/**
 * Credit card rewards database.
 * Multipliers represent points-per-dollar or cash-back-percent depending on
 * the card program.  We normalize everything to a simple number so the
 * optimizer can compare across cards.
 */
export const cards: CardRewards[] = [
  // ── Amex ──────────────────────────────────────────────
  {
    name: "Amex Platinum",
    issuer: "American Express",
    rewardType: "Membership Rewards",
    annualFee: 695,
    baseRate: 1,
    categories: {
      "Flights": 5,
      "Hotels (Amex Travel)": 5,
      "Concerts & Events": 2,
      "Dining": 1,
      "Groceries": 1,
    },
  },
  {
    name: "Amex Gold",
    issuer: "American Express",
    rewardType: "Membership Rewards",
    annualFee: 250,
    baseRate: 1,
    categories: {
      "Dining": 4,
      "Groceries": 4,
      "Flights": 3,
      "Hotels (Amex Travel)": 1,
    },
  },
  {
    name: "Amex Blue Cash Preferred",
    issuer: "American Express",
    rewardType: "Cash Back",
    annualFee: 95,
    baseRate: 1,
    categories: {
      "Groceries": 6,
      "Streaming": 6,
      "Gas": 3,
      "Transit": 3,
      "Dining": 1,
    },
  },
  {
    name: "Amex Blue Cash Everyday",
    issuer: "American Express",
    rewardType: "Cash Back",
    annualFee: 0,
    baseRate: 1,
    categories: {
      "Groceries": 3,
      "Gas": 3,
      "Online Shopping": 3,
    },
  },
  {
    name: "Amex Green",
    issuer: "American Express",
    rewardType: "Membership Rewards",
    annualFee: 150,
    baseRate: 1,
    categories: {
      "Dining": 3,
      "Travel": 3,
      "Transit": 3,
    },
  },

  // ── Chase ─────────────────────────────────────────────
  {
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    rewardType: "Ultimate Rewards",
    annualFee: 95,
    baseRate: 1,
    categories: {
      "Dining": 3,
      "Online Groceries": 3,
      "Streaming": 3,
      "Travel": 2,
    },
  },
  {
    name: "Chase Sapphire Reserve",
    issuer: "Chase",
    rewardType: "Ultimate Rewards",
    annualFee: 550,
    baseRate: 1,
    categories: {
      "Dining": 3,
      "Travel": 3,
      "Flights": 5,
      "Hotels (Chase Travel)": 10,
    },
  },
  {
    name: "Chase Freedom Unlimited",
    issuer: "Chase",
    rewardType: "Ultimate Rewards",
    annualFee: 0,
    baseRate: 1.5,
    categories: {
      "Dining": 3,
      "Drugstores": 3,
      "Travel": 5,
    },
  },
  {
    name: "Chase Freedom Flex",
    issuer: "Chase",
    rewardType: "Ultimate Rewards",
    annualFee: 0,
    baseRate: 1,
    categories: {
      "Rotating Quarterly Category": 5,
      "Dining": 3,
      "Drugstores": 3,
      "Travel": 5,
    },
  },
  {
    name: "Chase Ink Business Preferred",
    issuer: "Chase",
    rewardType: "Ultimate Rewards",
    annualFee: 95,
    baseRate: 1,
    categories: {
      "Travel": 3,
      "Shipping": 3,
      "Internet / Cable / Phone": 3,
      "Advertising": 3,
    },
  },

  // ── Capital One ───────────────────────────────────────
  {
    name: "Capital One Venture X",
    issuer: "Capital One",
    rewardType: "Miles",
    annualFee: 395,
    baseRate: 2,
    categories: {
      "Flights (Capital One Travel)": 10,
      "Hotels (Capital One Travel)": 10,
      "Rental Cars (Capital One Travel)": 10,
    },
  },
  {
    name: "Capital One Venture",
    issuer: "Capital One",
    rewardType: "Miles",
    annualFee: 95,
    baseRate: 2,
    categories: {
      "Hotels (Capital One Travel)": 5,
    },
  },
  {
    name: "Capital One SavorOne",
    issuer: "Capital One",
    rewardType: "Cash Back",
    annualFee: 0,
    baseRate: 1,
    categories: {
      "Dining": 3,
      "Entertainment": 3,
      "Groceries": 3,
      "Streaming": 3,
    },
  },
  {
    name: "Capital One Savor",
    issuer: "Capital One",
    rewardType: "Cash Back",
    annualFee: 95,
    baseRate: 1,
    categories: {
      "Dining": 4,
      "Entertainment": 4,
      "Groceries": 3,
      "Streaming": 4,
    },
  },
  {
    name: "Capital One Quicksilver",
    issuer: "Capital One",
    rewardType: "Cash Back",
    annualFee: 0,
    baseRate: 1.5,
    categories: {},
  },

  // ── Citi ──────────────────────────────────────────────
  {
    name: "Citi Double Cash",
    issuer: "Citi",
    rewardType: "Cash Back",
    annualFee: 0,
    baseRate: 2,
    categories: {},
  },
  {
    name: "Citi Custom Cash",
    issuer: "Citi",
    rewardType: "Cash Back",
    annualFee: 0,
    baseRate: 1,
    categories: {
      "Top Eligible Category": 5,
      "Dining": 5,
      "Gas": 5,
      "Groceries": 5,
      "Travel": 5,
      "Streaming": 5,
      "Drugstores": 5,
      "Home Improvement": 5,
      "Fitness": 5,
    },
  },
  {
    name: "Citi Premier",
    issuer: "Citi",
    rewardType: "ThankYou Points",
    annualFee: 95,
    baseRate: 1,
    categories: {
      "Flights": 3,
      "Hotels": 3,
      "Dining": 3,
      "Groceries": 3,
      "Gas": 3,
    },
  },

  // ── Discover ──────────────────────────────────────────
  {
    name: "Discover it Cash Back",
    issuer: "Discover",
    rewardType: "Cash Back",
    annualFee: 0,
    baseRate: 1,
    categories: {
      "Rotating Quarterly Category": 5,
    },
  },
  {
    name: "Discover it Miles",
    issuer: "Discover",
    rewardType: "Miles",
    annualFee: 0,
    baseRate: 1.5,
    categories: {},
  },

  // ── Wells Fargo ───────────────────────────────────────
  {
    name: "Wells Fargo Active Cash",
    issuer: "Wells Fargo",
    rewardType: "Cash Back",
    annualFee: 0,
    baseRate: 2,
    categories: {},
  },
  {
    name: "Wells Fargo Autograph",
    issuer: "Wells Fargo",
    rewardType: "Points",
    annualFee: 0,
    baseRate: 1,
    categories: {
      "Dining": 3,
      "Travel": 3,
      "Gas": 3,
      "Transit": 3,
      "Streaming": 3,
      "Phone Plans": 3,
    },
  },

  // ── US Bank ───────────────────────────────────────────
  {
    name: "US Bank Altitude Go",
    issuer: "US Bank",
    rewardType: "Points",
    annualFee: 0,
    baseRate: 1,
    categories: {
      "Dining": 4,
      "Groceries": 2,
      "Streaming": 2,
      "Gas": 2,
      "EV Charging": 2,
    },
  },
  {
    name: "US Bank Cash+",
    issuer: "US Bank",
    rewardType: "Cash Back",
    annualFee: 0,
    baseRate: 1,
    categories: {
      "Your Choice Category 1": 5,
      "Your Choice Category 2": 5,
      "Groceries": 5,
      "Utilities": 5,
      "Internet": 5,
      "Streaming": 5,
      "Gas": 5,
    },
  },

  // ── Bank of America ───────────────────────────────────
  {
    name: "Bank of America Customized Cash",
    issuer: "Bank of America",
    rewardType: "Cash Back",
    annualFee: 0,
    baseRate: 1,
    categories: {
      "Your Choice Category": 3,
      "Groceries": 3,
      "Gas": 3,
      "Online Shopping": 3,
      "Dining": 3,
      "Travel": 3,
      "Drugstores": 3,
      "Home Improvement": 3,
    },
  },
  {
    name: "Bank of America Premium Rewards",
    issuer: "Bank of America",
    rewardType: "Points",
    annualFee: 95,
    baseRate: 1.5,
    categories: {
      "Dining": 3.5,
      "Travel": 3.5,
    },
  },

  // ── Barclays ──────────────────────────────────────────
  {
    name: "JetBlue Plus",
    issuer: "Barclays",
    rewardType: "TrueBlue Points",
    annualFee: 99,
    baseRate: 1,
    categories: {
      "JetBlue Purchases": 6,
      "Dining": 2,
      "Groceries": 2,
    },
  },

  // ── Apple ─────────────────────────────────────────────
  {
    name: "Apple Card",
    issuer: "Goldman Sachs",
    rewardType: "Cash Back (Daily Cash)",
    annualFee: 0,
    baseRate: 1,
    categories: {
      "Apple Purchases": 3,
      "Apple Pay Purchases": 2,
    },
  },

  // ── Amazon ────────────────────────────────────────────
  {
    name: "Amazon Prime Visa",
    issuer: "Chase",
    rewardType: "Cash Back",
    annualFee: 0,
    baseRate: 1,
    categories: {
      "Amazon": 5,
      "Whole Foods": 5,
      "Dining": 2,
      "Gas": 2,
      "Transit": 2,
    },
  },

  // ── Costco ────────────────────────────────────────────
  {
    name: "Costco Anywhere Visa",
    issuer: "Citi",
    rewardType: "Cash Back",
    annualFee: 0,
    baseRate: 1,
    categories: {
      "Gas": 4,
      "Dining": 3,
      "Travel": 3,
      "Costco": 2,
    },
  },
];

/**
 * All unique spending categories across every card in the database.
 */
export function getAllCategories(): string[] {
  const set = new Set<string>();
  for (const card of cards) {
    for (const cat of Object.keys(card.categories)) {
      set.add(cat);
    }
  }
  return Array.from(set).sort();
}

/**
 * Fuzzy-ish lookup: find cards whose name includes the query (case-insensitive).
 */
export function findCards(query: string): CardRewards[] {
  const q = query.toLowerCase().trim();
  return cards.filter((c) => c.name.toLowerCase().includes(q));
}

/**
 * Return all unique card names for autocomplete / display.
 */
export function getCardNames(): string[] {
  return cards.map((c) => c.name).sort();
}

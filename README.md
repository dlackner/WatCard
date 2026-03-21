# Wat Card

A retro-styled web app that tells you which credit card to use for every spending category. Add the cards in your wallet and get a personalized optimization report — no card numbers needed, just the card name.

## How It Works

1. Type your credit card names (e.g. "Amex Gold", "Chase Freedom Flex")
2. Click **Optimize My Wallet**
3. Get a category-by-category breakdown of which card earns the most rewards

The app has a built-in database of 25+ popular credit cards with their rewards rates across categories like dining, groceries, gas, travel, streaming, and more.

## Tech Stack

- **TypeScript** + **Express** backend
- Vanilla HTML / CSS / JS frontend
- In-memory card rewards database (no external DB needed)
- Hosted on **Render**

## Getting Started

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build
npm start
```

The app runs at `http://localhost:3001` by default. Set the `PORT` environment variable to change it.

## Project Structure

```
src/
  types.ts        # TypeScript interfaces
  database.ts     # Credit card rewards data
  optimizer.ts    # Card optimization logic
  server.ts       # Express server + API routes
public/
  index.html      # Frontend
  style.css       # Styles
  app.js          # Client-side logic
render.yaml       # Render deployment config
```

## API

| Endpoint | Method | Description |
|---|---|---|
| `/api/cards` | GET | List all card names (for autocomplete) |
| `/api/cards/search?q=amex` | GET | Search cards by partial name |
| `/api/optimize` | POST | Optimize a set of cards — body: `{ "cards": ["Amex Gold", "Chase Freedom Flex"] }` |

## Supported Cards

Amex Platinum, Amex Gold, Amex Blue Cash Preferred, Amex Blue Cash Everyday, Amex Green, Chase Sapphire Preferred, Chase Sapphire Reserve, Chase Freedom Unlimited, Chase Freedom Flex, Chase Ink Business Preferred, Capital One Venture X, Capital One Venture, Capital One SavorOne, Capital One Savor, Capital One Quicksilver, Citi Double Cash, Citi Custom Cash, Citi Premier, Citi AAdvantage Platinum Select, Citi AAdvantage Executive, Discover it Cash Back, Discover it Miles, Wells Fargo Active Cash, Wells Fargo Autograph, US Bank Altitude Go, US Bank Cash+, Bank of America Customized Cash, Bank of America Premium Rewards, Delta SkyMiles Gold, Delta SkyMiles Platinum, Delta SkyMiles Reserve, United Explorer, United Quest, United Club Infinite, Southwest Rapid Rewards Plus, Southwest Rapid Rewards Priority, AAdvantage Aviator Red, Alaska Airlines Visa, Hawaiian Airlines World Elite, Frontier Airlines World Mastercard, JetBlue Plus, Marriott Bonvoy Boundless, Hilton Honors American Express, Hilton Honors Surpass, IHG One Rewards Premier, World of Hyatt, Apple Card, Amazon Prime Visa, Costco Anywhere Visa

## Deployment

This project is configured for [Render](https://render.com). Connect your GitHub repo and Render will auto-detect `render.yaml` for build/start commands.

## License

MIT

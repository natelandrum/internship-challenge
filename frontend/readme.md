# Crypto Asset Dashboard

This project is a cryptocurrency dashboard that allows users to search for and view price and volume data for different cryptocurrencies.

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

## Features

- Search for cryptocurrencies by symbol or select from a dropdown
- View current price, market cap, volume, and 24h price change
- Interactive price chart showing 7-day historical data
- Responsive design that works on both mobile and desktop

## Technologies Used

- Vue 3
- TypeScript
- Chart.js for data visualization
- Axios for API requests
- TailwindCSS for styling
- Vite as build tool
- pnpm as package manager

## API

The application uses the public [CoinGecko API](https://www.coingecko.com/en/api) to fetch cryptocurrency data.

## UI Decisions

- Clean, minimalist interface focused on data presentation
- Responsive design using Tailwind CSS
- Combined search input and dropdown for flexibility
- Color-coded price changes (green for positive, red for negative)
- Intuitive data cards to separate different metrics
- Interactive chart with tooltips for detailed price information

## Future Enhancements

With more time, I would add:

- Time period selector for the chart (24h, 7d, 30d, 1y)
- Multiple currency support (EUR, JPY, etc.)
- Watchlist functionality to track favorite cryptocurrencies
- More detailed analytics and technical indicators
- Dark mode support
- Price alerts and notifications

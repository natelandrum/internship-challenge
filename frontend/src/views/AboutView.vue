<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mb-6">About This Project</h1>
      
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-3">Crypto Asset Dashboard</h2>
        <p class="text-gray-700">
          This project was created as part of the Frontend Internship Challenge for Tekly Studio. 
          The dashboard allows users to search for cryptocurrency data by symbol or select from a dropdown, 
          displaying current price, market data, and a 7-day price chart.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-3">Tools Used</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li><span class="font-medium">Vue 3</span> - Frontend framework with composition API</li>
          <li><span class="font-medium">TypeScript</span> - For type safety and better development experience</li>
          <li><span class="font-medium">Tailwind CSS</span> - Utility-first CSS framework for rapid UI development</li>
          <li><span class="font-medium">Chart.js</span> - For rendering interactive price charts</li>
          <li><span class="font-medium">Axios</span> - HTTP client for API requests</li>
          <li><span class="font-medium">CoinGecko API</span> - Public cryptocurrency data API</li>
          <li><span class="font-medium">Vite</span> - Next Generation Frontend Tooling</li>
          <li><span class="font-medium">pnpm</span> - Fast, disk space efficient package manager</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-3">UI Decisions</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li>Clean, minimalist interface focused on data presentation</li>
          <li>Responsive design that works on mobile and desktop</li>
          <li>Search and dropdown combined for flexibility in finding cryptocurrencies</li>
          <li>Color-coded price changes (green for positive, red for negative)</li>
          <li>Intuitive data cards to separate different metrics</li>
          <li>Interactive chart with tooltips for detailed price information</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-3">Future Enhancements</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li>Time period selector for the price chart (24h, 7d, 30d, 1y)</li>
          <li>Multiple currency support (EUR, JPY, etc.)</li>
          <li>Watchlist functionality to track favorite cryptocurrencies</li>
          <li>More detailed analytics and technical indicators</li>
          <li>Dark mode support</li>
          <li>Price alerts and notifications</li>
        </ul>
      </section>
    </div>
  </div>
</template>

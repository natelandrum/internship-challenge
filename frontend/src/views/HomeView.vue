<script lang="ts">
import { defineComponent, ref } from 'vue';
import CryptoSearch from '@/components/CryptoSearch.vue';
import CryptoData from '@/components/CryptoData.vue';
import PriceChart from '@/components/PriceChart.vue';
import MultipleCoinOptions from '@/components/MultipleCoinOptions.vue';
import { cryptoService, type Coin } from '@/services/cryptoService';

export default defineComponent({
  name: 'HomeView',  components: {
    CryptoSearch,
    CryptoData,
    PriceChart,
    MultipleCoinOptions
  },
  setup() {
    const cryptoData = ref<Coin | null>(null);
    const matchingCoins = ref<Coin[]>([]);
    const loading = ref(false);
    const error = ref('');
    const showMultipleOptions = ref(false);

    // Search by symbol (from direct input)
    const searchCrypto = async (symbol: string) => {
      loading.value = true;
      error.value = '';
      cryptoData.value = null;
      matchingCoins.value = [];
      showMultipleOptions.value = false;

      try {
        const coins = await cryptoService.getCoinsBySymbol(symbol);
        
        if (coins.length === 0) {
          error.value = `No data found for ${symbol}`;
        } else if (coins.length === 1) {
          // If only one result, display it directly
          cryptoData.value = coins[0];
        } else {
          // If multiple results, show selection UI
          matchingCoins.value = coins;
          showMultipleOptions.value = true;
        }
      } catch (err: any) {
        error.value = err.message || 'Failed to fetch cryptocurrency data';
      } finally {
        loading.value = false;
      }
    };

    // Search by ID (from dropdown selection)
    const searchCryptoById = async (coinId: string) => {
      loading.value = true;
      error.value = '';
      cryptoData.value = null;
      matchingCoins.value = [];
      showMultipleOptions.value = false;

      try {
        const data = await cryptoService.getCoinById(coinId);
        cryptoData.value = data;
        if (!data) {
          error.value = `No data found for ID ${coinId}`;
        }
      } catch (err: any) {
        error.value = err.message || 'Failed to fetch cryptocurrency data';
      } finally {
        loading.value = false;
      }
    };    // Select specific coin from multiple options
    const selectCoin = (coin: Coin) => {
      cryptoData.value = coin;
      showMultipleOptions.value = false;
    };
    return {
      cryptoData,
      matchingCoins,
      loading,
      error,
      showMultipleOptions,
      searchCrypto,
      searchCryptoById,
      selectCoin
    };
  }
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-center text-blue-800">Cryptocurrency Dashboard</h1>
      <p class="text-gray-600 text-center mt-2">Track real-time prices, market data, and historical trends</p>
    </header>    
    <div class="max-w-4xl mx-auto">      
      <!-- Search Component -->
      <div class="m-4 p-4 bg-white rounded-lg shadow-md">
        <CryptoSearch @search="searchCrypto" @search-by-id="searchCryptoById" />
      </div>

      <!-- Error Message -->
      <div v-if="error" class="m-4 p-4 bg-red-100 text-red-700 rounded-md">
        {{ error }}
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="m-4 p-4 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p class="mt-2 text-gray-600">Loading data...</p>
      </div>
      <!-- Multiple Coins Selection UI -->
     <MultipleCoinOptions
        v-if="showMultipleOptions && matchingCoins.length > 0"
        :coins="matchingCoins"
        @select-coin="selectCoin"
      />

      <div v-if="!loading && !error && !showMultipleOptions" class="m-4">
        <div class="mb-4">
          <!-- Crypto Data -->
          <CryptoData :crypto-data="cryptoData || undefined" />
        </div>
        
        <!-- Price Chart -->
        <div v-if="cryptoData" class="mb-4">
          <PriceChart :coin-id="cryptoData.id" />
        </div>
      </div>
    </div>
  </div>
</template>

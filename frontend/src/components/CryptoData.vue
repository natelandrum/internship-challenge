<script lang="ts">
import { formatCurrency } from '@/utils/formatters';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'CryptoData',
  props: {
    cryptoData: {
      type: Object,
      required: false,
      default: null
    }
  },
  setup(props) {
    const priceChangeClass = computed(() => {
      if (!props.cryptoData) return '';
      return props.cryptoData.price_change_percentage_24h > 0 
        ? 'text-green-500' 
        : 'text-red-500';
    });    

    return {
      priceChangeClass,
      formatCurrency
    };
  }
});
</script>


<template>
  <div v-if="cryptoData" class="bg-white p-6 rounded-lg shadow-lg">
    <div class="flex justify-between items-center mb-4">
      <div>
        <h2 class="text-2xl font-bold">{{ cryptoData.name }}</h2>
        <p class="text-gray-600">{{ cryptoData.symbol.toUpperCase() }}</p>
      </div>
      <div class="text-right">
        <p class="text-3xl font-bold">{{ formatCurrency(cryptoData.current_price) }}</p>
        <p :class="priceChangeClass">
          {{ cryptoData.price_change_percentage_24h > 0 ? '↑' : '↓' }} 
          {{ Math.abs(cryptoData.price_change_percentage_24h).toFixed(2) }}%
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-gray-50 border-1 border-gray-400 p-3 rounded">
        <p class="text-sm text-gray-500">Market Cap</p>
        <p class="font-semibold">{{ formatCurrency(cryptoData.market_cap) }}</p>
      </div>
      <div class="bg-gray-50 border-1 border-gray-400 p-3 rounded">
        <p class="text-sm text-gray-500">24h Volume</p>
        <p class="font-semibold">{{ formatCurrency(cryptoData.total_volume) }}</p>
      </div>
      <div class="bg-gray-50 border-1 border-gray-400 p-3 rounded">
        <p class="text-sm text-gray-500">24h High</p>
        <p class="font-semibold">{{ formatCurrency(cryptoData.high_24h) }}</p>
      </div>
      <div class="bg-gray-50 border-1 border-gray-400 p-3 rounded">
        <p class="text-sm text-gray-500">24h Low</p>
        <p class="font-semibold">{{ formatCurrency(cryptoData.low_24h) }}</p>
      </div>
    </div>
  </div>
  <div v-else class="bg-white p-6 rounded-lg shadow-lg text-center">
    <p class="text-gray-500">Search for a cryptocurrency to view data</p>
  </div>
</template>


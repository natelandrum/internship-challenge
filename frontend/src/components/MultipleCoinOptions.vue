<script lang="ts">
import { defineComponent, computed, type PropType } from 'vue';
import type { Coin } from '@/services/cryptoService';

export default defineComponent({
  name: 'MultipleCoinOptions',
  props: {
    coins: {
      type: Array as PropType<Coin[]>,
      required: true
    }
  },  emits: ['select-coin'],
  setup(props, { emit }) {
    // Sort coins - prioritize coins with market cap and rank
    const sortedCoins = computed(() => {
      return [...props.coins].sort((a, b) => {
        // First prioritize coins with market cap
        if (a.market_cap > 0 && b.market_cap === 0) return -1;
        if (a.market_cap === 0 && b.market_cap > 0) return 1;
        
        // Then sort by market cap rank if both have it
        if (a.market_cap_rank && b.market_cap_rank) {
          return a.market_cap_rank - b.market_cap_rank;
        }
        
        // Prioritize coins with a rank
        if (a.market_cap_rank && !b.market_cap_rank) return -1;
        if (!a.market_cap_rank && b.market_cap_rank) return 1;
        
        // Finally sort by market cap size
        return b.market_cap - a.market_cap;
      });
    });
    
    const selectCoin = (coin: Coin) => {
      emit('select-coin', coin);
    };
    
    // Format market cap display with fallback to "N/A"
    const formatMarketCap = (marketCap: number) => {
      return marketCap > 0 ? `$${new Intl.NumberFormat().format(marketCap)}` : 'N/A';
    };
    
    return {
      sortedCoins,
      selectCoin,
      formatMarketCap
    };
  }
});
</script>

<template>
  <div class="m-4">
    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
      <h3 class="font-semibold text-lg mb-2">Multiple cryptocurrencies found with this symbol</h3>
      <p class="text-gray-600 mb-4">Please select the specific cryptocurrency you're looking for:</p>
      
      <!-- All Coins (sorted by importance) -->
      <div class="space-y-3">
        <div 
          v-for="coin in sortedCoins" 
          :key="coin.id"
          class="p-3 border rounded-md bg-white hover:bg-blue-50 cursor-pointer transition-colors"
          @click="selectCoin(coin)"
          tabindex="0"
          @keydown.enter="selectCoin(coin)"
        >
          <div class="flex items-center">
            <img 
              :src="coin.image || `https://via.placeholder.com/32?text=${coin.symbol.charAt(0).toUpperCase()}`" 
              :alt="coin.name" 
              class="w-8 h-8 mr-3" 
            />
            <div>
              <h4 class="font-medium">{{ coin.name }} ({{ coin.symbol.toUpperCase() }})</h4>
              <p class="text-sm text-gray-500">
                Rank: {{ coin.market_cap_rank ? "#" + coin.market_cap_rank : "N/A" }} •
                Market Cap: {{ formatMarketCap(coin.market_cap) }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- No results message -->
        <div v-if="sortedCoins.length === 0" class="p-4 text-center text-gray-500">
          No cryptocurrencies found
        </div>
      </div>
    </div>
  </div>
</template>

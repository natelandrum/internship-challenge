<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { cryptoService, type PopularCoin } from '@/services/cryptoService';
import CryptoDropdown from '@/components/CryptoDropdown.vue';
import SymbolInput from '@/components/SymbolInput.vue';
import SearchButton from '@/components/SearchButton.vue';

export default defineComponent({
  name: 'CryptoSearch',
  components: {
    CryptoDropdown,
    SymbolInput,
    SearchButton
  },
  emits: ['search', 'search-by-id'],  setup(_, { emit }) {
    const popularCoins = ref<PopularCoin[]>([]);
    const isLoading = ref(false);
    const currentSymbol = ref('');
    
    // Fetch popular coins when component mounts
    onMounted(async () => {
      isLoading.value = true;
      try {
        popularCoins.value = await cryptoService.getPopularCoins();
      } catch (error) {
        console.error('Failed to fetch popular coins:', error);
      } finally {
        isLoading.value = false;
      }
    });    // Reference to the dropdown component
    const dropdownRef = ref<InstanceType<typeof CryptoDropdown> | null>(null);
      // Handle coin selection from dropdown
    const handleCoinSelection = (coinId: string) => {
      // Clear the symbol input when a coin is selected from dropdown
      currentSymbol.value = '';
      // Force an update to ensure the symbol input is cleared
      setTimeout(() => {
        currentSymbol.value = '';
      }, 0);
      emit('search-by-id', coinId);
    };
    
    // Handle symbol search from input
    const handleSymbolSearch = (symbol: string) => {
      // Reset dropdown selection when searching by symbol
      if (dropdownRef.value) {
        dropdownRef.value.resetSelection();
      }
      emit('search', symbol);
    };
      // Update the current symbol value
    const updateSymbol = (symbol: string) => {
      currentSymbol.value = symbol;
    };
      return {
      popularCoins,
      isLoading,
      currentSymbol,
      dropdownRef,
      handleCoinSelection,
      handleSymbolSearch,
      updateSymbol
    };
  }
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h2 class="text-xl font-semibold">Search Cryptocurrency</h2>
      <p class="text-gray-600 mt-1">Select from the top 20 or enter a symbol</p>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-4">      
      <!-- Crypto Dropdown Component -->      
       <div class="flex-1 mx-2">
        <CryptoDropdown 
          ref="dropdownRef"
          :popular-coins="popularCoins" 
          :is-loading="isLoading" 
          @select-coin="handleCoinSelection"
        />
      </div>
      <!-- Symbol Input Component -->
      <div class="flex-1 mx-2">
        <SymbolInput 
          v-model:symbol="currentSymbol" 
          @search="handleSymbolSearch" 
        />
      </div>
    </div>
    <!-- Search Button Component -->
    <div class="flex-1 mx-2">
        <SearchButton 
          :symbol-value="currentSymbol" 
          @search="handleSymbolSearch" 
        />
      </div>
  </div>
</template>

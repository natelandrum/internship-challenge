<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';
import type { PopularCoin } from '../services/cryptoService';

export default defineComponent({
  name: 'CryptoDropdown',
  props: {
    popularCoins: {
      type: Array as PropType<PopularCoin[]>,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  emits: ['select-coin'],  setup(props, { emit }) {
    const isDropdownOpen = ref(false);
    const selectedCoinId = ref('');
    const selectedCoinName = ref('');
    
    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const closeDropdown = () => {
      isDropdownOpen.value = false;
    };
    
    const resetSelection = () => {
      selectedCoinId.value = '';
      selectedCoinName.value = '';
    };

    const onSelectCoin = (coinId: string, coinName: string, coinSymbol: string) => {
      selectedCoinId.value = coinId;
      selectedCoinName.value = `${coinName} (${coinSymbol.toUpperCase()})`;
      isDropdownOpen.value = false;
      emit('select-coin', coinId);
    };
      return {
      selectedCoinId,
      selectedCoinName,
      isDropdownOpen,
      toggleDropdown,
      closeDropdown,
      resetSelection,
      onSelectCoin
    };
  }
});
</script>

<template>
  <div class="relative">
    <label class="block text-sm font-medium mb-1">Select from List</label>    
    <div 
      class="w-full p-2 border rounded-md bg-white flex justify-between items-center cursor-pointer"
      :class="{
        'opacity-50': isLoading, 
        'cursor-not-allowed': isLoading,
        'ring-2 ring-blue-500 border-transparent': isDropdownOpen
      }"
      @click="!isLoading && toggleDropdown()"
      tabindex="0"
      @keydown.enter="!isLoading && toggleDropdown()"
      @keydown.space="!isLoading && toggleDropdown()"
    >
      <span class="truncate">
        {{ selectedCoinName || (isLoading ? 'Loading cryptocurrencies...' : 'Select a cryptocurrency') }}
      </span>
      <svg 
        class="h-5 w-5 text-gray-400"
        :class="{'transform rotate-180 transition-transform': isDropdownOpen}" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
      <!-- Dropdown Options -->
    <div 
      v-if="isDropdownOpen" 
      class="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto focus:outline-none"
    >
      <div 
        v-if="isLoading" 
        class="p-3 text-center text-gray-500"
      >
        <div class="inline-block animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent mr-2"></div>
        Loading cryptocurrencies...
      </div>
      <div 
        v-else-if="popularCoins.length === 0"
        class="p-3 text-center text-gray-500"
      >
        No cryptocurrencies found
      </div>
      <div v-else>
        <div 
          v-for="coin in popularCoins" 
          :key="coin.id" 
          class="p-3 hover:bg-blue-50 cursor-pointer border-t border-gray-100 first:border-t-0 transition-colors duration-150"
          @click="onSelectCoin(coin.id, coin.name, coin.symbol)"
          tabindex="0"
          @keydown.enter="onSelectCoin(coin.id, coin.name, coin.symbol)"
        >
          {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
        </div>
      </div>
    </div>
    
    <!-- Click outside handler -->
    <div 
      v-if="isDropdownOpen" 
      class="fixed inset-0 z-0" 
      @click="closeDropdown"
    ></div>
  </div>
</template>

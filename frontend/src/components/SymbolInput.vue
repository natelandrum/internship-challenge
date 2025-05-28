<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'SymbolInput',
  emits: ['update:symbol', 'search'],
  props: {
    symbol: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const inputSymbol = ref(props.symbol || '');
    
    // Watch for changes in the symbol prop and update the input value
    watch(() => props.symbol, (newValue) => {
      inputSymbol.value = newValue;
    });

    const updateSymbol = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const formattedSymbol = target.value.trim().toUpperCase();
      inputSymbol.value = formattedSymbol;
      emit('update:symbol', formattedSymbol);
    };
    
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && inputSymbol.value) {
        emit('search', inputSymbol.value);
      }
    };

    return {
      inputSymbol,
      updateSymbol,
      handleKeyPress
    };
  }
});
</script>

<template>  <div class="relative">
    <label for="crypto-symbol" class="block text-sm font-medium mb-1">Enter Symbol</label>
    <div>
      <input
        id="crypto-symbol"
        v-model="inputSymbol"
        @input="updateSymbol"
        @keyup="handleKeyPress"
        type="text"
        placeholder="BTC, ETH, etc."
        class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  </div>
</template>

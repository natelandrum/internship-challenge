<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchButton',
  emits: ['search'],
  props: {
    symbolValue: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const searchCrypto = () => {
      if (props.symbolValue.trim()) {
        emit('search', props.symbolValue.trim());
      }
    };

    return {
      searchCrypto
    };
  }
});
</script>

<template>
  <div class="mt-4">
    <button 
      @click="searchCrypto"
      @keyup.enter="searchCrypto"
      type="button"
      class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Search
    </button>
  </div>
</template>

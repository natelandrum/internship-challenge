<script lang="ts">
import { defineComponent, ref, onMounted, watch, nextTick } from 'vue';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { cryptoService } from '@/services/cryptoService';
import { formatCurrency } from '@/utils/formatters';

// Register Chart.js components
Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default defineComponent({
  name: 'PriceChart',
  props: {
    coinId: {
      type: String,
      required: true
    }
  },  setup(props) {
    const chartCanvas = ref<HTMLCanvasElement | null>(null);
    const chart = ref<Chart | null>(null);
    const loaded = ref(false);
      const fetchChartData = async () => {
      if (!props.coinId) {
        console.error('No coinId provided to PriceChart component');
        loaded.value = true;
        return;
      }
      
      loaded.value = false;
        try {
        const response = await cryptoService.getCoinHistoryData(props.coinId, 7);
        
        if (!response) {
          console.error('No response returned from API for coinId:', props.coinId);
          loaded.value = true;
          return;
        }
        
        if (!response.prices || response.prices.length === 0) {
          console.error('No price data returned from API for coinId:', props.coinId);
          loaded.value = true;
          return;
        }
        
        const priceData = response.prices;
        
        await nextTick();
        setTimeout(() => {
          renderChart(priceData);
        }, 500);

        loaded.value = true;
      } catch (error) {
        console.error('Error fetching chart data:', error);
        console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
        loaded.value = true;
      }
    };    const renderChart = (priceData: [number, number][]) => {
      if (!chartCanvas.value) {
        console.error('Chart canvas element not found');
        return;
      }
      
      
      // Destroy existing chart if it exists
      if (chart.value) {
        chart.value.destroy();
      }      // Process dates for display on the chart
      const dates = priceData.map(item => {
        const date = new Date(item[0]);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });
      
      const prices = priceData.map(item => item[1]);
      
      
      // Create gradient
      const ctx = chartCanvas.value.getContext('2d');
      if (!ctx) {
        console.error('Failed to get 2D context from canvas');
        return;
      }
      try {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(54, 162, 235, 0.4)');
        gradient.addColorStop(1, 'rgba(54, 162, 235, 0)');
      
        chart.value = new Chart(chartCanvas.value, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {                
                label: 'Price (USD)',
                data: prices,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: gradient,
                borderWidth: 2.5,
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointHoverBackgroundColor: '#fff',
                pointBorderColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)',
                pointBorderWidth: 1.5
              }
            ]
          },          
          options: {
            responsive: true,
            maintainAspectRatio: false,            
            scales: {
              x: {
                grid: {
                  display: true,
                  drawOnChartArea: true,
                  drawTicks: true,
                  // Increase spacing between grid lines
                  tickLength: 10
                },
                ticks: {
                  // Display fewer ticks overall
                  maxTicksLimit: 7,
                  align: 'center',
                  autoSkip: true,
                  autoSkipPadding: 10,
                  maxRotation: 45,
                  minRotation: 0
                }
              },
              y: {
                beginAtZero: false,
                ticks: {
                  callback: (value) => {
                    return formatCurrency(value as number);
                  }
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${formatCurrency(context.parsed.y) }`;
                  }
                }
              }
            }
          }
        });
      } catch (chartError) {
        console.error('Error creating chart:', chartError);
      }
    };    // Set up watchers and initial fetch
    onMounted(() => {
      if (props.coinId) {
        // Small delay before initial fetch for the component to fully render
        setTimeout(() => {
          fetchChartData();
        }, 150);
      }
    });
    
    // Watch for changes in the coinId prop
    watch(() => props.coinId, (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        fetchChartData();
      }
    });

    return {
      chartCanvas,
      loaded
    };
  }
});
</script>


<template>  <div class="bg-white p-6 rounded-lg shadow-lg mt-6">
    <h3 class="text-xl font-semibold mb-4">Price History (Last 7 days)</h3>
    <div v-if="loaded" class="h-72 w-full relative p-2">
      <canvas ref="chartCanvas" class="w-full h-full block" style="min-height: 280px;"></canvas>
    </div>
    <div v-else class="h-72 flex items-center justify-center">
      <p class="text-gray-500">Loading chart data...</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import ApexCharts from 'apexcharts';
import { useStatusPenyewaanStore } from '@/stores/dashboard/status-penyewaan.store';

const context = useStatusPenyewaanStore();
const chartRef = ref(null);
const theme = ref(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
let chart = null;

const getTextColor = () => {
  return getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() || '#333';
};

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value);
  context.getWidgetStatusPenyewaan().then(() => {
    if (chartRef.value) {
      const textColor = getTextColor();
      const statusKeys = Object.keys(context.statusRentals);
      const statusValues = Object.values(context.statusRentals);
      
      const colors = {
        'Dibatalkan': '#f97316', // Orange
        'Ditolak': '#ef4444', // Red
        'Masa Sewa': '#3b82f6', // Blue
        'Pending': '#a855f7', // Purple
        'Selesai': '#10b981' // Green
      };
      
      const mappedColors = statusKeys.map(label => colors[label] || '#999');

      const options = {
        chart: {
          type: 'donut',
          height: 350,
          background: 'transparent'

        },
        series: statusValues,
        colors: mappedColors,
        labels: statusKeys,
        legend: {
          show: true,
          position: 'top',
          labels: {
            colors: textColor
          }
        },
        tooltip: {
          theme: theme.value,
          y: {
            formatter: (val) => `${val} transaksi`
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'diagonal1',
            shadeIntensity: 0.6,
            gradientToColors: mappedColors.map(color => color + 'AA'), // Efek gradient lebih smooth
            opacityFrom: 0.5,
            opacityTo: 0.8,
            stops: [0, 100]
          }
        }
      };

      chart = new ApexCharts(chartRef.value, options);
      chart.render();
    }
  });
});

watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme);
  if (chart) {
    chart.updateOptions({
      legend: {
        labels: {
          colors: newTheme === 'dark' ? '#fff' : '#333'
        }
      },
      tooltip: {
        theme: newTheme
      }
    });
  }
});
</script>

<template>
  <div class="card p-4 h-full">
    <div class="text-900 card-header flex justify-content-between align-items-center mb-3">
      <span>Status Transaksi</span>
    </div>
    <div ref="chartRef" class="chart w-full h-25rem"></div>
  </div>
</template>

<style>
.card {
  width: 100%;
  padding: 16px;
  
}

.chart {
  width: 100%;
}
</style>

<script setup>
import { ref, onMounted, watch } from 'vue';
import ApexCharts from 'apexcharts';

const chartRef = ref(null);
const theme = ref(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');

// Data penyewaan per kategori
const categories = ref([
  { name: 'Kamera', rentals: 500 },
  { name: 'Lensa', rentals: 650 },
  { name: 'Dlls', rentals: 250 }
]);

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value);
  if (chartRef.value) {
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      dataLabels: { enabled: false },
      series: [{
        name: 'Rentals',
        data: categories.value.map(item => item.rentals)
      }],
      xaxis: {
        categories: categories.value.map(item => item.name),
        labels: {
          style: { colors: theme.value === 'dark' ? '#ffffff' : '#888', fontSize: '12px' }
        }
      },
      yaxis: {
        labels: {
          style: { colors: theme.value === 'dark' ? '#ffffff' : '#888', fontSize: '12px' }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        fontSize: '12px',
        labels: { colors: theme.value === 'dark' ? '#ffffff' : '#111827' }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%',
        }
      },
      tooltip: {
        theme: theme.value,
        y: { formatter: val => `${val} rentals` }
      },
      grid: {
        strokeDashArray: 4,
        borderColor: '#E5E7EB'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: ['#6366F1'], // Warna bawah
          opacityFrom: 1,
          opacityTo: 0.2,
          stops: [0, 100]
        }
      },
      colors: ['#818CF8'] // Warna utama
    };

    const chart = new ApexCharts(chartRef.value, options);
    chart.render();
  }
});

watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme);
  if (chartRef.value) {
    const chart = ApexCharts.getChartByID(chartRef.value.id);
    if (chart) {
      const textColor = newTheme === 'dark' ? '#ffffff' : '#888';
      chart.updateOptions({
        xaxis: {
          labels: {
            style: { colors: textColor, fontSize: '12px' }
          }
        },
        yaxis: {
          labels: {
            style: { colors: textColor, fontSize: '12px' }
          }
        },
        legend: {
          labels: { colors: newTheme === 'dark' ? '#ffffff' : '#111827' }
        },
        tooltip: {
          theme: newTheme
        }
      });
      chart.render(); // Force re-render
    }
  }
});
</script>

<template>
  <div class="card p-4" :data-theme="theme">
    <div class="card-header text-900 flex justify-content-between align-items-center mb-3">
      <span>Penyewaan per Kategori</span>
    </div>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<style scoped>
.card {
  width: 100%; /* Responsive width */
  padding: 16px;
}
</style>

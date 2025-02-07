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
  if (chartRef.value) {
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false // Menyembunyikan angka di bar
      },
      colors: ['#6366F1'], // Warna modern
      series: [
        {
          name: 'Rentals',
          data: categories.value.map(item => item.rentals)
        }
      ],
      xaxis: {
        categories: categories.value.map(item => item.name),
        labels: {
          style: {
            colors: theme.value === 'dark' ? '#ffffff' : '#888',
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: theme.value === 'dark' ? '#ffffff' : '#888',
            fontSize: '12px'
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        fontSize: '12px',
        labels: {
          colors: theme.value === 'dark' ? '#ffffff' : '#111827'
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%'
        }
      },
      tooltip: {
        theme: theme.value,
        y: {
          formatter: val => `${val} rentals`
        }
      },
      grid: {
        strokeDashArray: 4,
        borderColor: '#E5E7EB'
      }
    };

    const chart = new ApexCharts(chartRef.value, options);
    chart.render();
  }
});

watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme);
});
</script>

<template>
  <div class="card" :data-theme="theme">
    <div class="card-header">
      <span>Penyewaan per Kategori</span>
    </div>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<style scoped>
.card {
  width: 100%; /* Responsive width */
  max-width: 350px; /* Max width for larger screens */
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  color: var(--text-color); /* Updated to use CSS variable */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px; /* Updated to match WidgetTotalPendapatan */
  color: var(--text-color); /* Updated to use CSS variable */
  margin-bottom: 8px;
}

.chart {
  width: 100%;
  height: 350px;
  color: var(--text-color); /* Updated to use CSS variable */
}

:root {
  --text-color: #111827; /* Default color */
}

[data-theme='dark'] {
  --text-color: #ffffff; /* White color for dark mode */
}

[data-theme='dark'] .card-header,
[data-theme='dark'] .chart {
  color: #ffffff; /* Ensure text color is white in dark mode */
}
</style>

<script setup>
import { ref, onMounted, watch } from 'vue';
import ApexCharts from 'apexcharts';

const chartRef = ref(null);
const theme = ref(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');

const generateFakeData = () => {
  const data1 = [];
  const data2 = [];
  const data3 = [];
  const labels = [];
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 9); // Data dari 9 hari terakhir

  for (let i = 0; i < 9; i++) {
    labels.push(currentDate.toISOString().split('T')[0]);
    data1.push(Math.floor(Math.random() * 3000) + 1000); // Data 1 antara 1000-4000
    data2.push(Math.floor(Math.random() * 2000) + 500); // Data 2 antara 500-2500
    data3.push(Math.floor(Math.random() * 1000) + 200); // Data 3 antara 200-1200
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return { labels, data1, data2, data3 };
};

onMounted(() => {
  if (chartRef.value) {
    const { labels, data1, data2, data3 } = generateFakeData();

    const options = {
      chart: {
        type: 'area',
        height: 400,
        zoom: {
          enabled: true,
          type: 'x'
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#6B46C1', '#D53F8C', '#EF4444'], // Added red color for "Dibatalkan"
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.5,
          opacityFrom: 0.6,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
      series: [
        {
          name: 'Selesai',
          data: data1.map((value, index) => ({ x: labels[index], y: value }))
        },
        {
          name: 'Ditolak',
          data: data2.map((value, index) => ({ x: labels[index], y: value }))
        },
        {
          name: 'Dibatalkan',
          data: data3.map((value, index) => ({ x: labels[index], y: value }))
        }
      ],
      xaxis: {
        type: 'datetime',
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
        horizontalAlign: 'right',
        labels: {
          colors: theme.value === 'dark' ? '#ffffff' : '#111827'
        }
      },
      tooltip: {
        theme: theme.value
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
      <span>Rasio Penyewaan</span>
    </div>
    <div class="chart-container">
      <div ref="chartRef"></div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%; /* Responsive width */
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  color: var(--text-color);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px; /* Updated to match WidgetTotalPendapatan */
  color: var(--text-color); /* Updated to use CSS variable */
  margin-bottom: 8px;
}

.chart-container {
  width: 100%;
  height: 400px;
  color: var(--text-color); /* Updated to use CSS variable */
}

:root {
  --text-color: #111827; /* Default color */
}

[data-theme='dark'] {
  --text-color: #ffffff; /* White color for dark mode */
}

[data-theme='dark'] .card-header,
[data-theme='dark'] .chart-container {
  color: #ffffff; /* Ensure text color is white in dark mode */
}
</style>

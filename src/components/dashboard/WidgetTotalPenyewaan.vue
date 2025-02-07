<script setup>
import { ref, onMounted, watch } from 'vue';
import ApexCharts from 'apexcharts';
import { useTotalPenyewaanStore } from '@/stores/dashboard/total-penyewaan.store';

const context = useTotalPenyewaanStore();
const chartRef = ref(null);
const theme = ref(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
let chart = null;

onMounted(async () => {
  await context.getWidgetTotalPenyewaan();

  if (chartRef.value) {
    const data = context.dailyRentals;

    const options = {
      chart: {
        type: 'area',
        height: 100,
        sparkline: {
          enabled: true // Menghilangkan grid dan label untuk desain minimalis
        }
      },
      colors: ['#22C55E'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.5,
          opacityFrom: 0.7,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
      series: [
        {
          name: 'Total Penyewaan',
          data: data
        }
      ],
      tooltip: {
        theme: theme.value
      },
      legend: {
        labels: {
          colors: theme.value === 'dark' ? '#ffffff' : '#111827'
        }
      }
    };

    chart = new ApexCharts(chartRef.value, options);
    chart.render();
  }
});

watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme);
  if (chart) {
    chart.updateOptions({
      tooltip: {
        theme: newTheme
      },
      legend: {
        labels: {
          colors: newTheme === 'dark' ? '#ffffff' : '#111827'
        }
      }
    });
  }
});
</script>

<template>
  <div class="card" :data-theme="theme">
    <div class="card-header">
      <span>Total Penyewaan</span>
      <span class="growth">
        <span class="icon">↑</span> {{ context.growthPercentage }}%
      </span>
    </div>
    <div class="card-body">
      <div class="total">{{ context.totalRentals.toLocaleString() }}</div>
      <div ref="chartRef" class="chart"></div>
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

.growth {
  display: flex;
  align-items: center;
  color: #22C55E; /* Hijau */
  font-weight: bold;
  font-size: 14px;
}

.growth .icon {
  font-size: 16px;
  margin-right: 4px;
}

.card-body {
  text-align: left;
  color: var(--text-color); /* Updated to use CSS variable */
}

.total {
  font-size: 32px;
  font-weight: bold;
  color: var(--text-color); /* Updated to use CSS variable */
  margin-bottom: 8px;
}

.chart {
  width: 100%;
  height: 50px; /* Ukuran minimalis untuk sparkline chart */
}

:root {
  --text-color: #111827; /* Default color */
}

[data-theme='dark'] {
  --text-color: #ffffff; /* White color for dark mode */
}

[data-theme='light'] {
  --text-color: #111827; /* Black color for light mode */
}

[data-theme='dark'] .card-header,
[data-theme='dark'] .card-body,
[data-theme='dark'] .total {
  color: var(--text-color); /* Ensure text color is white in dark mode */
}

[data-theme='light'] .card-header,
[data-theme='light'] .card-body,
[data-theme='light'] .total {
  color: var(--text-color); /* Ensure text color is black in light mode */
}
</style>

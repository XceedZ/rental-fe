<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import ApexCharts from 'apexcharts';
import { usePendapatanCtgrStore } from '@/stores/dashboard/pendapatan-ctgr';

const chartRef = ref(null);
const theme = ref(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
const context = usePendapatanCtgrStore();
let chart = null;

const updateChart = () => {
  if (!chartRef.value || !context.categories.length) return;

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    series: [{
      name: 'Jumlah',
      data: context.categories.map(item => item.count)
    }],
    xaxis: {
      categories: context.categories.map(item => item.name),
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
      y: { formatter: val => `${val} transaksi` }
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
        gradientToColors: ['#6366F1'],
        opacityFrom: 1,
        opacityTo: 0.2,
        stops: [0, 100]
      }
    },
    colors: ['#818CF8']
  };

  if (chart) {
    chart.updateOptions(options);
  } else {
    chart = new ApexCharts(chartRef.value, options);
    chart.render();
  }
};

onMounted(async () => {
  document.documentElement.setAttribute('data-theme', theme.value);
  await context.getWidgetPendapatanCtgr();
  updateChart();
});

onUnmounted(() => {
  if (chart) {
    chart.destroy();
  }
});

watch(() => context.categories, updateChart, { deep: true });

watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme);
  if (chart) {
    const textColor = newTheme === 'dark' ? '#ffffff' : '#888';
    chart.updateOptions({
      xaxis: {
        labels: { style: { colors: textColor } }
      },
      yaxis: {
        labels: { style: { colors: textColor } }
      },
      legend: {
        labels: { colors: newTheme === 'dark' ? '#ffffff' : '#111827' }
      },
      tooltip: { theme: newTheme }
    });
  }
});
</script>

<template>
  <div class="card p-4" :data-theme="theme">
    <div class="card-header text-900 flex justify-content-between align-items-center mb-3">
      <span>Transaksi Kategori</span>
      <div v-if="context.loading" class="loading-spinner">
        <i class="pi pi-spinner pi-spin"></i>
      </div>
    </div>
    <div ref="chartRef" class="chart" :class="{ 'loading': context.loading }"></div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  padding: 16px;
}

.loading-spinner {
  font-size: 1.2em;
  color: #6366F1;
}

.chart.loading {
  opacity: 0.5;
  pointer-events: none;
}
</style>

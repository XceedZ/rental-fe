<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import ApexCharts from 'apexcharts';
import { useTotalPendapatanStore } from '@/stores/dashboard/total-pendapatan.store';
import { toCurrencyLocale } from '@/utils/currency';

const context = useTotalPendapatanStore();
const chartRef = ref(null);
const theme = ref(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
let chart = null;

onMounted(async () => {
  await context.getWidgetTotalPendapatan();
  context.subscribeToRealtimeUpdates();

  if (chartRef.value) {
    const data = context.dailyPendapatan.map(entry => ({
      x: entry.date,
      y: entry.total
    }));

    const options = {
      chart: {
        type: 'area',
        height: 100,
        zoom: {
          enabled: true,
          type: 'x'
        },
        sparkline: {
          enabled: true
        },
        toolbar: {
          show: false,
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
          name: 'Total Pendapatan',
          data: data
        }
      ],
      tooltip: {
        theme: theme.value,
        x: {
          format: 'yyyy-MM-dd'
        }
      },
      legend: {
        labels: {
          colors: theme.value === 'dark'
        }
      }
    };

    chart = new ApexCharts(chartRef.value, options);
    chart.render();
  }
});

watch(() => context.dailyPendapatan, (newData) => {
  if (chart) {
    const updatedData = newData.map(entry => ({
      x: entry.date,
      y: entry.total
    }));
    chart.updateSeries([{ name: 'Total Pendapatan', data: updatedData }]);
  }
}, { deep: true });

onUnmounted(() => {
  context.unsubscribeFromRealtimeUpdates();
});

const downloadCSV = () => {
  if (!context.dailyPendapatan || context.dailyPendapatan.length === 0) {
    alert('Tidak ada data untuk diunduh');
    return;
  }

  let csvContent = 'Tanggal,Total Pendapatan\n';
  context.dailyPendapatan.forEach((entry) => {
    const formattedDate = entry.date;
    const total = entry.total;
    csvContent += `${formattedDate},${total}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'total_pendapatan.csv';
  link.click();
};


watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme);
  if (chart) {
    chart.updateOptions({
      tooltip: {
        theme: newTheme
      },
      legend: {
        labels: {
          colors: newTheme === 'dark'
        }
      }
    });
  }
});
</script>

<template>
  <div class="card p-4">
    <div class="text-900 card-header flex justify-content-between align-items-center mb-3">
      <span>Total Pendapatan</span>
      <div class="header-right flex align-items-center gap-2">
        <span class="growth text-green-500 font-bold text-sm">
          <span class="icon">↑</span> {{ context.growthPercentage }}%
        </span>
        <button class="chart-toolbar p-button p-component p-button-text" v-tooltip.top="'Unduh CSV'"
          @click="downloadCSV">
          <i class="pi pi-cloud-download text-600 hover:text-900 transition-duration-100"></i>
        </button>
      </div>
    </div>
    <div class="card-body text-900 text-left">
      <div class="total text-4xl font-bold mb-3">{{ toCurrencyLocale(context.totalPendapatan) }}</div>
      <div ref="chartRef" class="chart w-full h-8"></div>
    </div>
  </div>
</template>

<style>
.card {
  width: 100%;
  padding: 16px;
}

.chart {
  width: 100%;
  height: 50px;
}
</style>

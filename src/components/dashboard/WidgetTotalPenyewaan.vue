<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import ApexCharts from 'apexcharts';
import { useTotalPenyewaanStore } from '@/stores/dashboard/total-penyewaan.store';

const context = useTotalPenyewaanStore();
const chartRef = ref(null);
const theme = ref(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
let chart = null;

const renderChart = () => {
  if (chartRef.value) {
    const data = context.dailyRentals;

    const options = {
      chart: {
        type: 'area',
        height: 100,
        zoom: {
          enabled: true,
          type: 'x'
        },
        sparkline: {
          enabled: true // Menghilangkan grid dan label untuk desain minimalis
        },
        toolbar: {
          show: false,
        }
      },
      colors: ['#6B46C1'], // Changed to purple
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
          name: 'Total Transaksi',
          data: data
        }
      ],
      tooltip: {
        theme: theme.value,
        x: {
          format: 'yyyy-MM-dd' // Tooltip format
        }
      },
      legend: {
        labels: {
          colors: theme.value === 'dark' ? '#ffffff' : '#111827'
        }
      }
    };

    if (chart) {
      chart.updateOptions(options);
      chart.updateSeries([{ data }]);
    } else {
      chart = new ApexCharts(chartRef.value, options);
      chart.render();
    }
  }
};

onMounted(async () => {
  await context.getWidgetTotalPenyewaan();
  renderChart();
});

const downloadCSV = () => {
  if (!context.dailyRentals || context.dailyRentals.length === 0) {
    alert('Tidak ada data untuk diunduh');
    return;
  }

  let csvContent = 'Tanggal,Total Transaksi\n';
  context.dailyRentals.forEach((entry) => {
    const formattedDate = entry.x;
    const total = entry.y;
    csvContent += `${formattedDate},${total}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'total_transaksi.csv';
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
          colors: newTheme === 'dark' ? '#ffffff' : '#111827'
        }
      }
    });
  }
});

watch(() => context.dailyRentals, (newData) => {
  if (chart) {
    chart.updateSeries([{ name: 'Total Transaksi', data: newData }]);
  }
}, { deep: true });
</script>

<template>
  <div class="card p-4">
    <div class="text-900 card-header flex justify-content-between align-items-center mb-3">
      <span>Total Transaksi</span>
      <div class="header-right flex align-items-center gap-2">
        <span class="growth font-bold text-sm" style="color: #6B46C1">
          <span class="icon">↑</span> {{ context.growthPercentage }}%
        </span>
        <button class="chart-toolbar p-button p-component p-button-text" v-tooltip.right="'Unduh CSV'" @click="downloadCSV">
          <i class="pi pi-cloud-download text-600 hover:text-900 transition-duration-100"></i>
        </button>
      </div>
    </div>
    <div class="card-body text-900 text-left">
      <div class="total text-4xl font-bold mb-3">{{ context.totalRentals }}</div>
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

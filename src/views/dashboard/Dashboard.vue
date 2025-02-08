<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8" :data-theme="theme">
    <div class="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
      <div class="flex flex-column text-center md:text-left">
        <div class="flex align-items-center justify-content-center md:justify-content-start mb-2">
          <span class="border-circle w-3rem h-3rem flex align-items-center justify-content-center surface-100 mr-2">
            <i class="pi pi-chart-line text-900 text-3xl"></i>
          </span>
          <span class="text-900 text-3xl font-medium">Dashboard</span>
        </div>
        <span class="text-600 text-xl">Kamu dapat memantau statistik perusahaan!👋🏻</span>
      </div>
    </div>
    <Divider class="w-full"></Divider>
    <div class="flex flex-wrap lg:flex-nowrap mt-5">
      <div class="flex flex-column lg:flex-row w-full gap-4">
        <WidgetTotalPendapatan class="border-round border-1 surface-border surface-50 shadow-bottom" />
        <WidgetTotalPenyewaan class="border-round border-1 surface-border surface-50 shadow-bottom" />
      </div>
    </div>
    <div class="flex flex-wrap lg:flex-nowrap mt-5">
      <div class="flex flex-column lg:flex-row w-full gap-4">
        <WidgetStatusPenyewaan class="border-round border-1 surface-border surface-50 shadow-bottom" />
        <WidgetPendapatanCtgr class="border-round border-1 surface-border surface-50 shadow-bottom" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import WidgetStatusPenyewaan from '@/components/dashboard/WidgetStatusPenyewaan.vue';
import WidgetTotalPenyewaan from '@/components/dashboard/WidgetTotalPenyewaan.vue';
import WidgetPendapatanCtgr from '@/components/dashboard/WidgetPendapatanCtgr.vue';
import WidgetTotalPendapatan from '@/components/dashboard/WidgetTotalPendapatan.vue';

const theme = ref(localStorage.getItem('theme') || 'light');

onMounted(() => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    theme.value = storedTheme;
  }
});
</script>

<style>
.shadow-bottom {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
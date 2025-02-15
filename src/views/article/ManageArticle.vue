<template>
    <div class="surface-section px-4 pt-8 md:px-6 lg:px-8">
        <div class="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
            <div class="flex flex-column text-center md:text-left">
                <div class="flex align-items-center justify-content-center md:justify-content-start mb-2">
                    <span
                        class="border-circle w-3rem h-3rem flex align-items-center justify-content-center surface-100 mr-2">
                        <i class="bi bi-pencil-square text-900 text-3xl"></i>
                    </span> <span class="text-900 text-3xl font-medium">Artikel</span>
                </div>
                <span class="text-600 text-xl mb-3">Buat artikel yang informatif untuk para pengguna!</span>
            </div>
        </div>
        <section class="flex-wrap gap-3 justify-content-between">
            <TabView>
                <TabPanel>
                    <template #header>
                        <i class="mr-2 pi pi-book"></i>
                        <span class="font-medium">Kelola</span>
                    </template>
                    <p class="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                    </p>
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <i class="mr-2 pi pi-pencil"></i>
                        <span class="font-medium">Tulis</span>
                    </template>
                    <CreateArticle />
                </TabPanel>
            </TabView>
        </section>
    </div>

</template>

<script setup>
import { defineAsyncComponent, ref, onMounted, reactive, onUnmounted } from 'vue';
import Avatar from '@/components/Avatar.vue';
import { toCurrencyLocale } from '@/utils/currency';
import { useManageTransactionStore } from '@/stores/manage-transaction.store';
import { YYYYMMDDtoDMMMMYYYY } from '@/utils/date-convert';
import CreateArticle from './CreateArticle.vue';

const context = useManageTransactionStore();
</script>

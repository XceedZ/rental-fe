<template>
    <Dialog :visible="visible" @update:visible="onHide" dismissableMask modal :showHeader="false"
        :breakpoints="{ '960px': '75vw', '640px': '100vw' }" :style="{ width: '40vw', minWidth: '350px' }"
        contentClass="border-round-top p-0" appendTo="body" :data-theme="theme">
        <div class="flex w-full surface-section align-items-center justify-content-between px-1">
            <span class="p-input-icon-left w-full">
                <IconField iconPosition="left" class="w-full">
                    <InputIcon class="pi pi-search"> </InputIcon>
                    <InputText ref="input1" type="text" placeholder="Cari sesuatu..." v-model="search"
                        class="w-full border-none shadow-none outline-none" />
                </IconField>
            </span>
        </div>
        <div v-if="filteredArticles.length === 0" class="p-3 text-center text-500">
            <p>Tidak ada hasil untuk "{{ search }}"</p>
        </div>
        <div class="p-2">
            <article v-for="article in filteredArticles" :key="article.name"
                class="flex w-full justify-content-between align-items-center mb-3 select-none cursor-pointer surface-border hover:surface-hover border-round-lg px-2 py-1 text-800 hover:text-primary"
                @click="handleArticleClick(article)">
                <div class="flex align-items-center">
                    <span
                        class="border-circle w-2rem h-2rem flex align-items-center justify-content-center surface-100">
                        <i :class="article.iconClass"></i>
                    </span>
                    <div class="ml-2">
                        <p class="font-semibold text-sm mt-0 mb-1">{{ article.name }}</p>
                        <p class="font-normal text-xs text-600 mt-0 mb-0">{{ article.description }}</p>
                    </div>
                </div>
            </article>
        </div>
    </Dialog>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { switchTheme, initializeTheme } from '@/utils/theme-switcher';

const router = useRouter();
const context = useAuthStore();
const isDarkMode = ref(false);
const search = ref('');
const visible = ref(true);
const emit = defineEmits();
const theme = ref(localStorage.getItem('theme') || 'light');

const articles = computed(() => {
    return [
        { name: 'Sewa Kamera & Aksesori', description: 'Temukan kamera & aksesori', iconClass: 'pi pi-warehouse', onClick: () => router.push({ name: 'home' }) },
        { name: 'Riwayat Sewa', description: 'Lihat riwayat penyewaan', iconClass: 'bi bi-receipt-cutoff', onClick: () => router.push({ name: 'history' }) },
        { name: 'Pengaturan', description: 'Ubah pengaturan aplikasi', iconClass: 'pi pi-cog', onClick: () => router.push({ name: 'settings' }) },
        {
            name: isDarkMode.value ? 'Mode Terang' : 'Mode Gelap',
            description: isDarkMode.value ? 'Beralih ke mode terang agar tampilan lebih cerah' : 'Beralih ke mode gelap supaya mata terlindungi',
            iconClass: isDarkMode.value ? 'pi pi-sun' : 'pi pi-moon',
            onClick: () => switchTheme(isDarkMode, theme)
        },
        { name: 'Keluar', description: 'Akhiri sesi', iconClass: 'pi pi-sign-out', onClick: logout }
    ];
});

const logout = async () => {
    await context.logout();
};

const filteredArticles = computed(() => {
    return articles.value.filter(article =>
        article.name.toLowerCase().includes(search.value.toLowerCase()) ||
        article.description.toLowerCase().includes(search.value.toLowerCase())
    );
});

function handleArticleClick(article) {
    visible.value = false;
    article.onClick();
    emit('update:visible', false);
}

onMounted(() => {
    initializeTheme(isDarkMode, theme);
});
</script>
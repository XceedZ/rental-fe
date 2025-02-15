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
            <TabView lazy :active-index="context.activeTab" @tab-change="handleTabChange">
                <TabPanel>
                    <template #header>
                        <i class="mr-2 pi pi-book"></i>
                        <span class="font-medium">Kelola</span>
                    </template>
                    <ManageArticle />
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
import CreateArticle from './CreateArticle.vue';
import ManageArticle from './ManageArticle.vue';
import { useManageArticleStore } from '@/stores/article/manage-article.store';
import { useCreateArticleStore } from '@/stores/article/create-article.store';

const context = useManageArticleStore();
const createContext = useCreateArticleStore();

const handleTabChange = (e) => {
    context.changeTab(e.index);
    if (e.index === 0) {
        createContext.resetInput();
        context.setIsEdit(false);
    } else if (e.index === 1) {
        createContext.resetInput();
        context.setArticleData(null);
        context.setIsEdit(false);
    }
};
</script>

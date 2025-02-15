<template>
    <div class="flex flex-column text-center md:text-left mt-3">
        <div class="flex align-items-center justify-content-center md:justify-content-start mb-2">
            <span class="p-input-icon-right mb-2 md:mt-0 md:mb-0 w-full lg:w-25rem">
                <IconField iconPosition="left">
                    <InputIcon class="pi pi-search"> </InputIcon>
                    <InputText v-model="context.keyword" placeholder="Penulis / Judul Artikel" class="w-full"
                        @keyup.enter="context.getArticleBlog" />
                </IconField>
            </span>
        </div>
        <section class="flex-wrap gap-3 justify-content-between">
            <Divider class="w-full"></Divider>
            <div class="mt-3">
                <DataTable scrollable scrollHeight="500px" :value="context.dataTable"
                    :tabStyle="{ 'min-width': '60rem' }" rowHover>
                    <template #empty>
                        <p class="text-center w-full">Data tidak tersedia</p>
                    </template>
                    <Column header="#" class="font-semibold text-sm text-color-secondary">
                        <template #body="slotProps">
                            <Skeleton v-if="context.loading['getArticleBlog']" width="2rem" height="1rem"
                                class="mb-2" />
                            <span v-else>{{ slotProps.index + 1 }}</span>
                        </template>
                    </Column>
                    <Column style="min-width:25rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Penulis</span>
                        </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-3">
                                <Skeleton v-if="context.loading['getArticleBlog']" width="2.5rem" height="2.5rem"
                                    shape="circle" class="mb-2" />
                                <Avatar v-else :name="data.author_name" alt="User Avatar" style="height: 2.5rem;" />
                                <div>
                                    <Skeleton v-if="context.loading['getArticleBlog']" width="10rem" height="1rem"
                                        class="mb-2" />
                                    <p v-else class="mt-0 mb-2 font-medium text-lg text-color-primary">{{
                                        data.author_name }}
                                    </p>
                                    <Skeleton v-if="context.loading['getArticleBlog']" width="8rem" height="1rem"
                                        class="mb-2" />
                                    <p v-else class="mt-0 mb-2 font-normal text-base text-color-secondary">{{ data.email
                                        }}</p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column style="min-width:20rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Judul Artikel</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getArticleBlog']" class="h-1rem w-full"></Skeleton>
                            <p v-else class="font-normal text-base text-color-secondary">{{ data.title }}</p>
                        </template>
                    </Column>
                    <Column style="min-width:20rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Konten</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getArticleBlog']" class="h-1rem w-full"></Skeleton>
                            <ShowMore v-else :content="data.content" :maxLength="50" />
                        </template>
                    </Column>
                    <Column style="min-width:20rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">URL</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getArticleBlog']" class="h-1rem w-full"></Skeleton>
                            <router-link v-else
                                :to="{ name: 'articleDetail', params: { title: data.title, articleBlogId: data.article_blog_id } }"
                                class="font-normal text-base text-primary">
                                {{ `${VITE_ARTICLE_URL}${data.title}-${data.article_blog_id}` }}
                            </router-link>
                        </template>
                    </Column>
                    <Column style="min-width:14rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Tanggal Ditulis</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getArticleBlog']" class="h-1rem w-full"></Skeleton>
                            <p v-else class="font-normal text-base text-color-secondary">{{ data.created_at }}
                            </p>
                        </template>
                    </Column>
                    <Column style="min-width:14rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Pembaruan Terakhir</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getArticleBlog']" class="h-1rem w-full"></Skeleton>
                            <p v-else class="font-normal text-base text-color-secondary">{{ data.updated_at }}
                            </p>
                        </template>
                    </Column>
                    <Column style="min-width:8rem">
                        <template #body="{ data }">
                            <Button type="button" icon="pi pi-ellipsis-v" class="p-button-text p-button-secondary"
                                @click="$refs['menu-' + data.article_blog_id].toggle($event)"></Button>
                            <Menu :ref="'menu-' + data.article_blog_id" appendTo="body" popup
                                :model="getMenuItems(data)">
                            </Menu>
                        </template>
                    </Column>
                </DataTable>
                <Paginator :rows="context.defaultRows" :rowsPerPageOptions="context.rowPerPageOptions"
                    :totalRecords="context.totalRecords" :first="context.limit" @page="context.onPage($event)" />
            </div>
        </section>
        <DialogConfirm v-if="showDialogConfirm" visible="showDialogConfirm" :acceptLabel="'Hapus'"
            :onAccept="confirmDelete" :onReject="cancelDelete" :header="confirmHeader" :message="confirmMessage"
            :acceptLoading="context.loading['removeArticle']" />
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue';
import { useManageArticleStore } from '@/stores/article/manage-article.store';
import ShowMore from '@/components/ShowMore.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const context = useManageArticleStore();
const DialogConfirm = defineAsyncComponent(() => import('@/components/DialogConfirm.vue'));
const showDialogConfirm = ref(false);
const selectedArticleId = ref(null);
const confirmHeader = ref('');
const confirmMessage = ref('');
const emit = defineEmits();

const handleEditArticle = (data) => {
    context.setArticleData(data);
    context.setIsEdit(true);
    context.setActiveTab(1);
};

const getMenuItems = (data) => {
    return [
        {
            label: 'Pilihan',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-pencil',
                    command: () => {
                        handleEditArticle(data);
                    }
                },
                {
                    label: 'Hapus',
                    icon: 'pi pi-trash',
                    command: () => {
                        selectedArticleId.value = data.article_blog_id;
                        confirmHeader.value = 'Konfirmasi Hapus';
                        confirmMessage.value = `Apakah Anda yakin ingin menghapus artikel ${data.title}?`;
                        showDialogConfirm.value = true;
                    }
                }
            ]
        }
    ];
};

const confirmDelete = async () => {
    const result = await context.removeArticle(selectedArticleId.value);
    if (result.isOk) {
        emit('update:visible', false);
    }
};

const cancelDelete = () => {
    showDialogConfirm.value = false;
};

const getFullImageUrl = (urlImg) => {
    return `${import.meta.env.VITE_SUPABASE_STORAGE_URL}${urlImg}`;
};

const VITE_ARTICLE_URL = import.meta.env.VITE_ARTICLE_URL;

onMounted(async () => {
    await context.getArticleBlog();
});
</script>

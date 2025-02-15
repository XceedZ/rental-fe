<template>
    <div class="flex flex-column sm:flex-row gap-4">
        <div class="flex-1">
            <div class="mb-4 mt-4">
                <FloatLabel>
                    <InputText id="header" v-model="title" />
                    <label for="header">Judul Artikel</label>
                </FloatLabel>
            </div>
            <div class="mb-4">
                <FileUpload invalidFileLimitMessage="Melewati batas unggahan maksimum file"
                    invalidFileSizeMessage="Ukuran file terlalu besar" :showUploadButton="false" chooseLabel="Pilih"
                    cancelLabel="Batal" name="demo[]" @select="onFileSelect" :multiple="false" accept="image/*"
                    :maxFileSize="2000000" previewWidth="100" fileLimit="1">
                    <template #empty>
                        <p>Seret dan taruh file ke sini untuk mengunggah.</p>
                    </template>
                </FileUpload>
            </div>
            <Editor v-model="value" editorStyle="height: 500px" />
            <Button :label="buttonLabel" icon="pi pi-check" class="mt-4"
                :loading="createContext.loading['createArticle']" @click="handleCreateArticle" />
        </div>
        <div class="flex-1 border-1 border-round surface-border mt-4 sm:mt-0">
            <div class="surface-card p-4 shadow-2 border-round">
                <div class="mb-3 flex flex-column md:flex-row md:align-items-center md:justify-content-between">
                    <div class="flex align-items-start">
                        <i class="mr-3 pi pi-desktop text-2xl"></i>
                        <div>
                            <div class="text-xl font-medium text-900 mb-2">Pratinjau</div>
                            <div class="font-medium text-500 mb-3 text-sm">Lihat bagaimana artikel Anda akan tampil
                                setelah
                                diposting.</div>
                        </div>
                    </div>
                </div>
                <Divider class="w-full"></Divider>
            </div>
            <ScrollPanel style="width: 100%; height: 877px; margin-top: -2rem;">
                <ArticleDetail :title="title" :content="value" :imageUrl="imageUrl" :isPreview="true" />
            </ScrollPanel>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useCreateArticleStore } from '@/stores/article/create-article.store';
import { useManageArticleStore } from '@/stores/article/manage-article.store';
import ArticleDetail from './ArticleDetail.vue';
import local from "@/utils/local-storage";
import defaultImage from '@/assets/content-3.svg';

const title = ref('');
const selectedFiles = ref([]);
const value = ref('');
const imageUrl = ref(defaultImage);
const createContext = useCreateArticleStore();
const manageContext = useManageArticleStore();
const isEdit = ref(false);

const getFullImageUrl = (urlImg) => {
    return `${import.meta.env.VITE_SUPABASE_STORAGE_URL}${urlImg}`;
};

watch(
    () => manageContext.getArticleData(),
    (articleData) => {
        console.log('artikel:', articleData);
        if (articleData) {
            isEdit.value = true;
            title.value = articleData.title;
            value.value = articleData.content;
            imageUrl.value = getFullImageUrl(articleData.url_img);
        }
    },
    { immediate: true }
);

const buttonLabel = computed(() => (isEdit.value ? 'Simpan Perubahan' : 'Buat Artikel'));

const onFileSelect = (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        imageUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
    selectedFiles.value = event.files;
};

const handleCreateArticle = async () => {
    const formData = new FormData();
    formData.append('user_id', local.getUser().id);
    formData.append('title', title.value);
    formData.append('content', value.value);
    selectedFiles.value.forEach((file) => {
        formData.append('urlImg', file);
    });
    if (isEdit.value) {
        await createContext.updateArticle(manageContext.getArticleData().article_blog_id, formData);
    } else {
        await createContext.createArticle(formData);
    }
};
</script>

<style scoped>
:deep(.p-editor-content img) {
    max-width: 50%;
    height: auto;
    display: block;
    margin: 10px auto;
}
</style>
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
            <Button label="Buat Artikel" icon="pi pi-check" class="mt-4" :loading="context.loading['createArticle']"
                @click="handleCreateArticle" />
        </div>
        <div class="flex-1 border-1 border-round surface-border pl-4 mt-4 sm:mt-0">
            <ArticleDetail :title="title" :content="value" :imageUrl="imageUrl" :isPreview="true" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useCreateArticleStore } from '@/stores/article/create-article.store';
import ArticleDetail from './ArticleDetail.vue';
import local from "@/utils/local-storage";

const title = ref('');
const selectedFiles = ref([]);
const value = ref('');
const imageUrl = ref('http://semar.taskhub.id:4444/images/blocks/content/content-3.svg');
const context = useCreateArticleStore();

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
    await context.createArticle(formData);
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
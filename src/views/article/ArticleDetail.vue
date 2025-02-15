<template>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div v-if="isPreview"
            class="py-4 text-center md:text-left border-round bg-cover h-20rem lg:h-30rem flex flex-column justify-content-end mb-5"
            :style="{ background: `url(${imageUrl})` }">
            <div class="grid">
                <div class="col lg:col-offset-2 px-5">
                    <div class="text-5xl font-bold text-white">{{ title }}</div>
                    <p class="line-height-3 text-white text-lg text-center md:text-left mt-3">Diposting oleh {{
                        user.name}}
                    </p>
                </div>
            </div>
        </div>
        <div v-else
            class="py-4 text-center md:text-left border-round bg-cover h-20rem lg:h-30rem flex flex-column justify-content-end mb-5"
            :style="{ background: `url(${article?.url_img ? getFullImageUrl(article.url_img) : imageUrl})` }">
            <div class="grid">
                <div class="col lg:col-offset-2 px-5">
                    <div class="text-5xl font-bold text-white">{{ article?.title }}</div>
                    <p class="line-height-3 text-white text-lg text-center md:text-left mt-3">Diposting {{
                        toDMMMYYYY(article?.created_at) }} oleh {{ article?.author_name }}</p>
                </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-12 lg:col lg:px-5">
                <div class="flex flex-wrap align-items-center justify-content-between mb-5 gap-5">
                    <div class="flex flex-row">
                        <!-- <span
                            class="text-900 surface-100 inline-flex font-semibold py-2 px-3 mr-2 border-round">New</span>
                        <span
                            class="text-900 surface-100 inline-flex font-semibold py-2 px-3 mr-2 border-round">Technology</span>
                        <span
                            class="text-900 surface-100 inline-flex font-semibold py-2 px-3 border-round">Education</span> -->
                    </div>
                    <div class="flex align-items-center gap-4">
                        <i class="pi pi-twitter cursor-pointer"></i>
                        <i class="pi pi-facebook cursor-pointer"></i>
                        <Button icon="pi pi-share-alt" class="p-button-rounded p-button-outlined"
                            @click="handleShare"></Button>
                    </div>
                </div>
                <div class="article-content line-height-3 text-xl text-900 mb-5"
                    v-html="isPreview ? content : article?.content"></div>
            </div>
            <div v-if="!isPreview" class="col-12 lg:col-3 lg:border-left-1 surface-border">
                <div class="p-3">
                    <span class="text-900 font-medium text-xl block mb-5">Postingan Lainnya</span>
                    <div v-for="otherArticle in otherArticles" :key="otherArticle.article_blog_id" class="flex pb-4">
                        <img :src="getFullImageUrl(otherArticle.url_img)" class="mr-3 h-5rem w-5rem" />
                        <div class="flex flex-column align-items-start">
                            <span class="text-lg text-900 font-medium mb-1 hover:underline cursor-pointer"
                                @click="goToArticleDetail(otherArticle.title, otherArticle.article_blog_id)">{{
                                    otherArticle.title }}</span>
                            <span class="text-600 font-medium mb-2"
                                v-html="otherArticle.content.substring(0, 150) + '...'"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDetailArticleStore } from '@/stores/article/detail-article.store';
import { toDMMMYYYY } from '@/utils/date-convert';
import { useRouter } from 'vue-router';
import local from '@/utils/local-storage';
import { shareContent } from '@/utils/web-share';

const user = local.getUser();
const router = useRouter();
const props = defineProps({
    title: {
        type: String,
        default: 'Create Your Own PrimeBlock with Built-in Dark Mode'
    },
    content: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: 'http://semar.taskhub.id:4444/images/blocks/content/content-4.png'
    },
    isPreview: {
        type: Boolean,
        default: false
    }
});

const route = useRoute();
const context = useDetailArticleStore();
const article = ref(null);
const otherArticles = ref([]);

const getFullImageUrl = (urlImg) => {
    return `${import.meta.env.VITE_SUPABASE_STORAGE_URL}${urlImg}`;
};

onMounted(async () => {
    if (!props.isPreview) {
        const articleBlogId = route.params.articleBlogId;
        await context.getArticleDetail(articleBlogId);
        article.value = context.article;
        otherArticles.value = context.otherArticles;
    }
});

watch(() => props.imageUrl, (newUrl) => {
    if (props.isPreview) {
        article.value = { ...article.value, url_img: newUrl };
    }
});

function goToArticleDetail(title, articleBlogId) {
    router.push({ name: 'articleDetail', params: { title, articleBlogId } }).then(() => {
        context.getArticleDetail(articleBlogId).then(() => {
            article.value = context.article;
            otherArticles.value = context.otherArticles;
        });
    });
}

function handleShare() {
    shareContent({
        title: props.title,
        text: props.content,
        url: window.location.href
    });
}
</script>

<style scoped>
img {
    max-width: 100%;
    height: auto;
}

.article-content {
    overflow: hidden;
    word-wrap: break-word;
    width: 100%;
    /* Tambahkan ini */
}

:deep(.article-content) img {
    max-width: 100% !important;
    height: auto !important;
    display: block;
    margin: 10px auto;
    object-fit: contain;
    box-sizing: border-box;
    /* Tambahkan ini */
}

@media screen and (max-width: 768px) {
    :deep(.article-content) img {
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 10px;
    }
}

html,
body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
}
</style>
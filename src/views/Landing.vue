<template>
    <div class="surface-section md:px-6 lg:px-8">
        <div
            class="flex flex-column md:flex-row justify-content-between align-items-center mb-4 w-full overflow-hidden	">
            <div class="grid grid-nogutter surface-section text-800 w-full">
                <div class="col-12 p-6 text-center md:text-left flex flex-column md:flex-row align-items-center w-full"
                    v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }">
                    <section class="order-2 md:order-1">
                        <span
                            class="block text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-1 break-words">Abadikan
                            momen</span>
                        <div
                            class="text-3xl sm:text-4xl md:text-6xl lg:text-6xl text-primary font-bold mb-3 break-words">
                            dengan Landscapeaero!</div>
                        <p
                            class="mt-0 mb-4 text-700 line-height-3 text-sm sm:text-base md:text-lg lg:text-xl break-words">
                            Murah. Terpercaya. Aman. Mudah. Lengkap!
                        </p>
                        <Button label="Memulai" icon="pi pi-arrow-right" iconPos="right" type="button" class="mr-3"
                            @click="goToHome"></Button>
                        <Button :icon="isDarkMode ? 'pi pi-sun' : 'bi bi-moon-stars'" iconPos="right" type="button"
                            class="mr-3 p-button-text" @click="toggleTheme"></Button>
                    </section>
                    <div
                        class="col-12 md:col-6 overflow-hidden md:mt-0 mt-4 order-1 md:order-2 w-auto ml-8 flex justify-center">
                        <img :src="getFullImageUrl('rental-ukk/hero-1.png')" alt="Image"
                            class="md:ml-auto block md:h-full"
                            style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%);">
                    </div>
                </div>
                <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
                    <div class="grid">
                        <div class="col-12 lg:col-6 p-4 flex flex-column"
                            v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }">
                            <p class="text-600 font-medium text-xl">Kenapa Memilih Kami?</p>
                            <div class="text-900 font-bold text-3xl mt-2">Pengalaman Potret</div>
                            <p class="text-600 text-xl mt-3 mb-5 line-height-3">Dapatkan pengalaman memotret terbaik
                                dengan kamera berkualitas tinggi yang tersedia untuk disewa dengan harga terjangkau.</p>
                            <Accordion expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
                                <AccordionTab header="Beragam Pilihan Kamera & Aksesori">
                                    <ul class="list-none">
                                        <li class="text-600 line-height-3 flex align-items-center mb-4"><i
                                                class="pi pi-circle-fill mr-3" style="font-size:7px;"></i>Temukan
                                            berbagai jenis kamera, mulai dari DSLR, mirrorless, hingga action cam sesuai
                                            kebutuhan Anda.</li>
                                        <li class="text-600 line-height-3 flex align-items-center my-4"><i
                                                class="pi pi-circle-fill mr-3" style="font-size:7px;"></i>Kami juga
                                            menyediakan lensa, tripod, drone, dan perlengkapan lainnya.</li>
                                        <li class="text-600 line-height-3 flex align-items-center my-4"><i
                                                class="pi pi-circle-fill mr-3" style="font-size:7px;"></i>Pilih paket
                                            sewa fleksibel, mulai dari harian hingga bulanan.</li>
                                    </ul>
                                </AccordionTab>
                                <AccordionTab header="Layanan Terpercaya & Mudah">
                                    <ul class="list-none">
                                        <li class="text-600 line-height-3 flex align-items-center mb-4"><i
                                                class="pi pi-circle-fill mr-3" style="font-size:7px;"></i>Proses
                                            pemesanan cepat dan tanpa ribet.</li>
                                        <li class="text-600 line-height-3 flex align-items-center my-4"><i
                                                class="pi pi-circle-fill mr-3" style="font-size:7px;"></i>Unit selalu
                                            dicek sebelum dikirim untuk memastikan kualitas terbaik.</li>
                                        <li class="text-600 line-height-3 flex align-items-center my-4"><i
                                                class="pi pi-circle-fill mr-3" style="font-size:7px;"></i>Bisa dikirim
                                            langsung ke lokasi atau diambil di store kami.</li>
                                    </ul>
                                </AccordionTab>
                                <AccordionTab header="Harga Terjangkau & Promo Menarik">
                                    <ul class="list-none">
                                        <li class="text-600 line-height-3 flex align-items-center mb-4"><i
                                                class="pi pi-circle-fill mr-3" style="font-size:7px;"></i>Nikmati harga
                                            sewa yang kompetitif dengan berbagai pilihan paket.</li>
                                        <li class="text-600 line-height-3 flex align-items-center my-4"><i
                                                class="pi pi-circle-fill mr-3" style="font-size:7px;"></i>Dapatkan promo
                                            spesial untuk pelanggan baru dan langganan.</li>
                                        <li class="text-600 line-height-3 flex align-items-center my-4"><i
                                                class="pi pi-circle-fill mr-3" style="font-size:7px;"></i>Garansi
                                            keamanan dan dukungan teknis selama masa sewa.</li>
                                    </ul>
                                </AccordionTab>
                            </Accordion>
                        </div>
                        <div class="col-12 lg:col-6 p-4"
                            v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }">
                            <img v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }"
                                src="https://images.pexels.com/photos/821653/pexels-photo-821653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                class="w-full border-round" alt="product">
                        </div>
                    </div>
                </div>

                <div class="surface-section w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">
                    <p class="text-600 font-medium text-xl text-center"
                        v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }">
                        Produk Populer</p>
                    <div class="text-900 font-bold text-3xl text-center mt-4"
                        v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }">Rekomendasi Kamera Terbaik
                    </div>
                    <p class="text-600 font-medium text-xl text-center mt-4"
                        v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }">Jelajahi pilihan kamera
                        favorit yang cocok untuk
                        berbagai kebutuhan fotografi dan videografi.</p>

                    <Carousel :value="products" :numVisible="4" :numScroll="1" :autoplayInterval="3000"
                        :responsiveOptions="responsiveOptions" class="flex">
                        <template #item="slotProps">
                            <div class="p-4 flex flex-column text-center">
                                <img v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }"
                                    :src="getFullImageUrl(slotProps.data.urlImg)" alt="product"
                                    class="carousel-image mx-auto cursor-pointer" @click="goToProduct(slotProps.data.productCode)">
                                <div class="text-900 text-xl mt-4">{{ slotProps.data.productName }}</div>
                                <p class="text-600 mt-3 line-height-3 truncate">{{ slotProps.data.desc }}</p>
                            </div>
                        </template>
                    </Carousel>
                </div>

                <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
                    <p class="text-600 font-medium text-xl text-center"
                        v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }">
                        Kemudahan Dalam</p>
                    <div class="text-900 font-bold text-3xl text-center mt-4"
                        v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }">Transaksi &
                        Pembayaran</div>
                    <p class="text-600 font-medium text-xl text-center mt-4"
                        v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }">Nikmati
                        pengalaman transaksi yang aman, cepat, dan praktis untuk mendukung kebutuhan fotografi dan
                        videografi Anda.</p>

                    <div class="grid mt-8">
                        <div class="col-12 md:col-6 lg:col-3 payment-img-container">
                            <div class="flex align-items-center justify-content-center p-3 mb-3">
                                <img src="../assets/bca.png" alt="Image" height="50" class="payment-img">
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-3 payment-img-container">
                            <div class="flex align-items-center justify-content-center p-3">
                                <img src="../assets/mandiri.png" alt="Image" height="50" class="payment-img">
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-3 payment-img-container">
                            <div class="flex align-items-center justify-content-center p-3">
                                <img src="../assets/bni.png" alt="Image" height="50" class="payment-img">
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-3 payment-img-container">
                            <div class="flex align-items-center justify-content-center p-3">
                                <img src="../assets/bri.png" alt="Image" height="50" class="payment-img">
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-3 payment-img-container">
                            <div class="flex align-items-center justify-content-center p-3">
                                <img src="../assets/qris.png" alt="Image" height="50" class="payment-img">

                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-3 payment-img-container">
                            <div class="flex align-items-center justify-content-center p-3">
                                <img src="../assets/ovo.png" alt="Image" height="50" class="payment-img">
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-3 payment-img-container">
                            <div class="flex align-items-center justify-content-center p-3">
                                <img src="../assets/dana.png" alt="Image" height="50" class="payment-img">
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-3 payment-img-container">
                            <div class="flex align-items-center justify-content-center p-3">
                                <img src="../assets/gopay.png" alt="Image" height="50" class="payment-img">
                            </div>
                        </div>
                    </div>
                </div>

                <div v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }"
                    class="surface-section px-4 py-8 md:px-6 lg:px-8">
                    <div class="text-900 font-bold text-3xl text-center">📍 Lokasi Kami</div>
                    <p class="text-600 text-xl mt-3 line-height-3 text-center">Kunjungi store kami atau hubungi untuk
                        informasi lebih lanjut. Kami siap membantu Anda dengan berbagai pilihan kamera dan perlengkapan
                        fotografi terbaik!
                    </p>
                    <div class="grid mt-3 -mr-3 -ml-3">
                        <div class="col-12 p-3">
                            <iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0"
                                marginwidth="0"
                                src="https://maps.google.com/maps?width=660&amp;height=400&amp;hl=en&amp;q=landscapeaero&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                        </div>
                    </div>
                </div>
                <div class="surface-section px-4 py-8 md:px-6 lg:px-8 min-w-full">
                    <div class="flex justify-content-between align-items-center flex-wrap">
                        <p class="text-600 font-medium text-xl"
                            v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }">
                            Seputar Tips & Trick
                        </p>
                    </div>
                    <div class="text-900 font-bold text-3xl mb-6 md:mb-6 sm:mb-4 flex items-center flex-wrap">
                        <span>Postingan Artikel</span>
                        <div class="ml-auto w-full sm:w-auto xl:pr-6">
                            <IconField iconPosition="left" class="w-full mt-4 lg:mt-0 sm:mt-4">
                                <InputIcon class="pi pi-search"></InputIcon>
                                <InputText v-model="context.keyword" placeholder="Penulis / Judul Artikel"
                                    class="w-full" @keyup.enter="searchArticle" />
                            </IconField>
                        </div>
                    </div>
                    <div v-if="articles.length === 0"
                        class="flex flex-column align-items-center justify-content-center p-6 min-h-20rem">
                        <i class="pi pi-globe text-6xl text-primary mb-4"></i>
                        <h3 class="text-900 font-medium text-xl text-center mb-2">Tidak ada artikel yang ditemukan</h3>
                        <p class="text-600 mb-4 text-center">Coba ubah filter pencarian atau cari dengan kata kunci
                            lain.</p>
                        <Button label="Reset Filter" icon="pi pi-refresh" outlined @click="resetFilter" />
                    </div>
                    <div v-else>
                        <div class="flex flex-wrap">
                            <div class="w-full xl:w-6 pr-0 xl:pr-6"
                                v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }"
                                v-for="article in articles" :key="article.article_blog_id">
                                <img :src="getFullImageUrl(article.url_img)" alt="Image"
                                    class="w-full border-round cursor-pointer" style="height: 250px; object-fit: cover;"
                                    @click="goToArticleDetail(article.title, article.article_blog_id)" />
                                <div class="flex align-items-center mt-4"
                                    v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }">
                                    <span class="text-900 font-medium text-xl white-space-nowrap">{{ article.author_name
                                    }}</span>
                                    <span class="text-500 font-medium text-xl mx-3">|</span>
                                    <span class="text-500 font-medium text-xl white-space-nowrap">{{
                                        toMMMDD(article.created_at) }}</span>
                                </div>
                                <div class="text-900 font-bold text-2xl mt-4 hover:underline cursor-pointer"
                                    @click="goToArticleDetail(article.title, article.article_blog_id)">{{ article.title
                                    }}
                                </div>
                                <p class="line-height-3 text-700 my-4"
                                    v-html="article.content.substring(0, 500) + '...'">
                                </p>
                            </div>
                        </div>
                        <div class="flex justify-content-center mt-6" v-if="!allArticlesLoaded">
                            <Button outlined icon="pi pi-sync" label="Muat Lebih Banyak"
                                :loading="context.loading['getArticleBlog']" @click="loadMoreArticles"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useLandingStore } from '@/stores/landing.store';
import { toMMMDD } from '@/utils/date-convert';
import { useRouter } from 'vue-router';
import { switchTheme, initializeTheme } from '@/utils/theme-switcher';

const context = useLandingStore();
const responsiveOptions = ref([
    { breakpoint: '1400px', numVisible: 4, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 }
]);

const router = useRouter();
const isDarkMode = ref(false);
const theme = ref(localStorage.getItem('theme') || 'light');
const products = ref([]);
const articles = ref([]);
const allArticlesLoaded = ref(false);

function goToHome() {
    router.push({ name: 'home' });
}

function goToProduct(productCode) {
    router.push({ name: 'product', params: { productCode } });
}

onMounted(async () => {
    await context.getPopularProducts();
    products.value = context.popularProducts;
    await context.getArticleBlog();
    articles.value = context.articles;
    initializeTheme(isDarkMode, theme);
});

const getFullImageUrl = (urlImg) => {
    return `${import.meta.env.VITE_SUPABASE_STORAGE_URL}${urlImg}`;
};

function toggleTheme() {
    switchTheme(isDarkMode, theme);
    document.body.classList.toggle('dark-theme', isDarkMode.value);
}

function goToArticleDetail(title, articleBlogId) {
    router.push({ name: 'articleDetail', params: { title, articleBlogId } });
}

async function searchArticle() {
    await context.getArticleBlog();
    articles.value = context.articles;
}

async function loadMoreArticles() {
    context.limit = 999;
    await context.getArticleBlog();
    articles.value = context.articles;
    allArticlesLoaded.value = true;
}

function resetFilter() {
    context.keyword = "";
    searchArticle();
}
</script>

<style scoped>
.product-card {
    margin: 0 0.5rem;
}

.mapouter {
    position: relative;
    text-align: right;
    width: 100%;
    height: 400px;
}

.gmap_canvas {
    overflow: hidden;
    background: none !important;
    width: 100%;
    height: 400px;
}

.gmap_iframe {
    height: 400px !important;
}

.payment-img {
    transition: filter 0.2s ease-in-out;
}

.truncate {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}

.carousel-image {
    width: auto;
    max-width: 100%;
    height: 200px;
    object-fit: contain;
}


@media (max-width: 767px) {
    .payment-img-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .payment-img {
        height: 50px;
        max-width: 100%;
    }

    @media (max-width: 768px) {
        .grid.mt-8 {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .payment-img-container {
            width: 50%;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
        }

        .payment-img {
            height: 35px;
        }
    }
}
</style>

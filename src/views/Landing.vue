<template>
    <div class="surface-section md:px-6 lg:px-8">
        <div
            class="flex flex-column md:flex-row justify-content-between align-items-center mb-4 w-full overflow-hidden	">
            <div class="grid grid-nogutter surface-section text-800 w-full">
                <div v-animateonscroll="{ enterClass: 'fadein' }"
                    class="col-12 p-6 text-center md:text-left flex flex-column md:flex-row align-items-center w-full">
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
                        <img v-animateonscroll="{ enterClass: 'fadein' }"
                            :src="getFullImageUrl('rental-ukk/hero-1.png')" alt="Image"
                            class="md:ml-auto block md:h-full"
                            style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%);">
                    </div>
                </div>
                <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
                    <div class="grid">
                        <div class="col-12 lg:col-6 p-4 flex flex-column" v-animateonscroll="{ enterClass: 'fadein' }">
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
                        <div class="col-12 lg:col-6 p-4" v-animateonscroll="{ enterClass: 'fadein' }">
                            <img v-animateonscroll="{ enterClass: 'fadein' }"
                                src="https://images.pexels.com/photos/821653/pexels-photo-821653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                class="w-full border-round" alt="product">
                        </div>
                    </div>
                </div>

                <div class="surface-section w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">
                    <p class="text-600 font-medium text-xl text-center" v-animateonscroll="{ enterClass: 'fadein' }">
                        Produk Populer</p>
                    <div class="text-900 font-bold text-3xl text-center mt-4"
                        v-animateonscroll="{ enterClass: 'fadein' }">Rekomendasi Kamera Terbaik</div>
                    <p class="text-600 font-medium text-xl text-center mt-4"
                        v-animateonscroll="{ enterClass: 'fadein' }">Jelajahi pilihan kamera favorit yang cocok untuk
                        berbagai kebutuhan fotografi dan videografi.</p>

                    <Carousel :value="products" :numVisible="4" :numScroll="1" :autoplayInterval="3000"
                        :responsiveOptions="responsiveOptions" class="flex">
                        <template #item="slotProps">
                            <div class="p-4 flex flex-column text-center">
                                <img v-animateonscroll="{ enterClass: 'fadein' }" :src="slotProps.data.image"
                                    alt="product" class="w-full h-full border-round">
                                <div class="text-900 text-xl mt-4">{{ slotProps.data.title }}</div>
                                <p class="text-600 mt-3 line-height-3">{{ slotProps.data.description }}</p>
                            </div>
                        </template>
                    </Carousel>
                </div>

                <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
                    <p class="text-600 font-medium text-xl text-center" v-animateonscroll="{ enterClass: 'fadein' }">
                        Kemudahan Dalam</p>
                    <div class="text-900 font-bold text-3xl text-center mt-4"
                        v-animateonscroll="{ enterClass: 'fadein' }">Transaksi &
                        Pembayaran</div>
                    <p class="text-600 font-medium text-xl text-center mt-4"
                        v-animateonscroll="{ enterClass: 'fadein' }">Nikmati
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

                <div v-animateonscroll="{ enterClass: 'fadein' }" class="surface-section px-4 py-8 md:px-6 lg:px-8">
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
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useLandingStore } from '@/stores/landing.store';
import { toCurrencyLocale } from '../utils/currency';
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
function goToHome() {
    router.push({ name: 'home' });
}

function goToProduct(productCode) {
    router.push({ name: 'product', params: { productCode } });
}

function handleScroll() {
    const bg = document.querySelector(".parallax-background");
    if (bg) {
        bg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    }
}

onMounted(async () => {
    window.addEventListener('scroll', handleScroll);
    // await context.getProducts();
    // products.value = context.dataTable.slice(0, 9);
    products.value = [
        {
            image: "http://semar.taskhub.id:4444/images/blocks/ecommerce/productfeature/product-features-1-4.png",
            title: "Facilisis gravida neque",
            description: "Produk kami dirancang untuk memenuhi kebutuhan Anda dengan kualitas terbaik dan harga yang kompetitif."
        },
        {
            image: "http://semar.taskhub.id:4444/images/blocks/ecommerce/productfeature/product-features-1-5.png",
            title: "Facilisis gravida neque",
            description: "Potenti nullam ac tortor vitae. Aliquet bibendum enim facilisis gravida neque convallis a cras semper."
        },
        {
            image: "http://semar.taskhub.id:4444/images/blocks/ecommerce/productfeature/product-features-1-6.png",
            title: "Facilisis gravida neque",
            description: "Potenti nullam ac tortor vitae. Aliquet bibendum enim facilisis gravida neque convallis a cras semper."
        },
        {
            image: "http://semar.taskhub.id:4444/images/blocks/ecommerce/productfeature/product-features-1-7.png",
            title: "Facilisis gravida neque",
            description: "Potenti nullam ac tortor vitae. Aliquet bibendum enim facilisis gravida neque convallis a cras semper."
        }
    ];
    initializeTheme(isDarkMode, theme);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

const getFullImageUrl = (urlImg) => {
    return `${import.meta.env.VITE_SUPABASE_STORAGE_URL}${urlImg}`;
};

function toggleTheme() {
    switchTheme(isDarkMode, theme);
    document.body.classList.toggle('dark-theme', isDarkMode.value);
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

.dark-theme .payment-img {
    filter: grayscale(100%);
}

.dark-theme .payment-img:hover {
    filter: grayscale(0%);
}

@media (max-width: 767px) {
    .payment-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.payment-img {
    height: 50px; /* Default height */
    max-width: 100%;
}

@media (max-width: 768px) {
    .grid.mt-8 {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .payment-img-container {
        width: 50%; /* Mengatur agar gambar tetap menyamping */
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }

    .payment-img {
        height: 35px; /* Ukuran lebih kecil di layar kecil */
    }
}
}
</style>

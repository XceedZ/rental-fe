<template>
    <div>
        <div class="parallax-container">
            <!-- Teks ada di belakang -->
            <div class="content">
                <span class="text-center font-semibold text-xs md:text-sm text-black-alpha-60 mb-4">ABADIKAN MOMEN
                    TERBAIKMU</span>
                <h3 class="text-center font-bold text-3xl md:text-6xl text-black-alpha-80 mt-0 mt-4">Sewa Kamera dengan
                    Mudah<br /> <span
                        style="background: radial-gradient(circle farthest-corner at center center, #CFCFCF 0%, #FFFFFF 80%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Kualitas
                        Terbaik, Harga Terjangkau</span></h3>
                <Button type="button" label="Sewa Sekarang" icon="pi pi-arrow-right" iconPos="right"
                    class="bg-gray-300 border-none hover:bg-gray-200 text-black-alpha-90 transition-linear transition-duration-200"
                    @click="goToHome" />
            </div>

            <!-- Gambar tetap di atas -->
            <div class="parallax-background"></div>
        </div>

        <div class="surface-section px-4 py-2 md:px-6 lg:px-8">
            <div class="text-center px-6 py-8">
                <div class="text-900 text-4xl font-semibold mb-3">Layanan Kami</div>
                <p class="text-700 text-xl my-0 line-height-3">Kami permudah untuk melakukan transaksi penyewaan barang
                    dengan berbagai kategori dan merk kamera lengkap.</p>
            </div>
            <div class="grid mb-4">
                <div class="col-12 md:col-4 mb-4 px-5">
                    <button
                        class="bg-bluegray-100 p-link p-3 shadow-2 mb-3 inline-block hover:bg-white hover:text-black transition-linear transition-duration-200"
                        style="border-radius: 10px">
                        <i class="pi pi-sign-in text-4xl"></i>
                    </button>
                    <div class="text-bluegray-500 mb-3 font-medium">Daftar / Masuk</div>
                    <div class="text-900 mb-3 font-medium text-xl">Hanya perlu mendaftar atau masuk</div>
                    <span class="text-600 line-height-3">Buat akun atau masuk, hanya dalam hitungan detik!</span>
                </div>
                <div class="col-12 md:col-4 mb-4 px-5">
                    <button
                        class="bg-bluegray-100 p-link p-3 shadow-2 mb-3 inline-block hover:bg-white hover:text-black transition-linear transition-duration-200"
                        style="border-radius: 10px">
                        <i class="pi pi-box text-4xl"></i>
                    </button>
                    <div class="text-bluegray-400 mb-3 font-medium">Pilih Barang</div>
                    <div class="text-900 mb-3 font-medium text-xl">Hanya satu kali ketuk</div>
                    <span class="text-600 line-height-3">Temukan kamera impianmu hanya dengan sekali klik!</span>
                </div>
                <div class="col-12 md:col-4 mb-4 px-5">
                    <button
                        class="bg-bluegray-100 p-link p-3 shadow-2 mb-3 inline-block hover:bg-white hover:text-black transition-linear transition-duration-200"
                        style="border-radius: 10px">
                        <i class="pi pi-shield text-4xl"></i>
                    </button>
                    <div class="text-bluegray-500 mb-3 font-medium">Pembayaran</div>
                    <div class="text-900 mb-3 font-medium text-xl">Bayar dengan metode apapun</div>
                    <span class="text-600 line-height-3">Nikmati kemudahan pembayaran dengan berbagai metode!</span>
                </div>
            </div>
        </div>

        <!-- Popular Items -->
        <div class="surface-section px-4 py-2 md:px-6 lg:px-8">
            <div class="card">
                <h3 class="text-900 text-4xl font-semibold mb-4">🔥 Produk Terlaris</h3>
                <Carousel :value="products" :numVisible="2" :numScroll="1" :responsiveOptions="responsiveOptions"
                    :autoplayInterval="3000">
                    <template #item="slotProps">
                        <div
                            class="p-4 border-1 surface-border surface-card border-round flex flex-column gap-2 product-card">
                            <div
                                class="surface-50 flex justify-content-center align-items-center border-round p-3 w-full h-10rem">
                                <div class="relative mx-auto">
                                    <img class="border-round w-full max-h-8rem"
                                        :src="getFullImageUrl(slotProps.data.urlImg)" :alt="slotProps.data.productName"
                                        style="max-width: 300px" />
                                </div>
                            </div>
                            <div class="pt-4">
                                <div class="flex flex-row justify-content-between align-items-start gap-2">
                                    <div class="relative w-full">
                                        <span class="font-semibold text-secondary text-sm">{{ slotProps.data.brandName
                                            }}</span>
                                        <span class="text-700 font-semibold text-sm mb-3">
                                            | {{
                                                slotProps.data.ctgrName }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-column gap-4 mt-4">
                                    <span class="text-2xl font-semibold text-900">{{
                                        toCurrencyLocale(slotProps.data.price)
                                        }}</span>
                                    <div class="flex gap-2">
                                        <Button icon="pi pi-shopping-cart" class="w-full" label="Lihat Detail" outlined
                                            @click="goToProduct(slotProps.data.productCode)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>
        </div>

        <!-- Google Maps -->
        <div class="surface-section px-4 py-2 md:px-6 lg:px-8">
            <h3 class="text-900 text-4xl font-semibold mb-4">Kunjungi Kami!</h3>
            <div class="mapouter">
                <div class="gmap_canvas border-round">
                    <iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0"
                        marginwidth="0"
                        src="https://maps.google.com/maps?width=660&amp;height=400&amp;hl=en&amp;q=landscapeaero&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
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

const context = useLandingStore();
const products = ref([]);
const responsiveOptions = ref([
    { breakpoint: '1400px', numVisible: 2, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 }
]);

const router = useRouter();

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
    await context.getProducts();
    products.value = context.dataTable.slice(0, 9);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

const getFullImageUrl = (urlImg) => {
    return `${import.meta.env.VITE_SUPABASE_STORAGE_URL}${urlImg}`;
};
</script>

<style scoped>
/* Container utama */
.parallax-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
}

.content {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 1;
}

.parallax-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 130%;
    background-image: url('../assets/pemandangan.jpg');
    background-size: cover;
    background-position: center;
    transition: transform 0.1s linear;
}

/* Add margin to product cards */
.product-card {
    margin: 0 0.5rem;
}

/* Google Maps styling */
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
</style>

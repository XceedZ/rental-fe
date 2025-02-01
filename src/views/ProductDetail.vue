<template>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div class="grid mb-7">
            <div class="col-12 lg:col-6">
                <div class="flex justify-content-center align-items-center h-full w-full">
                    <div class="flex flex-column align-items-center">
                        <Skeleton v-if="context.loading['getProducts']" width="100%" height="300px" />
                        <img v-else v-for="(image, i) of images2" :key="image" :src="context.selectedProduct.url_img"
                            class="w-full cursor-pointer border-2 border-round border-transparent transition-colors transition-duration-150"
                            :class="{ 'border-primary': selectedImageIndex2 === i }" @click="selectedImageIndex2 = i" />
                    </div>
                    <div class="pl-3 w-10">
                        <Skeleton v-if="context.loading['getProducts']" width="100%" height="300px" />
                        <img v-else :src="context.selectedProduct.url_img" class="w-full" />
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-6 py-3 lg:pl-6">
                <div class="flex align-items-center justify-content-between text-xl font-semibold text-900 mb-4">
                    <div>
                        <Skeleton v-if="context.loading['getProducts']" width="200px" height="30px" />
                        <template v-else>
                            {{ context.selectedProduct.brand_name }}
                            <span class="font-normal">| {{ context.selectedProduct.ctgr_name }}</span>
                        </template>
                    </div>
                    <Skeleton v-if="context.loading['getProducts']" width="100px" height="30px" />
                    <Tag v-else :severity="context.selectedProduct.active === 'Y' ? 'success' : 'danger'"
                        style="word-wrap: break-word;" class="p-2 text-xl ml-auto">
                        TERSISA: {{ context.selectedProduct.stock }}
                    </Tag>
                </div>
                <div class="flex align-items-center text-xl font-medium text-900 mb-4">
                    <Skeleton v-if="context.loading['getProducts']" width="300px" height="30px" />
                    <span v-else>{{ context.selectedProduct.product_name }}</span>
                </div>
                <div class="flex align-items-center justify-content-between mb-5">
                    <Skeleton v-if="context.loading['getProducts']" width="200px" height="30px" />
                    <span v-else class="text-900 font-medium text-3xl block">{{
                        toCurrencyLocale(context.selectedProduct.price) }} /
                        hari</span>
                </div>

                <div class="font-bold text-900 mb-3">Tanggal Penyewaan</div>
                <div class="flex align-items-center mb-5">
                    <Calendar showIcon v-model="dates" selectionMode="range" :manualInput="false" dateFormat="d M yy" />
                </div>

                <div class="font-bold text-900 mb-3">Quantity</div>
                <div class="flex flex-column sm:flex-row gap-2 sm:align-items-center sm:justify-content-between">
                    <InputNumber :showButtons="true" buttonLayout="horizontal" spinnerMode="horizontal" :min="1"
                        inputClass="w-3rem text-center" v-model="context.qty" decrementButtonClass="p-button-text"
                        incrementButtonClass="p-button-text" incrementButtonIcon="pi pi-plus"
                        decrementButtonIcon="pi pi-minus">
                    </InputNumber>
                    <div class="flex align-items-center flex-1 mt-3 sm:mt-0 ml-0 gap-2">
                        <Button v-if="isLoggedIn" outlined :loading="context.loading['addToCart']" icon="pi pi-cart-arrow-down"
                            label="Tambah Keranjang" class="flex-1" @click="addToCart"
                            :disabled="context.isActionDisabled"></Button>
                        <Button :loading="context.loading['createRental']" icon="pi pi-credit-card" label="Sewa Sekarang"
                            class="flex-1" @click="createRental"
                            :disabled="context.isActionDisabled"></Button>
                    </div>
                </div>
            </div>
        </div>

        <TabView>
            <TabPanel header="Deskripsi">
                <div class="text-900 font-medium text-3xl mb-4 mt-2">Deskripsi</div>
                <Skeleton v-if="context.loading['getProducts']" height="30px" />
                <p v-else class="line-height-3 text-700 p-0 mx-0 mt-0 mb-4">{{ context.selectedProduct.desc }}</p>
            </TabPanel>
            <TabPanel header="Syarat & Ketentuan">
                <div class="text-900 font-medium text-3xl mb-4 mt-2">Syarat & Ketentuan</div>
                <div class="grid">
                    <div class="col-12 lg:col-4">
                        <span class="text-900 block font-medium mb-3">Syarat</span>
                        <ul class="py-0 pl-3 m-0 text-700 mb-3">
                            <li class="mb-2">Barang yang disewa hanya boleh digunakan untuk keperluan pribadi dan tidak
                                diperbolehkan untuk disewakan kembali.</li>
                            <li class="mb-2">Pembayaran dilakukan di tempat serta memberikan jaminan.</li>
                        </ul>
                    </div>
                    <div class="col-12 lg:col-4">
                        <span class="text-900 block font-medium mb-3">Ketentuan</span>
                        <ul class="py-0 pl-3 m-0 text-700 mb-3">
                            <li class="mb-2"><span class="font-medium">Denda keterlambatan:</span> {{
                                context.selectedProduct.fine_bill
                                }}% dari harga sewa per hari.</li>
                            <li class="mb-2"><span class="font-medium">Pembatalan Penyewaan:</span> Penyewa yang
                                membatalkan pesanan kurang dari 1 hari sebelum tanggal penyewaan akan dikenakan biaya
                                pembatalan sebesar 10% dari total harga sewa.</li>
                            <li class="mb-2"><span class="font-medium">Harga dan Pembayaran:</span> Harga penyewaan
                                barang
                                dihitung
                                per hari atau sesuai ketentuan yang
                                disepakati sebelumnya.</li>
                            <li><span class="font-medium">Periode Penyewaan:</span>Barang dapat disewa dengan minimal
                                durasi 1 hari.</li>
                        </ul>
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </div>
</template>
<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { toCurrencyLocale } from '@/utils/currency';
import { useProductDetailStore } from '@/stores/product-detail.store';
import { useShoppingItemsStore } from '@/stores/shopping-items.store';
import { useRoute, useRouter } from 'vue-router';
import { YYYYMMDD } from '@/utils/date-convert';
import { showSuccessAddCart } from '@/utils/toast-service';
import local from '@/utils/local-storage';

const cart = useShoppingItemsStore();
const context = useProductDetailStore();
const dates = ref([]);
const startDate = ref("");
const endDate = ref("");
const route = useRoute();
const router = useRouter();

const isLoggedIn = computed(() => {
    const user = local.getUser();
    return Array.isArray(user) && user.length > 0 && user[0].id;
});

watch(dates, (newDates) => {
    if (newDates.length === 2) {
        startDate.value = YYYYMMDD(newDates[0]);
        endDate.value = YYYYMMDD(newDates[1]);
        context.startDate = startDate.value;
        context.endDate = endDate.value;
    }
});

const addToCart = async () => {
    cart.addProductToCart(context.selectedProduct, context.startDate, context.endDate, context.qty);
    showSuccessAddCart(context.toast);
};

const createRental = async () => {
    await context.createRental(router);
};

onMounted(async () => {
    context.productCode = route.params.productCode;
    await context.getDetailProducts();
    if (context.dates.length === 2) {
        startDate.value = YYYYMMDD(context.dates[0]);
        endDate.value = YYYYMMDD(context.dates[1]);
        context.startDate = startDate.value;
        context.endDate = endDate.value;
    }
});
</script>

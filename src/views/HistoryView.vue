<template>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div class="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
            <div class="flex flex-column text-center md:text-left">
                <div class="flex align-items-center justify-content-center md:justify-content-start mb-2">
                    <span
                        class="border-circle w-3rem h-3rem flex align-items-center justify-content-center surface-100 mr-2">
                        <i class="bi bi-receipt-cutoff text-900 text-3xl"></i>
                    </span>
                    <span class="text-900 text-3xl font-medium">Riwayat Penyewaan</span>
                </div>
                <span class="text-600 text-xl">Jangan sampai lupa untuk mengembalikan ya!😆</span>
            </div>
            <span class="p-input-icon-right mt-5 mb-2 md:mt-0 md:mb-0 w-full lg:w-25rem">
                <IconField iconPosition="left">
                    <InputIcon class="pi pi-search"> </InputIcon>
                    <InputText v-model="context.keyword" placeholder="Nama Barang / Transaksi" class="w-full"
                        @keyup.enter="context.getTrxProductList()" />
                </IconField>
            </span>
        </div>
        <div >
            <div v-for="trx in context.trxProductList" :key="trx.trxCode"
                class="surface-card grid grid-nogutter border-round shadow-2 mt-5">
                <div class="col-12 flex p-2 surface-100 border-round-top">
                    <div class="p-2 flex-auto text-center md:text-left">
                        <span class="text-700 block">Transaksi</span>
                        <span class="text-900 font-medium block mt-2">{{ trx.trxCode }}</span>
                    </div>
                    <Divider align="center" type="dashed" layout="vertical" class="h-full mx-0 lg:mx-3 surface-border">
                    </Divider>
                    <div class="p-2 flex-auto text-center md:text-left">
                        <span class="text-700 block">Tanggal sewa</span>
                        <span class="text-900 font-medium block mt-2">{{ YYYYMMDDtoDMMMMYYYY(trx.rentStartDate) }}</span>
                    </div>
                    <Divider align="center" type="dashed" layout="vertical" class="h-full mx-0 lg:mx-3 surface-border">
                    </Divider>
                    <div class="p-2 flex-auto text-center md:text-left">
                        <span class="text-700 block">Total Harga</span>
                        <span v-if="trx.amountWithFine > 0" class="text-900 font-medium block mt-2">{{ toCurrencyLocale(trx.amountWithFine) }}</span>
                        <span v-else class="text-900 font-medium block mt-2">{{ toCurrencyLocale(trx.totalAmount) }}</span>
                    </div>
                </div>
                <div class="col-12" v-for="product in trx.products" :key="product.product_code">
                    <div class="p-2 my-4 flex flex-column lg:flex-row justify-content-between align-items-center">
                        <div class="flex flex-column lg:flex-row justify-content-center align-items-center px-2">
                            <img :src="product.urlImg" alt="product" class="w-8rem h-auto mr-3 flex-shrink-0 object-cover"
                                style="aspect-ratio: 4 / 3;" />
                            <div class="flex flex-column my-auto text-center md:text-left">
                                <span class="text-900 font-medium mb-3 mt-3 lg:mt-0">
                                    {{ product.productName }}
                                    <i v-tooltip.right="'Lihat Selengkapnya'" @click="openDialogInfoTrx(product)" class="pi pi-info-circle transition-colors transition-duration-150 text-600 ml-1 hover:text-900 text-sm cursor-pointer"></i>
                                </span>
                                <span class="text-700 text-sm mb-3">
                                    <span class="font-semibold">{{ product.brandName }}</span> | {{ product.ctgrName }}
                                </span>
                                <span class="text-700 text-sm mb-3">x{{ product.qty }}</span>
                                <a v-ripple tabindex="0" @click="goToProduct(product.productCode)"
                                    class="p-2 cursor-pointer w-auto mx-auto lg:mx-0 border-round font-medium text-center border-1 border-primary text-primary transition-duration-150 p-ripple">Sewa
                                    Lagi <span class="font-light">| {{ toCurrencyLocale(product.price) }}</span></a>
                            </div>
                        </div>
                        <div :class="getStatusClass(product.status) + ' mr-0 lg:mr-3 mt-4 lg:mt-0 p-2 flex align-items-center'"
                            style="border-radius: 2.5rem">
                            <span
                                :class="getStatusIconClass(product.status) + ' text-white flex align-items-center justify-content-center border-circle mr-2'"
                                style="min-width:2rem; min-height: 2rem">
                                <i :class="getStatusIcon(product.status)"></i>
                            </span>
                            <span :class="getStatusTextClass(product.status)">{{ getStatusLabel(product.status) }}</span>
                        </div>
                    </div>
                    <Divider class="w-full block lg:hidden surface-border"></Divider>
                </div>
                <div class="col-12 p-0 flex border-top-1 surface-border" v-if="isAllPending(trx.products)">
                    <Button icon="pi pi-times" label="Batalkan Semua" :loading="context.loading['cancelAll']" tabindex="0" @click="cancelAll(trx.trxCode)"
                        class="border-noround py-4 flex flex-column md:flex-row text-center justify-content-center align-items-center font-medium w-full border-none hover:bg-primary hover:text-0 transition-duration-150"
                        outlined>
                    </Button>
                </div>
            </div>
        </div>
        <DialogInfoTrx v-if="showDialogInfoTrx" v-model:visible="showDialogInfoTrx" :product="selectedProduct" />
    </div>
</template>

<script setup>
import { onMounted, defineAsyncComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHistoryStore } from '@/stores/history.store';
import { toCurrencyLocale } from '@/utils/currency';
import { YYYYMMDDtoDMMMMYYYY } from '@/utils/date-convert';

const context = useHistoryStore();
const router = useRouter();

const DialogInfoTrx = defineAsyncComponent(() => import('../components/DialogInfoTrx.vue'));
const showDialogInfoTrx = ref(false);
const selectedProduct = ref(null);

const openDialogInfoTrx = (product) => {
    selectedProduct.value = product;
    showDialogInfoTrx.value = true;
};

const getStatusClass = (status) => {
    switch (status) {
        case 'P':
            return 'bg-yellow-50';
        case 'B':
            return 'bg-orange-50';
        case 'T':
            return 'bg-red-50';
        case 'D':
            return 'bg-blue-50';
        case 'S':
            return 'bg-green-50';
        default:
            return 'bg-blue-50';
    }
};

const isAllPending = (products) => {
    if (!products || products.length === 0) return false;
    return products.every(product => product.status === "P");
};

const getStatusIconClass = (status) => {
    switch (status) {
        case 'P':
            return 'bg-yellow-500';
        case 'B':
            return 'bg-orange-500';
        case 'T':
            return 'bg-red-500';
        case 'D':
            return 'bg-blue-500';
        case 'S':
            return 'bg-green-500';
        default:
            return 'bg-blue-500';
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'P':
            return 'pi pi-clock';
        case 'B':
            return 'pi pi-exclamation-triangle';
        case 'T':
            return 'pi pi-times-circle';
        case 'D':
            return 'pi pi-info-circle';
        case 'S':
            return 'pi pi-check-circle';
        default:
            return 'pi pi-info';
    }
};

const getStatusTextClass = (status) => {
    switch (status) {
        case 'P':
            return 'text-yellow-600';
        case 'B':
            return 'text-orange-600';
        case 'T':
            return 'text-red-600';
        case 'D':
            return 'text-blue-600';
        case 'S':
            return 'text-green-600';
        default:
            return 'text-blue-600';
    }
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'P':
            return 'Pending';
        case 'B':
            return 'Dibatalkan';
        case 'T':
            return 'Ditolak';
        case 'D':
            return 'Masa Sewa';
        case 'S':
            return 'Selesai';
        default:
            return status;
    }
};

const goToProduct = (productCode) => {
    router.push({ name: 'product', params: { productCode } });
};

const cancelAll = async (trxCode) => {
    await context.cancelAllTransaction(trxCode);
};

onMounted(async () => {
    await context.getTrxProductList();
});
</script>

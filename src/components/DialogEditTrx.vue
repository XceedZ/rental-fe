<template>
    <Dialog closeOnEscape :visible="visible" :modal="true" :closable="true" :showHeader="true"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '30vw', maxWidth: '90vw', minWidth: '380px', height: 'auto' }">
        <template #header>
            <div class="flex w-full justify-content-between align-items-center">
                <div class="flex align-items-center">
                    <span
                        class="w-3rem h-3rem border-circle flex justify-content-center align-items-center bg-blue-100 mr-3">
                        <i class="bi bi-boxes text-blue-700 text-2xl"></i>
                    </span>
                </div>
            </div>
        </template>
        <section class="flex flex-column w-full">
            <p class="font-semibold text-xl mt-0 mb-2 text-900">Edit Transaksi</p>
            <p class="font-normal text-base mt-0 mb-0 text-600">Ubah transaksi untuk memberi keterangan lebih lanjut!
            </p>
            <Divider class="w-full"></Divider>
            <div v-for="(transaction, index) in transactions" :key="index">
                <div class="field mb-0 col-12">
                    <label for="desc" class="font-medium text-900">Nama Barang</label>
                    <InputText v-model="transaction.product_name" :rows="4" :autoResize="true" class="w-full"
                        disabled />
                </div>
                <div class="field mb-0 col-12">
                    <label for="surcharge" class="font-medium text-900">Denda Tambahan</label>
                    <InputNumber v-model="transaction.surcharge" inputId="currency-id" mode="currency"
                        :minFractionDigits="0" currency="IDR" locale="id-ID" :allowEmpty="false" :min="0"
                        class="w-full">
                    </InputNumber>
                </div>
                <div class="field col-12">
                    <label for="desc" class="font-medium text-900">Keterangan</label>
                    <Textarea v-model="transaction.desc" :rows="4" :autoResize="true" class="w-full"></Textarea>
                </div>
                <Divider v-if="index < transactions.length - 1" class="w-full"></Divider>
            </div>
        </section>
        <template #footer>
            <div class="pt-2 flex border-top-1 surface-border gap-2 w-full">
                <Button icon="pi pi-times" @click="$emit('update:visible', false)" label="Batal"
                    class="p-button-text w-full p-button-secondary"></Button>
                <Button :loading="context.loading['editTransaction']" icon="pi pi-check" @click="editTransaction"
                    label="Selesai" class="w-full p-button-primary"></Button>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { useEditTrxStore } from '@/stores/edit-trx.store';

const props = defineProps({
    visible: Boolean,
    transactions: Array
});

const context = useEditTrxStore();
const emit = defineEmits();

const editTransaction = async () => {
    const result = await context.editTransaction(props.transactions);

    if (result) {
        emit('update:visible', false);
    }
};
</script>

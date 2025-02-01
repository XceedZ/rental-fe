<template>
    <Dialog v-model="visible" :modal="true" :closable="true" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '55vw', maxWidth: '90vw', minWidth: '380px' }">
        <template #header>
            <div class="flex w-full justify-content-between align-items-center">
                <div class="flex align-items-center">
                    <span
                        class="w-3rem h-3rem border-circle flex justify-content-center align-items-center bg-blue-100 mr-3">
                        <i class="pi pi-shopping-bag text-blue-700 text-2xl"></i>
                    </span>
                    <div class="flex flex-column">
                    </div>
                </div>
            </div>
        </template>
        <section class="flex flex-column w-full">
            <p class="font-semibold text-xl mt-0 mb-2 text-900">Informasi Selengkapnya</p>
            <p class="font-normal text-base mt-0 mb-3 text-600">Mohon untuk diperhatikan dengan seksama!
            </p>
            <div class="grid formgrid p-fluid">
                <Divider class="w-full"></Divider>
                <div class="field mb-4 col-12 md:col-6">
                    <label for="productName" class="font-medium text-900">Nama Barang</label>
                    <InputText disabled v-model="product.productName" id="productName" type="text" />
                </div>
                <div class="field mb-4 col-12 md:col-6">
                    <label for="brandName" class="font-medium text-900">Merk</label>
                    <InputText disabled v-model="product.brandName" id="brandName" type="text" />
                </div>
                <div class="field mb-4 col-12 md:col-6">
                    <label for="ctgrName" class="font-medium text-900">Kategori</label>
                    <InputText disabled v-model="product.ctgrName" id="ctgrName" type="text" />
                </div>
                <div class="field mb-4 col-12 md:col-6">
                    <label for="stock" class="font-medium text-900">Qty</label>
                    <InputNumber disabled v-model="product.qty" buttonLayout="horizontal">
                    </InputNumber>
                </div>
                <div class="field mb-4 col-12 md:col-6">
                    <label for="state" class="font-medium text-900">Harga / hari</label>
                    <InputNumber disabled v-model="product.price" inputId="currency-id" mode="currency" :minFractionDigits="0"
                        currency="IDR" locale="id-ID" :allowEmpty="false" :min="0" inputClass="w-full">
                    </InputNumber>
                </div>
                <div class="field mb-4 col-12 md:col-6">
                    <label for="state" class="font-medium text-900">Denda (%)</label>
                    <InputNumber disabled v-model="product.fineBill" inputId="percent" suffix="%" :allowEmpty="false" :min="0"
                        :max="100" inputClass="w-full">
                    </InputNumber>
                </div>
                <div class="field mb-4 col-12 md:col-6">
                    <label for="startRentDate" class="font-medium text-900">Tanggal Sewa</label>
                    <InputText disabled v-model="formattedRentStartDate" id="startRentDate" type="text" />
                </div>
                <div class="field mb-4 col-12 md:col-6">
                    <label for="endRentDate" class="font-medium text-900">Sampai Tanggal</label>
                    <InputText disabled v-model="formattedRentEndDate" id="endRentDate" type="text" />
                </div>
                <div class="field mb-4 col-12">
                    <label for="remarkLate" class="font-medium text-900">Keterangan</label>
                    <Textarea v-if="!product.remark" disabled id="remarkLate" v-model="product.remarkLate" :rows="6" :autoResize="true"></Textarea>
                    <Textarea v-else disabled id="remark" v-model="product.remark" :rows="6" :autoResize="true"></Textarea>
                </div>
            </div>
        </section>
        <template #footer>
            <div class="pt-2 flex border-top-1 surface-border gap-2 w-full">
                <Button icon="pi pi-times" @click="$emit('update:visible', false)" label="Tutup"
                    class="p-button-text w-full p-button-secondary"></Button>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { defineProps } from 'vue';
import { YYYYMMDDtoDMMMMYYYY } from '@/utils/date-convert';


const props = defineProps({
    product: Object
});
import { computed } from 'vue';

const formattedRentStartDate = computed(() => YYYYMMDDtoDMMMMYYYY(props.product.rentStartDate));
const formattedRentEndDate = computed(() => YYYYMMDDtoDMMMMYYYY(props.product.rentEndDate));
</script>
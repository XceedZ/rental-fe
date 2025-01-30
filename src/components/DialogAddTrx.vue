<template>
    <Dialog v-model="context.visible" :modal="true" :closable="true" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '55vw', maxWidth: '90vw', minWidth: '380px' }">
        <template #header>
            <div class="flex w-full justify-content-between align-items-center">
                <div class="flex align-items-center">
                    <span
                        class="w-3rem h-3rem border-circle flex justify-content-center align-items-center bg-blue-100 mr-3">
                        <i class="pi pi-receipt text-blue-700 text-2xl"></i>
                    </span>
                    <div class="flex flex-column">
                    </div>
                </div>
            </div>
        </template>
        <section class="flex flex-column w-full">
            <p class="font-semibold text-xl mt-0 mb-2 text-900">Tambah Transaksi</p>
            <p class="font-normal text-base mt-0 mb-3 text-600">Tambah transaksi manual untuk penyewa yang tidak
                memiliki akun!
            </p>
            <div class="grid formgrid p-fluid">
                <Divider class="w-full"></Divider>
                <div class="field mb-4 col-12">
                    <SelectButton :allowEmpty="false" v-model="value" :options="options" aria-labelledby="basic" />
                </div>
                <div class="field mb-4 col-12 md:col-6">
                    <label for="city" class="font-medium text-900">Nama Lengkap</label>
                    <Dropdown v-if="value === 'Dengan Akun'" showClear filter :emptyMessage="'Data tidak tersedia'"
                        :emptyFilterMessage="'Tidak ada hasil yang ditemukan'" :options="context.userOptions"
                        v-model="context.selectedMember" optionLabel="name" appendTo="body" styleClass="w-full"
                        class="align-items-center w-full">
                    </Dropdown>
                    <InputText v-else v-model="context.selectedMember.name" class="w-full" />
                </div>
                <div v-if="value === 'Tanpa Akun'" class="field mb-4 col-12 md:col-6">
                    <label for="address" class="font-medium text-900">Alamat</label>
                    <InputText v-model="context.selectedMember.address" class="w-full" />
                </div>
                <div v-if="value === 'Tanpa Akun'" class="field mb-4 col-12 md:col-6">
                    <label for="phone" class="font-medium text-900">Telepon</label>
                    <InputText id="phone" v-model="context.selectedMember.phone" type="number" placeholder="08123456789"
                        class="w-full no-spinner" />
                </div>
                <div class="field mb-4 col-12 md:col-6">
                    <label for="city" class="font-medium text-900">Barang</label>
                    <Dropdown showClear filter :emptyMessage="'Data tidak tersedia'"
                        :emptyFilterMessage="'Tidak ada hasil yang ditemukan'" :options="context.productOptions"
                        v-model="context.selectedProduct" optionLabel="productName" optionValue="id" appendTo="body" styleClass="w-full"
                        class="align-items-center w-full">
                    </Dropdown>
                </div>
                <div class="field mb-4 col-12 md:col-6">
                    <label for="state" class="font-medium text-900">Tanggal Penyewaan</label>
                    <Calendar showIcon v-model="context.dates" selectionMode="range" :manualInput="false" dateFormat="d M yy" />
                </div>
                <div class="field mb-4 col-12 md:col-6">
                    <label for="city" class="font-medium text-900">Qty</label>
                    <InputNumber v-model="context.stock" showButtons buttonLayout="horizontal" :min="1" placeholder="1">
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                    </InputNumber>
                </div>
                <div class="field mb-4 col-12">
                    <label for="bio" class="font-medium text-900">Keterangan</label>
                    <Textarea id="desc" v-model="context.desc" :rows="6" :autoResize="true"></Textarea>
                </div>
            </div>
        </section>
        <template #footer>
            <div class="pt-2 flex border-top-1 surface-border gap-2 w-full">
                <Button icon="pi pi-times" @click="$emit('update:visible', false)" label="Batal"
                    class="p-button-text w-full p-button-secondary"></Button>
                <Button :loading="context.loading['addTrx']" :disabled="context.isAddButtonDisabled" icon="pi pi-check" @click="handleAddProduct"
                    label="Selesai" class="w-full p-button-primary"></Button>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAddTransactionStore } from '@/stores/add-transaction.store';
import { YYYYMMDD } from '@/utils/date-convert';

const value = ref('Dengan Akun');
const options = ref(['Dengan Akun', 'Tanpa Akun']);

const context = useAddTransactionStore();
const emit = defineEmits();

onMounted(async () => {
    await context.getProducts();
    await context.getUsersManual();
})

const handleAddProduct = async () => {
    context.dates = context.dates.map(date => YYYYMMDD(date));
    context.productId = context.selectedProduct;
    let result;
    if (value.value === 'Dengan Akun') {
        result = await context.addTrxManualWithAccount();
    } else {
        result = await context.addTrxManualWithoutAccount();
    }
    if (result && result.isOk) {
        emit('update:visible', false);
    }
}
</script>

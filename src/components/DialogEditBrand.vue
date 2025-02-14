<template>
    <Dialog closeOnEscape visible="visible5" :modal="true" :closable="true" :showHeader="true"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '30vw', maxWidth: '90vw', minWidth: '380px', height: '21rem' }">
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
            <p class="font-semibold text-xl mt-0 mb-2 text-900">Edit Merk</p>
            <p class="font-normal text-base mt-0 mb-0 text-600">Ubah merk untuk memudahkan pengelolaan produk!</p>
            <Divider class="w-full"></Divider>
            <div class="flex flex-row gap-2 mt-3">
                <FloatLabel class="w-full">
                    <label for="brandName">Nama Merk</label>
                    <InputText id="brandName" v-model="context.brandName" class="w-full" />
                </FloatLabel>
            </div>
        </section>
        <template #footer>
            <div class="pt-2 flex border-top-1 surface-border gap-2 w-full">
                <Button icon="pi pi-times" @click="$emit('update:visible', false)" label="Batal"
                    class="p-button-text w-full p-button-secondary"></Button>
                <Button :loading="context.loading['editBrand']" icon="pi pi-check" @click="editBrand" label="Selesai"
                    class="w-full p-button-primary"></Button>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { onMounted } from 'vue';
import { useEditBrandStore } from '@/stores/edit-brand.store';

const context = useEditBrandStore();
const emit = defineEmits();

onMounted(async () => {
    context.brandId = context.selectedBrand.id;
    context.brandName = context.selectedBrand.brandName;
});

const editBrand = async () => {
    const result = await context.editBrand();

    if (result) {
        emit('update:visible', false);
    };
};
</script>

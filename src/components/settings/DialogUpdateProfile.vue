<template>
    <Dialog closeOnEscape visible="visible5" :modal="true" :closable="true" :showHeader="true"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '30vw', maxWidth: '90vw', minWidth: '380px', height: '33rem' }">
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
            <p class="font-semibold text-xl mt-0 mb-2 text-900">Update Profile</p>
            <p class="font-normal text-base mt-0 mb-0 text-600">Ubah data pribadi sesuai dengan data asli!
            </p>
            <Divider class="w-full"></Divider>
            <div class="field mb-0 col-12">
                <label for="name" class="font-medium text-900">Nama Lengkap</label>
                <InputText v-model="context.user.name" class="w-full" />
            </div>
            <div class="field mb-0 col-12">
                <label for="address" class="font-medium text-900">Alamat</label>
                <InputText v-model="context.user.address" class="w-full" />
            </div>
            <div class="field mb-0 col-12">
                <label for="phone" class="font-medium text-900">Telepon</label>
                <InputText v-model="context.user.phone" class="w-full" type="number"/>
            </div>
        </section>
        <template #footer>
            <div class="pt-2 flex border-top-1 surface-border gap-2 w-full">
                <Button icon="pi pi-times" @click="$emit('update:visible', false)" label="Batal"
                    class="p-button-text w-full p-button-secondary"></Button>
                <Button :loading="context.loading['updateProfile']" icon="pi pi-check" @click="updateProfile" label="Selesai"
                    class="w-full p-button-primary"></Button>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { useProfileSettingStore } from '@/stores/settings/profile-setting.store';

const context = useProfileSettingStore();
const emit = defineEmits();

const updateProfile = async () => {
    const result = await context.updateProfile();

    if (result) {
        emit('update:visible', false);
    };
};
</script>

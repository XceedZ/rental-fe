<template>
    <Dialog closeOnEscape :visible="localVisible" @hide="closeDialog" :modal="true" :closable="true" :showHeader="true"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '40vw', maxWidth: '90vw', minWidth: '380px', height: '21rem' }">
        <template #header>
            <div class="flex w-full justify-content-between align-items-center">
                <div class="flex align-items-center">
                    <span
                        class="w-3rem h-3rem border-circle flex justify-content-center align-items-center bg-blue-100 mr-3">
                        <i class="pi pi-shield text-blue-700 text-2xl"></i>
                    </span>
                </div>
            </div>
        </template>
        <section class="flex flex-column w-full">
            <p class="font-semibold text-xl mt-0 mb-2 text-900">Kelola Peran</p>
            <p class="font-normal text-base mt-0 text-600">Tambah peran dan izin dalam tim Kamu!</p>
            <Divider class="w-full"></Divider>
            <div class="flex flex-row gap-2 mt-3">
                <FloatLabel class="w-6">
                    <label for="rolename">Nama Peran</label>
                    <InputText id="rolename" v-model="context.roleName" class="w-full" @click="showCommandMenu" />
                </FloatLabel>
                <FloatLabel class="w-6">
                    <MultiSelect :loading="context.loading['getPermissions']" display="chip" id="ms-permissions"
                        v-model="context.selectedPermissions" :options="context.permissionsOptions"
                        optionLabel="permissionName" dataKey="permissionName" class="w-full" />
                    <label for="ms-permissions">Pilih Izin</label>
                </FloatLabel>
            </div>
        </section>
        <template #footer>
            <div class="pt-2 flex border-top-1 surface-border gap-2 w-full">
                <Button icon="pi pi-times" @click="closeDialog" label="Batal"
                    class="p-button-text w-full p-button-secondary"></Button>
                <Button icon="pi pi-check" @click="submitRole" label="Selesai" :loading="context.loading['addRole']"
                    class="w-full p-button-primary"></Button>
            </div>
        </template>
    </Dialog>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAddRolesStore } from '@/stores/add-roles.store';

const context = useAddRolesStore();
const emit = defineEmits(['update:visible']);
const props = defineProps(['visible']);
const localVisible = ref(props.visible);

watch(() => props.visible, (newVal) => {
    localVisible.value = newVal;
});

const closeDialog = () => {
    localVisible.value = false;
    emit('update:visible', false);
};

const submitRole = async () => {
    const response = await context.addRolePermissions();
    if (response.isOk) {
        context.resetInput();
        closeDialog();
    }
};

onMounted(async () => {
    await context.getPermissions();
});
</script>

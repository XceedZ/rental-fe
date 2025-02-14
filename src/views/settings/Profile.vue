<template>
    <div class="flex flex-column flex-auto">
        <div class="surface-section px-4 py-8 md:px-6 lg:px-8 h-full border-round-top-3xl">
            <div class="flex flex-column md:flex-row w-full justify-content-between md:align-items-center">
                <div class="flex flex-column text-center md:text-left">
                    <div class="flex align-items-center justify-content-center md:justify-content-start mb-2">
                        <span
                            class="border-circle w-3rem h-3rem flex align-items-center justify-content-center surface-100 mr-2">
                            <i class="pi pi-cog text-900 text-3xl"></i>
                        </span>
                        <span class="text-900 text-3xl font-medium">Pengaturan</span>
                    </div>
                    <span class="text-600 text-xl">Ubah pengaturan aplikasi sesuai dengan preferensi!</span>
                </div>
            </div>
            <Divider class="w-full"></Divider>
            <div class="p-fluid flex flex-column lg:flex-row">
                <ul
                    class="list-none m-0 p-0 flex flex-row lg:flex-column justify-content-between lg:justify-content-start">
                    <li class="mb-3">
                        <a v-ripple
                            class="p-ripple lg:w-15rem flex align-items-center cursor-pointer p-3 border-round hover:surface-200 transition-duration-150 transition-colors"
                            :class="{ 'surface-200': activeTab3 === 0 }" @click="activeTab3 = 0">
                            <i class="bi bi-person-gear md:mr-2"
                                :class="{ 'text-700': activeTab3 === 0, 'text-600': activeTab3 !== 0 }"></i>
                            <span class="font-medium hidden md:block"
                                :class="{ 'text-800': activeTab3 === 0, 'text-700': activeTab3 !== 0 }">Profile</span>
                        </a>
                    </li>
                    <li class="mb-3">
                        <a v-ripple
                            class="p-ripple lg:w-15rem flex align-items-center cursor-pointer p-3 border-round hover:surface-200 transition-duration-150 transition-colors"
                            :class="{ 'surface-200': activeTab3 === 2 }" @click="activeTab3 = 2">
                            <i class="bi bi-person-bounding-box md:mr-2"
                                :class="{ 'text-700': activeTab3 === 2, 'text-600': activeTab3 !== 2 }"></i>
                            <span class="font-medium hidden md:block"
                                :class="{ 'text-800': activeTab3 === 2, 'text-700': activeTab3 !== 2 }">Verifikasi KTP</span>
                        </a>
                    </li>
                    <li class="mb-3">
                        <a v-ripple
                            class="p-ripple lg:w-15rem flex align-items-center cursor-pointer p-3 border-round hover:surface-200 transition-duration-150 transition-colors"
                            :class="{ 'surface-200': activeTab3 === 3 }" @click="activeTab3 = 3">
                            <i class="bi bi-sliders md:mr-2"
                                :class="{ 'text-700': activeTab3 === 3, 'text-600': activeTab3 !== 3 }"></i>
                            <span class="font-medium hidden md:block"
                                :class="{ 'text-800': activeTab3 === 3, 'text-700': activeTab3 !== 3 }">Aksesbilitas</span>
                        </a>
                    </li>
                    <li class="mb-3">
                        <a v-ripple
                            class="p-ripple lg:w-15rem flex align-items-center cursor-pointer p-3 border-round hover:surface-200 transition-duration-150 transition-colors"
                            :class="{ 'surface-200': activeTab3 === 4 }" @click="activeTab3 = 4">
                            <i class="pi pi-bell md:mr-2"
                                :class="{ 'text-700': activeTab3 === 4, 'text-600': activeTab3 !== 4 }"></i>
                            <span class="font-medium hidden md:block"
                                :class="{ 'text-800': activeTab3 === 4, 'text-700': activeTab3 !== 4 }">Notifikasi</span>
                        </a>
                    </li>
                </ul>
                <div class="surface-card p-5 shadow-2 border-round flex-auto xl:ml-5">
                    <div>
                        <div
                            style="height:200px; background: url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat; background-size: cover">
                        </div>
                        <div class="px-4 py-5 md:px-6 lg:px-8 surface-section">
                            <div class="flex flex-column lg:flex-row lg:align-items-center lg:justify-content-between relative"
                                style="margin-top:-2rem; top:-70px; margin-bottom:-70px">
                                <div>
                                    <div style="width:140px; height: 140px; border-radius: 10px"
                                        class="mb-3 surface-card shadow-2 flex align-items-center justify-content-center">
                                        <Avatar :name="local.getUser().name" :radius="10" alt="User Avatar"
                                            style="height: 9rem;" />
                                    </div>
                                    <div class="text-900 text-3xl font-medium mb-3 flex align-items-center">
                                        {{ context.user.name }}
                                        <Button id="edit"
                                            class="text-600 p-button-rounded font-medium p-button-text ml-2"
                                            icon="pi pi-pencil" @click="showDialogUpdateProfile = true;
                                            "></Button>
                                    </div>
                                    <p class="mt-0 mb-3 text-700 text-xl">{{ context.user.email }}</p>
                                    <div class="text-600 font-medium">
                                        <span>{{ context.user.roleName }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-5 flex-column md:flex-column">
                                <div class="flex mt-4 flex-column md:flex-row md:w-6 gap-4">
                                    <div class="flex-auto p-fluid" style="min-width: 15rem;">
                                        <div class="flex flex-column border-round border-1 surface-border p-4 cursor-pointer hover:border-primary transition-duration-150"
                                            @click="selectedAddress = context.address"
                                            :class="{ 'border-primary': selectedAddress === context.user.address, 'hover:border-primary': true }">
                                            <div class="flex justify-content-between align-items-center mb-3">
                                                <span class="text-900 text-xl font-medium">Rumah</span>
                                            </div>
                                            <span class="inline-block text-600 mb-3">{{ context.user.address }}</span>
                                            <span class="inline-block text-600"><i class="pi pi-mobile mr-2"></i>{{
                                                context.user.phone }}</span>
                                        </div>
                                    </div>
                                    <div class="flex-auto p-fluid" style="min-width: 15rem;">
                                        <div
                                            class="flex h-full flex-column justify-content-center align-items-center text-center py-5 border-round border-1 surface-border surface-100 cursor-pointer hover:border-primary transition-duration-150">
                                            <span
                                                class="text-600 border-circle border-2 w-2rem h-2rem flex align-items-center justify-content-center"><i
                                                    class="pi pi-fw pi-plus"></i></span>
                                            <span class="text-600 mt-3">Tambah Alamat Baru</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-2 flex-wrap md:flex-nowrap mt-5">
                                <Button icon="pi pi-lock" outlined label="Setel Ulang Kata Sandi"
                                    class="w-full md:w-auto text-base sm:text-sm" @click="goToReset"></Button>
                            </div>
                        </div>
                        <!-- <FileUpload invalidFileLimitMessage="Melewati batas unggahan maksimum file"
                            invalidFileSizeMessage="Ukuran file terlalu besar" :showUploadButton="false"
                            chooseLabel="Pilih" cancelLabel="Batal" name="demo[]" @select="onFileSelect"
                            :multiple="false" accept="image/*" :maxFileSize="2000000" previewWidth="100" fileLimit="1">
                            <template #empty>
                                <p>Seret dan taruh file ke sini untuk mengunggah.</p>
                            </template>
</FileUpload> -->
                    </div>
                </div>
            </div>
        </div>
        <DialogUpdateProfile v-if="showDialogUpdateProfile" :visible="showDialogUpdateProfile"
            @update:visible="showDialogUpdateProfile = $event" />
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileSettingStore } from '@/stores/settings/profile-setting.store';
import Avatar from '@/components/Avatar.vue';
import local from '@/utils/local-storage';

const router = useRouter();
const DialogUpdateProfile = defineAsyncComponent(() => import('@/components/settings/DialogUpdateProfile.vue'));
const showDialogUpdateProfile = ref(false);
const activeTab3 = ref(0);
const context = useProfileSettingStore();

const goToReset = async () => {
    router.push({ name: 'resetPassword' });
};

onMounted(() => {
    context.profileAccount();
});
</script>
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
                            <i class="bi bi-moon-stars md:mr-2"
                                :class="{ 'text-700': activeTab3 === 2, 'text-600': activeTab3 !== 2 }"></i>
                            <span class="font-medium hidden md:block"
                                :class="{ 'text-800': activeTab3 === 2, 'text-700': activeTab3 !== 2 }">Tampilan</span>
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
                    <div class="text-900 font-semibold text-lg mt-3">Profile</div>
                    <Divider></Divider>
                    <div class="flex gap-5 flex-column md:flex-column">
                        <div class="flex mt-4 flex-column md:flex-row md:w-6 gap-4">
                            <div class="flex-auto p-fluid">
                                <div class="flex flex-column border-round border-1 surface-border p-4 cursor-pointer hover:border-primary transition-duration-150"
                                    @click="selectedAddress = context.address"
                                    :class="{ 'border-primary': selectedAddress === context.address, 'hover:border-primary': true }">
                                    <div class="flex justify-content-between align-items-center mb-3">
                                        <span class="text-900 text-xl font-medium">Alamat</span>
                                        <Button id="phone" class="text-600 font-medium p-button-text w-auto"
                                            icon="pi pi-pencil" label="Edit"></Button>
                                    </div>
                                    <span class="inline-block text-600 mb-3">{{ context.address }}</span>
                                    <span class="inline-block text-600"><i class="pi pi-mobile mr-2"></i>{{
                                        context.phone }}</span>
                                </div>
                            </div>
                            <div class="flex-auto p-fluid">
                                <div
                                    class="flex h-full flex-column justify-content-center align-items-center text-center py-5 border-round border-1 surface-border surface-100 cursor-pointer hover:border-primary transition-duration-150">
                                    <span
                                        class="text-600 border-circle border-2 w-2rem h-2rem flex align-items-center justify-content-center"><i
                                            class="pi pi-fw pi-plus"></i></span>
                                    <span class="text-600 mt-3">Tambah Alamat Baru</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex-auto p-fluid">
                            <div class="mb-4">
                                <label for="name" class="block font-normal text-900 mb-2">Nama</label>
                                <InputText id="name" type="text" v-model="context.name" />
                            </div>
                            <div class="mb-4">
                                <label for="email" class="block font-normal text-900 mb-2">Email</label>
                                <div class="p-inputgroup">
                                    <span class="p-inputgroup-addon"><i class="pi pi-at"></i></span>
                                    <InputText id="email" type="text" v-model="context.email" />
                                </div>
                            </div>
                            <div class="flex gap-2 flex-wrap md:flex-nowrap mt-5">
                                <Button icon="pi pi-save" label="Simpan"
                                    class="w-full md:w-auto text-base sm:text-sm mb-2 md:mb-0"></Button>
                                <Button icon="pi pi-lock" outlined label="Setel Ulang Kata Sandi"
                                    class="w-full md:w-auto text-base sm:text-sm"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProfileSettingStore } from '@/stores/settings/profile-setting.store';
import local from '@/utils/local-storage';

const activeTab3 = ref(0);
const context = useProfileSettingStore();
const selectedAddress = ref("");

onMounted(() => {
    const user = local.getUser()[0];
    context.name = user.name || "";
    context.email = user.email || "";
    context.phone = user.phone || "";
    context.address = user.address || "";
    selectedAddress.value = context.address;
});
</script>
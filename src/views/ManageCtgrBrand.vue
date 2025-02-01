<template>
    <div class="surface-section px-4 pt-8 md:px-6 lg:px-8">
        <div class="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
            <div class="flex flex-column text-center md:text-left">
                <div class="flex align-items-center justify-content-center md:justify-content-start mb-2">
                    <span
                        class="border-circle w-3rem h-3rem flex align-items-center justify-content-center surface-100 mr-2">
                        <i class="bi bi-boxes text-900 text-3xl"></i>
                    </span> <span class="text-900 text-3xl font-medium">Merk & Kategori</span>
                </div>
                <span class="text-600 text-xl">Halaman ini digunakan untuk mengelola merk dan kategori barang!</span>
            </div>
        </div>
        <section class="flex flex-wrap gap-3 justify-content-between border-bottom-1 surface-border">
            <Divider class="w-full"></Divider>
            <div class="w-full flex justify-content-between items-center flex-wrap">
                <div class="flex-shrink-0">
                    <h3 class="mb-4 mt-0 text-900 font-medium text-xl border-primary border-bottom-2 inline-block"
                        style="padding-bottom: 0.5rem;">
                        Merk
                    </h3>
                    <p class="mb-4 mt-0 text-700 font-normal text-base">Kelola merk barang Kamu di sini!</p>
                    <Button icon="pi pi-plus" label="Merk" class="w-auto" @click="showDialogAddBrand = true"></Button>
                </div>
                <div class="mt-5 mb-2 md:mt-0 md:mb-0 w-full lg:w-25rem">
                    <span class="p-input-icon-right w-full">
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-search"></InputIcon>
                            <InputText v-model="context.brandKeyword" placeholder="Nama Merk" class="w-full"
                                @keyup.enter="context.getManageBrand" />
                        </IconField>
                    </span>
                </div>
            </div>
            <div class="mt-3 w-full">
                <DataTable :value="context.dataTableBrand" :tabStyle="{ 'min-width': '60rem' }" rowHover>
                    <template #empty>
                        <p class="text-center w-full">Data tidak tersedia</p>
                    </template>
                    <Column style="min-width:25rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Nama Merk</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageBrand']" height="2rem"></Skeleton>
                            <div v-else class="flex align-items-center gap-3">
                                <div>
                                    <p class="mt-0 mb-2 font-medium text-lg text-color-primary">{{ data.brandName }}
                                    </p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column style="min-width:10rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Aktif</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageBrand']" shape="circle" size="1rem">
                            </Skeleton>
                            <p v-else class="font-normal text-base text-color-secondary">
                                <i v-if="data.active === 'Y'" class="pi pi-check-circle text-green-500"
                                    v-tooltip.right="'AKTIF'"></i>
                                <i v-else class="pi pi-times-circle text-red-500" v-tooltip.right="'NONAKTIF'"></i>
                            </p>
                        </template>
                    </Column>
                    <Column style="min-width:14rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Tanggal Ditambahkan</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageBrand']" height="2rem"></Skeleton>
                            <p v-else class="mt-0 mb-2 font-normal text-base text-color-secondary">{{ data.createdAt
                                }}
                            </p>
                        </template>
                    </Column>
                    <Column style="min-width:13rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Tanggal Pembaruan</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageBrand']" height="2rem"></Skeleton>
                            <p v-else class="mt-0 mb-2 font-normal text-base text-color-secondary">{{ data.updatedAt
                                }}
                            </p>
                        </template>
                    </Column>
                    <Column style="min-width:8rem">
                        <template #body="{}">
                            <Skeleton v-if="context.loading['getManageBrand']" height="2rem"></Skeleton>
                            <Button v-else type="button" icon="pi pi-ellipsis-v"
                                class="p-button-text p-button-secondary" @click="$refs.menu.toggle($event)"></Button>
                            <Menu ref="menu" appendTo="body" popup :model="items"></Menu>
                        </template>
                    </Column>
                </DataTable>
                <Paginator :rows="context.defaultRows" :rowsPerPageOptions="context.rowPerPageOptions"
                    :totalRecords="context.totalBrandRecords" :first="context.brandLimit"
                    @page="context.onBrandPage($event)" />
            </div>
        </section>
        <section class="flex flex-wrap gap-3 py-6 justify-content-between surface-border">
            <div class="w-full flex justify-content-between items-center flex-wrap">
                <div class="flex-shrink-0">
                    <h3 class="mb-4 mt-0 text-900 font-medium text-xl border-primary border-bottom-2 inline-block"
                        style="padding-bottom: 0.5rem;">
                        Kategori
                    </h3>
                    <p class="mb-4 mt-0 text-700 font-normal text-base">Kelola kategori barang Kamu di sini!</p>
                    <Button icon="pi pi-plus" label="Kategori" class="w-auto"
                        @click="showDialogAddCategory = true"></Button>
                </div>
                <div class="mt-5 mb-2 md:mt-0 md:mb-0 w-full lg:w-25rem">
                    <span class="p-input-icon-right w-full">
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-search"></InputIcon>
                            <InputText v-model="context.ctgrKeyword" placeholder="Nama Kategori" class="w-full"
                                @keyup.enter="context.getManageCtgr" />
                        </IconField>
                    </span>
                </div>
            </div>
            <div class="mt-3 w-full">
                <DataTable :value="context.dataTableCtgr" rowHover>
                    <template #empty>
                        <p class="text-center w-full">Data tidak tersedia</p>
                    </template>
                    <Column style="min-width:25rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Nama Kategori</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageCtgr']" height="2rem"></Skeleton>
                            <div v-else class="flex align-items-center gap-3">
                                <div>
                                    <p class="mt-0 mb-2 font-medium text-lg text-color-primary">{{ data.ctgrName }}</p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column style="min-width:10rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Aktif</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageCtgr']" shape="circle" size="1rem"></Skeleton>
                            <p v-else class="font-normal text-base text-color-secondary">
                                <i v-if="data.active === 'Y'" class="pi pi-check-circle text-green-500"
                                    v-tooltip.right="'AKTIF'"></i>
                                <i v-else class="pi pi-times-circle text-red-500" v-tooltip.right="'NONAKTIF'"></i>
                            </p>
                        </template>
                    </Column>
                    <Column style="min-width:14rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Tanggal Ditambahkan</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageCtgr']" height="2rem"></Skeleton>
                            <p v-else class="mt-0 mb-2 font-normal text-base text-color-secondary">{{ data.createdAt }}
                            </p>
                        </template>
                    </Column>
                    <Column style="min-width:13rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Tanggal Pembaruan</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageCtgr']" height="2rem"></Skeleton>
                            <p v-else class="mt-0 mb-2 font-normal text-base text-color-secondary">{{ data.updatedAt }}
                            </p>
                        </template>
                    </Column>
                    <Column style="min-width:8rem">
                        <template #body="{}">
                            <Skeleton v-if="context.loading['getManageCtgr']" height="2rem"></Skeleton>
                            <Button v-else type="button" icon="pi pi-ellipsis-v"
                                class="p-button-text p-button-secondary" @click="$refs.menu.toggle($event)"></Button>
                            <Menu ref="menu" appendTo="body" popup :model="items"></Menu>
                        </template>
                    </Column>
                </DataTable>
                <Paginator :rows="context.defaultRows" :rowsPerPageOptions="context.rowPerPageOptions"
                    :totalRecords="context.totalCtgrRecords" :first="context.ctgrLimit"
                    @page="context.onCtgrPage($event)" />
            </div>
        </section>
        <DialogAddBrand :visible="showDialogAddBrand" @update:visible="showDialogAddBrand = $event" />
        <DialogAddCategory :visible="showDialogAddCategory" @update:visible="showDialogAddCategory = $event" />
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue';
import { useManageCtgrBrandStore } from '@/stores/manage-ctgr-brand.store';

const context = useManageCtgrBrandStore();
const DialogAddBrand = defineAsyncComponent(() => import('../components/DialogAddBrand.vue'));
const DialogAddCategory = defineAsyncComponent(() => import('../components/DialogAddCategory.vue'));
const showDialogAddBrand = ref(false);
const showDialogAddCategory = ref(false);

onMounted(async () => {
    await context.getManageBrand();
    await context.getManageCtgr();
});
</script>

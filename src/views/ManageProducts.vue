<template>
    <div class="surface-section px-4 pt-8 md:px-6 lg:px-8">
        <div class="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
            <div class="flex flex-column text-center md:text-left">
                <div class="flex align-items-center justify-content-center md:justify-content-start mb-2">
                    <span
                        class="border-circle w-3rem h-3rem flex align-items-center justify-content-center surface-100 mr-2">
                        <i class="bi bi-box-seam text-900 text-3xl"></i>
                    </span> <span class="text-900 text-3xl font-medium">Barang</span>
                </div>
                <span class="text-600 text-xl">Kamu dapat dengan mudah mengelola barang sewa di halaman ini!🤭</span>
            </div>
            <span class="p-input-icon-right mt-5 mb-2 md:mt-0 md:mb-0 w-full lg:w-25rem">
                <IconField iconPosition="left">
                    <InputIcon class="pi pi-search"> </InputIcon>
                    <InputText v-model="context.keyword" placeholder="Nama Barang / Merk / Kategori" class="w-full"
                        @keyup.enter="context.getProducts" />
                </IconField>
            </span>
        </div>
        <section class="flex-wrap gap-3 justify-content-between">
            <Divider class="w-full"></Divider>
            <div class="flex-shrink-0">
                <Button icon="pi pi-plus" label="Barang" class="w-auto"
                    @click="showDialogAddProduct = true"></Button>
            </div>
            <div class="mt-3">
                <DataTable scrollable scrollHeight="500px" :value="context.dataTable"
                    :tabStyle="{ 'min-width': '60rem' }" rowHover>
                    <template #empty>
                        <p class="text-center w-full">Data tidak tersedia</p>
                    </template>
                    <Column style="min-width:25rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Nama Barang</span>
                        </template>
                        <template #body="{ data }">
                            <div class="flex flex-column">
                                <div class="flex align-items-center gap-3">
                                    <Skeleton v-if="context.loading['getProducts']" size="3rem" class="mr-2"></Skeleton>
                                    <Image v-else preview width="50" :src="getFullImageUrl(data.urlImg)" alt="Product Image"
                                        style="height: 2.5rem;" />
                                    <div>
                                        <Skeleton v-if="context.loading['getProducts']"
                                            class="mt-0 mb-2 h-1rem w-10rem"></Skeleton>
                                        <p v-else class="mt-0 mb-2 font-medium text-lg text-color-primary">{{
                                            data.productName }}</p>
                                        <Skeleton v-if="context.loading['getProducts']" class="mt-0 mb-2 h-1rem w-8rem">
                                        </Skeleton>
                                        <p v-else class="mt-0 mb-2 font-normal text-base text-color-secondary">{{
                                            data.brandName }}</p>
                                    </div>
                                </div>
                            </div>

                        </template>
                    </Column>
                    <Column style="min-width:10rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Kategori</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getProducts']" class="h-1rem w-full"></Skeleton>
                            <p v-else class="font-normal text-base text-color-secondary">{{ data.ctgrName }}</p>
                        </template>
                    </Column>
                    <Column style="min-width:5rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Stok</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getProducts']" class="h-1rem w-full"></Skeleton>
                            <p v-else class="font-normal text-right text-base text-color-secondary">{{ data.stock }}
                            </p>
                        </template>
                    </Column>
                    <Column style="min-width:10rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Harga / hari</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getProducts']" class="h-1rem w-full"></Skeleton>
                            <p v-else class="font-normal text-right text-base text-color-secondary">{{
                                toCurrencyLocale(data.price) }}</p>
                        </template>
                    </Column>
                    <Column style="min-width:8rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Denda (%)</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getProducts']" class="h-1rem w-full"></Skeleton>
                            <p v-else class="font-normal text-right text-base text-color-secondary">{{ data.fineBill
                                }}%</p>
                        </template>
                    </Column>
                    <Column style="min-width:6rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Status</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getProducts']" shape="circle" size="1rem"></Skeleton>
                            <p v-else class="font-normal text-base text-color-secondary">
                                <i v-if="data.active === 'Y'" class="pi pi-check-circle text-green-500"
                                    v-tooltip.right="'TERSEDIA'"></i>
                                <i v-else class="pi pi-times-circle text-red-500"
                                    v-tooltip.right="'TIDAK TERSEDIA'"></i>
                            </p>
                        </template>
                    </Column>
                    <Column style="min-width:18rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Keterangan</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getProducts']" class="h-1rem w-full"></Skeleton>
                            <p v-else class="font-normal text-base text-color-secondary">{{ data.desc }}</p>
                        </template>
                    </Column>
                    <Column style="min-width:14rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Tanggal Ditambahkan</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getProducts']" class="h-1rem w-full"></Skeleton>
                            <p v-else class="font-normal text-base text-color-secondary">{{ data.createdAt }}</p>
                        </template>
                    </Column>
                    <Column style="min-width:14rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Terakhir Pembaruan</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getProducts']" class="h-1rem w-full"></Skeleton>
                            <p v-else class="font-normal text-base text-color-secondary">{{ data.updatedAt }}</p>
                        </template>
                    </Column>
                    <Column style="min-width:8rem">
                        <template #body="{ data }">
                            <Button type="button" icon="pi pi-ellipsis-v" class="p-button-text p-button-secondary"
                                @click="$refs['menu-' + data.id].toggle($event)"></Button>
                            <Menu :ref="'menu-' + data.id" appendTo="body" popup :model="getMenuItems(data)"></Menu>
                        </template>
                    </Column>
                </DataTable>
                <Paginator :rows="context.defaultRows" :rowsPerPageOptions="context.rowPerPageOptions"
                    :totalRecords="context.totalRecords" :first="context.limit" @page="context.onPage($event)" />
            </div>
        </section>
        <DialogAddProduct v-if="showDialogAddProduct" v-model:visible="showDialogAddProduct" />
        <DialogEditProduct v-if="showDialogEditProduct" v-model:visible="showDialogEditProduct" />
        <DialogConfirm v-if="showDialogConfirm" v-model:visible="showDialogConfirm" :acceptLabel="'Hapus'"
            :onAccept="confirmDelete" :onReject="cancelDelete" :header="confirmHeader" :message="confirmMessage"
            :acceptLoading="context.loading['removeProduct']" />
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue';
import { toCurrencyLocale } from '../utils/currency';
import { useManageProductStore } from '@/stores/manage-product.store';
import { useEditProductStore } from '@/stores/edit-product.store';

const context = useManageProductStore();
const edit = useEditProductStore();
const DialogAddProduct = defineAsyncComponent(() => import('../components/DialogAddProduct.vue'));
const showDialogAddProduct = ref(false);
const DialogEditProduct = defineAsyncComponent(() => import('../components/DialogEditProduct.vue'));
const showDialogEditProduct = ref(false);
const DialogConfirm = defineAsyncComponent(() => import('../components/DialogConfirm.vue'));
const showDialogConfirm = ref(false);
const selectedProductId = ref(null);
const confirmHeader = ref('');
const confirmMessage = ref('');

const getMenuItems = (data) => {
    return [
        {
            label: 'Pilihan',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-pencil',
                    command: () => {
                        edit.selectedProduct = data;
                        showDialogEditProduct.value = true;
                    }
                },
                {
                    label: 'Hapus',
                    icon: 'pi pi-trash',
                    command: () => {
                        selectedProductId.value = data.id;
                        confirmHeader.value = 'Konfirmasi Hapus';
                        confirmMessage.value = `Apakah Anda yakin ingin menghapus produk ${data.productName}?`;
                        showDialogConfirm.value = true;
                    }
                }
            ]
        }
    ];
};

const confirmDelete = async () => {
    const result = await context.removeProduct(selectedProductId.value);
    if (result) {
        showDialogConfirm.value = false;
    }
};

const cancelDelete = () => {
    showDialogConfirm.value = false;
};

const getFullImageUrl = (urlImg) => {
    return `${import.meta.env.VITE_SUPABASE_STORAGE_URL}${urlImg}`;
};

onMounted(async () => {
    await context.getProducts();
});
</script>

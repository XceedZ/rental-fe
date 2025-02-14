<template>
    <div class="surface-section px-4 pt-8 md:px-6 lg:px-8">
        <div class="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
            <div class="flex flex-column text-center md:text-left">
                <div class="flex align-items-center justify-content-center md:justify-content-start mb-2">
                    <span
                        class="border-circle w-3rem h-3rem flex align-items-center justify-content-center surface-100 mr-2">
                        <i class="bi bi-ui-checks text-900 text-3xl"></i>
                    </span> <span class="text-900 text-3xl font-medium">Transaksi</span>
                </div>
                <span class="text-600 text-xl mb-3">Halaman untuk mengelola transaksi penyewaan!💸</span>
            </div>
        </div>
        <section class="flex-wrap gap-3 justify-content-between">
            <Divider class="w-full"></Divider>
            <div class="w-full flex flex-column md:flex-row gap-2">
                <div class="flex mt-3">
                    <Button icon="pi pi-plus" label="Transaksi" class="w-auto"
                        @click="showDialogAddTrx = true"></Button>
                    <Button icon="pi pi-sync" outlined label="Kirim Notifikasi" class="w-auto ml-2" @click="sendNotif"
                        :loading="context.loading['sendNotif']"></Button>
                </div>
                <span class="p-input-icon-right mt-3 mb-2 md:mt-3 md:mb-0 w-full lg:w-25rem">
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search"> </InputIcon>
                        <InputText v-model="context.keyword" placeholder="Nama Penyewa / Nama Barang / Transaksi"
                            class="w-full" @keyup.enter="context.getManageTransaction()" />
                    </IconField>
                </span>
                <Calendar v-model="context.dates" :manualInput="false" selectionMode="range" showIcon
                    class="md:mt-3 sm:mt-0 ml-auto w-full sm:w-full md:w-auto" dateFormat="d M yy"
                    @hide="changeDates" />
            </div>
            <div class="mt-3">
                <DataTable scrollable scrollHeight="500px" :value="context.dataTable"
                    expandedRows="expandedRows" @rowExpand="onRowExpand" @rowCollapse="onRowCollapse"
                    dataKey="trxCode" :tabStyle="{ 'min-width': '60rem' }" rowHover>
                    <template #empty>
                        <p class="text-center w-full">Data tidak tersedia</p>
                    </template>
                    <template #loading>
                        <tr>
                            <td colspan="9">
                                <div class="flex flex-column gap-3 p-3">
                                    <Skeleton width="100%" height="2rem" class="mb-2" />
                                    <Skeleton width="100%" height="2rem" class="mb-2" />
                                    <Skeleton width="100%" height="2rem" class="mb-2" />
                                </div>
                            </td>
                        </tr>
                    </template>
                    <Column expander style="width: 5rem" />
                    <Column header="#" class="font-semibold text-sm text-color-secondary">
                        <template #body="slotProps">
                            <Skeleton v-if="context.loading['getManageTransaction']" width="2rem" height="1rem"
                                class="mb-2" />
                            <span v-else>{{ slotProps.index + 1 }}</span>
                        </template>
                    </Column>
                    <Column style="min-width:25rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Nama Penyewa</span>
                        </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-3">
                                <Skeleton v-if="context.loading['getManageTransaction']" width="2.5rem" height="2.5rem"
                                    shape="circle" class="mb-2" />
                                <Avatar v-else :name="data.name" alt="User Avatar" style="height: 2.5rem;" />
                                <div>
                                    <Skeleton v-if="context.loading['getManageTransaction']" width="10rem" height="1rem"
                                        class="mb-2" />
                                    <p v-else class="mt-0 mb-2 font-medium text-lg text-color-primary">{{ data.name }}
                                    </p>
                                    <Skeleton v-if="context.loading['getManageTransaction']" width="8rem" height="1rem"
                                        class="mb-2" />
                                    <p v-else class="mt-0 mb-2 font-normal text-base text-color-secondary">{{ data.email
                                        }}</p>
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column style="min-width:20rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Alamat / Ponsel</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageTransaction']" width="15rem" height="1rem"
                                class="mb-2" />
                            <p v-else class="mt-0 mb-2 font-medium text-lg text-color-primary">{{ data.address }}</p>
                            <Skeleton v-if="context.loading['getManageTransaction']" width="10rem" height="1rem"
                                class="mb-2" />
                            <p v-else class="mt-0 mb-2 font-normal text-base text-color-secondary">{{ data.phone }}</p>
                        </template>
                    </Column>
                    <Column style="min-width:20rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Nama Barang / Transaksi</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageTransaction']" width="15rem" height="1rem"
                                class="mb-2" />
                            <p v-else class="mt-0 mb-2 font-medium text-lg text-color-primary">{{ data.product_names }}
                            </p>
                            <Skeleton v-if="context.loading['getManageTransaction']" width="10rem" height="1rem"
                                class="mb-2" />
                            <p v-else class="mt-0 mb-2 font-normal text-base text-color-secondary">{{ data.trx_code }}
                            </p>
                        </template>
                    </Column>
                    <Column style="min-width:5rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Qty</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageTransaction']" width="3rem" height="1rem"
                                class="mb-2" />
                            <p v-else class="mt-0 mb-2 font-normal text-right text-base text-color-secondary">{{
                                data.total_qty
                                }}
                            </p>
                        </template>
                    </Column>
                    <Column style="min-width:13rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Tanggal Penyewaan</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageTransaction']" width="15rem" height="1rem"
                                class="mb-2" />
                            <p v-else class="mt-0 mb-2 text-color-secondary">{{
                                YYYYMMDDtoDMMMMYYYY(data.rent_start_dates) }}</p>
                        </template>
                    </Column>
                    <Column style="min-width:14rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Total Harga</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageTransaction']" width="10rem" height="1rem"
                                class="mb-2" />
                            <template v-else>
                                <p v-if="data.amount_w_fine > 0"
                                    class="mt-0 mb-2 text-color-secondary text-right line-through">{{
                                        toCurrencyLocale(data.total_amount) }}</p>
                                <p v-if="data.amount_w_fine > 0" v-tooltip.right="'Termasuk denda'"
                                    class="mt-0 mb-2 text-color-secondary text-right font-semibold">{{
                                        toCurrencyLocale(data.amount_w_fine) }}</p>
                                <p v-else class="mt-0 mb-2 text-color-secondary text-right">{{
                                    toCurrencyLocale(data.total_amount) }}</p>
                            </template>
                        </template>
                    </Column>
                    <Column style="min-width:14rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Pembayaran</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageTransaction']" width="10rem" height="1rem"
                                class="mb-2" />
                            <template v-else>
                                <p class="mt-0 mb-2 font-medium text-color-primary">{{ data.payment_type }}</p>
                                <p class="mt-0 mb-2 text-color-secondary">{{ data.payment_name }}</p>
                            </template>
                        </template>
                    </Column>
                    <Column style=" min-width:10rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Status</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageTransaction']" width="5rem" height="1rem"
                                class="mb-2" />
                            <Tag v-else :severity="getStatusSeverity(data.status)"
                                class="mt-0 mb-2 font-semibold uppercase text-sm p-2">
                                <i :class="getStatusIcon(data.status)" class="mr-2"></i>{{ getStatusLabel(data.status)
                                }}
                            </Tag>
                        </template>
                    </Column>
                    <Column style="min-width:20rem">
                        <template #header>
                            <span class="font-semibold text-sm text-color-secondary">Keterangan</span>
                        </template>
                        <template #body="{ data }">
                            <Skeleton v-if="context.loading['getManageTransaction']" width="15rem" height="1rem"
                                class="mb-2" />
                            <p v-else class="mt-0 mb-2 font-normal text-base text-color-secondary">{{ data.desc }}</p>
                        </template>
                    </Column>
                    <Column style="min-width:8rem">
                        <template #body="{ data }">
                            <Button type="button" icon="pi pi-ellipsis-v" class="p-button-text p-button-secondary"
                                @click="$refs['menu-' + data.trx_code].toggle($event)"></Button>
                            <Menu :ref="'menu-' + data.trx_code" appendTo="body" popup :model="getMenuItems(data)">
                            </Menu>
                        </template>
                    </Column>
                    <template #expansion="slotProps">
                        <div class="p-3">
                            <h5 class="text-color-secondary">Informasi Lengkap</h5>
                            <DataTable size="small" :lazy="true"
                                :value="context.detailDataPerRow[slotProps.data.trx_code]">
                                <Column style="min-width:15rem">
                                    <template #header>
                                        <span class="font-semibold text-sm text-color-secondary">No Transaksi</span>
                                    </template>
                                    <template #body="{ data }">
                                        <p class="mt-0 mb-2 font-medium text-color-primary">{{ data.trx_code
                                            }}</p>
                                    </template>
                                </Column>
                                <Column style="min-width:15rem">
                                    <template #header>
                                        <span class="font-semibold text-sm text-color-secondary">Nama Barang / Merk /
                                            Kategori</span>
                                    </template>
                                    <template #body="{ data }">
                                        <p class="mt-0 mb-2 font-medium text-lg text-color-primary">{{ data.product_name
                                            }}</p>
                                        <p class="mt-0 mb-2 font-normal text-base text-color-secondary">{{
                                            data.brand_name }} | {{ data.ctgr_product_name }}</p>
                                    </template>
                                </Column>
                                <Column style="width:3rem">
                                    <template #header>
                                        <span class="font-semibold text-sm text-color-secondary">Qty</span>
                                    </template>
                                    <template #body="{ data }">
                                        <p class="mt-0 mb-2 font-normal text-right text-base text-color-secondary">{{
                                            data.qty
                                            }}
                                        </p>
                                    </template>
                                </Column>
                                <Column style="min-width:10rem">
                                    <template #header>
                                        <span class="font-semibold text-sm text-color-secondary">Tanggal
                                            Penyewaan</span>
                                    </template>
                                    <template #body="{ data }">
                                        <p class="mt-0 mb-2 text-color-secondary">{{
                                            YYYYMMDDtoDMMMMYYYY(data.rent_start_date) }} s/d {{
                                                YYYYMMDDtoDMMMMYYYY(data.rent_end_date) }}</p>
                                    </template>
                                </Column>
                                <Column style="min-width:15rem">
                                    <template #header>
                                        <span class="font-semibold text-sm text-color-secondary">Tanggal
                                            Pengembalian</span>
                                    </template>
                                    <template #body="{ data }">
                                        <p class="mt-0 mb-2 text-color-secondary">{{ data.return_date ?
                                            YYYYMMDDtoDMMMMYYYY(data.return_date) : '(Belum dikembalikan)' }}</p>
                                    </template>
                                </Column>
                                <Column style="width: 10rem">
                                    <template #header>
                                        <span class="font-semibold text-sm text-color-secondary">Terlambat (hari)
                                        </span>
                                    </template>
                                    <template #body="{ data }">
                                        <p class="mt-0 mb-2 text-color-secondary text-right">{{ data.duration }}</p>
                                    </template>
                                </Column>
                                <Column style="width: 5rem">
                                    <template #header>
                                        <span class="font-semibold text-sm text-color-secondary">Denda</span>
                                    </template>
                                    <template #body="{ data }">
                                        <p class="mt-0 mb-2 text-color-secondary text-right">{{ data.fine_bill }}%</p>
                                    </template>
                                </Column>
                                <Column style="min-width:8rem">
                                    <template #header>
                                        <span class="font-semibold text-sm text-color-secondary">Total Harga</span>
                                    </template>
                                    <template #body="{ data }">
                                        <p v-if="data.amount_w_fine > 0"
                                            class="mt-0 mb-2 text-color-secondary text-right line-through">{{
                                                toCurrencyLocale(data.total_amount) }}</p>
                                        <p v-if="data.amount_w_fine > 0" v-tooltip.right="'Termasuk denda'"
                                            class="mt-0 mb-2 text-color-secondary text-right font-semibold">{{
                                                toCurrencyLocale(data.amount_w_fine) }}</p>
                                        <p v-else class="mt-0 mb-2 text-color-secondary text-right">{{
                                            toCurrencyLocale(data.total_amount) }}</p>
                                    </template>
                                </Column>
                                <Column style="min-width: 5rem">
                                    <template #header>
                                        <span class="font-semibold text-sm text-color-secondary">Aksi</span>
                                    </template>
                                    <template #body="{ data }">
                                        <div v-if="data.status === 'P'" class="flex gap-2">
                                            <Button icon="pi pi-check" class="w-full" label="Setujui"
                                                :loading="loading[data.trx_rent_product_id]?.approve"
                                                @click="approveTransaction(data.trx_rent_product_id, data.trx_code)">
                                            </Button>
                                            <Button outlined severity="danger" icon="pi pi-times" class="w-full"
                                                label="Tolak" :loading="loading[data.trx_rent_product_id]?.reject"
                                                @click="rejectTransaction(data.trx_rent_product_id, data.trx_code)">
                                            </Button>
                                        </div>
                                        <div v-else class="flex align-items-center">
                                            <Tag :severity="getStatusSeverity(data.status)"
                                                class="mt-0 mb-2 font-semibold uppercase text-sm p-2">
                                                <i :class="getStatusIcon(data.status)" class="mr-2"></i>{{
                                                    getStatusLabel(data.status)
                                                }}
                                            </Tag>
                                            <Button outlined icon="pi pi-check-circle" v-if="data.status === 'D'"
                                                label="Selesaikan" class="mt-0 mb-2 ml-2 p-button-text"
                                                :loading="loading[data.trx_rent_product_id]?.finish"
                                                @click="completeTransaction(data.trx_rent_product_id, data.trx_code)" />
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </template>
                </DataTable>
                <Paginator :rows="context.defaultRows" :rowsPerPageOptions="context.rowPerPageOptions"
                    :totalRecords="context.totalRecords" :first="context.limit" @page="context.onPage($event)" />
            </div>
        </section>
        <DialogAddTrx v-if="showDialogAddTrx" :visible="showDialogAddTrx" @update:visible="showDialogAddTrx = $event" />
        <DialogEditTrx v-if="showDialogEditTrx" :visible="showDialogEditTrx"
            @update:visible="showDialogEditTrx = $event" :trxCode="selectedTrxCode"
            :transactions="selectedTransactions" />
    </div>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted, reactive, onUnmounted } from 'vue';
import Avatar from '../components/Avatar.vue';
import { toCurrencyLocale } from '../utils/currency';
import { useManageTransactionStore } from '@/stores/manage-transaction.store';
import { YYYYMMDDtoDMMMMYYYY } from '../utils/date-convert';

const context = useManageTransactionStore();
const DialogAddTrx = defineAsyncComponent(() => import('../components/DialogAddTrx.vue'));
const showDialogAddTrx = ref(false);
const DialogEditTrx = defineAsyncComponent(() => import('../components/DialogEditTrx.vue'));
const showDialogEditTrx = ref(false);
const expandedRows = ref([]);
const loading = reactive({});
const selectedTransactions = ref([]);
const selectedTrxCode = ref('');

const onRowExpand = async (event) => {
    await context.getDetailManageTransaction(event.data.trx_code);
    context.detailDataPerRow[event.data.trx_code] = context.selectedProduct;
};

const getMenuItems = (data) => {
    if (data.status === 'P') {
        return [
            {
                label: 'Pilihan',
                items: [
                    {
                        label: 'Setujui Semua',
                        icon: 'pi pi-check',
                        command: async () => {
                            await context.approveAllTransaction(data.trx_code);
                        }
                    },
                    {
                        label: 'Tolak Semua',
                        icon: 'pi pi-times',
                        command: () => {
                            selectedProductId.value = data.id;
                            confirmHeader.value = 'Konfirmasi Hapus';
                            confirmMessage.value = `Apakah Anda yakin ingin menghapus produk ${data.productName}?`;
                            showDialogConfirm.value = true;
                        }
                    },
                    {
                        label: 'Edit',
                        icon: 'pi pi-pencil',
                        command: async () => {
                            selectedTrxCode.value = data.trx_code;
                            await context.getDetailManageTransaction(data.trx_code);
                            selectedTransactions.value = context.detailDataPerRow[data.trx_code];
                            showDialogEditTrx.value = true;
                        }
                    }
                ]
            }
        ];
    } else {
        return [
            {
                label: 'Pilihan',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-pencil',
                        command: async () => {
                            selectedTrxCode.value = data.trx_code;
                            await context.getDetailManageTransaction(data.trx_code);
                            selectedTransactions.value = context.detailDataPerRow[data.trx_code];
                            showDialogEditTrx.value = true;
                        }
                    }
                ]
            }
        ];
    }
};

const changeDates = () => {
    context.getManageTransaction();
};

onMounted(async () => {
    await context.getManageTransaction();
    context.subscribeToRealtimeUpdates();
});

onUnmounted(() => {
    context.unsubscribeFromRealtimeUpdates();
});

const sendNotif = async () => {
    await context.sendNotification();
};
const getStatusLabel = (status) => {
    switch (status) {
        case 'P':
            return 'Pending';
        case 'B':
            return 'Dibatalkan';
        case 'T':
            return 'Ditolak';
        case 'D':
            return 'Masa Sewa';
        case 'S':
            return 'Selesai';
        default:
            return status;
    }
};

const getStatusSeverity = (status) => {
    switch (status) {
        case 'P':
            return 'primary';
        case 'B':
            return 'warning';
        case 'T':
            return 'danger';
        case 'D':
            return 'info';
        case 'S':
            return 'success';
        default:
            return null;
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'P':
            return 'pi pi-clock';
        case 'B':
            return 'pi pi-exclamation-triangle';
        case 'T':
            return 'pi pi-times-circle';
        case 'D':
            return 'pi pi-info-circle';
        case 'S':
            return 'pi pi-check-circle';
        default:
            return '';
    }
};

const approveTransaction = async (trx_rent_product_id, trx_code) => {
    loading[trx_rent_product_id] = { approve: true };
    await context.approveTransaction(trx_rent_product_id, trx_code);
    loading[trx_rent_product_id] = { approve: false };
};

const rejectTransaction = async (trx_rent_product_id, trx_code) => {
    loading[trx_rent_product_id] = { reject: true };
    await context.rejectTransaction(trx_rent_product_id, trx_code);
    loading[trx_rent_product_id] = { reject: false };
};

const completeTransaction = async (trx_rent_product_id, trx_code) => {
    loading[trx_rent_product_id] = { finish: true };
    await context.finishTransaction(trx_rent_product_id, trx_code);
    loading[trx_rent_product_id] = { finish: false };
};

</script>

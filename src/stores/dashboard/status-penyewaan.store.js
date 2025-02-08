import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessCancel } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import local from "@/utils/local-storage";

export const useStatusPenyewaanStore = defineStore({
  id: "status-penyewaan.store",
  state: () => ({
    getApi: ApiConstant.GET_WIDGET_STATUS_PENYEWAAN,
    toast: useToast(),
    keyword: "",
    loading: false,
    dataTable: [],
    totalRecords: 0,
    rowPerPageOptions: GeneralConstants.ROW_PERPAGE_OPTION,
    defaultRows: GeneralConstants.DEFAULT_ROWS,
    offset: 0,
    limit: GeneralConstants.DEFAULT_ROWS,
    brandOptions: [],
    ctgrOptions: [],
    priceRange: [0, 2000000],
    selectedProduct: {},
    user: local.getUser()[0],
    trxProductList: [],
    totalRentals: 0,
    growthPercentage: 0,
    dailyRentals: [],
    statusRentals: {
      Selesai: [],
      Dibatalkan: [],
      Ditolak: []
    },
    currentDate: '', // Added currentDate state
  }),
  actions: {
    async getWidgetStatusPenyewaan() {
      this.loading = true;
      const result = await callApi({
        api: this.getApi,
      });
      if (result.isOk) {
        this.statusRentals = result.body.statusData;
        this.currentDate = result.body.currentDate; // Set currentDate from API response
      } else {
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data' });
      }
      this.loading = false;
    },
  },
});

import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessCancel } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import local from "@/utils/local-storage";

export const useTotalPenyewaanStore = defineStore({
  id: "total-penyewaan.store",
  state: () => ({
    getApi: ApiConstant.GET_WIDGET_TOTAL_PENYEWAAN,
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
  }),
  actions: {
    async getWidgetTotalPenyewaan() {
      this.loading = true;
      // const result = await callApi({
      //   api: this.getApi,
      const result = {
        isOk: true,
        body: {
          totalRentals: 150,
          growthPercentage: 12.5,
          dailyRentals: [10, 20, 15, 30, 25, 40, 35]
        }
      };
      if (result.isOk) {
        this.totalRentals = result.body.totalRentals;
        this.growthPercentage = result.body.growthPercentage;
        this.dailyRentals = result.body.dailyRentals;
      } else {
        // this.toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data' });
      }
      this.loading = false;
    },
  },
});

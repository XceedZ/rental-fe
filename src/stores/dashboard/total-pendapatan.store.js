import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import local from "@/utils/local-storage";
import { supabase } from "@/utils/supabase-client";
import { useTotalPenyewaanStore } from "./total-penyewaan.store";

export const useTotalPendapatanStore = defineStore({
  id: "total-pendapatan.store",
  state: () => ({
    getApi: ApiConstant.GET_WIDGET_TOTAL_PENDAPATAN,
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
    totalPendapatan: 0,
    growthPercentage: 0,
    dailyPendapatan: [],
    currentDate: "",
  }),
  actions: {
    async getWidgetTotalPendapatan() {
      this.loading = true;
      const result = await callApi({
        api: this.getApi,
      });
      if (result.isOk) {
        this.totalPendapatan = result.body.totalPendapatan;
        this.growthPercentage = result.body.growthPercentage;
        this.dailyPendapatan = result.body.dailyPendapatan.map((entry) => ({
          date: entry.date,
          total: entry.total,
        }));
        this.currentDate = result.body.currentDate;
        const totalPenyewaanStore = useTotalPenyewaanStore();
        await totalPenyewaanStore.getWidgetTotalPenyewaan();
      } else {
        this.toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch data",
        });
      }
      this.loading = false;
    },
    subscribeToRealtimeUpdates() {
      const totalPenyewaanStore = useTotalPenyewaanStore();
      this.subscription = supabase
        .channel("public:trx_rent_products")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "trx_rent_products" },
          async (payload) => {
            await this.getWidgetTotalPendapatan();
            await totalPenyewaanStore.getWidgetTotalPenyewaan();
          }
        )
        .subscribe();
    },
    unsubscribeFromRealtimeUpdates() {
      if (this.subscription) {
        supabase.removeChannel(this.subscription);
      }
    },
  },
});

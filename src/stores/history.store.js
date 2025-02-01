import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessCancel } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import local from "@/utils/local-storage";

export const useHistoryStore = defineStore({
  id: "history.store",
  state: () => ({
    getApi: ApiConstant.GET_TRX_PRODUCT_LIST,
    rejectAllApi: ApiConstant.REJECT_ALL_TRANSACTION,
    cancelAllApi: ApiConstant.CANCEL_ALL_TRANSACTION,
    toast: useToast(),
    keyword: "",
    loading: {},
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
  }),
  actions: {
    onPage(event) {
      this.offset = event.page * event.rows;
      this.limit = event.rows;
      this.getProducts();
    },
    async getTrxProductList() {
      this.loading["getTrxProductList"] = true;
      const result = await callApi({
        api: this.getApi,
        body: {
          userId: this.user.id,
          keyword: this.keyword,
        },
      });
      if (result.isOk) {
        this.trxProductList = result.body.trxProductList;
      }
      this.loading["getTrxProductList"] = false;
      return result;
    },
    async rejectTransaction(trxRentProductId, trxCode) {
      this.loading["reject"] = true;
      const payload = {
        api: this.rejectApi,
        body: {
          trx_rent_product_id: trxRentProductId,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        showSuccessReject(this.toast);
        this.loading["reject"] = false;
        await this.getManageTransaction();
        await this.getDetailManageTransaction(trxCode);
      }
      this.loading["reject"] = false;
    },
    async cancelAllTransaction(trxCode) {
      this.loading["cancelAll"] = true;
      const payload = {
        api: this.cancelAllApi,
        body: {
          trx_code: trxCode,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        showSuccessCancel(this.toast);
        this.loading["cancelAll"] = false;
        await this.getTrxProductList();
      }
      this.loading["cancelAll"] = false;
    },
    resetFilter() {
      this.keyword = "";
      this.getTrxProductList();
    },
  },
});

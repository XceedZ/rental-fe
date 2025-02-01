import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessRental, showErrorApi } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import local from "@/utils/local-storage";
import moment from "moment";

export const useProductDetailStore = defineStore({
  id: "product-detail.store",
  state: () => ({
    getApi: ApiConstant.GET_DETAIL_PRODUCTS,
    brandApi: ApiConstant.GET_BRAND_FOR_ADD_PRODUCT,
    ctgrApi: ApiConstant.GET_CTGR_FOR_ADD_PRODUCT,
    user: local.getUser()[0],
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
    selectedProduct: [],
    startDate: moment().format("YYYY-MM-DD"),
    endDate: "",
    qty: 1,
    dates: [],
    product: {},
    productCode: "",
  }),
  actions: {
    async getDetailProducts() {
      this.loading["getProducts"] = true;
      const payload = {
        api: this.getApi,
        body: {
          product_code: this.productCode,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        this.selectedProduct = result.body.body.product;
        this.loading["getProducts"] = false;
        return this.selectedProduct;
      }
      this.loading["getProducts"] = false;
    },
    async createRental(router) {
      this.loading["createRental"] = true;
      const result = await callApi({
        api: ApiConstant.CREATE_RENTAL,
        body: {
          user_id: this.user.id,
          items: [
            {
              product_id: this.selectedProduct.product_id,
              product_code: this.selectedProduct.product_code,
              rent_start_date: this.startDate,
              rent_end_date: this.endDate,
              qty: this.qty,
              desc: "",
            },
          ],
        },
      });
      if (result.isOk) {
        showSuccessRental(this.toast);
        this.loading["createRental"] = false;
        router.push({ name: "history" });
        return result;
      } else if (result.error && result.error.response) {
        showErrorApi(this.toast, result.error.response.data.message);
        this.loading["createRental"] = false;
      }
      this.loading["createRental"] = false;
    },
  },
  getters: {
    isActionDisabled: (state) => {
      return (
        !state.startDate ||
        !state.endDate ||
        state.startDate === "" ||
        state.endDate === "" ||
        state.selectedProduct.active === "N"
      );
    },
  },
});

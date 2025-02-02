import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessRemove } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";

export const useManageCtgrBrandStore = defineStore({
  id: "manage-ctgr-brand.store",
  state: () => ({
    getApi: ApiConstant.GET_PRODUCTS,
    brandApi: ApiConstant.GET_BRAND_FOR_ADD_PRODUCT,
    ctgrApi: ApiConstant.GET_CTGR_FOR_ADD_PRODUCT,
    manageBrandApi: ApiConstant.GET_MANAGE_BRAND,
    manageCtgrApi: ApiConstant.GET_MANAGE_CTGR,
    toast: useToast(),
    brandKeyword: '',
    ctgrKeyword: '',
    loading: {},
    dataTableBrand: [],
    dataTableCtgr: [],
    totalBrandRecords: 0,
    totalCtgrRecords: 0,
    rowPerPageOptions: GeneralConstants.ROW_PERPAGE_OPTION,
    defaultRows: GeneralConstants.DEFAULT_ROWS,
    brandOffset: 0,
    ctgrOffset: 0,
    brandLimit: GeneralConstants.DEFAULT_ROWS,
    ctgrLimit: GeneralConstants.DEFAULT_ROWS,
  }),
  actions: {
    onBrandPage(event) {
      this.brandOffset = event.page * event.rows;
      this.brandLimit = event.rows;
      this.getManageBrand();
    },
    onCtgrPage(event) {
      this.ctgrOffset = event.page * event.rows;
      this.ctgrLimit = event.rows;
      this.getManageCtgr();
    },
    async getManageBrand() {
      this.loading["getManageBrand"] = true;
      const payload = {
        api: this.manageBrandApi,
        body: {
          keyword: this.brandKeyword,
          limit: this.brandLimit,
          offset: this.brandOffset,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        const brands = result.body.brands.map((data) => ({
          productBrandId: data.productBrandId,
          brandName: data.brandName,
          active: data.active,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        }));
        this.loading["getManageBrand"] = false;
        this.totalBrandRecords = result.body.totalRecords;
        this.dataTableBrand = brands;

        return brands;
      }
      this.loading["getManageBrand"] = false;
    },
    async getManageCtgr() {
      this.loading["getManageCtgr"] = true;
      const payload = {
        api: this.manageCtgrApi,
        body: {
          keyword: this.ctgrKeyword,
          limit: this.ctgrLimit,
          offset: this.ctgrOffset,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        const categories = result.body.categories.map((data) => ({
          ctgrProductId: data.ctgrProductId,
          ctgrName: data.ctgrName,
          active: data.active,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        }));
        this.loading["getManageCtgr"] = false;
        this.totalCtgrRecords = result.body.totalRecords;
        this.dataTableCtgr = categories;

        return categories;
      }
      this.loading["getManageCtgr"] = false;
    },
    async removeProduct(productId) {
      this.loading["removeProduct"] = true;
      const payload = {
        api: ApiConstant.REMOVE_PRODUCT,
        body: { productId },
      };
      const result = await callApi(payload);
      showSuccessRemove(this.toast);
      this.getProducts();
      this.loading["removeProduct"] = false;
      return result.isOk;
    },
  },
});

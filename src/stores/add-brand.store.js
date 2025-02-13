import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessAdd, showErrorApi } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import { useManageCtgrBrandStore } from "@/stores/manage-ctgr-brand.store";

export const useAddBrandStore = defineStore({
  id: "add-brand.store",
  state: () => ({
    addBrandApi: ApiConstant.ADD_BRAND,
    toast: useToast(),
    brandName: '',
    active: 'Y',
    loading: {},
  }),
  actions: {
    async addBrand() {
      this.loading["addBrand"] = true;

      const result = await callApi({
        api: this.addBrandApi,
        body: {
          brandName: this.brandName,
          active: this.active
        },
      });
      this.loading["addBrand"] = false;
      if (result.isOk) {
        const context = useManageCtgrBrandStore();
        showSuccessAdd(this.toast);
        context.getManageBrand();
        this.resetInput();
        return { isOk: true };
      } else if (result.error && result.error.response) {
        showErrorApi(this.toast, result.error.response.data.message);
        return { isOk: false };
      }
      return { isOk: false };
    },
    resetInput() {
      this.brandName = "";
    },
  },
  getters: {
    isSubmitDisabled: (state) => {
      return !state.brandName;
    },
  },
});

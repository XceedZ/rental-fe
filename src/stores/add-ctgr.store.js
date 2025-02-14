import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessAdd, showErrorApi } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import { useManageCtgrBrandStore } from "@/stores/manage-ctgr-brand.store";

export const useAddCtgrStore = defineStore({
  id: "add-ctgr.store",
  state: () => ({
    addCtgrApi: ApiConstant.ADD_CTGR,
    toast: useToast(),
    ctgrName: "",
    active: "Y",
    loading: {},
  }),
  actions: {
    async addCtgr() {
      this.loading["addCtgr"] = true;

      const result = await callApi({
        api: this.addCtgrApi,
        body: {
          ctgrName: this.ctgrName,
          active: this.active,
        },
      });
      this.loading["addCtgr"] = false;
      if (result.isOk) {
        const context = useManageCtgrBrandStore();
        showSuccessAdd(this.toast);
        context.getManageCtgr();
        this.resetInput();
        return { isOk: true };
      } else if (result.error && result.error.response) {
        showErrorApi(this.toast, result.error.response.data.message);
        return { isOk: false };
      }
      return { isOk: false };
    },
    resetInput() {
      this.ctgrName = "";
    },
  },
  getters: {
    isSubmitDisabled: (state) => {
      return !state.ctgrName;
    },
  },
});

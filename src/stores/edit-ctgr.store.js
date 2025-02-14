import { defineStore } from "pinia";
import callApi from "@/utils/api-connect";
import { useToast } from "primevue/usetoast";
import { showSuccessEdit, showErrorApi } from "@/utils/toast-service";
import { ApiConstant } from "@/api-constant";
import { useManageCtgrBrandStore } from "@/stores/manage-ctgr-brand.store";

export const useEditCtgrStore = defineStore({
  id: "edit-ctgr.store",
  state: () => ({
    editApi: ApiConstant.EDIT_CTGR,
    toast: useToast(),
    ctgrId: "",
    ctgrName: "",
    loading: {},
    selectedCtgr: {},
    statusOptions: [
      { name: "AKTIF", code: "Y" },
      { name: "NONAKTIF", code: "N" },
    ],
  }),
  actions: {
    async editCtgr() {
      this.loading["editCtgr"] = true;
      const result = await callApi({
        api: this.editApi,
        body: {
          ctgrId: this.ctgrId,
          ctgrName: this.ctgrName,
        },
      });
      if (result.isOk) {
        const category = result.body;
        showSuccessEdit(this.toast);
        this.loading["editCtgr"] = false;
        const context = useManageCtgrBrandStore();
        context.getManageCtgr();

        return true;
      } else if (result.error && result.error.response) {
        showErrorApi(this.toast, result.error.response.data.message);
        this.loading["editCtgr"] = false;
        return false;
      }
      this.loading["editCtgr"] = false;
      return false;
    },
  },
});

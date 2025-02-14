import { defineStore } from "pinia";
import callApi from "@/utils/api-connect";
import { useToast } from "primevue/usetoast";
import { showSuccessEdit, showErrorApi } from "@/utils/toast-service";
import { ApiConstant } from "@/api-constant";
import { useManageCtgrBrandStore } from "@/stores/manage-ctgr-brand.store";

export const useEditBrandStore = defineStore({
  id: "edit-brand.store",
  state: () => ({
    editApi: ApiConstant.EDIT_BRAND,
    toast: useToast(),
    brandId: "",
    brandName: "",
    loading: {},
    selectedBrand: {},
    statusOptions: [
      { name: "AKTIF", code: "Y" },
      { name: "NONAKTIF", code: "N" },
    ],
  }),
  actions: {
    async editBrand() {
      this.loading["editBrand"] = true;
      const result = await callApi({
        api: this.editApi,
        body: {
          brandId: this.brandId,
          brandName: this.brandName,
        },
      });
      if (result.isOk) {
        const brand = result.body.brand;
        showSuccessEdit(this.toast);
        this.loading["editBrand"] = false;
        const context = useManageCtgrBrandStore();
        context.getManageBrand();

        return true;
      } else if (result.error && result.error.response) {
        showErrorApi(this.toast, result.error.response.data.message);
        this.loading["editBrand"] = false;
        return false;
      }
      this.loading["editBrand"] = false;
      return false;
    },
  },
});

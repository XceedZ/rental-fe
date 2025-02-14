import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessEdit, showErrorApi } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import local from "@/utils/local-storage";

export const useProfileSettingStore = defineStore({
  id: "profile-setting.store",
  state: () => ({
    saveApi: ApiConstant.UPDATE_PROFILE,
    toast: useToast(),
    keyword: "",
    loading: {},
    user: {},
  }),
  actions: {
    profileAccount() {
      const user = local.getUser();
      this.user = {
        userId: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        roleName: user.roleName,
      };
    },    
    async updateProfile() {
      this.loading["updateProfile"] = true;
      const result = await callApi({
        api: this.saveApi,
        body: {
          userId: this.user.userId,
          name: this.user.name,
          address: this.user.address,
          phone: this.user.phone,
        },
      });
      if (result.isOk) {
        const user = result.body;
        local.set("user", JSON.stringify(user));
        showSuccessEdit(this.toast);
        this.loading["updateProfile"] = false;
        return true;
      } else if (result.error && result.error.response) {
        showErrorApi(this.toast, result.error.response.data.message);
        this.loading["updateProfile"] = false;
        return false;
      }
      this.loading["updateProfile"] = false;
      return false;
    },
  },
});

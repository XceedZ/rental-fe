import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import local from "@/utils/local-storage";
import router from "@/router";

export const useProfileSettingStore = defineStore({
  id: "profile-setting.store",
  state: () => ({
    saveApi: ApiConstant.GET_CTGR_FOR_ADD_PRODUCT,
    toast: useToast(),
    keyword: "",
    loading: {},
    name: "",
    email: "",
    phone: "",
    address: "",
  }),
  actions: {
    profileAccount() {
      this.name = local.get('name') || "";
      this.email = local.get('email') || "";
      this.phone = local.get('phone') || "";
      this.address = local.get('address') || "";
    }
  },
});

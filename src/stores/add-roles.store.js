import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessAdd, showErrorApi } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import { useManageAdminStore } from "@/stores/manage-admin.store";

export const useAddRolesStore = defineStore({
  id: "add-roles.store",
  state: () => ({
    addApi: ApiConstant.ADD_ROLE_PERMISSIONS,
    permissionsApi: ApiConstant.GET_PERMISSIONS,
    toast: useToast(),
    productId: -99,
    productName: "",
    brandId: "",
    brandName: "",
    ctgrId: "",
    ctgrName: "",
    stock: 1,
    price: 0,
    fineBill: 0,
    desc: "",
    urlImg: "",
    loading: {},
    keyword: "",
    brandOptions: [],
    ctgrOptions: [],
    roleName: "",
    selectedPermissions: [],
    permissionsOptions: [],
    adminAuthority: 2,
  }),
  actions: {
    async addRolePermissions() {
      this.loading["addRole"] = true;

      const permissions = this.selectedPermissions.map(
        (permission) => permission.permissionName
      );

      try {
        const result = await callApi({
          api: this.addApi,
          body: {
            roleName: this.roleName,
            permissions: permissions,
            authority: this.adminAuthority,
          },
        });

        if (result.isOk) {
          const context = useManageAdminStore();
          showSuccessAdd(this.toast);
          context.getRolePermission();
          this.resetInput();
          this.loading["addRole"] = false;
          return { isOk: true };
        } else if (result.error && result.error.response) {
          showErrorApi(
            this.toast,
            result.error.response.data.message
          );
          this.loading["addRole"] = false;
          return { isOk: false };
        }
      } catch (error) {
        showErrorApi(this.toast);
        this.loading["addRole"] = false;
        return { isOk: false };
      }

      this.loading["addRole"] = false;
      return { isOk: false };
    },

    async getPermissions() {
      this.loading["getPermissions"] = true;

      const result = await callApi({
        api: this.permissionsApi,
        body: {},
      });

      if (result.isOk) {
        this.loading["getPermissions"] = false;
        this.permissionsOptions = result.body.permissions;
        return result.body.permissions;
      } else {
        this.loading["getPermissions"] = false;
        return [];
      }
    },
    resetInput() {
      this.roleName = "";
      this.selectedPermissions = [];
    },
  },
  getters: {
    isSubmitDisabled: (state) => {
      return (
        !state.productName ||
        !state.brandId ||
        !state.ctgrId ||
        !state.stock ||
        !state.price ||
        !state.fineBill
      );
    },
  },
});

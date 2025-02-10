import { defineStore } from "pinia";
import callApi from "@/utils/api-connect";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessEdit, showSuccessRemove, showErrorApi } from "@/utils/toast-service";
import { ApiConstant } from "@/api-constant";
import { useRouter } from "vue-router";

export const useManageAdminStore = defineStore({
  id: "manage-admin.store",
  state: () => ({
    adminApi: ApiConstant.GET_MANAGE_ADMIN,
    roleApi: ApiConstant.GET_ROLE_PERMISSION,
    userForAddApi: ApiConstant.GET_USER_FOR_ADD_ADMIN,
    removeApi: ApiConstant.REMOVE_ROLE_PERMISSIONS,
    toast: useToast(),
    roleUser: 3,
    keyword: "",
    dataTableAdmin: [],
    dataTableRoles: [],
    userOptions: null,
    selectedMember: null,
    selectedRole: null,
    router: useRouter(),
    loading: {},
    totalAdminRecords: 0,
    totalRoleRecords: 0,
    rowPerPageOptions: GeneralConstants.ROW_PERPAGE_OPTION,
    defaultRows: GeneralConstants.DEFAULT_ROWS,
    adminOffset: 0,
    roleOffset: 0,
    adminLimit: GeneralConstants.DEFAULT_ROWS,
    roleLimit: GeneralConstants.DEFAULT_ROWS,
  }),
  actions: {
    onAdminPage(event) {
      this.adminOffset = event.page * event.rows;
      this.adminLimit = event.rows;
      this.getManageAdmin();
    },
    onRolePage(event) {
      this.roleOffset = event.page * event.rows;
      this.roleLimit = event.rows;
      this.getRolePermission();
    },
    async getManageAdmin() {
      this.loading["getAdmin"] = true;
      const payload = {
        api: this.adminApi,
        body: {
          keyword: this.keyword,
          limit: this.adminLimit,
          offset: this.adminOffset,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        const users = result.body.users.map((data) => ({
          id: data.userId,
          userCode: data.userCode,
          address: data.address,
          phone: data.phone,
          name: data.name,
          email: data.email,
          roleId: data.roleId,
          roleName: data.roleName,
          code: data.code,
          updatedAt: data.updatedAt,
        }));
        this.loading["getAdmin"] = false;
        this.dataTableAdmin = users;
        this.totalAdminRecords = result.body.totalRecords;

        return users;
      }
      this.loading["getAdmin"] = false;
    },

    async getRolePermission() {
      this.loading["getRole"] = true;
      const payload = {
        api: this.roleApi,
        body: {
          limit: this.roleLimit,
          offset: this.roleOffset,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        const roles = result.body.roles.map((data) => ({
          roleId: data.roleId,
          roleName: data.roleName,
          updatedAt: data.updatedAt,
          permissionName: data.permissionname,
          userCount: data.usercount,
        }));
        this.loading["getRole"] = false;
        this.dataTableRoles = roles;
        this.totalRoleRecords = result.body.totalRecords;

        return roles;
      }
      this.loading["getRole"] = false;
    },

    async getUserForAddAdmin() {
      this.loading["getUser"] = true;
      const payload = {
        api: this.userForAddApi,
        body: {},
      };
      const result = await callApi(payload);
      if (result.isOk) {
        const users = result.body.users.map((data) => ({
          id: data.user_id,
          userCode: data.user_code,
          address: data.address,
          phone: data.phone,
          name: data.name,
          email: data.email,
          roleName: data.role_name,
          code: data.code,
          updatedAt: data.updated_at,
        }));
        this.loading["getUser"] = false;
        this.userOptions = users;

        return users;
      }
      this.loading["getUser"] = false;
    },

    async editUserAdmin(userId, roleId) {
      this.loading["editUser"] = true;
      const payload = {
        api: ApiConstant.EDIT_USER_ADMIN,
        body: {
          user_id: userId,
          role_id: roleId,
        },
      };
      const result = await callApi(payload);
      showSuccessEdit(this.toast);
      this.loading["editUser"] = false;
      this.getManageAdmin();
      this.getRolePermission();

      return result.isOk;
    },

    async removeUserAdmin(userId) {
      this.loading["removeAdmin"] = true;
      const payload = {
        api: ApiConstant.EDIT_USER_ADMIN,
        body: {
          user_id: userId,
          role_id: this.roleUser,
        },
      };
      const result = await callApi(payload);
      showSuccessRemove(this.toast);
      this.loading["removeAdmin"] = false;
      this.getManageAdmin();
      this.getRolePermission();

      return result.isOk;
    },

    async removeRolePermissions(roleId) {
      this.loading["removeRole"] = true;
      const payload = {
        api: this.removeApi,
        body: {
          roleId: roleId,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        showSuccessRemove(this.toast);
        this.getRolePermission();
      } else if (result.error && result.error.response) {
        showErrorApi(this.toast, result.error.response.data.message);
      }
      this.loading["removeRole"] = false;
      return result.isOk;
    },
  },
  getters: {
    isInviteAdminDisabled(state) {
      return !state.selectedMember || !state.selectedRole;
    },
  },
});

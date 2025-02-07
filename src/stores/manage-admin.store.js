import { defineStore } from 'pinia';
import callApi from '@/utils/api-connect';
import { useToast } from 'primevue/usetoast';
import { showSuccessEdit, showSuccessRemove } from '@/utils/toast-service';
import { ApiConstant } from '@/api-constant';
import { useRouter } from 'vue-router';

export const useManageAdminStore = defineStore({
  id: 'manage-admin.store',
  state: () => ({
    adminApi: ApiConstant.GET_MANAGE_ADMIN,
    roleApi: ApiConstant.GET_ROLE_PERMISSION,
    userForAddApi: ApiConstant.GET_USER_FOR_ADD_ADMIN,
    toast: useToast(),
    roleUser: 3,
    keyword: '',
    dataTableAdmin: [],
    dataTableRoles: [],
    userOptions: null,
    selectedMember: null,
    selectedRole: null,
    router: useRouter(),
    loading: {},
  }),
  actions: {
    async getManageAdmin() {
      this.loading['getAdmin'] = true;
      const payload = {
        api: this.adminApi,
        body: {
          keyword: this.keyword
        },
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
          roleId: data.role_id,
          roleName: data.role_name,
          code: data.code,
          updatedAt: data.updated_at
        }));
        this.loading['getAdmin'] = false;
        this.dataTableAdmin = users

        return users;
      }
      this.loading['getAdmin'] = false;
    },

    async getRolePermission() {
      this.loading['getRole'] = true;
      const payload = {
        api: this.roleApi,
        body: {
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        const roles = result.body.roles.map((data) => ({
          id: data.role_id,
          roleName: data.role_name,
          updatedAt: data.updated_at,
          permissionName: data.permission_name,
          userCount: data.user_count
        }));
        this.loading['getRole'] = false;
        this.dataTableRoles = roles

        return roles;
      }
      this.loading['getRole'] = false;
    },

    async getUserForAddAdmin() {
      this.loading['getUser'] = true;
      const payload = {
        api: this.userForAddApi,
        body: {
        },
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
          updatedAt: data.updated_at
        }));
        this.loading['getUser'] = false;
        this.userOptions = users

        return users;
      }
      this.loading['getUser'] = false;
    },

    async editUserAdmin(userId, roleId) {
      this.loading['editUser'] = true;
      const payload = {
        api: ApiConstant.EDIT_USER_ADMIN,
        body: {
          user_id: userId,
          role_id: roleId
        },
      };
      const result = await callApi(payload);
      showSuccessEdit(this.toast);
      this.loading['editUser'] = false;
      this.getManageAdmin();
      this.getRolePermission();

      return result.isOk;
    },

    async removeUserAdmin(userId) {
      this.loading['removeAdmin'] = true;
      const payload = {
        api: ApiConstant.EDIT_USER_ADMIN,
        body: {
          user_id: userId,
          role_id: this.roleUser
        },
      };
      const result = await callApi(payload);
      showSuccessRemove(this.toast);
      this.loading['removeAdmin'] = false;
      this.getManageAdmin();
      this.getRolePermission();

      return result.isOk;
    },
  },
  getters: {
    isInviteAdminDisabled(state) {
      return !state.selectedMember || !state.selectedRole;
    },
  }
});

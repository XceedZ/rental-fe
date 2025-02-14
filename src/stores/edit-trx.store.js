import { defineStore } from "pinia";
import callApi from "@/utils/api-connect";
import { useToast } from "primevue/usetoast";
import { showSuccessEdit, showErrorApi } from "@/utils/toast-service";
import { ApiConstant } from "@/api-constant";
import { useManageTransactionStore } from "./manage-transaction.store";

export const useEditTrxStore = defineStore({
  id: "edit-trx.store",
  state: () => ({
    editApi: ApiConstant.EDIT_TRANSACTION,
    toast: useToast(),
    loading: {},
    transactions: [],
  }),
  actions: {
    async editTransaction(transactions) {
      this.loading["editTransaction"] = true;
      const transactionsToEdit = transactions.map((transaction) => ({
        trxRentProductId: transaction.trx_rent_product_id,
        surcharge: transaction.surcharge || 0,
        desc: transaction.desc || "",
      }));
      const result = await callApi({
        api: this.editApi,
        body: { transactions: transactionsToEdit },
      });
      if (result.isOk) {
        const context = useManageTransactionStore();
        context.getManageTransaction();
        showSuccessEdit(this.toast);
        this.loading["editTransaction"] = false;
        return true;
      } else if (result.error && result.error.response) {
        showErrorApi(this.toast, result.error.response.data.message);
        this.loading["editTransaction"] = false;
        return false;
      }
      this.loading["editTransaction"] = false;
      return false;
    },
  },
});

import { defineStore } from "pinia";
import { GeneralConstants } from '@/utils/general-constants';
import { useToast } from 'primevue/usetoast';
import { showSuccessApproved, showSuccessReject, showSuccessFinish } from '@/utils/toast-service';
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";

export const useManageTransactionStore = defineStore({
  id: "manage-transaction.store",
  state: () => ({
    getApi: ApiConstant.GET_MANAGE_TRANSACTION,
    detailApi: ApiConstant.GET_DETAIL_MANAGE_TRANSACTION,
    approveApi: ApiConstant.APPROVE_TRANSACTION,
    rejectApi: ApiConstant.REJECT_TRANSACTION,
    finishApi: ApiConstant.FINISH_TRANSACTION,
    finishAllApi: ApiConstant.FINISH_ALL_TRANSACTION,
    toast: useToast(),
    keyword: "",
    loading: {},
    dataTable: [],
    detailDataPerRow: {},
    expandedRow: [],
    totalRecords: 0,
    rowPerPageOptions: GeneralConstants.ROW_PERPAGE_OPTION,
    defaultRows: GeneralConstants.DEFAULT_ROWS,
    offset: 0,
    limit: GeneralConstants.DEFAULT_ROWS,
    brandOptions: [],
    ctgrOptions: [],
    priceRange: [0, 2000000],
    selectedProduct: {},
  }),
  actions: {
    onPage(event) {
      this.offset = event.page * event.rows;
      this.limit = event.rows;
      this.getManageTransaction();
    },
    async getManageTransaction() {
      this.loading["getManageTransaction"] = true;
      const payload = {
        api: this.getApi,
        body: {
          keyword: this.keyword,
          limit: this.limit,
          offset: this.offset,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        this.dataTable = result.body.trxProductList;
        this.totalRecords = result.body.totalRecords;
        this.loading["getManageTransaction"] = false;
      } else {
        this.loading["getManageTransaction"] = false;
      }
    },
    async getDetailManageTransaction(trxCode) {
      this.loading["getDetailManageTransaction"] = true;
      const payload = {
        api: this.detailApi,
        body: {
          trx_code: trxCode,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        this.detailDataPerRow[trxCode] = result.body.trxProductDetails;
        this.selectedProduct = result.body.trxProductDetails;
        this.loading["getDetailManageTransaction"] = false;
      } else {
        this.loading["getDetailManageTransaction"] = false;
      }
    },
    async approveTransaction(trxRentProductId, trxCode) {
      this.loading["approve"] = true;
      const payload = {
        api: this.approveApi,
        body: {
          trx_rent_product_id: trxRentProductId,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        showSuccessApproved(this.toast);
        this.loading["approve"] = false;
        await this.getManageTransaction();
        await this.getDetailManageTransaction(trxCode);
      }
      
      this.loading["approve"] = false;
    },
    async rejectTransaction(trxRentProductId, trxCode) {
      this.loading["reject"] = true;
      const payload = {
        api: this.rejectApi,
        body: {
          trx_rent_product_id: trxRentProductId,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        showSuccessReject(this.toast);
        this.loading["reject"] = false;
        await this.getManageTransaction();
        await this.getDetailManageTransaction(trxCode);
      }
      this.loading["reject"] = false;
    },
    async finishTransaction(trxRentProductId, trxCode) {
      this.loading["finish"] = true;
      const payload = {
        api: this.finishApi,
        body: {
          trx_rent_product_id: trxRentProductId,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        showSuccessFinish(this.toast);
        this.loading["finish"] = false;
        await this.getManageTransaction();
        await this.getDetailManageTransaction(trxCode);
      }
      this.loading["finish"] = false;
    },
    async finishAllTransaction(trxCode) {
      this.loading["finishAll"] = true;
      const payload = {
        api: this.finishAllApi,
        body: {
          trx_code: trxCode,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        showSuccessFinish(this.toast);
        this.loading["finishAll"] = false;
        await this.getManageTransaction();
        await this.getDetailManageTransaction(trxCode);
      }
      this.loading["finishAll"] = false;
    },
  },
});

import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessAddTrx } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import { YYYYMMDD } from "@/utils/date-convert";
import { useManageTransactionStore } from "@/stores/manage-transaction.store";

export const useAddTransactionStore = defineStore({
  id: "add-transaction.store",
  state: () => ({
    addTrxManualWithAccountApi: ApiConstant.ADD_TRX_MANUAL_WITH_ACCOUNT,
    addTrxManualWithoutAccountApi: ApiConstant.ADD_TRX_MANUAL_WITHOUT_ACCOUNT,
    productApi: ApiConstant.GET_PRODUCTS,
    usersManualApi: ApiConstant.GET_USERS_MANUAL,
    toast: useToast(),
    keyword: "",
    loading: {},
    brandOptions: [],
    ctgrOptions: [],
    priceRange: [0, 2000000],
    selectedProduct: null,
    productOptions: [],
    userOptions: [],
    selectedMember: {
      name: "",
      address: "",
      phone: "",
    },
    stock: 1,
    desc: "",
    dates: [],
  }),
  actions: {
    async getProducts() {
      this.loading["getProducts"] = true;
      const payload = {
        api: this.productApi,
        body: {
          keyword: this.keyword,
          ctgrId: this.ctgrId,
          brandId: this.brandId,
          priceRange: this.priceRange,
          limit: this.limit,
          offset: this.offset,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        const products = result.body.products.map((data) => ({
          id: data.product_id,
          productName: data.product_name,
          productCode: data.product_code,
          brandId: data.product_brand_id,
          brandName: data.brand_name,
          ctgrId: data.ctgr_product_id,
          ctgrName: data.ctgr_product_name,
          price: data.price,
          stock: data.stock,
          fineBill: data.fine_bill,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          active: data.active,
          desc: data.desc,
          urlImg: data.url_img,
        }));
        this.loading["getProducts"] = false;
        this.productOptions = products;

        return products;
      }
      this.loading["getProducts"] = false;
    },

    async getUsersManual() {
      this.loading["getUsersManual"] = true;
      const payload = {
        api: this.usersManualApi,
        body: {},
      };
      const result = await callApi(payload);
      if (result.isOk) {
        this.userOptions = result.body.usersManual;
      }
      this.loading["getUsersManual"] = false;
    },

    async addTrxManualWithAccount() {
      this.loading["addTrx"] = true;
      const payload = {
        api: this.addTrxManualWithAccountApi,
        body: {
          userId: this.selectedMember.user_id,
          productId: this.selectedProduct,
          rentStartDate: YYYYMMDD(this.dates[0]),
          rentEndDate: YYYYMMDD(this.dates[1]),
          qty: this.stock,
          desc: this.desc,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        showSuccessAddTrx(this.toast);
        this.resetInput();
        const context = useManageTransactionStore();
        await context.getManageTransaction();
        this.loading["addTrx"] = false;
        return result;
      }
      this.loading["addTrx"] = false;
    },
    async addTrxManualWithoutAccount() {
      showSuccessAddTrx(this.toast);
      this.loading["addTrx"] = true;
      const payload = {
        api: this.addTrxManualWithoutAccountApi,
        body: {
          name: this.selectedMember.name,
          address: this.selectedMember.address,
          phone: this.selectedMember.phone,
          productId: this.selectedProduct,
          rentStartDate: YYYYMMDD(this.dates[0]),
          rentEndDate: YYYYMMDD(this.dates[1]),
          qty: this.stock,
          desc: this.desc,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        this.resetInput();
        const context = useManageTransactionStore();
        await context.getManageTransaction();
        this.loading["addTrx"] = false;
        return result;
      }
      this.loading["addTrx"] = false;
    },
  },
  getters: {
    isAddButtonDisabled(state) {
      return (
        !state.selectedProduct ||
        !state.dates.length ||
        state.stock < 1 ||
        (state.selectedMember.name === "" &&
          state.selectedMember.address === "" &&
          state.selectedMember.phone === "")
      );
    },
    resetInput(state) {
      return () => {
        state.keyword = "";
        state.selectedProduct = null;
        state.selectedMember = { name: "", address: "", phone: "" };
        state.stock = 1;
        state.desc = "";
        state.dates = [];
      };
    },
  },
});

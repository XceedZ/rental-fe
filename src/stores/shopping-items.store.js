import { defineStore } from "pinia";
import { GeneralConstants } from '@/utils/general-constants';
import { useToast } from 'primevue/usetoast';
import { showSuccessRental } from '@/utils/toast-service';
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import local from '@/utils/local-storage';

export const useShoppingItemsStore = defineStore({
  id: "shopping-items.store",
  state: () => ({
    getApi: ApiConstant.GET_DETAIL_PRODUCTS,
    addApi: ApiConstant.CREATE_RENTAL,
    user: local.getUser()[0],
    toast: useToast(),
    loading: {},
    selectedProduct: [],
    products: {},
    cartItems: [],
    nextCartItemId: 1, // Add a counter for the next cart item ID
  }),
  actions: {
    async createRental() {
      this.loading["createRental"] = true;
      const result = await callApi({
        api: this.addApi,
        body: {
          user_id: this.user.id,
          items: this.cartItems.map(item => ({
            product_id: item.product_id,
            product_code: item.product_code,
            rent_start_date: item.startDate,
            rent_end_date: item.endDate,
            qty: item.qty,
            desc: '',
          })),
        },
      });
      if (result.isOk) {
        showSuccessRental(this.toast);
      }
      this.loading["createRental"] = false;
      return result;
    },
    addProductToCart(product, startDate, endDate, qty) {
      this.cartItems.push({ ...product, startDate, endDate, qty, id: this.nextCartItemId++ });
    },
    removeProductFromCart(cartItemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
    },
  },
});

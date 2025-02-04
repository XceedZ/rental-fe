import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessRental, showErrorApi } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import local from "@/utils/local-storage";
import Cookies from "js-cookie";

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
    hydrate() {
      this.cartItems = JSON.parse(Cookies.get('cartItems') || '[]');
      this.nextCartItemId = parseInt(Cookies.get('nextCartItemId') || '1');
    },
    async createRental(router) {
      this.loading["createRental"] = true;
      const result = await callApi({
        api: this.addApi,
        body: {
          user_id: this.user.id,
          items: this.cartItems.map((item) => ({
            product_id: item.product_id,
            product_code: item.product_code,
            rent_start_date: item.startDate,
            rent_end_date: item.endDate,
            qty: item.qty,
            desc: "",
          })),
        },
      });
      if (result.isOk) {
        showSuccessRental(this.toast);
        this.loading["createRental"] = false;
        this.resetCart();
        router.push({ name: "history" });
        return result;
      } else if (result.error && result.error.response) {
        showErrorApi(this.toast, result.error.response.data.message);
        this.loading["createRental"] = false;
      }
      this.loading["createRental"] = false;
    },
    addProductToCart(product, startDate, endDate, qty) {
      const existingItem = this.cartItems.find(
        (item) => item.product_code === product.product_code && item.startDate === startDate && item.endDate === endDate
      );
      if (existingItem) {
        existingItem.qty += qty;
      } else {
        this.cartItems.push({
          ...product,
          startDate,
          endDate,
          qty,
          id: this.nextCartItemId++,
        });
      }
      Cookies.set('cartItems', JSON.stringify(this.cartItems));
      Cookies.set('nextCartItemId', this.nextCartItemId.toString());
    },
    removeProductFromCart(cartItemId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== cartItemId);
      Cookies.set('cartItems', JSON.stringify(this.cartItems));
    },
    resetCart() {
      this.cartItems = [];
      this.nextCartItemId = 1;
      Cookies.set('cartItems', JSON.stringify(this.cartItems));
      Cookies.set('nextCartItemId', this.nextCartItemId.toString());
    },
  },
  getters: {
    hasZeroQuantity: (state) => {
      return state.cartItems.some((item) => item.qty === 0);
    },
  },
  // Call hydrate when the store is initialized
  hydrate() {
    this.hydrate();
  }
});

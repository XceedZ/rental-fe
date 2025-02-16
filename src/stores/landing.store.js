import { defineStore } from "pinia";
import { GeneralConstants } from "@/utils/general-constants";
import { useToast } from "primevue/usetoast";
import { showSuccessRemove } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import router from "@/router";

export const useLandingStore = defineStore({
  id: "landing.store",
  state: () => ({
    popularApi: ApiConstant.GET_POPULAR_PRODUCTS,
    articleApi: ApiConstant.GET_ARTICLE_BLOG,
    toast: useToast(),
    loading: {},
    offset: 0,
    limit: 4,
    articles: [],
    keyword: "",
  }),
  actions: {
    async getPopularProducts() {
      this.loading["getPopularProducts"] = true;
      const payload = {
        api: this.popularApi,
        body: {},
      };
      const result = await callApi(payload);
      if (result.isOk) {
        this.popularProducts = result.body.popularProducts;
      }
      this.loading["getPopularProducts"] = false;
    },
    async getArticleBlog() {
      this.loading["getArticleBlog"] = true;
      const payload = {
        api: this.articleApi,
        body: {
          keyword: this.keyword,
          limit: this.limit
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        this.articles = result.body.articles;
      }
      this.loading["getArticleBlog"] = false;
    },
  },
});

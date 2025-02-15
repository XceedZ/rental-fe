import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { showErrorApi } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";

export const useDetailArticleStore = defineStore({
  id: "detail-article.store",
  state: () => ({
    getArticleDetailApi: ApiConstant.GET_ARTICLE_DETAIL,
    toast: useToast(),
    article: null,
    loading: {},
  }),
  actions: {
    async getArticleDetail(articleBlogId) {
      this.loading["getArticleDetail"] = true;
      const payload = {
        api: this.getArticleDetailApi,
        body: { article_blog_id: articleBlogId },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        this.article = result.body.article;
      } else if (result.error && result.error.response) {
        showErrorApi(this.toast, result.error.response.data.message);
      }
      this.loading["getArticleDetail"] = false;
      return result;
    },
  },
});

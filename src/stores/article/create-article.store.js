import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { showSuccessAdd, showErrorApi } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";

export const useCreateArticleStore = defineStore({
  id: "create-article.store",
  state: () => ({
    createApi: ApiConstant.CREATE_ARTICLE,
    toast: useToast(),
    title: "",
    content: "",
    urlImg: "",
    loading: {},
  }),
  getters: {
    resetInput: (state) => () => {
      state.title = "";
      state.content = "";
      state.urlImg = "";
    },
  },
  actions: {
    async createArticle(formData) {
      this.loading["createArticle"] = true;

      const result = await callApi({
        api: this.createApi,
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.isOk) {
        showSuccessAdd(this.toast);
        this.resetInput();
        this.loading["createArticle"] = false;
        return { isOk: true, article: result.body.article };
      } else if (result.error && result.error.response) {
        showErrorApi(this.toast, result.error.response.data.message);
        this.loading["createArticle"] = false;
        return { isOk: false };
      }
      this.loading["createArticle"] = false;
      return { isOk: false };
    },
  },
});

import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { showSuccessCreateArticle, showSuccessUpdateArticle, showErrorApi } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";
import { useManageArticleStore } from "./manage-article.store";

export const useCreateArticleStore = defineStore({
  id: "create-article.store",
  state: () => ({
    articleApi: ApiConstant.GET_ARTICLE_BLOG,
    createApi: ApiConstant.CREATE_ARTICLE,
    updateApi: ApiConstant.UPDATE_ARTICLE,
    toast: useToast(),
    title: "",
    content: "",
    urlImg: "",
    loading: {},
    articleData: useManageArticleStore().getArticleData(),
    isEdit: false,
  }),
  getters: {
    resetInput: (state) => () => {
      state.title = "";
      state.content = "";
      state.urlImg = "";
    },
  },
  actions: {
    setArticleData(data) {
      this.articleData = data;
    },
    getArticleData() {
      return this.articleData;
    },
    setIsEdit(value) {
      this.isEdit = value;
    },
    async createArticle(formData) {
      this.loading["createArticle"] = true;

      const result = await callApi({
        api: this.createApi,
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.isOk) {
        showSuccessCreateArticle(this.toast);
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
    async updateArticle(id, formData) {
      this.loading["createArticle"] = true;
      formData.append("id", id);
      const result = await callApi({
        api: this.updateApi,
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (result.isOk) {
        showSuccessUpdateArticle(this.toast);
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
    async getArticleBlog() {
      this.loading["getArticleBlog"] = true;
      const payload = {
        api: this.articleApi,
        body: {},
      };
      const result = await callApi(payload);
      if (result.isOk) {
        this.setArticleData(result.body.article);
      }
      this.loading["getArticleBlog"] = false;
    },
  },
});

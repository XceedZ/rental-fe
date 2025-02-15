import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import { GeneralConstants } from "@/utils/general-constants";
import { showErrorApi, showSuccessRemove } from "@/utils/toast-service";
import callApi from "@/utils/api-connect";
import { ApiConstant } from "@/api-constant";

export const useManageArticleStore = defineStore({
  id: "manage-article.store",
  state: () => ({
    articleApi: ApiConstant.GET_ARTICLE_BLOG,
    toast: useToast(),
    article: null,
    otherArticles: [],
    loading: {},
    dataTable: [],
    totalRecords: 0,
    rowPerPageOptions: GeneralConstants.ROW_PERPAGE_OPTION,
    defaultRows: GeneralConstants.DEFAULT_ROWS,
    offset: 0,
    limit: GeneralConstants.DEFAULT_ROWS,
    keyword: "",
    limit: 25,
    offset: 0,
    totalRecords: 0,
    articleData: null,
    isEdit: false,
    activeTab: 0,
  }),
  actions: {
    async changeTab(newTab) {
      this.activeTab = newTab;
    },
    setArticleData(data) {
      console.log("Setting Article Data:", data);
      this.articleData = data;
    },
    getArticleData() {
      return this.articleData;
    },
    setIsEdit(value) {
      this.isEdit = value;
    },
    onPage(event) {
      this.offset = event.page * event.rows;
      this.limit = event.rows;
      this.getArticleBlog();
    },
    async getArticleBlog() {
      this.loading["getArticleBlog"] = true;
      const payload = {
        api: this.articleApi,
        body: {
          keyword: this.keyword,
          limit: this.limit,
          offset: this.offset,
        },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        this.dataTable = result.body.articles;
        this.totalRecords = result.body.totalRecords;
      }
      this.loading["getArticleBlog"] = false;
    },
    setActiveTab(index) {
      this.activeTab = index;
    },
    getActiveTab() {
      return this.activeTab;
    },
    async removeArticle(articleBlogId) {
      this.loading["removeArticle"] = true;
      const payload = {
        api: ApiConstant.REMOVE_ARTICLE,
        body: { article_blog_id: articleBlogId },
      };
      const result = await callApi(payload);
      if (result.isOk) {
        showSuccessRemove(this.toast);
        this.getArticleBlog();
        this.loading["removeArticle"] = false;
        return { isOk: true };
      } else if (result.error && result.error.response) {
        showErrorApi(this.toast, result.error.response.data.message);
        this.loading["removeArticle"] = false;
        return { isOk: false };
      }
      this.loading["removeArticle"] = false;
      return { isOk: false };
    },
  },
});

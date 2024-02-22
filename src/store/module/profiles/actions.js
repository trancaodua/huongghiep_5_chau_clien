import apiService from "@/app/apiService";

export default {
  async create(context, payload) {
    try {
      await apiService.post("/api/profile/create", {
        ...payload,
      });
    } catch (err) {
      throw new Error(err.response.data);
    }
  },
  async get(context) {
    try {
      let url = `/api/profile/get?page=${context.getters["currentPage"]}&limit=${context.getters["limit"]}`;
      let query = context.getters["query"];
      if (query) {
        url += `&${query}`;
      }
      const { data } = await apiService.get(url);
      context.commit("setProfile", data.country);
      context.commit("setPages", data.pages);
    } catch (error) {
      throw new Error(error.response.data);
    }
  },
};

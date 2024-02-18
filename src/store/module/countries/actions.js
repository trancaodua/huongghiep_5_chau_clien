import apiService from "@/app/apiService";

export default {
  async get(context) {
    try {
      const { data } = await apiService.get("/api/country/get");
      context.commit("setCountry", data);
    } catch (error) {
      throw new Error(error.response.data);
    }
  },
  async update(context, payload) {
    try {
      const { data } = await apiService.post("/api/country/update", {
        countries: payload,
      });
      context.commit("setCountry", data);
    } catch (error) {
      throw new Error(error.response.data);
    }
  },
};

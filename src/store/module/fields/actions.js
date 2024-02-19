import apiService from "@/app/apiService";

export default {
  async get(context) {
    try {
      const { data } = await apiService.get("/api/field/get");
      context.commit("setField", data);
    } catch (error) {
      throw new Error(error.response.data);
    }
  },
  async update(context, payload) {
    try {
      const { data } = await apiService.post("/api/field/update", {
        fields: payload,
      });
      context.commit("setField", data);
    } catch (error) {
      throw new Error(error.response.data);
    }
  },
};

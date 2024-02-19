import apiService from "@/app/apiService";

export default {
  async create(context, payload) {
    try {
      const { data } = await apiService.post("/api/profile/create", {
        name: payload.name,
        description: payload.description,
        avatar: payload.avatar,
        countries: payload.countries,
        fields: payload.fields,
        gender: payload.gender,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  },
  async get(context, payload) {
    try {
      let url = "/api/profile/get";
      let query = [];
      if (payload) {
        if (payload.query) {
          query.push(`query=${payload.query}`);
        }

        if (payload.countries && payload.countries.length > 0) {
          query.push(`countries=${payload.countries.join(",")}`);
        }

        if (payload.fields && payload.fields.length > 0) {
          query.push(`fields=${payload.fields.join(",")}`);
        }

        if (payload.genders && payload.genders.length > 0) {
          query.push(`genders=${payload.genders.join(",")}`);
        }
      }

      query.push(`page=${context.getters["currentPage"]}`);

      if (query.length > 0) {
        url += `?${query.join("&")}`;
      }
      const { data } = await apiService.get(url);
      context.commit("setProfile", data.country);
    } catch (error) {
      throw new Error(error.response.data);
    }
  },
};

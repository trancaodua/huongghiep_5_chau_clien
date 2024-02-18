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
  async uploadImage(context, payload) {
    try {
      const { data } = await apiService.post("/api/profile/upload-image", {
        image: payload.image,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  },
};

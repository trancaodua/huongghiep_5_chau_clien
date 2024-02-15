import apiService from "@/app/apiService";

export default {
  async login(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "login" });
  },
  async signup(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "signup" });
  },
  async auth(context, payload) {
    try {
       await apiService.post("/api/register", {
        email: payload.email,
        password: payload.password,
      });
    } catch (error) {
      throw(new Error(error.response.data))
    }
  },
};

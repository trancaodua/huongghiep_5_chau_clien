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
      const url = payload.mode === "login" ? "/api/login" : "/api/register";
      const { data } = await apiService.post(url, {
        email: payload.email,
        password: payload.password,
        isAdmin: payload.isAdmin,
      });
      context.commit("setUser", {
        email: data.email,
        token: data.token,
        role: data.role,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", JSON.stringify(data.role));
      apiService.defaults.headers["X-CSRF-Token"] = data.token;
    } catch (error) {
      throw new Error(error.response.data);
    }
  },

  tryLogin(context) {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    let role = localStorage.getItem("role");
    if(role){
      JSON.parse(role)
    }
    role = role ? JSON.parse(role) : [];
    apiService.defaults.headers["X-CSRF-Token"] = token;

    if (token && email) {
      context.commit("setUser", {
        token: token,
        email: email,
        role: role,
      });
    }
  },
  async logout(context) {
    try {
      await apiService.post("/api/logout", {
        token: context.getters["token"],
      });

      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      delete apiService.defaults.headers.common["X-CSRF-Token"];

      context.commit("setUser", {
        token: null,
        userId: null,
        role: null,
      });
    } catch (error) {
      throw new Error(error.response.data);
    }
  },
};

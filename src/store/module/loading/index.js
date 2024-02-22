import mutations from "./mutations.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      loading: false,
    };
  },
  mutations,
  getters,
};

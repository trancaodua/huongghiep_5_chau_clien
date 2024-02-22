import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      profiles: [],
      currentPage: 1,
      limit: 9,
      pages: 1,
      query: null,
    };
  },
  mutations,
  actions,
  getters,
};

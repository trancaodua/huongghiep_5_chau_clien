import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      genders: [
        {
          id: "1",
          name: "Nam",
        },
        {
          id: "2",
          name: "Nữ",
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};

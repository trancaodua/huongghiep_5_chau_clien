import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      fields: [
        {
          id: "1",
          name: "IT",
        },
        {
          id: "2",
          name: "Trung Quoc",
        },
        {
          id: "3",
          name: "My",
        },
        {
          id: "4",
          name: "Viet Nam",
        },
        {
          id: "5",
          name: "Trung Quoc",
        },
        {
          id: "6",
          name: "My",
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};

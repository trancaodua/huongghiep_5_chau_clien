import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      profiles: [
        {
          id: "1",
          name: "Nerra Mae B. Gubalane",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ut sint autem sunt officia praesentium, enim labore assumenda quisquam optio est veniam eveniet tempore reprehenderit velit deserunt, corporis obcaecati veritatis, fuga itaque non ad? Possimus, ut. Suscipit officiis numquam possimus libero quam, consectetur corrupti eius atque rem aliquid. Laudantium, error?",
          country:"Viet Nam",
          field: "IT",
          genders: ["Nam"]
        },
        {
          id: "2",
          name: "Nerra Mae B. Gubalane",
          description: "Lorem30",
          country:"Viet Nam",
          field: "IT",
          genders: ["Nam"]
        },
        {
          id: "3",
          name: "Nerra Mae B. Gubalane",
          description: "Lorem30",
          country:"Viet Nam",
          field: "IT",
          genders: ["Nam"]
        },
        {
          id: "4",
          name: "Nerra Mae B. Gubalane",
          description: "Lorem30",
          country:"Viet Nam",
          field: "IT",
          genders: ["Nam"]
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};

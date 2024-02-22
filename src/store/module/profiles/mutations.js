export default {
  setProfile(state, payload) {
    //state.profiles.splice(0, state.profiles.length);
    payload.forEach((country) => state.profiles.push(country));
  },
  resetProfile(state) {
    state.profiles.splice(0, state.profiles.length);
  },
  setCurrentPage(state, payload) {
    state.currentPage = payload;
  },
  setLimit(state, payload) {
    state.limit = payload;
  },
  setPages(state, payload) {
    state.pages = payload;
  },
  setQuery(state, payload) {
    state.query = payload;
  },
};

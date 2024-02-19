export default {
  setProfile(state, payload) {
    state.profiles.splice(0, state.profiles.length);
    payload.forEach((country) => state.profiles.push(country));
  },
  setCurrentPage(state, payload) {
    state.currentPage = payload;
  },
};

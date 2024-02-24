export default {
  token(state) {
    return state.token;
  },
  role(state) {
    return state.role;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  isAdmin(state) {
    return !!state.token && state.role.includes("admin");
  },
};

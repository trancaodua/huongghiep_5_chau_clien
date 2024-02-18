export default {
  setCountry(state, payload) {
    state.countries.splice(0, state.countries.length);
    payload.forEach((country) => state.countries.push(country));
  },
};

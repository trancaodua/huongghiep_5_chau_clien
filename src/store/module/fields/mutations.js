export default {
  setField(state, payload) {
    state.fields.splice(0, state.fields.length);
    payload.forEach((field) => state.fields.push(field));
  },
};

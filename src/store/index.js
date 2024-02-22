import { createStore } from "vuex";
import countriesModule from "./module/countries/index.js";
import filedsModule from "./module/fields/index.js";
import gendersModule from "./module/genders/index.js";
import profilesModule from "./module/profiles/index.js";
import authModule from "./module/auth/index.js";
import loadingModule from "./module/loading/index.js";

const store = createStore({
  modules: {
    countries: countriesModule,
    fields: filedsModule,
    genders: gendersModule,
    profiles: profilesModule,
    auth: authModule,
    loading:loadingModule
  },
});

export default store;

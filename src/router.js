import { createRouter, createWebHistory } from "vue-router";

import HomePageVue from "./pages/HomePage.vue";
import CreateProfileVue from "./pages/profiles/CreateProfile.vue";
import ProfileDetailVue from "./pages/profiles/ProfileDetail.vue";
import ContactPageVue from "./pages/ContactPage.vue";
import AdminPageVue from "./pages/admin/indexPage.vue";
import LoginPageVue from "./pages/LoginPage.vue";
import RegisterPageVue from "./pages/RegisterPage.vue";
import CountryPageVue from "./pages/admin/countryPage.vue";
import FieldPageVue from "./pages/admin/fieldPage.vue";
import UserProfile from "./pages/user/ProfilePage.vue";
import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomePageVue },
    {
      path: "/profile/create",
      component: CreateProfileVue,
      meta: { requiresAuth: true },
      name: "createProfile",
    },
    { path: "/profile/:id", component: ProfileDetailVue, props: true },
    { path: "/contact", name: "contact", component: ContactPageVue },
    {
      path: "/admin/country",
      component: CountryPageVue,
      meta: { requiresAdmin: true },
    },
    {
      path: "/admin/register",
      component: RegisterPageVue,
      name: "admin-register",
      meta: { requiresAdmin: true },
    },
    {
      path: "/admin/field",
      component: FieldPageVue,
      meta: { requiresAdmin: true },
    },
    {
      path: "/admin",
      component: AdminPageVue,
      meta: { requiresAdmin: true },
      name: "admin",
    },

    { path: "/login", name: "login", component: LoginPageVue },
    { path: "/register", name: "register", component: RegisterPageVue },
    {
      path: "/user/profile",
      meta: { requiresAdmin: true },
      name: "user-profile",
      component: UserProfile,
    },
    {
      path: "/user/profile/:id",
      name: "user-edit-profile",
      meta: { requiresAdmin: true },
      component: CreateProfileVue,
      props: true,
    },
  ],
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters["isAuthenticated"]) {
    next({ name: "login", query: { redirect: to.name } });
  } else if (to.meta.requiresAdmin && !store.getters["isAdmin"]) {
    next({ name: "login", query: { redirect: to.name } });
  } else {
    next();
  }
});

export default router;

import { createRouter, createWebHistory } from "vue-router";

import HomePageVue from "./pages/HomePage.vue";
import CreateProfileVue from "./pages/profiles/CreateProfile.vue";
import ProfileDetailVue from "./pages/profiles/ProfileDetail.vue";
import ContactPageVue from "./pages/ContactPage.vue";
import AdminPageVue from "./pages/AdminPage.vue";
import LoginPageVue from "./pages/LoginPage.vue";
import RegisterPageVue from './pages/RegisterPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: 'home', component: HomePageVue },
        { path: "/profile/create", component: CreateProfileVue },
        { path: "/profile/:id", component: ProfileDetailVue },
        { path: "/contact", name: 'contact', component: ContactPageVue },
        { path: "/admin", component: AdminPageVue },
        { path: "/login", name:'login', component: LoginPageVue },
        { path: "/register", name:'register', component: RegisterPageVue },
    ],
});

export default router;

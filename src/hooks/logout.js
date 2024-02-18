import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default function useLogout() {
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const logout = async function () {
    await store.dispatch("logout");
    if (route.meta.requiresAuth) {
      router.replace({ name: "login" });
    }
  };
  return [logout];
}

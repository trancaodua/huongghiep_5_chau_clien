import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/index.js';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialogVue from "./components/ui/BaseDialog.vue";

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialogVue);

router.isReady().then(function(){
    app.mount('#app');
});


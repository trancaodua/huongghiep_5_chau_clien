import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/index.js';

const app = createApp(App);

app.use(store);
app.use(router);

router.isReady().then(function(){
    app.mount('#app');
});


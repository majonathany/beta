import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Button from 'primevue/button';
import Card from 'primevue/card';
createApp(App)
    .use(store)
    .use(router)
    .component("Button", Button)
    .component("Card", Card)
    .component("Splitter", Splitter)
    .component("SplitterPanel", SplitterPanel)
    .mount('#app');
//# sourceMappingURL=main.js.map
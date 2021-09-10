import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Multiselect from 'primevue/multiselect';
import SplitButton from 'primevue/splitbutton';
createApp(App)
    .use(PrimeVue)
    .use(store)
    .use(router)
    .component("Button", Button)
    .component("Card", Card)
    .component("Splitter", Splitter)
    .component("SplitterPanel", SplitterPanel)
    .component("InputText", InputText)
    .component("Multiselect", Multiselect)
    .component("SplitButton", SplitButton)
    .mount('#app');
//# sourceMappingURL=main.js.map
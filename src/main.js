import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import vClickOutside from 'click-outside-vue3';
import App from './App.vue';
import router from './router';
import store from './store';

import 'normalize.css';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(Antd);
app.use(vClickOutside);
app.use(store);
app.use(router);
app.mount('#app');

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './styles/global.css';
import App from './App.vue';
import router from './router';
import { useShowStore } from './stores/showStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const showStore = useShowStore(pinia);
showStore.loadShows();

app.mount('#app');

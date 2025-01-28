import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router'; // Uvoz routera

const app = createApp(App);

app.use(router); // Registracija routera
app.mount('#app');
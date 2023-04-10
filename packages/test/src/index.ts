import { createApp } from 'vue'
import App from './App.vue'
import { createIkolUI } from 'ikol-ui-kit';

createApp(App)
    .use(createIkolUI())
    .mount('#app')

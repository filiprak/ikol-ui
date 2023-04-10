import { createApp } from 'vue'
import { createIkolUI } from 'ikol-ui-kit';
import App from './App.vue'

createApp(App)
    .use(createIkolUI())
    .mount('#app')

/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

//Pinia
import { createPinia } from 'pinia';

import "@/styles/main.scss"

const app = createApp(App);

registerPlugins(app);

app.use(createPinia());

app.mount('#app');
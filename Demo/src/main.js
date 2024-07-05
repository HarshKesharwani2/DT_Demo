// // import './assets/main.css'

// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// // import Vue from 'vue';
// import './index.css'
// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')


// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');

import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import Ripple from 'primevue/ripple';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import IST from '@presets/IST';
import 'primeicons/primeicons.css';
import './assets/styles/base.css';
import './assets/styles/global.css'; // variabili globali per il tema, non ancora usato
import './assets/styles/main.css';

const app = createApp(App);

// Inizializza Pinia
const pinia = createPinia();
app.use(pinia);

// Inizializza il router
app.use(router);

const primevueConfig = {
  ripple: true,
};

app.use(PrimeVue, {
  theme: {
    preset: IST,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false,
    },
  },
  ...primevueConfig,
});

app.use(ConfirmationService);

app.directive('ripple', Ripple);

app.directive('tooltip', Tooltip);

app.use(ToastService);

app.mount('#app');

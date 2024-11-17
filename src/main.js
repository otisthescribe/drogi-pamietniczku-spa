// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// VUE 
import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'
import store from './scripts/store';

// Create a new Vuetify instance.
const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
})

// Create a new Vue instance.
const app = createApp(App)

app.use(vuetify)
app.use(store)

app.mount('#app')
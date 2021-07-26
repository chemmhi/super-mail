import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index";
import mitt from 'mitt'



const app=createApp(App)
app.use(router).mount('#app')

const emitter=mitt()

app.config.globalProperties.emitter=emitter

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index";
import mitt from 'mitt'
import {store} from "@/store";
import Toast from "@/components/common/toast/Toast";
import obj from 'components/common/toast'

const app=createApp(App)
app.use(router).use(store).use(obj)
app.mount('#app')

const emitter = mitt()

app.config.globalProperties.emitter = emitter

export {app}

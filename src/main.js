import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import UI from '@/components/library'
import 'element-plus/dist/index.css'
// 样式文件
import '@/assets/styles/less/index.less'

const app = createApp(App)

app.use(store).use(router).use(UI).mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./global/element"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'dplayer/dist/DPlayer.min.css';


// 刚刚手写的mock.js文件

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
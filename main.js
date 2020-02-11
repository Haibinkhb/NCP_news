import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
const BaseUrl = 'https://lab.isaaclin.cn/nCoV/api/'
Vue.prototype.BaseUrl = BaseUrl
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

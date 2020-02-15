import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
const BaseUrl = 'https://lab.isaaclin.cn/nCoV/api/'
const LocalUrl = 'https://api.haibinkhb.com/api/'
Vue.prototype.BaseUrl = BaseUrl
Vue.prototype.LocalUrl = LocalUrl
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

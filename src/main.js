// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import '@/assets/css/reset.css'
import MyPlugin from '@/plugins/http.js'
//组建选项所在的对象
import MyBread from '@/components/cuscom/myBread.vue'

Vue.use(ElementUI)
Vue.use(MyPlugin)

Vue.config.productionTip = false

Vue.filter('fmtdate',(v) => {
  return moment(v).format('YYYY-MM-DD')
})
//全局自定义组件
Vue.component('my-bread',MyBread)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Rights from '@/components/rights/rights.vue'
import Roles from '@/components/rights/roles.vue'
import {Message} from 'element-ui'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'users',
          name: 'users',
          component: Users
        },
        {
          path: 'rights',
          name: 'rights',
          component: Rights
        },
        {
          path: 'roles',
          name: 'roles',
          component: Roles
        },
      ]
    }
  ]
})
router.beforeEach((to,from,next) => {
  if(to.path === '/login') {
    next()
  }else {
    const token = localStorage.getItem('token')
    if(!token) {
      Message.warning('回到登录页！')
      router.push({name: 'login'})
      return;
    }
  }
  next()
}) 
export default router

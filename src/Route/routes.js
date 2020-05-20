import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'

Vue.use(VueRouter)

/*配置路由*/
export default new VueRouter({
  routes: [{
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: Home
    },
  ]
})

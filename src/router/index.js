import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Order from '../views/nav1/Order.vue'
import Sign from '../views/nav1/Sign.vue'
import Store from '../views/nav2/Store.vue'
import Member from '../views/nav3/Member.vue'
import News from '../views/nav3/News.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path:'/Home',
    name:'home',
    component:Home
  },
  {
    path:"/home",
    component: Home,
    children: [
        {
            path: "/order",
            component: Order
        },
        {
            path: "/sign",
            component: Sign
        }
    ]
  },
  {
    path:"/home",
    component: Home,
    children: [
        {
            path: "/store",
            component: Store
        }
    ]
  },
  {
    path:"/home",
    component: Home,
    children: [
        {
            path: "/member",
            component: Member
        },
        {
            path: "/news",
            component: News
        }
    ]
  },
  // 重定向
  {
    path: '/', 
    redirect: '/login' 
  }
]

const router = new VueRouter({
  routes
})

export default router

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
		path: '/',
		component: Home,
		name: '用户信息',
		children: [
      {
				path: '/order',
				component: Order,
				name: 'order'
			},
			{
				path: '/sign',
				component: Sign,
				name: 'sign'
			},
		]
	},
  {
    path:"/home",
    component: Home,
		name: '店铺资料', 
    children: [
        {
            path: "/store",
            component: Store,
            name: 'store', 
        }
    ]
  },
  {
    path:"/home",
    component: Home,
		name: '基本信息', 
    children: [
        {
            path: "/member",
            component: Member,
            name: 'member', 
        },
        {
            path: "/news",
            component: News,
            name: 'news', 
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

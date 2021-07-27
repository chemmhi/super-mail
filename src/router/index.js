import {createRouter,createWebHistory} from 'vue-router'

const Home=()=>import('@/views/home/Home')
const Category=()=>import('@/views/category/Category')
const Cart=()=>import('@/views/cart/Cart')
const Profile=()=>import('@/views/profile/Profile')
const Details=()=>import('views/details/Details')
const routes=[
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
  },
  {
    path:'/category',
    component: Category,
  },
  {
    path:'/profile',
    component: Profile,
  },
  {
    path:'/cart',
    component: Cart,
  },
  {
    path:'/details',
    component:Details
  }
]

const router= createRouter({
  routes,
  history:createWebHistory('configure-admin')
})

export default router

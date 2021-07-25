import {createRouter,createWebHistory} from 'vue-router'

const Home=()=>import('@/views/home/Home')
const Category=()=>import('@/views/category/Category')
const Cart=()=>import('@/views/cart/Cart')
const Profile=()=>import('@/views/profile/Profile')

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
  }
]

const router= createRouter({
  routes,
  history:createWebHistory()
})

export default router

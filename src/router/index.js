import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import RegisterView from '@/views/RegisterView'
import LoginView from '@/views/LoginView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

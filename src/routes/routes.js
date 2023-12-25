
import { createRouter, createWebHistory } from 'vue-router';
import isAuthenticatedGuard from './auth-guard';
const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../modules/session/login.vue'),
    },
    {
        path: '/register',
        component: () => import('../modules/session/register.vue')

    },
    {
        path:'/home',
        beforeEnter: [isAuthenticatedGuard],
        component: () => import('../modules/user/home.vue')
    },
    {
        path:'/profile',
        beforeEnter: [isAuthenticatedGuard],
        component: () => import('../modules/user/profile.vue')
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
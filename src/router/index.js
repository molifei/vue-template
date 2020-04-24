import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/lazy',
        name: 'Lazy',
        component: () => import('../views/Lazy/Lazy.vue')
    },
    {
        path: '/edit',
        name: 'Edit',
        component: () => import('../views/Edit/Edit.vue')
    },
    {
        path: '/chart',
        name: 'Chart',
        component: () => import('../views/Chart/Chart.vue')
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router

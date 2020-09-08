import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'defaultLayout',
        component: () => import('../components/base_layout/Index.vue'),
        children: [
            {
                path: '/table-and-Form',
                name: 'tableAndForm',
                component: () => import('../components/table_and_form/Index.vue')
            },
            {
                path: '/table-layout',
                name: 'tableLayout',
                component: () => import('../components/table_layout/Index.vue')
            },
            {
                path: 'list-button-layout',
                name: 'listButtonLayout',
                component: () => import('../components/list_button_layout/Index.vue')
            },
            {
                path: 'card-layout',
                name: 'cardLayout',
                component: () => import('../components/card_layout/CardLayoutDemo.vue')
            },
            {
                path: 'bread-crumb-layout',
                name: 'breadCrumbLayout',
                component: () => import('../components/bread_crumb_layout/Index.vue')
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;

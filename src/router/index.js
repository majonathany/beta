import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'NotePlayer',
        component: () => import(/* webpackChunkName: "about" */ '../views/NotePlayer.vue')
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;
//# sourceMappingURL=index.js.map
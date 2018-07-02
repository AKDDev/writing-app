import VueRouter from 'vue-router';
import Character from '../pages/Character.vue';
import Home from '../pages/Home.vue';
import WorldLore from '../pages/WorldLore.vue';
import Projects from '../pages/Projects.vue';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/characters',
        component: Character,
    },
    {
        path: '/world-lore',
        component: WorldLore,
    },
    {
        path: '/projects',
        component: Projects,
    },
];

export default new VueRouter({
  routes // short for `routes: routes`
});
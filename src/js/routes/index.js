import VueRouter from 'vue-router';

/* Base Routes */
import Home from '../pages/Home.vue';

/* Modular routes */
import character from '../modules/character/routes';
import lore from '../modules/lore/routes';
import projects from '../modules/projects/routes'

let baseRoutes = [
    {
        path: '/',
        component: Home,
    },
];

const routes = baseRoutes.concat(character)
        .concat(lore)
        .concat(projects);

export default new VueRouter({
  routes // short for `routes: routes`
});
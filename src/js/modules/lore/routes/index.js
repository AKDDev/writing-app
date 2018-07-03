import WorldLore from '../pages/WorldLore.vue';
import LoreSheet from '../pages/LoreSheet.vue';

export default [
    {
        path: '/world-lore',
        component: WorldLore,
    },
    {
        path: '/world-lore/:slug',
        component: LoreSheet,
    },
];

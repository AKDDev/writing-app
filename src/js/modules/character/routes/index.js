import CharacterList from '../pages/CharacterList.vue';
import CharacterSheet from '../pages/CharacterSheet.vue';
import Character from '../pages/CharacterForm.vue';

export default [
     {
        path: '/characters',
        component: CharacterList,
    },
    {
        path: '/character/new',
        component: Character,
    },
    {
        path: '/character/edit/:slug',
        component: Character,
    },
    {
        path: '/character/:slug',
        component: CharacterSheet,
    },
];
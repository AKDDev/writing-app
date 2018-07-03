import Projects from '../pages/Projects.vue';
import Book from '../pages/Book.vue';
import Chapter from '../pages/Chapter.vue';
import Scene from '../pages/Scene.vue';

export default [
    {
        path: '/projects',
        component: Projects,
    },
    {
        path: '/project/:book',
        component: Book,
    },
    {
        path: '/project/:book/:chapter',
        component: Chapter,
    },
    {
        path: '/project/:book/:chapter/:scene',
        component: Scene,
    },
];
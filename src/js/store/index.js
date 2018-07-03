import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from "vuex-persistedstate";

import { characters } from '../modules/character/store';
import { lore } from '../modules/lore/store';
import { projects } from '../modules/projects/store'; 

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        characters,
        lore,
        projects,
    }
})
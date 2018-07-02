import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from "vuex-persistedstate";

import { characters } from './characters.js';
import { lore } from './lore.js';
import { projects } from './projects.js'; 

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        characters,
        lore,
        projects,
    }
})
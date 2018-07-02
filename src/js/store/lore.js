import moment from 'moment';

export const lore = {
    namespaced: true,
    state: {
        lore: [],
    },
    mutations: {
        addLore: function(state, { item }) {
            item.created_at = moment.now();
            item.updated_at = moment.now();
            state.lore.push(lore);
        },
        updateLore: function(state, { item }) {
            let lore = state.lore;
            
            item.updated_at = moment.now();
            
            for(let index in lore) {
                if(lore[index].slug === item.slug) {
                    state.lore[index] = item;
                }
            }
        },
        deleteLore: function(state, { item }) {
            let lore = state.lores;
            
            for(let index in lore) {
                if(lore[index].slug === item.slug) {
                    state.lore.splice(index, 1);
                }
            }
        }
    },
    actions: {
        addLore: function({ commit }, { lore }) {
            commit('addLore', lore);
        },
        updateLore: function({ commit }, { lore }) {
            commit('updateLore', lore);
        },
        deleteLore: function({ commit }, { lore}) {
            commit('deleteLore', lore);
        }
    }
}
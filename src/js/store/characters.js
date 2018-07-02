import moment from 'moment';

export const characters = {
    namespaced: true,
    state: {
        characters: [],
    },
    mutations: {
        addCharacter: function(state, { character }) {
            character.created_at = moment.now();
            character.updated_at = moment.now();
            state.characters.push(character);
        },
        updateCharacter: function(state, { character }) {
            let characters = state.characters;
            
            character.updated_at = moment.now();
            
            for(let index in characters) {
                if(characters[index].slug === character.slug) {
                    state.characters[index] = character;
                }
            }
        },
        deleteCharacter: function(state, { character }) {
            let characters = state.characters;
            
            for(let index in characters) {
                if(characters[index].slug === character.slug) {
                    state.characters.splice(index, 1);
                }
            }
        }
    },
    actions: {
        addCharacter: function({ commit }, { character }) {
            commit('addCharacter', character);
        },
        updateCharacter: function({ commit }, { character }) {
            commit('updateCharacter', character);
        },
        deleteCharacter: function({ commit }, { character}) {
            commit('deleteCharacter', character);
        }
    }
}
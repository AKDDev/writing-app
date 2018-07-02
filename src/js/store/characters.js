import moment from 'moment';

function makeSlug(character)
{
    return (character.first_name + '-' + character.last_name)
        .replace(' ','-')
        .toLowerCase();
};

export const characters = {
    namespaced: true,
    state: {
        characters: [],
    },
    getters: {
        define: function(state) {
            return {
                slug: {
                    type: 'string',
                    list: false,
                    private: true,
                    size: 0,
                    element: 'none',
                    id: true,
                },
                image: {
                    type: 'image',
                    list: false,
                    private: false,
                    size: 3,
                    element: 'none',
                },
                first_name: {
                    type: 'string',
                    list: true,
                    private: false,
                    size: 6,
                    element: 'h2',
                    
                },
                last_name: {
                    type: 'string',
                    list: true,
                    private: false,
                    size: 6,
                    element: 'h2',
                },
                meta: {
                    type: 'object',
                    private: false,
                    element: 'ul',
                    object: {
                        role: {
                            type: 'string',
                            list: false,
                            private: false,
                            size:4,
                            element: 'li',
                        },
                        birthday: {
                            type: 'string',
                            list: false,
                            private: false,
                            size: 4,
                            element: 'li',
                        },
                        birth_location: {
                            type: 'string',
                            list: false,
                            private: false,
                            size: 4,
                            element: 'li',
                        },
                        location: {
                            type: 'string',
                            list: false,
                            private: false,
                            size: 4,
                            element: 'li',
                        },
                        race: {
                            type: 'string',
                            list: true,
                            private: false,
                            size: 4,
                            element: 'li',
                        },
                        powers: {
                            type: 'array',
                            list: true,
                            private: false,
                            size: 4,
                            element: 'li',
                        },
                        establishment: {
                            type: 'string',
                            list: true,
                            private: false,
                            size: 4,
                            element: 'li',
                        },
                        occupation: {
                            type: 'string',
                            list: true,
                            private: false,
                            size: 4,
                            element: 'li',
                        },
                        hair_color: {
                            type: 'string',
                            list: false,
                            private: false,
                            size: 4,
                            element: 'li',
                        },
                        eye_color: {
                            type: 'string',
                            list: false,
                            private: false,
                            size: 4,
                            element: 'li',
                        },
                        mother: {
                            type: 'string',
                            list: false,
                            private: false,
                            size: 4,
                            element: 'li a',
                        },
                        father: {
                            type: 'string',
                            list: false,
                            private: false,
                            size: 4,
                            element: 'li a',
                        },
                        siblings: {
                            type: 'array',
                            list: false,
                            private: false,
                            size: 4,
                            element: 'li a',
                        },
                        children: {
                            type: 'array',
                            list: false,
                            private: false,
                            size: 4,
                            element: 'li a',
                        },
                    }
                },
                description: {
                    type: 'markdown',
                    list: false,
                    private: false,
                    size: 12,
                    element: 'p',
                },
                history: {
                    type: 'markdown',
                    list: false,
                    private: false,
                    size: 12,
                    element: 'p',
                },
                personality: {
                    type: 'markdown',
                    list: false,
                    private: false,
                    size: 12,
                    element: 'p',
                },
                notes: {
                    type: 'markdown',
                    list: false,
                    private: false,
                    size: 12,
                    element: 'p',
                },
                create_at: {
                    type: 'timestamp',
                    list: false,
                    private: true,
                    size: 0,
                    element: 'p.small',
                },
                updated_at: {
                    type: 'timestamp',
                    list: false,
                    private: true,
                    size: 0,
                    element: 'p.small',
                }
            }
        },
    },
    mutations: {
        addCharacter: function(state, { character }) {
            character.slug = makeSlug(character);
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
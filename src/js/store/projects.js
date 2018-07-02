import moment from 'moment';

export const projects = {
    namespaced: true,
    state: {
        projects: [],
    },
    mutations: {
        addProject: function(state, { project }) {
            project.created_at = moment.now();
            project.updated_at = moment.now();
            state.projects.push(project);
        },
        updateProject: function(state, { project }) {
            let projects = state.projects;
            
            project.updated_at = moment.now();
            
            for(let index in projects) {
                if(projects[index].slug === project.slug) {
                    state.projects[index] = project;
                }
            }
        },
        deleteProject: function(state, { project }) {
            let projects = state.projects;
            
            for(let index in projects) {
                if(projects[index].slug === project.slug) {
                    state.projects.splice(index, 1);
                }
            }
        }
    },
    actions: {
        addProject: function({ commit }, { project }) {
            commit('addProject', project);
        },
        updateProject: function({ commit }, { project }) {
            commit('updateProject', project);
        },
        deleteProject: function({ commit }, { project}) {
            commit('deleteProject', project);
        }
    }
}
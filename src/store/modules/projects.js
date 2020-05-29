import {axiosClient as axios} from '../../utils/axios'

const state = {
    agreedProjects: [],
    startedProjects: [],
    completedProjects: [],
}

const getters = {
    
        agreedProjects(state) {
            return state.agreedProjects
        },
        startedProjects(state) {
            return state.startedProjects
        },
        completedProjects(state) {
            return state.completedProjects
        },

        allTasks(state) {
            let allTasks =[];

            state.startedProjects.forEach(project => {

                if(project.tasks.length !== undefined ) {
                    let incompleteTasks = project.tasks.filter(task=> task.completed !== true)
                    allTasks.push(...incompleteTasks);
                }


            });
            return allTasks;
        },
        allTasksCount(state) {
            let allTasks =[];
            state.startedProjects.forEach(project => {
                if(project.tasks.length !== undefined) {
                    let incompleteTasks = project.tasks.filter(task=> task.completed !== true)
                    allTasks.push(...incompleteTasks);
                }
            });

           return allTasks.length;
        }


}

const actions = {

    fetchAllProjects({dispatch}) {

        dispatch('fetchAgreedProjects');
        dispatch('fetchStartedProjects');
        dispatch('fetchCompletedProjects');
    },



        async fetchAgreedProjects({commit}) {
            let response = await axios.get('/api/v1/projects?status=agreed&select=title,status,startDate,endDate,client,tasks,brief');

            commit('SAVE_AGREED_PROJECTS', response.data.data)
        },
        async fetchStartedProjects({commit}) {

               let response = await axios.get('/api/v1/projects?status=started&select=title,status,startDate,endDate,client,tasks,brief');
               commit('SAVE_STARTED_PROJECTS', response.data.data)




        },
    async fetchCompletedProjects({commit}) {

        let response = await axios.get('/api/v1/projects?status=delivered');
        commit('SAVE_COMPLETED_PROJECTS', response.data.data)
    },



    async deleteProject({state, commit, dispatch}, projectId) {


        let agreedProject = state.agreedProjects.find(project => project._id === projectId)


        let startedProject = state.startedProjects.find(project => project._id === projectId)


        let completedProject = state.completedProjects.find(project => project._id === projectId)



        const response = await axios.delete(`/api/v1/projects/${projectId}`)

        if(response.data.success) {
            if(agreedProject !== undefined) {
                commit('DELETE_AGREED_PROJECT', projectId)
            } else if(startedProject !== undefined) {
                commit('DELETE_STARTED_PROJECT', projectId)
            } else if(completedProject !== undefined) {
                commit('DELETE_COMPLETED_PROJECT', projectId)
                dispatch('fetchAllFinanceData');

            }
        }
    },





}



const mutations = {
        SAVE_AGREED_PROJECTS(state, agreedProjects) {
            state.agreedProjects = agreedProjects
        },
        SAVE_STARTED_PROJECTS(state, startedProjects) {
            state.startedProjects = startedProjects
        },
        SAVE_COMPLETED_PROJECTS(state, completedProjects) {
            state.completedProjects = completedProjects
        },

        DELETE_AGREED_PROJECT(state, projectId) {
            state.agreedProjects = state.agreedProjects.filter(project => project._id !== projectId)
        },

        DELETE_STARTED_PROJECT(state, projectId) {
            state.startedProjects = state.startedProjects.filter(project => project._id !== projectId)
        },

        DELETE_COMPLETED_PROJECT(state, projectId) {
            state.completedProjects = state.completedProjects.filter(project => project._id !== projectId)
        }
}

export default {
    state,
    getters,
    actions,
    mutations
}

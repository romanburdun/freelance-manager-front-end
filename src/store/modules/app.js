import {router} from "@/Routes";
import {axiosClient as axios} from '../../utils/axios'

const state = {
    darkMode: false,
    editMode: false,
    modalOpen: false,

    selectedProject: {
        _id: '',
        title: '',
        brief: '',
        startDate: '',
        endDate: '',
        status:'agreed',
        client:'',
        payment: '',
        paymentDate: '',
        tasks: []
    }

}


const getters = {


    selectedProject(state) {
        return state.selectedProject;
    },
    editMode(state) {
        return state.editMode
    },

    darkMode(state) {
        return state.darkMode
    },

    modalOpen(state) {
      return state.modalOpen
    }

}

const actions = {

    toggleDarkMode({commit}) {
        commit('CHANGE_DARK_MODE_STATE')
    },

    onProjectView({commit}, project) {
        commit('SET_SELECTED_PROJECT', project);
        router.push('/project-viewer')
    },

    setSelectedProject({commit}, selectedProject) {
        commit('SET_SELECTED_PROJECT', selectedProject)
        commit('SET_EDIT_STATE', true)

        router.push('/projects-editor');
    },

    clearSelectedProject({commit}) {

        let project = {
            _id: '',
                title: '',
                brief: '',
                startDate: '',
                endDate: '',
                status:'agreed',
                client:'',
                payment: '',
                paymentDate: '',
                tasks: []
        }

        commit('SET_SELECTED_PROJECT', project)
        commit('SET_EDIT_STATE', false)
    },


   async deleteTask({commit, state}, taskName) {


      let task = state.selectedProject.tasks.find(task=> task.title === taskName)



        if(task !== undefined) {
            commit('REMOVE_NEW_TASK', taskName)

            let response = await axios.delete(`/api/v1/tasks/${task._id}`)

            if(response.data.success) {
                commit('DELETE_EXISTING_TASK', task._id)
            }
        }

    },

    toggleModal({commit}) {

        commit('TOGGLE_MODAL');
    }


}

const mutations = {
        SET_EDIT_STATE(state, mode) {
            state.editMode = mode
        },

        SET_SELECTED_PROJECT(state, project) {
            state.selectedProject = project
        },

        REMOVE_NEW_TASK(state, title) {
            state.selectedProject.tasks = state.selectedProject.tasks.filter(task => task.title !== title)
        },

        DELETE_EXISTING_TASK(state, taskId) {
            state.selectedProject.tasks = state.selectedProject.tasks.filter(task => task._id !== taskId)
        },

        CHANGE_DARK_MODE_STATE(state) {
            state.darkMode = !state.darkMode;
        },

        TOGGLE_MODAL(state) {

            state.modalOpen = !state.modalOpen;

            if(state.modalOpen) {
                    document.body.style.overflow ='hidden'
            } else {
                document.body.style.overflow ='auto'
            }

        }





}

export default {
    state,
    actions,
    getters,
    mutations
}

import {axiosClient as axios}  from '../../utils/axios';
import {router} from "@/Routes";

const state = {
    token: null,
    isAuthenticated: false,
    userName: '',
    userEmail: '',
    loginError: false,
    errorMessage: ''

}

const getters = {

    isAuthenticated(state) {
        return state.isAuthenticated;
    },


    userName(state) {
        return state.userName;
    },

    userEmail(state) {
        return state.userEmail;
    },

    loginError(state) {
     return state.loginError;
    },

    errorMessage(state) {
        return state.errorMessage;
    }



}

const actions = {
        async login({commit, state, dispatch}, credentials ) {


            try {
                const response = await axios.post('/api/v1/auth/login', credentials);

                commit('AUTHENTICATE', response.data);
                commit('SET_LOGIN_ERROR_STATUS', false)
                commit('SET_ERROR_MESSAGE', '')

                        if (state.isAuthenticated) {
                            dispatch('getUserProfile');
                            dispatch('fetchAllProjects');
                            dispatch('fetchAllFinanceData');
                            dispatch('fetchClients');
                            dispatch('fetchPlatforms');
                            dispatch('fetchTrends');

                            router.push('/dashboard')
                            return
                        }
            } catch (err) {

                    commit('SET_LOGIN_ERROR_STATUS', true)
                    commit('SET_ERROR_MESSAGE', 'Email or password is invalid')

                    setTimeout(()=>{
                        commit('SET_LOGIN_ERROR_STATUS', false)
                        commit('SET_ERROR_MESSAGE', '')
                    }, 10000)


            }






        },

        async register({commit, state}, credentials) {
            const response = await axios.post('/api/v1/auth/register', credentials);
            if(response.data.success) {
                commit('AUTHENTICATE', response.data);
            }

            setTimeout(() => {
                if(state.token) {
                    router.push('/dashboard')
                }
            },300)
        },


        async getUserProfile({commit}) {
            let response = await axios.get('/api/v1/auth/me')
            commit("SET_USER_NAME", response.data.data.name);
            commit("SET_USER_EMAIL", response.data.data.email)

        },

        async logout({commit}) {

            let response = await axios.get('/api/v1/auth/logout');

            if(response.data.success) {
                commit('LOG_OUT')
                await router.push('/');
            }
        },

        async offlineLogout({commit}) {
                commit('LOG_OUT')
                await router.push('/');
        },
}

const mutations = {

    SET_ERROR_MESSAGE(state, message) {
        state.errorMessage = message;
    },

    SET_LOGIN_ERROR_STATUS(state, status) {
        state.loginError = status
    },

    SET_USER_NAME(state, username) {
     state.userName = username;
    },

    SET_USER_EMAIL(state, userEmail) {
        state.userEmail = userEmail;
    },



    AUTHENTICATE(state, authData) {
        state.isAuthenticated = true

        if(process.env.NODE_ENV == 'development') {
            state.token = authData.token;
        }


    },

    LOG_OUT(state) {
        state.token = null;
        state.userName = "";
        state.userEmail = "";
        state.isAuthenticated = false
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}

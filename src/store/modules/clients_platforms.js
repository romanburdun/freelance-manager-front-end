import {axiosClient as axios} from '../../utils/axios'

const state = {
    clients: [],
    clientPlatform: null,
    platforms: [],


}

const getters = {

    clients(state) {
        return state.clients;
    },
    platforms(state) {
        return state.platforms;
    },

    clientsList(state) {

        let list = [];

        state.clients.forEach(client => {

            list.push({label: client.name, value: client._id})
        })

        if(list.length !== 0) {
            list.unshift({label: 'Select client', value: ''})
        }
        return list;
    },

    platformsList(state) {
        let list = [];
        state.platforms.forEach(platform =>{
            list.push({label: platform.platformName, value: platform._id})
        })

        if(list.length !== 0) {
            list.unshift({label: 'Select platform', value: ''})
        }

        return list
    }

}

const actions = {
        async fetchClients({commit}) {


            let response = await axios.get('/api/v1/clients');
            commit('STORE_CLIENTS', response.data.data)

        },

        async fetchPlatforms({commit}) {
                let response = await axios.get('/api/v1/ips');
                commit('STORE_PLATFORMS', response.data.data);
        },

        updateNewClientName({commit}, clientName) {
            commit('UPDATE_CLIENT_NAME', clientName)
        },

        updateNewClientPlatform({commit}, platform) {
            commit('UPDATE_CLIENT_PLATFORM' ,platform)
        },

        updateNewPlatformName({commit}, platformName) {
            commit('UPDATE_PLATFORM_NAME', platformName)
        },

        async storeClient({dispatch}, client) {


             await axios.post('/api/v1/clients',client);

            dispatch('fetchClients');
            dispatch('fetchPlatforms')

        },


    async storePlatform({commit}, platformName) {



        let response = await axios.post('/api/v1/ips', {platformName});


       if(response.data.success) {
           commit('STORE_NEW_PLATFORM', response.data.data)
       }



    },


    async deleteClient({commit}, clientId) {


        let response = await axios.delete(`/api/v1/clients/${clientId}`);

        if(response.data.success) {
            commit('REMOVE_CLIENT', clientId)
        }

    },


    async deletePlatform({commit}, platformId) {


        let response = await axios.delete(`/api/v1/ips/${platformId}`);

        if(response.data.success) {
            commit('REMOVE_PLATFORM', platformId)
        }

    }
}

const mutations = {

    STORE_NEW_PLATFORM(state, newPlatform) {
        newPlatform.clients = 0;
        newPlatform.projects = 0;
        state.platforms.push(newPlatform);


    },

    REMOVE_PLATFORM(state, platformId) {
        state.platforms = state.platforms.filter(platform => platform._id !== platformId)
    },

    STORE_NEW_CLIENT(state, client) {
        state.clients.push(client)
    },

    REMOVE_CLIENT(state, clientId) {
        state.clients = state.clients.filter(client => client._id !== clientId)
    },

    STORE_CLIENTS(state, clients) {
        state.clients = clients;
    },

    STORE_PLATFORMS(state, platforms) {
        state.platforms = platforms;
    },





}

export default {
    state,
    getters,
    actions,
    mutations
}

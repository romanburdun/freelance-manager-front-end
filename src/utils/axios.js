import axios from 'axios';
import {store} from "@/store/store";

let config = {
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: process.env.NODE_ENV === 'production' ? true : false
}

const authentication = config => {

    if(process.env.NODE_ENV === 'development') {
        if (store.state.auth.token) {
            config.headers = {
                'Authorization': `Bearer ${store.state.auth.token}`
            }
        }
    }

    return config
}

const axiosClient = axios.create(config)

axiosClient.interceptors.request.use(authentication);

axiosClient.interceptors.response.use(
    response => {
        return response
    },


    error => {

        if(error.toString().includes('Network Error')) {
            store.dispatch('offlineLogout')
        }


        if(error.response.status === 401) {
           store.dispatch("logout")
        }


    }
)



export { axiosClient}

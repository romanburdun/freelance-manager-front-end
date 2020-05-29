import Vue from 'vue';
import Vuex from 'vuex'
import auth from "@/store/modules/auth";
import projects from "@/store/modules/projects";
import finance from "@/store/modules/finance";
import productivity from "@/store/modules/productivity";
import app from "@/store/modules/app";
import clients_platforms from "@/store/modules/clients_platforms";
import VuexPersist from 'vuex-persist'
Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'freelance_manager',
  storage: window.localStorage
})

export const store = new Vuex.Store({
            modules: {
                auth,
                projects,
                finance,
                productivity,
                app,
                clients_platforms
            },
            plugins: [vuexPersist.plugin]
})



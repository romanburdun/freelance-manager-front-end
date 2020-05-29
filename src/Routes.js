import Vue from 'vue';
import VueRouter from "vue-router";
import Layout from './components/layout/layout';
import {store} from "@/store/store";
import {axiosClient as axios} from "./utils/axios";

const Dashboard = resolve => {
    require.ensure(['./views/dashboard.vue'], ()=> {
        resolve(require('./views/dashboard.vue'))
    })
}

const Projects = resolve => {
    require.ensure(['./views/projects.vue'], ()=> {
        resolve(require('./views/projects.vue'))
    })
}

const Finance = resolve => {
    require.ensure(['./views/finance.vue'], ()=> {
        resolve(require('./views/finance.vue'))
    })
}

const ClientsPlatforms = resolve => {
    require.ensure(['./views/clients-platforms.vue'], ()=> {
        resolve(require('./views/clients-platforms.vue'))
    })
}


const Productivity = resolve => {
    require.ensure(['./views/productivity.vue'], ()=> {
        resolve(require('./views/productivity.vue'))
    })
}

const ProjectsEditor = resolve => {
    require.ensure(['./views/new-edit-project.vue'], ()=> {
        resolve(require('./views/new-edit-project'))
    })
}

const ProjectViewer = resolve => {
    require.ensure(['./views/project-viewer.vue'], ()=> {
        resolve(require('./views/project-viewer'))
    })
}

const Profile = resolve => {
    require.ensure(['./views/profile.vue'], ()=> {
        resolve(require('./views/profile'))
    })
}

const Login = resolve => {
    require.ensure(['./views/login.vue'], ()=> {
        resolve(require('./views/login'))
    })
}

const Register = resolve => {
    require.ensure(['./views/register.vue'], ()=> {
        resolve(require('./views/register'))
    })
}



const ForgotPassword = resolve => {
    require.ensure(['./views/forgot_password.vue'], ()=> {
        resolve(require('./views/forgot_password'))
    })
}

const RequestSent = resolve => {
    require.ensure(['./views/request-sent.vue'], ()=> {
        resolve(require('./views/request-sent'))
    })
}

const ResetPassword = resolve => {
    require.ensure(['./views/reset_password.vue'], ()=> {
        resolve(require('./views/reset_password'))
    })
}

const NotFound = resolve => {
    require.ensure(['./views/not-found.vue'], ()=> {
        resolve(require('./views/not-found'))
    })
}


const ifNotAuthenticated =  async (to, from, next) => {



    if(!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/dashboard');
}

const ifAuthenticated =  async (to, from, next) => {

    await axios.get(`/api/v1/auth/me`);

    if(store.getters.isAuthenticated) {
        next();
        return;
    }
    next('/')
}

export const routes = [
    {
        path: '/user', component: Layout,
        children: [
            { path: '/dashboard', component: Dashboard,
               beforeEnter: ifAuthenticated
                },
            { path: '/projects', component: Projects,
               beforeEnter: ifAuthenticated
            },
            { path: '/clients-platforms', component: ClientsPlatforms,
               beforeEnter: ifAuthenticated
            },
            { path: '/finance', component: Finance,
                beforeEnter: ifAuthenticated
            },
            { path: '/productivity', component: Productivity,
                beforeEnter: ifAuthenticated

            },
            { path: '/projects-editor', component: ProjectsEditor,
                 beforeEnter: ifAuthenticated
            },

            { path: '/project-viewer', component: ProjectViewer,
                beforeEnter: ifAuthenticated
            },

            { path: '/profile', component: Profile,
                beforeEnter: ifAuthenticated
            }



        ]
    },
    {
        path: '/', component: Login,
         beforeEnter: ifNotAuthenticated

    },
    {
        path: '/register', component: Register
    },
    {
        path: '/forgot_password', component: ForgotPassword
    },
    {
        path: '/reset_password/:token', component: ResetPassword
    },

    {
        path: '/request_sent', component: RequestSent
    },
    {
        path: '*', component: NotFound
    },



]

Vue.use(VueRouter);
export const router = new VueRouter({
    routes,
    mode: 'history'
})

import {axiosClient as axios} from "@/utils/axios";

const state = {
    lastSessionDate: null,
    currentSession: {
        tasks: [],
        sessionStart: null,
        sessionEnd: null,
        sessionDate: null
    },
    poolTasks: [],
    sessionsCounter: 0,
    currentDate: new Date(),
    trends: {
        tasksTrends: {
            days: [],
            tasksCompleted: []
        },
        sessionsTrends: {
            days: [],
            sessionsCompleted: [],
        }
    }

}

const getters = {


    lastSessionDate(state) {

        return state.lastSessionDate
    },
    currentSession(state) {
        return state.currentSession;
    },
    sessionsCounter(state) {
        return state.sessionsCounter;
    },


    currentSessionTasks(state) {
        return state.currentSession.tasks
    },

    poolTasks(state) {
        return state.poolTasks;
    },




    tasksTrends(state) {
        let  tasksTrends = {
            labels: state.trends.tasksTrends.days,
            datasets: [
                {
                    label: 'Tasks:',
                    backgroundColor: '#64f3ad',
                    data: state.trends.tasksTrends.tasksCompleted
                },
            ],
            options: {
                legend: {
                    position: 'top',
                    align: 'center',
                    display: true,
                    labels: {
                        fontColor: '#609E2E'
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#609E2E'
                        }
                    }]
                }

            }

        }
        return tasksTrends

    },

    sessionsTrends(state) {
        let  sessionTrends = {
            labels: state.trends.sessionsTrends.days,
            datasets: [
                {
                    label: 'Sessions:',
                    backgroundColor: '#7c6bf3',
                    data: state.trends.sessionsTrends.sessionsCompleted
                },
            ],
            options: {
                legend: {
                    position: 'top',
                    align: 'center',
                    display: true,
                    labels: {
                        fontColor: '#609E2E'
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#609E2E'
                        }
                    }]
                }

            }

        }

        return sessionTrends
    },
}

const actions = {

    initSessionsCounter({getters, commit}) {
        let lastSessionDate = new Date(getters.lastSessionDate);
        lastSessionDate.setHours(0,0,0,0)
        let today = new Date();
        today.setHours(0,0,0,0)


        if(today.getTime() !== lastSessionDate.getTime()) {

            commit('RESET_SESSIONS_COUNTER')
        }

    },

   async fetchTrends({commit}) {

        let response = await axios.get('/api/v1/sessions/trends')
        commit('STORE_TRENDS', response.data)
    },

    addTask({commit}, task) {
        commit('SAVE_TASK', task);
    },

    toggleTaskCompletion({commit}, task) {
        task.completed = !task.completed;

        commit('SET_TASK_COMPLETION', task)
    },

    removeSessionTask({commit}, task) {
        commit('REMOVE_TASK', task)
    },

    getTasksPool({commit, rootState}) {
        let allTasks =[];

        rootState.projects.startedProjects.forEach(project => {

            let projectObject = Object.assign({}, project)
            delete projectObject.tasks
            let incompleteTasks = project.tasks.filter(task=> {


                if( task.completed !== true) {
                        task.project = projectObject
                    return task
                }

            })
            allTasks.push(...incompleteTasks);
        });

        commit('SAVE_TASKS_POOL',allTasks);
    },
    setSessionStartTime({commit}) {
        commit('SET_CURRENT_SESSION_START_TIME')

    },


    async submitSession({commit, state, dispatch}) {



        state.currentSession.sessionEnd = new Date;

        state.currentSession.tasks = state.currentSession.tasks.filter(task => task.completed === true);

       await axios.post('/api/v1/sessions', state.currentSession);

        commit('CLEAR_CURRENT_SESSION_DATA');
        commit('INCREMENT_SESSIONS_COUNTER');
        dispatch('fetchTrends');
    }



}

const mutations = {

    RESET_SESSIONS_COUNTER(state) {

        state.sessionsCounter = 0
    },

    SAVE_TASK(state, task) {
        state.currentSession.tasks.push(task);
        state.poolTasks = state.poolTasks.filter(t => t._id !== task._id)
    },
    REMOVE_TASK(state, task) {
        state.currentSession.tasks = state.currentSession.tasks.filter(t => t._id !== task._id);
        state.poolTasks.push(task);
    },

    SET_TASK_COMPLETION(state, task) {
        let index = state.currentSession.tasks.findIndex(t => t._id === task._id );
        state.currentSession.tasks[index] = task;
    },

    SAVE_TASKS_POOL(state, tasks) {
        state.poolTasks = tasks;
    },

    STORE_TRENDS(state, trends) {
        state.trends = trends.data;
    },

    INCREMENT_SESSIONS_COUNTER(state) {
      state.sessionsCounter = state.sessionsCounter+1;
    },

    SET_CURRENT_SESSION_START_TIME(state) {
        let date = new Date();

        state.currentSession.sessionDate = date;
        state.currentSession.sessionStart = date;
        state.lastSessionDate = date;
    },
    CLEAR_CURRENT_SESSION_DATA(state) {
        state.currentSession = {
            tasks: [],
            sessionStart: null,
            sessionEnd: null,
            sessionDate: null
        }
    },

    RESET_CURRENT_SESSION_TASKS(state) {
            state.currentSession.tasks.forEach(task => {
                task.completed = false;
            })

            state.poolTasks.push(...state.currentSession.tasks)
        }



}

export default {
    state,
    actions,
    getters,
    mutations
}

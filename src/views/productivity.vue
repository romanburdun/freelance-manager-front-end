<template>
    <div class="page">
        <app-userbar></app-userbar>

        <div class="page_section">
            <h1 class="page_header">Productivity:</h1>
            <div class="cards_container">

                <div class="card">
                    <div class="card_header">
                        <h4 class="text">Work session:</h4>
                        <h4 class="card_field_value status">{{sessionsCounter}}</h4>
                    </div>
                    <div class="card_content center">
                        <app-timer></app-timer>
                    </div>
                </div>

                <div class="card">
                    <div class="card_header">
                        <h4 class="text">Current session's tasks:</h4>
                        <h4 class="card_field_value">{{currentSessionTasks.length}}</h4>
                    </div>
                    <div class="card_content">
                        <h4 class="text" v-if="currentSessionTasks.length === 0">No tasks for current session</h4>

                        <h4 class="text-green" v-for="task in currentSessionTasks"
                           :key="task._id"
                           @click="toggleTaskCompletion(task)"
                           @dblclick="removeSessionTask(task)"
                           :class="{'completed': task.completed}">{{task.title}}
                        </h4>
                    </div>
                </div>

            </div>



        </div>
        <div class="page_section">
            <label for="agreed">Add tasks to a pomodoro session:</label>
            <div class="table" id="agreed">
                <st-table-head></st-table-head>

                <div class="row" v-if="poolTasks.length===0">No tasks</div>


                <st-row v-for="task in poolTasks" :task="task" :key="task._id"></st-row>



            </div>
        </div>


        <div class="page_section">
            <h1 class="page_header">Productivity stats:</h1>
            <div class="cards_container">

            </div>
        </div>


        <div class="page-section">

            <div class="cards_container">


                <div class="card">
                    <div class="card_header">
                        <h4 class="text">Task completion trends:</h4>
                    </div>
                    <div class="card_content" v-if="tasksTrends.days !== null">
                        <!--                        vue-chartjs here -->
                        <app-linechart  :data="tasksTrends" :options="tasksTrends.options"></app-linechart>

                    </div>
                </div>

                <div class="card">
                    <div class="card_header">
                        <h4 class="text">Session completion trends: </h4>

                    </div>
                    <div class="card_content" v-if="sessionsTrends.days !== null ">
                        <!--                        vue-chartjs here-->
                        <app-linechart  :data="sessionsTrends" :options="sessionsTrends.options"></app-linechart>
                    </div>
                </div>

            </div>
        </div>


    </div>

</template>

<script>
    import SessionsTasksTableHead from "@/components/common/tables/sessionsTasks/SessionsTasksTableHead";
    import SessionTasksRow from "@/components/common/tables/sessionsTasks/SessionTasksRow";
    import UserBar from "@/components/common/bars/UserBar";
    import LineChart from "@/components/charts/LineChart";
    import {mapGetters} from 'vuex';
    import PomodoroTimer from '../components/common/timer';
    import {mapActions} from 'vuex'

    export default {
            name: 'ProductivityView',
            components: {
                'app-timer': PomodoroTimer,
                'app-linechart': LineChart,
                'app-userbar': UserBar,
                'st-table-head': SessionsTasksTableHead,
                'st-row': SessionTasksRow
            },

            methods: {
                ...mapActions([
                    'removeSessionTask',
                    'toggleTaskCompletion',
                    'getTasksPool',
                    'fetchTrends',
                    'initSessionsCounter'


                ])
            },
            computed: {
                ...mapGetters([
                    'poolTasks',
                    'currentSessionTasks',
                    'sessionsTrends',
                    'tasksTrends',
                    'sessionsCounter',

                ])
            },
        created() {
                this.getTasksPool();
                this.initSessionsCounter()
        }
    }
</script>

<style scoped>

</style>

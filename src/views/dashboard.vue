<template>
        <div class="page">
            <app-userbar></app-userbar>
            <div class="page_section">

                <h1 class="page_header">Projects and tasks:</h1>
                <div class="cards_container">

                    <div class="card">
                        <div class="card_header">
                            <h4 class="text">Active projects:</h4>
                         <h4 class="card_field_value">{{startedProjects.length}}</h4>
                        </div>
                           <div class="card_content" v-if="startedProjects.length === 0">
                           <h4 class="text">No active projects yet</h4>

                       </div>
                        <div class="card_content" v-else>
                           <ol>
                               <li class="actionable-text" v-for="project in startedProjects" :key="project._id" @click="onProjectView(project)">{{project.title}}</li>
                           </ol>

                        </div>
                    </div>

                    <div class="card">
                        <div class="card_header">
                            <h4 class="text">Tasks:</h4>
                            <h4 class="card_field_value">{{allTasksCount}}</h4>
                        </div>

                        <div class="card_content" v-if="allTasks.length === 0">
                            <h4 class="text">No tasks yet</h4>
                        </div>
                        <div class="card_content" v-else>
                            <ol>
                                <li class="text" v-for="task in allTasks" :key=task._id>{{task.title}} </li>
                            </ol>
                        </div>
                    </div>

                </div>

            </div>
            <div class="page_section">
                <h1 class="page_header">Business finance:</h1>
                <div class="cards_container">
                    <div class="card">
                        <div class="card_header">
                            <h4 class="text">Business income:</h4>
                        </div>
                        <div class="card_content" v-if="platformsIncomeChartData !== null">
                            <app-piechart :data="platformsIncomeChartData" ></app-piechart>
                        </div>
                        <div class="card_content" v-else>
                            <h4 class="text"> There are no data to be displayed</h4>
                        </div>

                    </div>

                    <div class="card">
                        <div class="card_header">
                            <h4 class="text">Business expenses:</h4>
                        </div>
                        <div class="card_content" v-if="currentTaxYearExpensesChartData !== null">
                            <app-doughnutchart :data="currentTaxYearExpensesChartData" :options="currentTaxYearExpensesChartData.options"></app-doughnutchart>
                        </div>
                        <div class="card_content" v-else>
                                <h4 class="text">There are no data to be displayed</h4>
                        </div>
                    </div>


                </div>
            </div>

        </div>
</template>

<script>
    import UserBar from "@/components/common/bars/UserBar";
    import PieChart from '../components/charts/PieChart.vue';
    import DoughnutChart from "@/components/charts/DoughnutChart.vue";
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'Dashboard',
        components: {
            'app-userbar': UserBar,
            'app-piechart': PieChart,
            'app-doughnutchart': DoughnutChart,

        },
        methods: {
            ...mapActions([
                'login',
                'fetchAgreedProjects',
                'fetchStartedProjects',
                'fetchCompletedProjects',
                'fetchClients',
                'fetchPlatforms',
                'fetchCurrentTaxYearExpensesChartData',
                'fetchPlatformsIncomeChartData',
                'fetchMonthlyIncomeChartData',
                'fetchAllFinanceData',
                'fetchTodayProductivity',
                'onProjectView'
            ])
        },
        computed: {
            ...mapGetters([
                'allTasks',
                'allTasksCount',
                'startedProjects',
                'currentTaxYearExpensesChartData',
                'platformsIncomeChartData',
                'monthlyIncomeChartData',
            ])
    },



    }
</script>

<style scoped>

</style>

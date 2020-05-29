<template>
    <div class="page">
        <div class="page_section">
            <h4 class="page_header">{{selectedProject.title}}</h4>
        </div>
        <div class="page_section">

            <button class="btn" @click="editProject">Edit project</button>
            <div class="input_group">
                <div class="input">
                    <label for="client">Client:</label>
                    <input type="text" name="client" id="client" :value="selectedProject.client[0].name" disabled>
                </div>
                <div class="input">
                    <label for="status">Status:</label>
                    <input type="text" name="status" id="status" :value="selectedProject.status" disabled>
                </div>
            </div>



            <div class="input_group">
                <div class="input">
                    <label for="startDate">Start date:</label>
                    <input type="text" name="startDate" id="startDate" :value="selectedProject.startDate | date" disabled>
                </div>

                <div class="input">
                    <label for="endDate">Deadline:</label>
                    <input type="text" name="endDate" id="endDate" :value="selectedProject.startDate | date" disabled>
                </div>
            </div>


        </div>

        <div class="page_section">
            <label>Project's brief:</label>
            <div class="sheet" v-html="selectedProject.brief"></div>
        </div>

        <div class="table">

            <app-tasks-list-head></app-tasks-list-head>

            <div class="row" v-if="selectedProject.tasks.length === 0 || selectedProject.tasks === undefined">
                <h5 class="text">No tasks yet</h5>
            </div>

            <app-tasks-list-row v-for="(task, index) in selectedProject.tasks" :key="task+index" :task="task"></app-tasks-list-row>

        </div>

    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex';
    import TasksListHead from "../components/common/tables/projectsTasks/TasksListHead";
    import TasksListRow from "../components/common/tables/projectsTasks/TasksListRow";
    export default {
        name: 'ProjectViewer',
        components: {
            'app-tasks-list-row': TasksListRow,
            'app-tasks-list-head': TasksListHead
        },
        computed: {
            ...mapGetters([
                'selectedProject'
            ])
        },
        methods: {
            ...mapActions(['setSelectedProject']),
            editProject() {
                this.setSelectedProject(this.selectedProject)
            }
        }
    }
</script>

<style >

</style>

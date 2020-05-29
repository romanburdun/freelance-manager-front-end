<template>
    <div class="page">




        <app-userbar></app-userbar>
        <div class="page_section">
            <h1 class="page_header">Projects</h1>
            <button class="btn" @click="navigateToEditor()">Add new</button>

        </div>

        <div class="page_section">
            <label for="agreed">Agreed:</label>
            <div class="table" id="agreed">
                <projects-table-head></projects-table-head>

                <div class="row" v-if="agreedProjects.length === 0">
                    <h5 class="text">No projects</h5>
                </div>
                <project-row v-for="project in agreedProjects" :key="project._id" :project="project"></project-row>
                </div>

            </div>

        <div class="page_section">
            <label for="started">Started:</label>
            <div class="table" id="started">
                <projects-table-head></projects-table-head>

                <div class="row" v-if="startedProjects.length == 0">
                    <h5 class="text">No projects</h5>
                </div>

                <!--                v-for here-->
                <project-row v-for="project in startedProjects" :key="project._id" :project="project"></project-row>
            </div>
        </div>


        <div class="page_section">
            <label for="completed">Completed:</label>
            <div class="table" id="completed">
                <projects-table-head></projects-table-head>
                <div class="row" v-if="completedProjects.length == 0">
                        <h5 class="text">No projects</h5>
                </div>
                <project-row v-for="project in completedProjects" :key="project._id" :project="project"></project-row>
            </div>
        </div>

</div>


</template>

<script>

    import UserBar from "@/components/common/bars/UserBar";
    import ProjectsTableHead from "@/components/common/tables/projects/ProjectsTableHead";
    import ProjectRow from "@/components/common/tables/projects/ProjectRow";
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import {router} from "@/Routes";
    export default {
        name: 'ProjectsView',
        data() {
          return {

          }
        },
        components: {
            'project-row': ProjectRow,
            'projects-table-head': ProjectsTableHead,
            'app-userbar': UserBar,

        },
        computed: {
            ...mapGetters([
                'agreedProjects',
                'startedProjects',
                'completedProjects',
                'modalOpen'
            ]),
        },
        methods: {
            ...mapActions([
                'fetchAgreedProjects',
                'fetchStartedProjects',
                'fetchCompletedProjects',
                'deleteProject',
                'setSelectedProject',
                'toggleModal'
            ]),
            navigateToEditor() {
                router.push({path: '/projects-editor'})
            },
        },







    }
</script>

<style scoped>


</style>

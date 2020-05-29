<template>
    <div class="row">
        <div class="cell col-3">
            <label class="col-3 mobile_label">Project name:</label>
            <a class="col-3" @click="onProjectView(project)">{{project.title}}</a>
        </div>
        <div class="cell col-2">
            <label class="col-1 mobile_label">Client name:</label>
            <h4 class="col-1" v-if="project.client.length !== 0">{{project.client[0].name}}</h4>
        </div>
        <div class="cell col-2">
            <label class="col-1 mobile_label">Deadline:</label>
            <h4 class="col-1">{{project.endDate | date}}</h4>
        </div>
        <div class="cell last_cell col-1">
            <label class="mobile_label" >Actions:</label>
            <div class="col-1 row_ctrl">
                <a class="col-1 edit" @click="setSelectedProject(project)"><md-edit/></a>
                <a class="col-1 delete" @click="deleteProject(project._id)"><md-delete/></a>
            </div>
        </div>


    </div>

</template>

<script>
    import Pencil from 'vue-material-design-icons/Pencil';
    import Delete from 'vue-material-design-icons/Delete';
    import {mapActions} from 'vuex';
    export default {
        name: 'ProjectRow',
        props: ['project'],
        components: {
            'md-edit': Pencil,
            'md-delete': Delete
        },
        methods: {
            ...mapActions([
                'deleteProject',
                'setSelectedProject',
                'onProjectView'
            ])
        }
    }

</script>

<style scoped>

</style>

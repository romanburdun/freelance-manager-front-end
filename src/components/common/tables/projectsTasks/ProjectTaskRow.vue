<template>
    <div class="row tasks_mobile">
        <div class="cell col-3">
            <label class="col-3 mobile_label">Task name:</label>
            <a class="col-3">{{task.title}}</a>
        </div>
        <div class="cell col-1">
            <label class="col-1 mobile_label">Status:</label>
            <a class="col-1"  :class="{'not_active': task.completed}">{{task.completed | condition }}</a>
        </div>
        <div class="cell last_cell col-1">
            <label class="mobile_label col-2" >Actions:</label>
            <div class="col-2 row_ctrl">
                <a class="col-1 " @click="deleteTask(task.title)" :class="{'not_active': task.completed}"><md-delete/></a>
            </div>
        </div>
    </div>
</template>

<script>
    import DeleteIcon from 'vue-material-design-icons/Delete'
    import {mapActions} from 'vuex';
    export default {
        name: 'ProjectTasksRow',
        props: ['task'],
        components: {
            'md-delete' : DeleteIcon
        },
        methods: {
            ...mapActions(['deleteTask'])
        }

    }
</script>

<style scoped>

</style>

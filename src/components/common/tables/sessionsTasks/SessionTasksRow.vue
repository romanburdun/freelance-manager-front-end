<template>
    <div class="row">
        <div class="cell col-3">
            <label class="col-3 mobile_label">Task name:</label>
            <h4 class="col-3" >{{task.title}}</h4>
        </div>
        <div class="cell col-2">
            <label class="col-1 mobile_label">Project:</label>
            <h4 class="col-1">{{task.project.title}}</h4>
        </div>
        <div class="cell last_cell col-1">
            <label class="mobile_label col-2" >Actions:</label>
            <div class="col-2 row_ctrl">
                <button class="btn" @click="addTask(task)">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: 'SessionTasksRow',
        props: ['task'],
        methods: {
            ...mapActions(['addTask'])
        }

    }
</script>

<style scoped>

</style>

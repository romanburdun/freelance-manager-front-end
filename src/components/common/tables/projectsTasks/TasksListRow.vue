<template>
    <div class="row tasks_mobile">
        <div class="cell col-3">
            <label class="col-3 mobile_label">Project task:</label>
            <a class="col-3" :class="{'not_active': task.completed}">{{task.title}}</a>
        </div>
        <div class="cell col-1">
            <label class="col-1 mobile_label">Task status:</label>
            <a class="col-1" :class="{'not_active': task.completed}">{{task.completed | condition}}</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TasksListRow',
        props: ['task']
    }
</script>

<style scoped>

</style>
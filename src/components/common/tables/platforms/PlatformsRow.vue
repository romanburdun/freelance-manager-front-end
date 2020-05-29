<template>
    <div class="row">
        <div class="cell col-3">
            <label class="col-3 mobile_label">Platform name:</label>
            <h4 class="col-3">{{platform.platformName}}</h4>
        </div>
        <div class="cell col-2">
            <label class="col-1 mobile_label">Projects:</label>
            <h4 class="col-1" >{{platform.projects}}</h4>
        </div>
        <div class="cell col-2">
            <label class="col-1 mobile_label">Clients:</label>
            <h4 class="col-1">{{platform.clients}}</h4>
        </div>
        <div class="cell last_cell col-1">
            <label class="mobile_label col-2" >Actions:</label>
            <div class="col-2 row_ctrl">
                <a href="#" class=" delete" @click="deletePlatform(platform._id)"><md-delete/></a>
            </div>
        </div>
    </div>
</template>

<script>
    import Delete from 'vue-material-design-icons/Delete'
    import {mapActions} from 'vuex';
    export default {
            name: 'PlatformRow',
            components: {
                'md-delete': Delete
            },
            props: ['platform'],
            methods: {
                ...mapActions(['deletePlatform'])
            }
    }
</script>

<style scoped>

</style>

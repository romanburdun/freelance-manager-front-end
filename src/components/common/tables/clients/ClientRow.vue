<template>
    <div class="row">
        <div class="cell col-3">
            <label class="col-3 mobile_label">Client name:</label>
            <h4 class="col-3" href="#">{{client.name}}</h4>
        </div>
        <div class="cell col-2">
            <label class="col-1 mobile_label">Platform:</label>
            <h4 class="col-1">{{client.incomePlatform.platformName}}</h4>
        </div>
        <div class="cell col-2">
            <label class="col-1 mobile_label">Projects:</label>
            <h4 class="col-1">{{client.projects.length}}</h4>
        </div>
        <div class="cell last_cell col-1">
            <label class="mobile_label col-2" >Actions:</label>
            <div class="col-2 row_ctrl">
                <a class=" delete" @click="deleteClient(client._id)"><md-delete/></a>
            </div>
        </div>
    </div>
</template>

<script>
    import Delete from 'vue-material-design-icons/Delete'
    import {mapActions} from 'vuex';
    export default {
        name: 'ClientRow',
        props: ['client'],
        components: {
            'md-delete': Delete,
        },
        methods: {
            ...mapActions(['deleteClient'])
        }
    }
</script>

<style scoped>

</style>

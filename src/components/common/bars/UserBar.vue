<template>
    <div class="user--bar">
        <h4 class="text">{{userName}}</h4>
        <button class="btn_flat" @click="logout">Logout</button>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
    name: 'UserBar',
    methods: {
        ...mapActions(['logout'])
    },
    computed: {
        ...mapGetters(['userName'])
    }
    }
</script>

<style lang="scss">

    .user--bar {
        display: flex;
        flex-flow: row;
        justify-content: flex-end;
        align-items: center;
        z-index: 800;
        .text {
            margin-right: 3rem;
        }
    }

</style>

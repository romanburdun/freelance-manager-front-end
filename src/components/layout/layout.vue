<template>
    <div>
        <app-sidebar></app-sidebar>
        <div class="page_container" :class="{'dark': darkMode}">
            <router-view></router-view>
        </div>



    </div>
</template>

<script>

    import {mapGetters} from 'vuex'
    import SideBar from "@/components/common/bars/SideBar";
    export default {
        name: 'app-layout',
        components: {
            'app-sidebar': SideBar,

        },
        computed: {
            ...mapGetters(['darkMode']),


        }



    }
</script>

<style scoped lang="scss">

</style>

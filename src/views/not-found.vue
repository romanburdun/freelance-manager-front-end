<template>
    <div class="flex-wrapper" :class="{'dark': darkMode}">
        <div class="form">
            <div class="message">
                <h1 class="form_header">404: Page not found</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "NotFound",
        computed: {
            ...mapGetters(['darkMode'])
        }

    }
</script>

<style scoped lang="scss">
        @import "../styles/dark";
        @import "../styles/forms";
</style>
<template>
    <div class="flex-wrapper" :class="{'dark': darkMode}">
        <div class="form">
             <div class="message">
                 <h1 class="form_header">Request for password reset was sent:</h1>
                 <h3 class="form_text">Please check you email and follow instructions to reset the password</h3>
                 <router-link to="/">Return to login page</router-link>
             </div>
        </div>


    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "RequestSent",

        computed: {
            ...mapGetters(['darkMode'])
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/forms";
</style>
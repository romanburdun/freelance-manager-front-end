<template>
    <div class="flex-wrapper" :class="{'dark': darkMode}">

        <form class="form" v-on:submit.prevent autocomplete="off">

            <div class="form_stack" @keydown.enter="loginUser()">
                <h1 class="form_header">Log in:</h1>

                <div class="input">
                    <input
                            type="text"
                            id="username"
                            v-model="email"
                            aria-label="Please enter email."
                            placeholder="Email:*"
                            autocomplete="off"
                    >
                </div>
                <div class="input">
                    <input
                            type="password"
                            id="password"
                            v-model="password"
                            aria-label="Please enter password"
                            placeholder="Password:*"
                            autocomplete="off"
                    >
                </div>
                <h5 class="error" v-if="fieldsValidationError">Email and/or password fields are blank!</h5>
                <h5 class="error" v-if="loginError">{{errorMessage}}</h5>
                <button class="btn" @click="loginUser()" >Log in</button>
                <router-link to="/forgot_password">Forgot password</router-link>
                <router-link to="/register">or Register</router-link>
            </div>
        </form>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: 'LoginView',
        data() {
            return {
                email: '',
                password: '',
                fieldsValidationError: false
            }
        },
        methods: {
            ...mapActions([
                'login',
            ]),
            loginUser() {
                if(this.username!== '' && this.password !== '') {
                    this.login({email: this.email, password: this.password})
                } else {
                    this.fieldsValidationError = true;
                    setTimeout(() => {
                         this.fieldsValidationError = false;
                    }, 10000)
                }
            }
        },
        computed: {
            ...mapGetters(['loginError', 'errorMessage', 'darkMode'])
        }


    }
</script>

<style lang="scss" scoped>
    @import "../styles/dark";
    @import "../styles/forms";

</style>

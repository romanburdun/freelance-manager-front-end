<template>
    <div class="flex-wrapper" :class="{'dark': darkMode}">

        <form class="form" v-on:submit.prevent autocomplete="off">
            <div class="form_stack" @keydown.enter="registerUser()">

                <h1 class="form_header">Register:</h1>

                <div class="input">

                    <input
                            type="email"
                            id="name"
                            required
                            v-model="registration.name"
                            aria-label="Please enter your name."
                            placeholder="Name:*"
                            autocomplete="off"
                    >
                </div>
                <div class="input">

                    <input
                            type="email"
                            id="username"
                            required
                            v-model="registration.email"
                            aria-label="Please enter your email."
                            placeholder="Email:*"
                            autocomplete="off"
                    >
                </div>
                <div class="input">
                    <input
                            type="password"
                            id="password"
                            required
                            v-model="registration.password"
                            aria-label="Please enter password."
                            placeholder="Password:*">
                </div>
                <div class="input">
                    <input
                            type="password"
                            id="confirm_password"
                            required v-model="confirmPassword"
                            aria-label="Please confirm password."
                            placeholder="Confirm password:*"
                            autocomplete="off"
                    >
                </div>
                <h5 class="error_message" v-if="fieldsValidationError">Registration form is invalid!</h5>
                <h5 class="error_message" v-if="invalidPassword">Password must be minimum 8 characters long!</h5>
                <button class="btn" @click="registerUser">Register</button>
                <router-link to="/">Already have an account?</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'RegisterView',
        data() {
            return {
                registration : {
                    name: '',
                    email: '',
                    password: '',


                },
                confirmPassword: '',
                fieldsValidationError: false,
                invalidPassword: false

            }
        },
        methods: {
            ...mapActions([
                'register'
            ]),

            checkFields() {
                 if(this.registration.name !== '' && this.registration.email !== '') {
                     return true;
                 }
                 return false;
            },

            validatePasswords() {
                if(this.registration.password !== '' && this.registration.password.length > 8) {
                    if(this.registration.password === this.confirmPassword) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false
                }
            },



            registerUser() {

                if(!this.validatePasswords()) {
                    this.invalidPassword = true;

                    setTimeout(() => {
                        this.invalidPassword = false;
                    }, 10000)
                }

                if(this.checkFields() && this.validatePasswords()) {
                            this.register(this.registration);
                }
                else {
                            this.fieldsValidationError = true;

                            setTimeout(() => {
                                 this.fieldsValidationError = false;
                            }, 10000)


                        }
            },


        },

        computed: {
            ...mapGetters(['darkMode'])
        }


    }
</script>

<style lang="scss" scoped>
    @import "../styles/forms";
</style>

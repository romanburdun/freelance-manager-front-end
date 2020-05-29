<template>
    <div class="flex-wrapper" :class="{'dark': darkMode}">
        <form class="form" v-on:submit.prevent>
            <div class="form_stack">
                <h1 class="form_header">Forgot password:</h1>
                <h4 class="success_message" v-if="requestSent">The reset password URL was sent your email. Please check your spam as well</h4>
                <h4 class="error_message" v-if="error">Email field is blank or invalid!</h4>
                <div class="input">

                    <input
                            type="email"
                            id="email"
                            required
                            v-model="email"
                            aria-label="Please enter your email."
                            placeholder="Email:*"
                            autocomplete="off"
                    >
                </div>
                <button class="btn" @click="onSubmit">Submit</button>
                <router-link to="/">Go back</router-link>
            </div>
        </form>
    </div>
</template>

<script>

    import {axiosClient as axios} from "@/utils/axios";
    import {mapGetters} from 'vuex';
    export default {
        name: 'ForgotPasswordView',
        data() {
            return {
                error: false,
                email: '',
                requestSent: false
            }
        },

        methods: {
            async onSubmit() {
                if(this.email === '') {
                    this.error = true;

                    setTimeout(() => {
                        this.error = false;
                    })

                }
                else {
                       try{
                           await axios.post('/api/v1/auth/forgot_password', {email: this.email});
                           this.error = false;
                           this.requestSent = true;
                       } catch (e) {
                           this.requestSent = false
                       }
                }

                if(this.requestSent) {
                    await this.$router.push('/request_sent')
                }
            }
        },

        computed: {
            ...mapGetters(['darkMode'])
        }
    }
</script>

<style lang="scss" scoped>
@import "../styles/forms";
</style>

<template>
    <div class="flex-wrapper">
        <form class="form" v-on:submit.prevent autocomplete="off">
            <div class="form_stack">
                <h1 class="form_header">Reset password:</h1>

                <div class="input">
                    <label for="new_password">Please enter new password:</label>
                    <input
                            type="password"
                            id="new_password"
                            required
                            v-model="newPassword"
                            autocomplete="off"
                    >
                </div>
                <div class="input">
                    <label for="confirm_password">Please confirm new password:</label>
                    <input
                            type="password"
                            id="confirm_password"
                            required
                            v-model="confirmPassword"
                            autocomplete="off"
                    >
                </div>
                <h4 class="error_message" v-if="responseError">Invalid or expired token!</h4>
                <h4 class="error_message" v-if="error">Empty or not matching password fields!</h4>
                <button class="btn" @click="onReset">Reset password</button>
                <router-link to="/">Go back</router-link>
            </div>
        </form>
    </div>
</template>

<script>

    import {axiosClient as axios} from "@/utils/axios";

    export default {
            name: 'ResetPasswordView',
            data() {
                return {
                    error: false,
                    responseError: '',
                    newPassword: '',
                    confirmPassword: ''
                }
            },
            methods: {
                async onReset() {

                    const resetToken = this.$route.params.token;

                    if(this.newPassword !== this.confirmPassword
                        || this.newPassword === '' || this.confirmPassword === '') {
                        this.error = true;

                        setTimeout(() => {
                            this.error = false;
                        }, 10000)
                    }

                    if(!this.error){
                        try {
                            let response = await axios.put(`/api/v1/auth/reset_password/${resetToken}`, {newPassword: this.newPassword})

                            if(response.data.success) {
                                this.responseError = false;
                            }
                        } catch (e) {
                            this.responseError = true;
                        }
                    }
                }
            }
    }
</script>

<style lang="scss">
    @import "../styles/forms";
</style>

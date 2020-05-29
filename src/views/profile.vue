<template>
    <div class="page">
        <app-userbar></app-userbar>
        <div class="page_section">
            <h4 class="page_header">Profile:</h4>
        </div>
        <form class="page_form" v-on:submit.prevent autocomplete="off">
            <div class="page_section">


                <div class="input_row">
                    <div class="input">
                        <input type="text"
                               id="current_name"
                               v-model="currentUserName"
                               disabled  aria-label="Current user name"
                               placeholder="Current user name"
                               autocomplete="off"
                        >
                    </div>
                    <div class="input">
                        <input type="text"
                               id="current_email"
                               v-model="currentUserEmail"
                               disabled aria-label="Current user email"
                               placeholder="Current user email"
                               autocomplete="off"
                        >
                    </div>

                </div>


            </div>


            <div class="page_section">


                <div class="input_row">
                    <div class="input">
                        <input type="text"
                               id="new_name"
                               v-model="update.newName"
                               aria-label="Please enter new user name"
                               placeholder="New user name:*"
                               autocomplete="off"
                        >
                    </div>
                    <div class="input">

                        <input type="text"
                               id="new_email"
                               v-model="update.newEmail"
                               aria-label="Please enter new user email"
                               placeholder="New user email:*"
                               autocomplete="off"
                        >
                    </div>
                </div>


            </div>


            <div class="page_section">

                <div class="input_row">
                    <div class="input">
                        <input type="password"
                               id="new_password"
                               v-model="update.newPassword"
                               aria-label="Please enter new password"
                               placeholder="New password:"
                               autocomplete="off"
                        >
                    </div>


                    <div class="input">
                        <input type="password"
                               id="confirm_password"
                               v-model="update.confirmPassword"
                               aria-label="Please confirm new password"
                               placeholder="Confirm new password:*"
                               autocomplete="off"
                        >
                    </div>
                </div>

            </div>

            <div class="page_section">
                <div class="input_row">
                    <div class="input">
                        <input type="password"
                               id="current_password"
                               v-model="update.currentPassword"
                               aria-label="Please enter current password to proceed" placeholder="Current password:*"
                               autocomplete="off"
                        >
                    </div>
                </div>
            </div>

            <h5 class="error" v-if="nothingToUpdate">There is nothing to update</h5>
            <h5 class="error" v-if="passwordMismatch">Passwords mismatch</h5>
            <h5 class="error" v-if="invalidForm">Form is invalid please check all fields.</h5>
            <button class="btn" @click="updateProfile()">Update</button>
        </form>
    </div>
</template>

<script>
    import UserBar from '@/components/common/bars/UserBar'
    import {axiosClient as axios} from "@/utils/axios";
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'ProfileView',
        components: {
          'app-userbar': UserBar,
        },
        data() {
            return {
                update: {
                    newEmail: '',
                    newName: '',
                    newPassword: '',
                    confirmPassword: '',
                    currentPassword: '',
                },
                passwordMismatch: false,
                nothingToUpdate: false,
                invalidForm: false,
                currentPasswordError: false,
                currentUserName: `Current user name: ${this.userName}`,
                currentUserEmail: `Current user email: ${this.userEmail}`,
                empty: [],
                selectedOpt: ''

            }
        },
        computed: {
            ...mapGetters(['userName', 'userEmail']),
        },
        methods: {

            ...mapActions(['getUserProfile']),


            async updateProfile() {




                    if(this.isFormBlank()) {
                        this.nothingToUpdate = true;

                        setTimeout(()=> {
                            this.nothingToUpdate = false;
                        },10000)
                        return;
                    }



                if(this.checkFields() && this.currentPasswordEntered()) {
                    await axios.put('api/v1/auth/update_user', this.update)
                    this.getUserProfile();
                } else {
                    this.invalidForm = true;

                    setTimeout(()=> {
                        this.invalidForm = false;
                    }, 10000)
                }

                    if(!this.passwordChangedAndMatch()) {
                        this.passwordMismatch = true;

                        setTimeout(()=> {
                            this.passwordMismatch = false;
                        },10000);

                        return
                    }





            },

            checkFields() {
                if(this.update.newName !== '' || this.update.newEmail !== ''
                    || this.update.newPassword !== '') {
                    return true;
                }
                return false;
            },

            currentPasswordEntered() {
                if(this.update.currentPassword == '') {
                    return false;
                }
                return true;
            },

            passwordChangedAndMatch() {

                if( this.update.newPassword !=='') {

                    if (this.update.newPassword.length > 8
                        && this.update.newPassword === this.update.confirmPassword) {
                        return true;
                    } else {

                        return false
                    }

                }
                return true
            },

            isFormBlank() {

              if(this.update.newName === '' && this.update.newEmail === '' && this.update.newPassword === '')  {
                  return true
              }

              return false;
            }


        },

        created() {
          this.currentUserName = `Current user name: ${this.userName}`,
          this.currentUserEmail = `Current user email: ${this.userEmail}`
        }
    }
</script>

<style scoped lang="scss">


    .page_form {
        display: block;
        margin: 0 auto;

        .page_section {
            .input {
                flex-flow: column;
                input[type="text"], input[type="password"] {
                    width: 100%;
                }
            }
        }

    }

    .input_row {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 2rem;
        @media(min-width: 1366px) {
            grid-template-columns: repeat(2, minmax(300px, 1fr));
            grid-gap: 6rem;
        }
    }

</style>

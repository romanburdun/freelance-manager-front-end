<template>
        <div class="page">
            <app-userbar></app-userbar>

            <div class="page_section">
                <h1 class="page_header">Clients & Income platforms:</h1>
            </div>

            <div class="page_section">
                <div class="input_group">

                    <div class="input">

                        <input type="text" name="ip_name" id="ip_name"
                               v-model="platformName" required aria-label="Please enter platform name." placeholder="Platform name:*">
                        <h5 class="error" v-if="isPlatformFieldError">Please fill a Platform name field</h5>
                    </div>
                    <button class="btn" @click="addPlatform()">Add platform</button>
                </div>

            </div>

            <div class="page_section">
                <label for="platforms">Income platforms:</label>
                <div class="table" id="platforms">
                    <platforms-table-head></platforms-table-head>

                    <div class="row" v-if="platforms.length === 0">
                        <h5 class="text">No platforms added yet</h5>
                    </div>

                    <platform-row v-for="platform in platforms" :platform="platform" :key="platform._id" ></platform-row>
                </div>

            </div>


            <div class="page_section">
                <div class="input_group">
                    <div class="input">

                        <input type="text" name="client_name" id="client_name" aria-label="Please enter client's name" placeholder="Client's name:*"
                                v-model="client.name">

                    </div>


                    <div class="input">
                        <app-select
                                :options="platformsList"
                                :empty-option="{label: 'No platforms yet', value: ''}"
                                @selected="setClientPlatform($event)"
                        >
                        </app-select>
                    </div>
                    <button class="btn" @click="addClient()">Add client</button>
                </div>
                <h5 class="error" v-if="isClientFieldsError">
                    Please fill a Client name field and select a platform</h5>
            </div>



            <div class="page_section">
                <label for="clients">Clients:</label>
                <div class="table" id="clients">
                    <clients-table-header></clients-table-header>

                    <div class="row" v-if="clients.length === 0">
                        <h5 class="text">No clients added yet</h5>
                    </div>

                    <client-row v-for="client in clients" :client="client" :key="client._id"></client-row>
                </div>
            </div>




        </div>

</template>

<script>
    import Select from '../components/common/controlls/select'
    import UserBar from "@/components/common/bars/UserBar";
    import ClientsTableHead from "@/components/common/tables/clients/ClientsTableHead";
    import ClientRow from "@/components/common/tables/clients/ClientRow";
    import PlatformsRow from "@/components/common/tables/platforms/PlatformsRow";
    import PlatformsTableHead from "@/components/common/tables/platforms/PlatformsTableHead";
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'ClientsPlatforms',

        data() {
            return {
                isPlatformFieldError: false,
                platformName: '',
                isClientFieldsError: false,
                client: {
                    name:'',
                    incomePlatform: ''
                }
            }
        },
        components: {
            'platforms-table-head': PlatformsTableHead,
            'platform-row': PlatformsRow,
            'clients-table-header': ClientsTableHead,
            'client-row': ClientRow,
            'app-userbar': UserBar,
            'app-select': Select
        },
        methods: {
            ...mapActions([ 'updateNewClientName',
                            'updateNewClientPlatform',
                            'updateNewPlatformName',
                            'storeClient',
                            'storePlatform',
                            'deleteClient',
                            'deletePlatform'
            ]),
            addPlatform() {

                if(this.platformName !== '') {
                    this.isPlatformFieldError = false
                    this.storePlatform(this.platformName)
                } else {
                    this.isPlatformFieldError = true
                }
            },

            setClientPlatform(platform) {

                this.client.incomePlatform = platform;

            },

            addClient() {
                if(this.client.name !== '' && this.client.incomePlatform !== '') {
                    this.isClientFieldsError = false
                    this.storeClient(this.client)
                } else {
                    this.isClientFieldsError = true
                }
            },


        },
        computed: {
            ...mapGetters([ 'platforms',
                            'clients',
                            'platformsList'

            ]),
        },



    }
</script>

<style scoped>

</style>

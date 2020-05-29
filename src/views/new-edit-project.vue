<template>
    <div class="page">

        <app-modal v-if="modalOpen"
                   :modalMessage="`Do you really want exit project editor?`"
                   :actionName="'Leave'"
                   @close="closeModal"
                   @exec="confirmExit"
                   >

        </app-modal>
        <app-userbar></app-userbar>
        <div class="page_section">
            <h1 v-if="editMode" class="page_header">Edit project</h1>
            <h1 v-else class="page_header">New project</h1>



        </div>
        <div class="page_section">
            <div class="input_group">

                <div class="input">
                    <input ref="project_name" type="text" name="project_name" id="project_name" aria-label="Project name" placeholder="Project name:*"
                            v-model="project.title"
                    >
                </div>

                <div class="input">
                    <input v-if="editMode" type="text" name="client" id="client" :value="project.client[0].name" disabled aria-label="Client" placeholder="Client:*">

                    <app-select v-else
                                :options="clientsList"
                                :empty-option="{label: 'No clients yet', value: ''}"
                                @selected="setClient($event)">

                    </app-select>
                </div>
            </div>

            <div class="input_group">

                <div class="input">


                    <app-select-value :options="projectStates" @selected="setProjectStatus"></app-select-value>
                </div>


                <div class="input">
                    <app-datepicker  placeholder="Start date"
                                     v-model="project.startDate"
                                     >

                    </app-datepicker>
                </div>


                <div class="input">

                    <app-datepicker  placeholder="Deadline"
                                     v-model="project.endDate">

                    </app-datepicker>
                </div>

                <div class="input" v-if="project.status == 'delivered'">

                    <input  ref="payment"
                            type="number" name="payment" id="payment"
                          v-model="project.payment" aria-label="Please enter payment amount" placeholder="Payment:" >
                </div>
                <div class="input" v-if="project.status == 'delivered'">
                    <app-datepicker ref="payment_date" placeholder="Select payment date"
                                    v-model="project.paymentDate">

                    </app-datepicker>
                </div>
            </div>


            <div class="btn_stack" v-if="project.status == 'delivered'">
                <input type="file" name="invoice" id="proof" @change="setProjectInvoice($event.target.files[0])">
                <label for="proof">Choose invoice file</label>
            </div>

        </div>


        <div class="page_section">
            <app-text-editor v-model="project.brief">

            </app-text-editor>
        </div>

        <div class="page_section">
            <div class="input_group">
                <div class="input">
                    <label for="task">Task name:</label>
                    <input type="text" name="task" id="task" v-model="newTaskTitle">
                </div>
            </div>
            <button class="btn" @click="addNewTask()">Add task</button>

            <div class="page_section">
                <label for="tasks">Tasks:</label>
                <div class="table" id="tasks">
                    <pt-table-head></pt-table-head>



                    <div class="row" v-if="project.tasks.length === 0">
                        <h5 class="text">No tasks yet</h5>
                    </div>


                    <div class="row"
                         v-for="(task, index) in project.tasks"
                         :task="task"
                         :key="task.title+index"
                         :class="{'task-complete': task.completed}"
                    >
                        <div class="cell col-3">
                            <label class="col-3 mobile_label">Task name:</label>
                            <a class="col-3" href="#">{{task.title}}</a>
                        </div>
                        <div class="cell col-1">
                            <label class="col-1 mobile_label">Status:</label>
                            <a class="col-1" :class="{'not_active': task.completed}" >{{task.completed | condition}}</a>
                        </div>
                        <div class="cell last_cell col-1">
                            <label class="mobile_label col-2" >Actions:</label>
                            <div class="col-2 row_ctrl" v-if="!task.completed">
                                <a class="col-1 delete" :class="{'not_active': task.completed}" @click="deleteTask(task.title)"><md-delete/></a>
                            </div>

                            <div class="col-2 row_ctrl" v-else>
                                <a class="col-1 delete" :class="{'not_active': task.completed}">No actions</a>
                            </div>
                        </div>

                    </div>


                </div>

            </div>
            <h5 class="error" v-if="isTitleError">Please enter project name</h5>
            <h5 class="error" v-if="isClientError">Please select client:</h5>
            <h5 class="error" v-if="isStartDateError">Please select project's start date.</h5>
            <h5 class="error" v-if="isEndDateError">Please select project's deadline.</h5>
            <h5 class="error" v-if="isInvoiceMissing">Please select invoice to upload</h5>
            <h5 class="error" v-if="isBriefError">Please write a project's brief.</h5>
            <button class="btn" @click="sendProjectData()">{{editMode ? 'Update' : 'Create'}}</button>
        </div>
    </div>
</template>

<script>
    import DeletetIcon from 'vue-material-design-icons/Delete';
    import SelectValue from '../components/common/controlls/selectValue'
    import Select from '../components/common/controlls/select'
    import Modal from '@/components/common/modals/modal'
    import ProjectsTasksTableHead from "@/components/common/tables/projectsTasks/ProjectsTasksTableHead";
    import UserBar from "@/components/common/bars/UserBar";
    import {mapGetters, mapActions} from 'vuex';
    import {axiosClient as axios} from '../utils/axios'

    import Datepicker from 'vuejs-datepicker';
    import { VueEditor } from "vue2-editor";
    import {router} from "@/Routes";
    export default {
        name: 'NewEditProject',
        components: {
            'app-text-editor': VueEditor,
            'app-datepicker': Datepicker,
            'app-userbar': UserBar,
            'pt-table-head': ProjectsTasksTableHead,
            'app-modal': Modal,
            'app-select-value': SelectValue,
            'app-select': Select,
            'md-delete': DeletetIcon

        },
        data() {
            return {
                okToLeave:false,
                taskModal: false,
                to: null,
                noErrors: false,
                isTitleError: false,
                isBriefError: false,
                isStartDateError: false,
                isEndDateError: false,
                isClientError:false,
                isInvoiceMissing: false,
                project: {
                    _id: '',
                    title: '',
                    brief: '',
                    startDate: '',
                    endDate: '',
                    status:'agreed',
                    client:'',
                    payment: '',
                    paymentDate: '',
                    tasks: [],
                    projectInvoice: ''
                },
                setInvoice: null,
                newTaskTitle: '',
                projectStates: ['agreed', 'started', 'delivered', 'cancelled']
            }
        },
        methods: {
            ...mapActions([
                'deleteTask',
                'toggleModal',
                'uploadInvoice'
            ]),

            setProjectStatus(status) {
              this.project.status = status;
            },

            setClient(client) {
                this.project.client = client;
            },

            checkForErrors() {
                let isValid = true;


                if(this.project.title === '') {
                    this.isTitleError = true;

                    setTimeout(() => {
                        this.isTitleError = false;
                    }, 15000)
                }

                if(this.project.brief === '') {
                    this.isBriefError = true;

                    setTimeout(()=> {
                        this.isBriefError = false;
                    })
                }

                if(this.project.startDate === '') {
                    this.isStartDateError = true;

                    setTimeout(() => {
                         this.isStartDateError = false;
                    }, 15000)
                }

                if(this.project.endDate === '') {
                    this.isEndDateError = true;

                    setTimeout(()=> {
                         this.isEndDateError = false;
                    }, 15000)
                }

                if(this.project.client === '') {
                    this.isClientError = true;
                    setTimeout(() => {
                        this.isClientError = false;
                    }, 15000)
                }


                if(this.project.status === 'delivered' && !this.setInvoice) {
                        this.isInvoiceMissing = true;

                        setTimeout(()=> {
                            this.isInvoiceMissing = false;
                        }, 15000)
                }

                isValid = this.project.title !== '' && isValid;
                isValid = this.project.brief !== '' && isValid
                isValid = this.project.startDate !== '' && isValid;
                isValid = this.project.endDate !== '' && isValid;
                isValid = this.project.client !== '' && isValid;

                return isValid;
            },


            async sendProjectData() {

                let returnedProject = null;

                let isSuccess = false

                this.noErrors = this.checkForErrors()

                if(this.noErrors) {

                    if(!this.editMode) {

                        let response = await axios.post('/api/v1/projects', this.project);
                        isSuccess = response.data.success;

                        returnedProject = response.data.data;

                        if(this.project.status === 'delivered') {

                            this.uploadInvoice(
                                {

                                    projectId: returnedProject._id,
                                    projectTitle: returnedProject.title,
                                    paymentAmount: returnedProject.payment,
                                    paymentDate: returnedProject.paymentDate,
                                    projectInvoice: this.project.projectInvoice,
                                    invoice: this.setInvoice
                                })


                        }

                        let tasksResponse = await axios.post(`/api/v1/tasks/${returnedProject._id}/bulk`, this.project.tasks);
                        returnedProject.tasks = tasksResponse.data.data;
                    } else {

                        if(this.project.status === 'delivered') {

                                            this.uploadInvoice(
                                                {
                                                    projectId: this.project._id,
                                                    projectTitle: this.project.title,
                                                    paymentAmount: this.project.payment,
                                                    paymentDate: this.project.paymentDate,
                                                    projectInvoice: this.project.projectInvoice,
                                                    invoice: this.setInvoice
                                                })


                        }

                        let responseUpdate = await axios.put('/api/v1/projects/'+ this.project._id, this.project);
                        isSuccess = responseUpdate.data.success;
                        returnedProject = responseUpdate.data.data;

                        let tasks = this.project.tasks.filter(task => task._id === undefined)

                        if(tasks.length > 0) {
                            let tasksUploaded = await axios.post(`/api/v1/tasks/${returnedProject._id}/bulk`, {tasks: tasks});
                            returnedProject.tasks = tasksUploaded.data.data
                        }


                        this.$store.commit('SET_SELECTED_PROJECT', returnedProject)
                        this.$store.commit('SET_EDIT_STATE', false)
                    }
                }

                if(isSuccess) {
                    this.project = {
                        title: '',
                        brief: '',
                        startDate: '',
                        endDate: '',
                        status:'agreed',
                        client:'',
                        payment: '',
                        paymentDate: '',
                        tasks: []
                    };




                    this.okToLeave = true;
                    await this.$router.push('/projects');
                    await this.$store.dispatch('fetchAllProjects');
                    await this.$store.dispatch('fetchPlatforms');
                }

            },

            async addNewTask() {

                if(this.newTaskTitle !== '') {
                    let task = {
                        title: this.newTaskTitle,
                        completed: false,
                        project: this.project._id
                    };

                    if(this.editMode) {
                        let submittedTask = await axios.post(`/api/v1/tasks/`, task)

                        this.project.tasks.push(submittedTask.data.data)
                    } else {
                        this.project.tasks.push(task)
                    }


                    this.newTaskTitle = '';
                }

            },


            removeTask(task) {
                if(task._id !== undefined) {
                    this.deleteTask(task.title)
                } else {

                    this.project.tasks = this.project.tasks.filter(taskSearch => taskSearch.title !== task.title)
                }

            },
            confirmExit() {
                this.okToLeave = true;
                router.push(this.to);
                this.project = {
                    title: '',
                    brief: '',
                    startDate: '',
                    endDate: '',
                    status:'agreed',
                    client:'',
                    payment: '',
                    paymentDate: '',
                    tasks: []
                };
                this.$store.dispatch('clearSelectedProject');

                this.toggleModal()

            },
            closeModal() {
                this.to = null
                this.toggleModal();
            },

            setProjectInvoice(invoice) {
              this.setInvoice = invoice;
            },


        },
        computed: {
            ...mapGetters([
                'clients',
                'selectedProject',
                'editMode',
                'modalOpen',
                'isAuthenticated',
                'clientsList'
            ])
        },

        created() {

            if(this.editMode) {

               this.project = this.selectedProject;
            }


        },
        beforeRouteLeave(to, from, next) {

            if(!this.isAuthenticated) {
                 this.okToLeave = true;
            }


            if(this.okToLeave) {
                this.project = {
                    title: '',
                    brief: '',
                    startDate: '',
                    endDate: '',
                    status:'agreed',
                    client:'',
                    payment: '',
                    paymentDate: '',
                    tasks: []
                };
                this.$store.dispatch('clearSelectedProject');
                next();

            } else {
                this.to = to;
                this.$store.commit('TOGGLE_MODAL');

            }




        }



    }
</script>

<style scoped>


</style>

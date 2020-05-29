<template>
    <div class="card_content timer">
        <div class="timer_options">

            <app-select :options="workOptions" @selected="setWorkTime($event)"></app-select>

            <app-select :options="shortBreakOptions" @selected="setShortBreakTime($event)"></app-select>

            <app-select :options="longBreakOptions" @selected="setLongBreakTime($event)"></app-select>

        </div>
        <canvas class="progress" ref="timer" width="200" height="200"></canvas>
        <div class="text_value">
            <h4 class="text">State: </h4>
            <h4 class="card_field_value" ref="statusDisplay"></h4>
        </div>

        <button ref="timerButton" class="btn" @click="timerControl">{{ isPaused ? 'Start' : 'Pause'}}</button>
    </div>
</template>

<script>
    import Select from '@/components/common/controlls/select'
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: 'PomodoroTimer',
        components:{
            'app-select': Select
        },
        data() {
            return {
                btnState: 'Start',

                timerNextState: 'work',
                minutesCounter: this.workTime,
                secondsCounter: 0,
                timerState: 'Work',
                timerStatus: 'idle',
                timer: null,
                progress: 0,
                progressTimer: null,
                start: 4.72,
                width: 200,
                height: 200,
                diff: null,
                ctx: null,
                progressCounter: 0,
                statusDisplay: null,
                isPaused: true,
                workTime: 0,
                shortBreakTime: 0,
                longBreakTime: 0,
                totalSeconds: 0,
                workOptions: [
                    { label: "Session: 25 minutes", value: 25},
                    { label: "Session: 45 minutes", value: 45},
                    { label: "Session: 60 minutes", value: 60}

                ],

                shortBreakOptions: [
                    { label: "Short break: 5 minutes", value: 5},
                    { label: "Short break: 10 minutes", value: 10},
                    { label: "Short break: 15 minutes", value: 15}

                ],
                longBreakOptions: [
                    { label: "Long break: 15 minutes", value: 15},
                    { label: "Long break: 30 minutes", value: 30},
                    { label: "Long break: 60 minutes", value: 60}

                ]

            }
        },
        methods: {
            ...mapActions([
                'setSessionStartTime',
                'submitSession'
            ]),

            setWorkTime(time) {
                this.workTime = +time;
                this.updateData();

            },

            setShortBreakTime(time) {
                this.shortBreakTime = +time;
                this.updateData();
            },

            setLongBreakTime(time) {
              this.longBreakTime = +time;
              this.updateData();
            },



           initTimer() {
                this.progress = 0;
                this.progressCounter = 0;
                switch(this.timerNextState) {

                    case 'work':
                        this.setWorkTimer();
                        break;
                    case 'break':
                        this.setBreakTimer();
                        break;
                    default:
                        this.setWorkTimer();
                        break;

                }

                this.initTimerDisplay();


            },

            initTimerDisplay() {
                this.ctx.clearRect(0,0,this.width, this.height);
                this.ctx.fillStyle = '#80C649';
                this.ctx.font='32px Open Sans';
                this.ctx.shadowColor="#80C649"
                this.ctx.shadowBlur=2

                let minutesDisplay;
                if( this.minutesCounter < 10) {
                    minutesDisplay = '0' +this.minutesCounter;
                } else {
                    minutesDisplay = this.minutesCounter
                }

                let secondsDisplay;
                if( this.secondsCounter < 10) {
                    secondsDisplay = '0' +this.secondsCounter;
                } else {
                    secondsDisplay = this.secondsCounter;
                }


                this.ctx.fillText(minutesDisplay + " : " + secondsDisplay, 57, 110, this.width);
                this.ctx.beginPath();
            },

            updateData() {
                  if(this.timerStatus === 'idle') {
                      this.initTimer();
                  }



            },

            setWorkTimer() {
                this.isPaused = true;
                this.statusDisplay.innerHTML = 'Work'
                this.timerState = "Work"
                this.minutesCounter = +this.workTime;
                this.secondsCounter = 0;
                this.totalSeconds = this.minutesCounter * 60;
            },
            setBreakTimer() {

                this.isPaused = true;




                let incrementedSessionsCounter = this.sessionsCounter + 1;


                if(incrementedSessionsCounter % 3 === 0) {

                    this.minutesCounter = +this.longBreakTime;
                    this.totalSeconds = this.minutesCounter * 60;
                    this.statusDisplay.innerHTML = 'Long break'

                } else {

                    this.statusDisplay.innerHTML = 'Short break'
                    this.minutesCounter = +this.shortBreakTime;
                    this.totalSeconds = this.minutesCounter * 60;
                }

                this.secondsCounter = 0;
            },
            startPomodoroTimer() {
                this.setSessionStartTime();

                this.timer = setInterval(()=> {

                    if(this.secondsCounter == 0 && this.minutesCounter >= 0) {
                        this.minutesCounter--;
                        this.secondsCounter = 60;


                        if(this.minutesCounter < 0 ) {
                            clearInterval(this.timer);
                            clearInterval(this.progressTimer);
                        }

                    }
                    if(this.minutesCounter >= 0) {
                        this.secondsCounter--;
                    }

                    if(this.minutesCounter < 0 && this.secondsCounter === 60) {
                        this.timerStatus='idle';
                        if(this.timerNextState === 'work') {
                            this.submitSession();
                            this.timerNextState = 'break'
                        } else {
                            this.timerNextState = 'work'
                        }
                       this.initTimer();

                    }

                }, 1000);
            },


            startProgressBar() {

                this.progressTimer = setInterval(()=> {
                    if(this.progressCounter <= this.totalSeconds) {
                        this.progress=(this.progressCounter * 100 / this.totalSeconds);
                        this.diff=((this.progress / 100) * Math.PI*2*10);
                        this.ctx.clearRect(0,0,this.width, this.height);


                        this.ctx.shadowColor="#80C649"
                        this.ctx.shadowBlur=2
                        this.ctx.fillStyle = '#80C649';
                        this.ctx.font='32px Open Sans';
                        this.ctx.textAllign ='center';

                        let minutesDisplay;
                        if( this.minutesCounter < 10) {
                            minutesDisplay = '0' +this.minutesCounter;
                        } else {
                            minutesDisplay = this.minutesCounter
                        }

                        let secondsDisplay;
                        if( this.secondsCounter < 10) {
                            secondsDisplay = '0' +this.secondsCounter;
                        } else {
                            secondsDisplay = this.secondsCounter;
                        }

                        this.ctx.fillText(minutesDisplay + " : " + secondsDisplay, 57, 110, this.width);
                        this.ctx.lineWidth = 3;

                        this.ctx.strokeStyle = '#80C649'
                        this.ctx.beginPath();
                        this.ctx.arc(100,100, 90, this.start, this.diff/10+this.start , false);
                        this.ctx.stroke();

                        this.progressCounter++;
                    }

                },1000)
            },


            timerControl() {

                if( this.isPaused) {
                    this.startProgressBar();
                    this.startPomodoroTimer();
                    this.isPaused = false;
                    this.timerStatus = 'activated';




                } else {
                    clearInterval(this.timer);
                    clearInterval(this.progressTimer);
                    this.isPaused = true;
                }
            },





        },
        mounted() {

          this.statusDisplay = this.$refs.statusDisplay;
          this.ctx = this.$refs.timer.getContext('2d');
          this.initTimer();



        },

        created() {
            this.workTime = this.workOptions[0].value;
            this.shortBreakTime = this.shortBreakOptions[0].value;
            this.longBreakTime = this.longBreakOptions[0].value;
        },
        updated() {



            this.updateData();

            this.workTime = +this.workTime;
            this.shortBreakTime = +this.shortBreakTime;
            this.longBreakTime = +this.longBreakTime;

        },

        computed: {
            ...mapGetters(['sessionsCounter', 'currentSession'])
        },
        beforeDestroy() {
            clearInterval(this.timer);
            clearInterval(this.progressTimer);
            this.$store.commit('RESET_CURRENT_SESSION_TASKS');
            this.$store.commit('CLEAR_CURRENT_SESSION_DATA');


        }
    }
</script>

<style>

</style>

<template>
    <div class="modal_container">

        <div class="modal_card">

            <h4 class="modal_message">{{modalMessage}}</h4>


            <div class="modal_controls">
                <button class="action-btn" @click="execAction">{{actionName}}</button>
                <button class="close-btn" @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        props:['modalMessage', 'actionName'],
        methods: {

            execAction() {
                this.$emit('exec')
            },
            closeModal() {
                this.$emit('close')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/styles/controls';
.modal_container {
    z-index: 2000;
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    height: 100vh;
    background: rgba(0,0,0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    .modal_card {
        display: flex;
        flex-flow: column;
        width: 100%;

        background: $background;
        padding: 2rem 1rem;
        border-radius: 2px;
        @media(min-width: 640px) {
            width: 80%;
        }
        @media(min-width: 1024px) {
            width: 60%;
        }

        @media(min-width: 1440px) {
            width: 40%;
        }

        .modal_message {
            padding: 1rem 3rem;
            font-family: 'Roboto';
            font-size: 0.9rem;
            font-weight: lighter;

        }

        .modal_controls {
            margin-top: 2rem;
            align-self: center;
            width: 80%;
            display: flex;
            justify-content: space-between;

            @media(min-width: 640px) {
                width: 60%;
            }

            .action-btn {

                @extend .btn;
                background: $danger;
                &:hover {
                    background: darken($danger, 5%);
                }
            }


            .close-btn {
                @extend .btn;
            }
        }

    }


}
</style>

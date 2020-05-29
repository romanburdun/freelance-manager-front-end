<template>
    <div class="select">
        <div class="select_input" @click.stop="toggleOptions()">
            <div class="select_value">{{selectedValue}}</div>
            <md-down/>
        </div>
        <div class="select_options" :class="{'show_options' : selectOpen}" v-on-clickaway="closeOptions">
            <div class="s_option" v-for="option in options" :key="option" @click="valueSelected(option)">{{option}}</div>

        </div>
    </div>
</template>

<script>
    import { directive as onClickaway } from 'vue-clickaway';
    import ChevronDown from 'vue-material-design-icons/ChevronDown'
    export default {
        name: 'SelectValue',
        props: ['options'],
        components: {
            'md-down': ChevronDown
        },
          directives: {
                onClickaway: onClickaway,
          },
        data() {
            return{
                selectOpen: false,
                selectedValue: ''
            }
        },
        methods: {
            valueSelected(option) {
                this.selectOpen = false;
                this.selectedValue = option
                this.$emit('selected', option)
            },
            toggleOptions() {
                this.selectOpen = !this.selectOpen;
            },
            closeOptions() {
                this.selectOpen = false;
            }

        },
        mounted() {
            this.selectedValue = this.options[0]
        }
    }
</script>

<style lang="scss">



</style>

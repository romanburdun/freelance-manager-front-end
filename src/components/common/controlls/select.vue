<template>
    <div class="select">
        <div class="select_input" @click.stop="toggleOptions()">
            <div class="select_value" aria-label="">{{selectedValue.label}}</div>

                <md-down />
        </div>
        <div class="select_options"
             :class="{'show_options' : selectOpen}"
             v-on-clickaway="closeOptions"
        >
            <div class="s_option" v-for="option in options" :key="option.value" @click="valueSelected(option)">{{option.label}}</div>

        </div>
    </div>
</template>

<script>
    import { directive as onClickaway } from 'vue-clickaway';
    import ChevronDown from 'vue-material-design-icons/ChevronDown'
    export default {
        name: 'Select',
        components: {
            'md-down': ChevronDown
        },
          directives: {
                onClickaway: onClickaway,
          },
        props: ['options', 'emptyOption'],
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
                this.$emit('selected', option.value)
            },
            toggleOptions() {
                this.selectOpen = !this.selectOpen;
            },

            closeOptions() {
                 this.selectOpen = false;
            }

        },

        mounted() {

            if(this.options.length === 0) {
                this.options.push(this.emptyOption);
            }

            this.selectedValue = this.options[0]
        },

        // events: {
        //     closeOptions() {
        //         this.selectOpen = false;
        //     }
        // },
    }
</script>

<style scoped lang="scss">









</style>

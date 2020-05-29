import Vue from 'vue';

export default Vue.filter('condition', (condition) => {
    let result = 'incomplete';
    if(condition) {
        result = 'complete'
    }
    return result;
})

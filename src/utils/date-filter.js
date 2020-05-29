import Vue from 'vue';

export default Vue.filter('date', (date) => {

    let transformDate  = new Date(date);


    let dd = transformDate.getDate();
    let mm = transformDate.getMonth()+1;
    let year = transformDate.getFullYear();

    if(dd < 10) {
        dd = '0' + dd;
    }
    if(mm < 10) {
        mm = '0' + mm;
    }


    return  dd + '/' + mm + '/' + year;
})


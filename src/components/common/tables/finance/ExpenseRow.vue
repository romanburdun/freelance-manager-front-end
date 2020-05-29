<template>
    <div class="row">
        <div class="cell col-1">
            <label class="col-3 mobile_label">Expense name:</label>
            <h4 class="col-3">{{expense.expenseTitle}}</h4>
        </div>
        <div class="cell col-1">
            <label class="col-1 mobile_label">Expense date:</label>
            <h4 class="col-1">{{expense.expenseDate | date}}</h4>
        </div>
        <div class="cell col-1">
            <label class="col-1 mobile_label">Expense amount:</label>
            <h4 class="col-1">£{{expense.expenseAmount}}</h4>
        </div>
        <div class="cell last_cell col-1">
            <label class="mobile_label" >Actions:</label>
            <div class="col-1 row_ctrl">
                <a class="col-1 download" @click="downloadProof(expense)"><md-download/></a>
                <a class="col-1 delete" @click="deleteExpense(expense)"><md-delete/></a>
            </div>
        </div>
    </div>
</template>

<script>
    import Delete from 'vue-material-design-icons/Delete';
    import Download from 'vue-material-design-icons/Download';
    import {mapActions} from 'vuex'
    export default {
        name: 'ExpenseRow',
        props: ['expense'],
        components: {
            'md-download': Download,
            'md-delete': Delete
        },
        methods: {
            ...mapActions([
                'downloadProof',
                'deleteExpense'
            ]),
            download() {
                this.downloadProof(this.expenseObject)
            }
        },


    }
</script>

<style scoped>

</style>

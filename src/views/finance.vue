<template>

    <div class="page">
        <app-userbar></app-userbar>

        <div class="page_section">
            <h1 class="page_header">Finance</h1>
            <div class="input_group">
                <div class="input">

                    <input type="text"
                           name="expense_title"
                           id="expense_title"
                           v-model="expense.expenseTitle"
                            list="expenses"
                           aria-label="Expense name"
                           placeholder="Expense name:*"
                    >
                    <datalist id="expenses">
                        <option  v-for="option in expenseOptions" :value="option" :key="option">{{option}}</option>
                    </datalist>
                </div>
                <div class="input">

                    <app-datepicker  placeholder="Expense date:*"
                                     v-model="expense.expenseDate">

                    </app-datepicker>
                </div>

                <div class="input">

                    <input type="number"
                           name="expense_amount"
                           id="expense_amount"
                          v-model="expense.expenseAmount"
                           aria-label="Expense amount"
                           placeholder="Expense amount:*"
                    >
                </div>

            </div>
            <h5 class="error" v-if="isExpenseError">Please fill all expense fields and choose a proof file</h5>
            <div class="btn_stack">
                <input type="file" name="proof" id="proof" @change="setExpenseProof($event.target.files[0])">
                <label for="proof">Choose expense proof</label>
                <button class="btn" @click="addExpense()">Add expense</button>
            </div>

        </div>

        <div class="page_section">

            <label>Expenses per page:</label>

            <app-select-value :options="expensesLimitOptions" @selected="setExpensesLimit()"></app-select-value>

            <label class="page_indicator">Page {{currentExpensesPage}} of {{totalExpensesPages}}</label>

            <div class="table" id="expenses_table">
                <expenses-table-head></expenses-table-head>

                <div class="row" v-if="currentExpenses.length === 0">
                    <h5 class="text">No expenses</h5>
                </div>

                <expense-row v-else v-for="exp in currentExpenses" :expense="exp" :key="exp._id"></expense-row>




            </div>

            <div class="page_controls">
                <button
                        v-if="currentExpensesPage !== 1"
                        class="btn right_auto"
                        @click="decrementExpensesPageLocal"
                >Newer
                </button>
                <button
                        v-if="!isLastExpensesPage"
                        class="btn left_auto"
                        @click="incrementExpensesPageLocal"
                >Older</button>
            </div>
        </div>

        <div class="page_section">

            <label>Invoices per page:</label>
            <app-select-value :options="invoicesLimitsOptions" @selected="setInvoicesLimit($event)"></app-select-value>
            <label class="page_indicator">Page {{currentInvoicesPage}} of {{totalInvoicesPages}}</label>


            <div class="table" id="invoices_table">
                <invoices-table-head></invoices-table-head>

                <div class="row" v-if="currentInvoices.length == 0">
                    <h5 class="text">No invoices</h5>
                </div>

                <invoice-row v-else v-for="invoice in currentInvoices" :key="invoice.project" :invoice="invoice" ></invoice-row>
            </div>

            <div class="page_controls">
                <button
                        v-if="currentInvoicesPage !== 1"
                        @click="decrementInvoicesPage"
                        class="btn right_auto"
                >Newer
                </button>
                <button
                        v-if="!isLastInvoicesPage"
                        @click="incrementInvoicesPage"
                        class="btn left_auto"
                >Older</button>
            </div>
        </div>


        <div class="page-section">

            <div class="cards_container">


                <div class="card">
                    <div class="card_header">
                        <h4 class="text">Current tax year finance:</h4>
                    </div>
                    <div class="card_content" v-if="hasCurrentTaxYearFinance">

                        <div class="text_value">
                            <h5 class="text">Total income:</h5>
                            <h5 class="card_field_value">£{{currentTaxYearIncome}}</h5>

                        </div>

                        <div class="text_value">
                            <h5 class="text">Total expenses:</h5>
                            <h5 class="card_field_value">£{{currentTaxYearExpenses}}</h5>
                        </div>

                        <div class="text_value">
                            <h5 class="text">Profit before tax:</h5>
                            <h5 class="card_field_value">£{{currentTaxYearProfit}}</h5>
                        </div>
                        <button class="btn" @click="downloadCurrentTaxYearFinanceArchive()"><md-download/> Download archive</button>
                    </div>

                    <div class="card_content" v-else>
                        <h4 class="text">No data yet</h4>
                    </div>
                </div>

                <div class="card">
                    <div class="card_header">
                        <h4 class="text">Previous tax year finance: </h4>

                    </div>
                    <div class="card_content" v-if="hasPreviousTaxYearFinance === true">
                        <div class="text_value">
                            <h5 class="text">Total income:</h5>
                            <h5 class="card_field_value">£{{previousTaxYearIncome}}</h5>

                        </div>

                        <div class="text_value">
                            <h5 class="text">Total expenses:</h5>
                            <h5 class="card_field_value">£{{previousTaxYearExpenses}}</h5>
                        </div>

                        <div class="text_value">
                            <h5 class="text">Profit before tax:</h5>
                            <h5 class="card_field_value">£{{previousTaxYearProfit}}</h5>
                        </div>
                        <button class="btn" @click="downloadPreviousTaxYearFinanceArchive()"><md-download/> Download archive</button>
                    </div>

                    <div class="card_content" v-else>
                        <h4 class="text">No data yet</h4>
                    </div>
                </div>

            </div>
        </div>




    </div>
</template>

<script>

    import ExpenseRow from "@/components/common/tables/finance/ExpenseRow";
    import ExpenseTableHead from "@/components/common/tables/finance/ExpenseTableHead";
    import UserBar from "@/components/common/bars/UserBar";
    import Datepicker from 'vuejs-datepicker';
    import InvoicesTableHead from "@/components/common/tables/finance/InvoicesTableHead";
    import InvoiceRow from "@/components/common/tables/finance/InvoiceRow";
    import {mapGetters, mapActions} from 'vuex';
    import SelectValue from '../components/common/controlls/selectValue'
    import Download from 'vue-material-design-icons/Download'
    export default {
        name: 'Finance',
        components: {

            'app-datepicker': Datepicker,
            'app-userbar': UserBar,
            'expenses-table-head': ExpenseTableHead,
            'expense-row': ExpenseRow,
            'invoices-table-head': InvoicesTableHead,
            'invoice-row': InvoiceRow,
            'app-select-value': SelectValue,
            'md-download': Download

        },
        data() {
            return {
                isExpenseError: false,
                expense: {
                    expenseTitle: '',
                    expenseDate: null,
                    expenseAmount: ''
                },
                expenseProof: null,
            }
        },
        computed: {
            ...mapGetters([ 'currentExpenses',
                            'hasCurrentTaxYearFinance',
                            'currentTaxYearIncome',
                            'currentTaxYearExpenses',
                            'currentTaxYearProfit',
                            'previousTaxYearProfit',
                            'previousTaxYearIncome',
                            'previousTaxYearExpenses',
                            'hasPreviousTaxYearFinance',
                            'expenseOptions',
                            'expensesLimitOptions',
                            'expensesLimit',
                            'currentExpensesPage',
                            'totalExpensesPages',
                            'isLastExpensesPage',
                            'currentInvoices',
                            'currentInvoicesPage',
                            'totalInvoicesPages',
                            'invoicesLimit',
                            'invoicesLimitsOptions',
                            'isLastInvoicesPage'

                            ]),

        },


        methods: {

            updateInvoicesLimit(limit) {
                this.setInvoicesLimit(limit)
            },

          ...mapActions([
                        'fetchCurrentTaxYearExpenses',
                        'uploadExpense',
                        'downloadProof',
                        'deleteExpense',
                        'setExpensesLimit',
                        'incrementExpensesPage',
                        'decrementExpensesPage',
                        'setInvoicesLimit',
                        'incrementInvoicesPage',
                        'decrementInvoicesPage',
                        'downloadCurrentTaxYearFinanceArchive',
                        'downloadPreviousTaxYearFinanceArchive'


          ]),

            incrementExpensesPageLocal() {
              this.incrementExpensesPage();
            },

            decrementExpensesPageLocal() {
                this.decrementExpensesPage();
            },


            setExpenseProof(proof) {
                this.expenseProof = proof;
            },
            addExpense() {
              if(this.expense.expenseTitle !== '' && this.expense.expenseDate !== null
                  && this.expense.expenseAmount !== 0 && this.expenseProof !== null) {

                  this.isExpenseError = false;

                 this.uploadExpense({expense: this.expense, expenseProof: this.expenseProof});

                 this.expense = {
                     expenseTitle: '',
                     expenseDate: null,
                     expenseAmount: 0
                 };

                 this.expenseProof = null;

              } else {
                  this.isExpenseError = true
              }
            },
        },

    }
</script>

<style scoped>

</style>

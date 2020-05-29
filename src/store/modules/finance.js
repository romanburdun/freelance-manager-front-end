import {axiosClient as axios} from '../../utils/axios';

const state = {
    fetchDate: new Date(),
    currentExpenses: [],
    previousExpenses: [],
    currentTaxYearFinanceInfo: {
        totalIncome: 0,
        totalExpenses: 0,
    },
    previousTaxYearFinanceInfo: {
        totalIncome: 0,
        totalExpenses: 0,
    },
    expenseOptions: [],
    currentTaxYearExpensesChart: {
        labels:[],
        amount:[],
    },
    previousTaxYearExpensesChart: {
        labels:[],
        amount:[],
    },
    platformsIncomeChart: {
        labels: [],
        data: []
    },
    monthlyIncomeChart: {
        label: [],
        data: []
    },
    currentExpensesPage: 1,
    totalExpensesPages: 1,
    expensesLimit: 3,
    expensesLimitOptions: [3,5,10],
    isLastExpensesPage: false,
    currentInvoices: [],
    previousInvoices: [],
    currentInvoicesPage: 1,
    totalInvoicesPages: 1,
    invoicesLimit: 3,
    invoicesLimitsOptions: [3,5,10],
    isLastInvoicesPage: false




}

const getters = {

        currentInvoices(state) {
          return state.currentInvoices;
        },

        currentExpensesPage(state) {
            return state.currentExpensesPage;
        },

        totalExpensesPages(state) {
          return state.totalExpensesPages;
        },

        isLastExpensesPage(state) {
          return state.isLastExpensesPage
        },

        currentInvoicesPage(state) {
            return state.currentInvoicesPage
        },

        totalInvoicesPages(state) {
            return state.totalInvoicesPages
        },

        isLastInvoicesPage(state) {
            return state.isLastInvoicesPage
        },

        invoicesLimit(state) {
            return state.invoicesLimit
        },

        invoicesLimitsOptions(state) {
            return state.invoicesLimitsOptions
        },




        expensesLimit(state) {
            return state.expensesLimit
        },

        expensesLimitOptions(state) {
            return state.expensesLimitOptions
        },

        currentExpenses(state) {
            return state.currentExpenses
        },



        currentTaxYearIncome(state) {
            return state.currentTaxYearFinanceInfo.totalIncome;
        },

        currentTaxYearExpenses(state) {
            return state.currentTaxYearFinanceInfo.totalExpenses
        },

        currentTaxYearProfit(state) {
            const {totalIncome, totalExpenses} = state.currentTaxYearFinanceInfo

          let profit = totalIncome - totalExpenses
            return profit > 0 ? profit : 0;
        },

        hasCurrentTaxYearFinance(state) {
            if(state.currentExpenses.length !== 0 || state.currentInvoices.length !== 0) {
                return true;
            }
            return false;
        },

        previousTaxYearIncome(state) {
            return state.previousTaxYearFinanceInfo.totalIncome;
        },

        previousTaxYearExpenses(state) {
            return state.previousTaxYearFinanceInfo.totalExpenses
        },

        previousTaxYearProfit(state) {
            const {totalIncome, totalExpenses} = state.previousTaxYearFinanceInfo

            let profit = totalIncome - totalExpenses
            return profit > 0 ? profit : 0;
        },


        hasPreviousTaxYearFinance(state) {
            if(state.previousExpenses.length !== 0 || state.previousInvoices.length !== 0) {
                return true;
            }
            return false;
        },

        expenseOptions(state) {
                return state.expenseOptions;
        },

        currentTaxYearExpensesChartData(state) {

           let expChartData = {
                labels: state.currentTaxYearExpensesChart.labels,
                    datasets: [
                    {
                        label: 'Expenses',
                        backgroundColor: [
                            '#f85423',
                            '#98f34a',
                            '#4c96f1',
                            '#26f1e1',
                        ],
                        data: state.currentTaxYearExpensesChart.amount
                    },
                ],
               options: {
                   legend: {
                       position: 'right',
                       align: 'center',
                       display: true,
                       labels: {
                           fontColor: '#609E2E'
                       }
                   }
               }

            }

            const reducer = (sum, arrValue) => sum+arrValue;



            if(state.currentTaxYearExpensesChart.labels.length !== 0 ) {
                let totalExpensesArray = [...state.currentTaxYearExpensesChart.amount]
                let totalExpenses = totalExpensesArray.reduce(reducer);
                if(totalExpenses !==0) {
                    return expChartData;
                } else {
                    return null
                }

            } else {
                return null
            }
        },


    previousTaxYearExpensesChartData(state) {

        let expChartData = {
            labels: state.previousTaxYearExpensesChart.labels,
            datasets: [
                {
                    label: 'Expenses',
                    backgroundColor: [
                        '#f85423',
                        '#98f34a',
                        '#4c96f1',
                        '#26f1e1',
                    ],
                    data: state.previousTaxYearExpensesChart.amount
                },
            ],
            options: {
                legend: {
                    position: 'right',
                    align: 'center',
                    display: true,
                    labels: {
                        fontColor: '#609E2E'
                    }
                }
            }

        }

        const reducer = (sum, arrValue) => sum+arrValue;



        if(state.previousTaxYearExpensesChart.labels.length !== 0 ) {
            let totalExpensesArray = [...state.previousTaxYearExpensesChart.amount]
            let totalExpenses = totalExpensesArray.reduce(reducer);
            if(totalExpenses !==0) {
                return expChartData;
            } else {
                return null
            }

        } else {
            return null
        }
    },


    platformsIncomeChartData(state) {
        let piChartData = {
            labels: state.platformsIncomeChart.labels,
            datasets: [
                {
                    label: 'Income by platforms',
                    backgroundColor: [
                        '#f85423',
                        '#98f34a',
                        '#4c96f1',
                        '#26f1e1',
                    ],
                    data: state.platformsIncomeChart.data
                },
            ],
        }

        const reducer = (sum, arrValue) => sum+arrValue

        if(state.platformsIncomeChart.labels.length !== 0) {
            let totalIncomeArray = [...state.platformsIncomeChart.data]
            let totalIncome = totalIncomeArray.reduce(reducer)

             if(totalIncome !== 0) {
                return piChartData;

            } else {
                 return null
             }

        } else {
            return null
        }

    },

    monthlyIncomeChartData(state) {


        let miChartData = {
            labels: state.monthlyIncomeChart.labels,
            datasets: [
                {
                    label: 'Monthly income',
                    backgroundColor: [
                        '#f85423',
                        '#98f34a',
                        '#4c96f1',
                        '#26f1e1',
                        '#f8e734',
                        '#c063f3',

                    ],
                    data: state.monthlyIncomeChart.data
                },
            ],
            options: {
                legend: {
                    labels: {
                        fontColor: '#609E2E'
                    },
                    position: 'top',
                    align: 'center',
                    display: true,
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: "#609E2E"
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: "#609E2E"
                        }
                    }]
                }

            }

        };


        return miChartData
    },



}

const actions = {


    async fetchAllFinanceData({dispatch}) {

        dispatch('fetchPlatformsIncomeChartData')

        dispatch('fetchMonthlyIncomeChartData')

        dispatch('fetchCurrentTaxYearExpensesChartData')
        dispatch('fetchPreviousTaxYearExpensesChartData')

        dispatch('fetchExpenseOptions')

        dispatch('fetchCurrentTaxYearFinanceInfo');
        dispatch('fetchPreviousTaxYearFinanceInfo');

        dispatch('fetchCurrentTaxYearInvoices')

        dispatch('fetchCurrentTaxYearExpenses')

        dispatch('fetchPreviousTaxYearInvoices')

        dispatch('fetchPreviousTaxYearExpenses')
    },

    async fetchCurrentTaxYearInvoices({commit, state}) {
        
        let page = state.currentInvoicesPage;
        let limit = state.invoicesLimit;


        
        let invoices = await axios.get(`/api/v1/invoices?page=${page}&limit=${limit}`)

        if(invoices.data.success) {
            commit('STORE_CURRENT_TAX_YEAR_INVOICES', invoices.data);

            if(invoices.data.totalPages === 1 && !state.isLastInvoicesPage) {
                commit('SET_IS_LAST_INVOICES_PAGE', true)
            }

            if(invoices.data.totalPages > 1 && state.isLastInvoicesPage
                && state.currentInvoicesPage !== state.totalInvoicesPages) {
                commit('SET_IS_LAST_INVOICES_PAGE', false)
            }
            
        }

    },

    async fetchPreviousTaxYearInvoices({commit}) {



        let invoices = await axios.get(`/api/v1/invoices/previous-tax-year`)


            commit('STORE_PREVIOUS_TAX_YEAR_INVOICES', invoices.data);

    },



    async uploadInvoice({dispatch}, invoiceData) {

        let invoiceInfo = {
            project: invoiceData.projectId,
            projectTitle: invoiceData.projectTitle,
            paymentDate: invoiceData.paymentDate,
            paymentAmount: invoiceData.paymentAmount,
        }


        let formData = new FormData()
        formData.append("invoice", invoiceData.invoice);

        if(invoiceData.projectInvoice !== undefined && invoiceData.projectInvoice !== '') {


            await axios.put(`/api/v1/invoices/${invoiceData.projectInvoice}`, invoiceInfo);

            if(invoiceData.invoice) {
                await axios.put(`/api/v1/invoices/${invoiceData.projectInvoice}/file`, formData)
            }

        } else {
            let createdInvoice = await axios.post(`/api/v1/invoices`, invoiceInfo);
            let invId = createdInvoice.data.data._id;


            if(invoiceData.invoice) {
                await axios.put(`/api/v1/invoices/${invId}/file`, formData)
            }
        }

        dispatch('fetchAllFinanceData');


    },



    // eslint-disable-next-line no-unused-vars
    async downloadInvoice({dispatch}, invoiceData) {
        const options = {
            responseType: 'blob'
        }

        const response = await axios.get(`/api/v1/invoices/${invoiceData.id}`, options);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', invoiceData.invoiceFile);
        document.body.appendChild(link);
        link.click();

    },

    // eslint-disable-next-line no-unused-vars
    async downloadCurrentTaxYearFinanceArchive({dispatch}) {
        const options = {
            responseType: 'blob'
        }

        const response = await axios.get(`/api/v1/finance/current-tax-year/archive`, options);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', 'current-tax-year-finance-archive.zip');
        document.body.appendChild(link);
        link.click();

    },

    // eslint-disable-next-line no-unused-vars
    async downloadPreviousTaxYearFinanceArchive({dispatch}) {
        const options = {
            responseType: 'blob'
        }

        const response = await axios.get(`/api/v1/finance/previous-tax-year/archive`, options);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', 'previous-tax-year-finance-archive.zip');
        document.body.appendChild(link);
        link.click();

    },


    // eslint-disable-next-line no-unused-vars
    async deleteInvoice({commit, dispatch}, invoiceId) {

        const response = await axios.delete(`/api/v1/invoices/${invoiceId}`);

        if(response.data.success) {
            commit('REMOVE_INVOICE', invoiceId);
            dispatch('fetchAllFinanceData');
        }

    },

    async fetchPlatformsIncomeChartData({commit}) {

        const response = await axios.get('/api/v1/finance/platforms-income');

        commit('STORE_PLATFORMS_INCOME_CHART', response.data.data)


    },

    async fetchMonthlyIncomeChartData({commit}) {

        const response = await axios.get('/api/v1/finance/monthly-income')

        commit('STORE_MONTHLY_INCOME_CHART', response.data.data)


    },

    async fetchCurrentTaxYearExpensesChartData({commit}) {

        const response = await axios.get('/api/v1/finance/current-tax-year/expenses-summary')

        commit('STORE_CURRENT_TAX_YEAR_EXPENSES_CHART', response.data.data)

    },

    async fetchPreviousTaxYearExpensesChartData({commit}) {

        const response = await axios.get('/api/v1/finance/previous-tax-year/expenses-summary')

        commit('STORE_PREVIOUS_TAX_YEAR_EXPENSES_CHART', response.data.data)

    },


    async fetchCurrentTaxYearExpenses({commit, state}) {


        let page = state.currentExpensesPage;
        let limit = state.expensesLimit;

        const expenses = await axios.get(`/api/v1/expenses?page=${page}&limit=${limit}`);


        commit('STORE_CURRENT_TAX_YEAR_EXPENSES', expenses.data)

        if(expenses.data.totalPages === 1 && !state.isLastExpensesPage) {
            commit('SET_IS_LAST_EXPENSES_PAGE', true)
        }

        if(expenses.data.totalPages > 1 && state.isLastExpensesPage
            && state.currentExpensesPage !== state.totalExpensesPages) {
            commit('SET_IS_LAST_EXPENSES_PAGE', false)
        }
    },

    async fetchPreviousTaxYearExpenses({commit}) {


        const expenses = await axios.get(`/api/v1/expenses/previous-tax-year`);


        commit('STORE_PREVIOUS_TAX_YEAR_EXPENSES', expenses.data)

    },



    async fetchExpenseOptions({commit}) {

        let response = await axios.get('/api/v1/expenses/options-list');


        commit('STORE_EXPENSE_OPTIONS', response.data.data)
    },


    async fetchCurrentTaxYearFinanceInfo({commit}) {

        let response = await axios.get('/api/v1/finance/current-tax-year')

        commit('STORE_CURRENT_TAX_YEAR_FINANCE_INFO', response.data.data);

    },

    async fetchPreviousTaxYearFinanceInfo({commit}) {

        let response = await axios.get('/api/v1/finance/previous-tax-year')

        commit('STORE_PREVIOUS_TAX_YEAR_FINANCE_INFO', response.data.data);

    },


    async uploadExpense({commit, dispatch}, object) {

            let createdExpense = await axios.post('/api/v1/expenses', object.expense)


            let formData = new FormData()
            formData.append("proof", object.expenseProof)


            let proofUpload = await axios.put(`/api/v1/expenses/${createdExpense.data.data._id}/proof`, formData)


            commit('STORE_UPLOADED_EXPENSE', proofUpload.data.data)
            dispatch('fetchAllFinanceData')


    },





    // eslint-disable-next-line no-unused-vars
    async downloadProof({dispatch}, expense) {

        const options = {
            responseType: 'blob'
        }

        const response = await axios.get(`/api/v1/expenses/${expense._id}/proof`, options);

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;


        link.setAttribute('download', expense.expenseProof);
        document.body.appendChild(link);
        link.click();

    },


    async deleteExpense({commit, dispatch}, expense) {

        const deletedExpense = await axios.delete(`/api/v1/expenses/${expense._id}`)

        commit('REMOVE_EXPENSE', deletedExpense.data.data);

        dispatch('fetchCurrentTaxYearExpensesChartData')

    },

    incrementExpensesPage({commit, dispatch, state}) {

        if (state.currentExpensesPage < state.totalExpensesPages) {
            commit('INCREMENT_EXPENSE_CURRENT_PAGE');
            dispatch('fetchExpenses');

        }

        if(state.currentExpensesPage === state.totalExpensesPages) {
            commit('SET_IS_LAST_EXPENSES_PAGE', true);
        }

    },

    decrementExpensesPage({commit, dispatch, state}) {

        if (state.currentExpensesPage > 1) {
            commit('DECREMENT_EXPENSE_CURRENT_PAGE');
            dispatch('fetchExpenses');

            if(state.isLastExpensesPage) {
                commit('SET_IS_LAST_EXPENSES_PAGE', false);
            }
        }
    },

    setExpensesLimit({commit, dispatch}, limit){

        commit('SET_EXPENSES_PAGE_LIMIT', limit);
        commit('RESET_CURRENT_EXPENSES_PAGE');

        dispatch('fetchCurrentTaxYearExpenses');

    },



    incrementInvoicesPage({commit, dispatch, state}) {

        if (state.currentInvoicesPage < state.totalInvoicesPages) {
            commit('INCREMENT_INVOICES_CURRENT_PAGE');
            dispatch('fetchInvoicesData');

        }


        if(state.currentInvoicesPage === state.totalInvoicesPages) {
            commit('SET_IS_LAST_INVOICES_PAGE', true);
        }

    },

    decrementInvoicesPage({commit, dispatch, state}) {

        if (state.currentInvoicesPage > 1) {
            commit('DECREMENT_INVOICES_CURRENT_PAGE');
            dispatch('fetchInvoicesData');

            if(state.isLastInvoicesPage) {
                commit('SET_IS_LAST_INVOICES_PAGE', false);
            }
        }
    },

    setInvoicesLimit({commit, dispatch}, limit){

        commit('SET_INVOICES_PAGE_LIMIT', limit);
        commit('RESET_CURRENT_INVOICES_PAGE');

        dispatch('fetchCurrentTaxYearInvoices');

    }

}
const mutations = {

    STORE_CURRENT_TAX_YEAR_INVOICES(state, invoices) {
        state.currentInvoices = invoices.data;
        if(invoices.totalPages !== 0) {
            state.totalInvoicesPages = invoices.totalPages;
        } else {
            state.totalInvoicesPages = 1;
        }
    },

    STORE_PREVIOUS_TAX_YEAR_INVOICES(state, invoices) {
        state.previousInvoices = invoices.data;

    },

    STORE_CURRENT_TAX_YEAR_EXPENSES(state, expenses) {
        state.currentExpenses = expenses.data;


        if( expenses.totalPages !== 0) {
            state.totalExpensesPages = expenses.totalPages;
        } else {
            state.totalExpensesPages =1;
        }

    },

    STORE_PREVIOUS_TAX_YEAR_EXPENSES(state, expenses) {
        state.previousExpenses = expenses.data;
    },


    STORE_CURRENT_TAX_YEAR_FINANCE_INFO(state, info) {
        state.currentTaxYearFinanceInfo = info

    },

    STORE_PREVIOUS_TAX_YEAR_FINANCE_INFO(state, info) {
        state.previousTaxYearFinanceInfo = info

    },

    STORE_EXPENSE_OPTIONS(state, options) {
        state.expenseOptions = options;

    },

    STORE_CURRENT_TAX_YEAR_EXPENSES_CHART(state, data) {
        state.currentTaxYearExpensesChart = data;

    },

    STORE_PREVIOUS_TAX_YEAR_EXPENSES_CHART(state, data) {
        state.previousTaxYearExpensesChart = data
    },

    STORE_PLATFORMS_INCOME_CHART(state, data) {
        state.platformsIncomeChart = data;

    },

    STORE_MONTHLY_INCOME_CHART(state, data) {
        state.monthlyIncomeChart = data;
    },
    STORE_UPLOADED_EXPENSE(state, expense) {
        state.currentExpenses.push(expense);
    },

    REMOVE_EXPENSE(state, expense) {
        state.currentExpenses = state.currentExpenses.filter(exp => {

            return exp._id !== expense._id
        });

    },

    REMOVE_INVOICE(state, invoiceId) {
      state.currentInvoices = state.currentInvoices.filter(inv => inv._id !== invoiceId)
    },

    INCREMENT_EXPENSE_CURRENT_PAGE(state) {
        state.currentExpensesPage++;
    },

    DECREMENT_EXPENSE_CURRENT_PAGE(state) {
        state.currentExpensesPage--;
    },

    RESET_CURRENT_EXPENSES_PAGE(state) {
        state.currentExpensesPage = 1;
    },

    INCREMENT_INVOICES_CURRENT_PAGE(state) {
        state.currentInvoicesPage++;



    },

    DECREMENT_INVOICES_CURRENT_PAGE(state) {
        state.currentInvoicesPage--;
    },

    RESET_CURRENT_INVOICES_PAGE(state) {
        state.currentInvoicesPage = 1;
    },

    SET_EXPENSES_PAGE_LIMIT(state, limit) {
        state.expensesLimit = limit;
    },

    SET_INVOICES_PAGE_LIMIT(state, limit) {
        state.invoicesLimit = limit;
    },


    SET_IS_LAST_EXPENSES_PAGE(state, value) {
        state.isLastExpensesPage = value;
    },


    SET_IS_LAST_INVOICES_PAGE(state, value) {
        state.isLastInvoicesPage = value;
    }




}


export default {
    state,
    getters,
    actions,
    mutations
}

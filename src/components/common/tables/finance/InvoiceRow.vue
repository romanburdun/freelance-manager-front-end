<template>
    <div class="row">
        <div class="cell col-1">
            <label class="col-3 mobile_label">Project:</label>
            <h4 class="col-3" href="#">{{invoice.projectTitle}}</h4>
        </div>
        <div class="cell col-1">
            <label class="col-1 mobile_label">Payment date:</label>
            <h4 class="col-1" href="#" >{{invoice.paymentDate | date}}</h4>
        </div>
        <div class="cell col-1">
            <label class="col-1 mobile_label">Amount:</label>
            <h4 class="col-1">£{{invoice.paymentAmount}}</h4>
        </div>
        <div class="cell last_cell col-1">
            <label class="mobile_label" >Actions:</label>
            <div class="col-2 row_ctrl">
                <a class="col-1 download" v-if="invoice.invoiceFile !== undefined" @click="downloadInvoice({id: invoice._id, invoiceFile: invoice.invoiceFile})"><md-download/></a>
                <a  class="col-1 delete" @click="deleteInvoice(invoice._id)"><md-delete/></a>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import Delete from 'vue-material-design-icons/Delete';
    import Download from 'vue-material-design-icons/Download';

    export default {
            name: 'InvoiceRow',
            props: ['invoice'],
            components: {
                'md-download': Download,
                'md-delete': Delete
            },
            methods: {
                ...mapActions(['downloadInvoice', 'deleteInvoice'])
            }
    }
</script>

<style scoped>

</style>

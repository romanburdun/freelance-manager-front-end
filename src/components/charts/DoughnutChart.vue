<template>
    <div>
        <app-dchart :chart-data="data" :options="options"></app-dchart>
    </div>
</template>

<script>
    import DoughnutChart from "@/components/charts/DoughnutChartModel.js";
    export default {
        name: 'DougnutChart',
        props: ['data', 'options'],
        components: {
            'app-dchart':DoughnutChart,

        },




    }
</script>

<style scoped>

</style>

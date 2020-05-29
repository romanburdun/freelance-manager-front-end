<template>
    <div>
        <app-lineChart :chart-data="data" :options="options"></app-lineChart>
    </div>
</template>

<script>
    import LineChart from "@/components/charts/LineChartModel";
    export default {
        name: 'LineChart',
        props: ['data', 'options'],
        components: {
            'app-lineChart': LineChart,

        },
        data() {
            return {
                dataCollection: null,


            }
        },




    }
</script>

<style scoped>

</style>

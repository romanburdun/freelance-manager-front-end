<template>
    <div>
        <app-piechart :chart-data="data" :options="options"></app-piechart>
    </div>
</template>

<script>
    import PieChart from "@/components/charts/PieChartModel";
    export default {
        name: 'ChartTest',
        props: ['data'],
        components: {
        'app-piechart': PieChart,
         },
        data() {
            return {
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
        }



    }
</script>

<style scoped>

</style>

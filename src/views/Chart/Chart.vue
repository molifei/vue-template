<template>
    <div>
        <div id="chart">

        </div>
        <div id="map"></div>
    </div>
</template>

<script>
    import echarts from "echarts"

    export default {
        name: "Chart",
        data() {
            return {
                charts: "",
                opinion: ['男', '女'],
                opinionData: [
                    {value: 335, name: '男'},
                    {value: 310, name: '女'},
                ]
            }
        },
        methods: {
            drawPie(id) {
                this.charts = echarts.init(document.getElementById(id))
                this.charts.setOption({
                    tooltip: {
                        trigger: 'item',

                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: this.opinion
                    },
                    series: [
                        {
                            name: '性别',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'blod'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: this.opinionData
                        }
                    ]
                })
            }
        },
        mounted() {
            this.drawPie('chart')
        }
    }
</script>

<style lang="less">
    #chart {
        width: 300px;
        height: 200px;
    }
</style>
<template>

</template>

<script>
    import {createSocket, sendWSPush} from "../../utils/websocket"

    export default {
        name: "WebSocket",
        data() {
            return {
                msg: ""
            }
        },
        methods: {
            getData() {
                // 创建
                console.log(createSocket());
                // 发送数据
                sendWSPush(1111)

                // 监听相应数据
                const getDataFn = function (e) {
                    console.log(e)
                }
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped lang="less">

</style>
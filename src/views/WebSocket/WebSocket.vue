<template>
    <div>
        {{ msg }}
    </div>
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
        watch: {
            msg(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.$message.success(`原来是${oldVal}，现在是${newVal}`)
                }
            }
        },
        methods: {
            getData() {
                let _this = this
                // 创建
                createSocket()
                // 发送数据
                sendWSPush(1111)

                // 监听相应数据
                const getDataFn = function (e) {
                    _this.msg = e.detail.data.data
                }
                window.addEventListener('onmessageWS', getDataFn)
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped lang="less">

</style>
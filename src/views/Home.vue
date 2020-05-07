<template>
    <div class="home">

        <router-link to="/lazy" tag="a">去/lazy</router-link>
        <br>
        <router-link to="/edit" tag="a">去/edit</router-link>
        <br/>

        <el-button type="primary">主要按钮</el-button>
        <p>{{ CDATA.NAME }}</p>
        <p>{{ msg | wordLimit(9)}}</p>
        <p>{{ msg2 | wordLimit(9)}}</p>
        <p>{{ "" | getDate("lll") }}</p>
        <p>{{ letter | getLetter(5) }}</p>
        <p>{{ phone | hideNum(3) }}</p>
        <p>{{ idCard | hideNum(2,2) }}</p>
        <div id="dv" ref="dv">

        </div>

        <input type="text" v-model="msg">
        <el-button @click="copy(msg)">点击复制</el-button>
<!--        <banner></banner>-->
    </div>
</template>

<script>
    import banner from "@/components/swipe/swipe";
    import {getA,getB} from "../api2"

    export default {
        name: "Home",
        data() {
            return {
                msg: "你好黄寺大街浩丰科技大煞风景肯定会是分开较好的设计费厚大司考交话费的空间是否对会计师",
                msg2: 123456789132456789,
                letter: "AbcDefG",
                phone: 18955911468,
                idCard: "341023199608142010",
                arr: ["小明", "小白", "小兰", "小黄", "小紫", "小刚", "小智", "小霞", 4, 5],
                obj: {
                    a: 1,
                    b: 2,
                },
                obj2: {
                    c: 3,
                    d: {
                        z: "小明"
                    }
                },
                obj3: {
                    e: 5,
                    f: 6
                },
                obj4: {}
            }
        },
        methods: {
            copy(text) {
                this.tools.clickCopy(text)
            },
            async getGet(){
                const res = await getA()
                console.log(res)
            },
            async getPost(){
                const res = await getB()
                console.log(res)
            }
        },
        mounted() {
            // this.obj2 = this.tools.deepClone(this.obj)
            this.tools.breakArr(this.arr, 2, 2);
            this.tools.saveS("obj", this.arr, 2)
            this.tools.getS("obj")
            this.tools.getURL("www.baidu.com?name=1");
            this.$refs.dv.style.backgroundColor = this.tools.getColor(.1)
            this.obj4 = this.tools.combine(this.obj, this.obj2, this.obj3);
            // console.log(this.obj4)
            this.getGet()
            this.getPost()
        },
        components: {
            banner
        }
    }
</script>

<style lang="less">
    #dv {
        width: 300px;
        height: 300px;
        border: 1px solid #000;
    }
</style>
<template>
    <div class="edit_container ql-snow">
        <quill-editor
                class="ql-editor ql-snow"
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
        </quill-editor>
        <el-button v-on:click="saveHtml">保存</el-button>
    </div>
</template>

<script>
    export default {
        name: 'Edit',
        data() {
            return {
                content: `<p>hello world</p>`,
                editorOption: {
                    theme: 'snow'
                }
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },
        methods: {
            onEditorReady(editor) { // 准备编辑器
            },
            onEditorBlur() {// 失去焦点事件

            },
            onEditorFocus() {// 获得焦点事件

            },
            onEditorChange() {// 内容改变事件
                this.tools.saveS("edit", this.content)
            },
            saveHtml: function (event) {
                console.log(this.content);
            },
            // 进入页面时，检测localStorage中是否有存储的值，防止用户误刷新
            editRemedy() {
                let edit = this.tools.getS("edit")
                if(edit === null){
                    this.content = `请输入内容`
                }else {
                    this.$notify({
                        title: 'HTML 片段',
                        dangerouslyUseHTMLString: true,
                        message: '<strong>这是 <i>HTML</i> 片段</strong>'
                    });
                    this.$message("nijkjk")
                }
            }
        },
        created() {
            this.editRemedy()
        }
    }
</script>

<style lang="less">
    @import url("~quill/dist/quill.snow.css");
    @import url("~quill/dist/quill.core.css");
    @import url("~quill/dist/quill.bubble.css");
</style>
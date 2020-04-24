<template>
    <div class="edit_container" style="width: 100%;height: 100%">
        <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>

<script>

    import * as Quill from 'quill';  //引入编辑器

    export default {
        name: "Edit",
        data() {
            return {
                editor: null,   // 富文本编辑器对象
                content: `<p></p><p><br></p><ol></ol>`, // 富文本编辑器默认内容
                editorOption: { //  富文本编辑器配置
                    modules: {
                        toolbar: '.edit_container'
                    },
                    theme: 'snow',
                    placeholder: '请输入正文'
                },
            }
        },
        methods: {
            getMountData() {
            },
            onEditorReady(editor) {
            },// 准备编辑器
            onEditorBlur() {
            }, // 失去焦点事件
            onEditorFocus() {
            }, // 获得焦点事件
            onEditorChange() {
            }, // 内容改变事件
            // 转码
            escapeStringHTML(str) {
                str = str.replace(/&lt;/g, '<');
                str = str.replace(/&gt;/g, '>');
                return str;
            },
        },
        mounted() {
            this.editor = this.$refs.myQuillEditor.quill;
        }
    }
</script>

<style lang="less">
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: '文本';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: '标题1';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: '标题2';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: '标题3';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: '标题4';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: '标题5';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
        content: '标题6';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimSun]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimSun]::before {
        content: "宋体";
        font-family: "SimSun";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=SimHei]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=SimHei]::before {
        content: "黑体";
        font-family: "SimHei";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before {
        content: "微软雅黑";
        font-family: "Microsoft YaHei";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=YouYuan]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=YouYuan]::before {
        content: "幼圆";
        font-family: "YouYuan";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=KaiTi]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=KaiTi]::before {
        content: "楷体";
        font-family: "KaiTi";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=FangSong]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=FangSong]::before {
        content: "仿宋";
        font-family: "FangSong";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before {
        content: "Arial";
        font-family: "Arial";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Times-New-Roman]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Times-New-Roman]::before {
        content: "Times New Roman";
        font-family: "Times New Roman";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=sans-serif]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=sans-serif]::before {
        content: "sans-serif";
        font-family: "sans-serif";
    }

    .ql-font-SimSun {
        font-family: "SimSun";
    }

    .ql-font-SimHei {
        font-family: "SimHei";
    }

    .ql-font-YouYuan {
        font-family: "YouYuan";
    }

    .ql-font-Microsoft-YaHei {
        font-family: "Microsoft YaHei";
    }

    .ql-font-KaiTi {
        font-family: "KaiTi";
    }

    .ql-font-FangSong {
        font-family: "FangSong";
    }

    .ql-font-Arial {
        font-family: "Arial";
    }

    .ql-font-Times-New-Roman {
        font-family: "Times New Roman";
    }

    .ql-font-sans-serif {
        font-family: "sans-serif";
    }

    /*字体样式*/
    /*//默认的样式*/
    .ql-container {
        font-size: 16px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='10px']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='10px']::before {
        content: '10px';
        font-size: 10px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='12px']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='12px']::before {
        content: '12px';
        font-size: 12px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='14px']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='14px']::before {
        content: '14px';
        font-size: 14px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='16px']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='16px']::before {
        content: '16px';
        font-size: 16px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='18px']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='18px']::before {
        content: '18px';
        font-size: 18px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='20px']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='20px']::before {
        content: '20px';
        font-size: 20px;
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='24px']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='24px']::before {
        content: '24px';
        font-size: 24px;
    }
</style>

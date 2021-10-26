<template>
  <div>
    <script :id="id" type="text/plain"></script>
    <input id="img-render-vir" type="file" />
  </div>
</template>
<script>
import "@STA/activeUed/themes/iframe.css";
import "@STA/activeUed/ueditor.config.js";
import "@STA/activeUed/ueditor.all.js";
// import '@STA/activeUed/lang/zh-cn/zh-cn.js';
// import "@STA/activeUed/ueditor.parse.min.js";
import "@STA/activeUed/Gupload.js";
export default {
  name: "activeUed",
  data() {
    return {
      editor: null,
    };
  },
  props: {
    // 默认内容
    defaultMsg: {
      type: String,
      default: "",
    },
    // 宽高配置
    config: {
      type: Object,
      default: function () {
        return {
          initialFrameWidth: null,
          initialFrameHeight: 350,
        };
      },
    },
    // 实例对象
    id: {
      type: String,
      default: "bsoft",
    },
  },
  watch: {
    defaultMsg(con) {
      // this.initStep();
      this.editor.setContent(con);
    },
  },
  mounted() {
    this.editor = UE.getEditor(this.id, this.config); // 初始化activeUed
    this.initStep();
  },
  methods: {
    // 初始化
    initStep() {
      var thos = this;
      this.editor.addListener("ready", function () {
        thos.editor.setContent(thos.defaultMsg || ""); // 确保activeUed加载完成后，放入内容。
      });
      // console.log("上传接口需自行开发配置");
    },

    // 获取内容
    getContent() {
      return this.editor.getContent();
      // this.$emit('receiveCon', this.editor.getContent())
    },

    // 获取内容(纯文本)
    getContentTxt() {
      return this.editor.getContentTxt();
      // this.$emit('receiveTxt', this.editor.getContentTxt())
    },

    // 设置内容
    setContent() {
      return this.editor.setContent(this.defaultMsg);
      // this.$emit('receiveSet', this.editor.setContent())
    },

    // 允许编辑
    setEnabled() {
      return this.editor.setEnabled();
    },

    // 禁止编辑
    setDisabled() {
      return this.editor.setDisabled("fullscreen");
    },

    // 显示编辑器
    setShowEditor() {
      return this.editor.setShow();
    },

    // 隐藏编辑
    setHideEditor() {
      return this.editor.setHide();
    },

    // 打印
    setPrints() {
      return this.editor.execCommand("print");
    },
  },
  destroyed() {
    this.editor.destroy();
  },
};
</script>
<style scoped>
#img-render-vir {
  display: none;
}
</style>


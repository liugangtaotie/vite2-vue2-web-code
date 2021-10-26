<template>
  <div class="tips-message clearfix" v-show="showTips">
    为了正常使用互联网诊室，请先下载视频通道并安装，如果没有安装，请点击
    <a :href="downloadUrl" class="el-button el-button--warning el-button--small">下载视频通道</a>
    <span class="fr close-tip">
      我已安装，不再提示！
      <a href="javascript:;" @click="doNotShowTips">X</a>
    </span>
  </div>
</template>

<script>
export default {
  name: "downloadTips",
  data() {
    return {
      showTips: false,
      downloadUrl: "javascript:;",
    };
  },
  mounted() {
    if (localStorage.showTips == "0") {
      this.showTips = false;
    } else {
      this.showTips = true;
    }
    let platform = navigator.platform.toLowerCase();
    if (platform.indexOf("win") > -1) {
      this.downloadUrl = "http://downloads.zhumu.me/client/latest/zhumu.exe";
    } else if (platform.indexOf("mac") > -1) {
      this.downloadUrl = "http://downloads.zhumu.me/client/latest/zhumu.pkg";
    }
  },
  methods: {
    doNotShowTips() {
      localStorage.showTips = "0";
      this.showTips = false;
    },
  },
};
</script>

<style lang="less" scoped>
.tips-message {
  padding: 10px;
  padding-left: 30px;
  line-height: 30px;
  color: #fe8a5b;
  text-align: left;
  background: #fefce7;

  span > a {
    color: #fe8a5b;
  }

  .close-tip {
    padding-right: 50px;
  }
}
</style>


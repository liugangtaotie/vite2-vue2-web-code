<template>
  <div class="ys-socket"></div>
</template>

<script>
import { comAxios, comTips, BS_webSocket_Url } from "@API/api.ts";
export default {
  name: "ys-Socket",
  data() {
    return {
      WS: null,
      content: "",
    };
  },
  prop: ["sendText"],
  created() {
    if (window.WebSocket) {
      this.WS = new WebSocket(`${BS_webSocket_Url("websocket/notify/dsdsds")}`);
      this.initConnecting();
    } else {
      comTips("00", "检测到您的浏览器版本过低，无法使用该服务!");
    }
  },
  methods: {
    initConnecting() {
      // Open
      this.WS.onopen = (data) => {
        console.log(data);
      };

      // Receive
      this.WS.onmessage = (data) => {
        console.log(data);
        this.$emit("receiveMsg", data);
      };

      // Error
      this.WS.onerror = () => {
        //
      };

      // Close
      this.WS.onclose = (data) => {
        console.log(data);
        comTips("0", "链接被拒绝或已关闭···");
      };
    },

    // Send Message
    sendMessage() {
      if (this.sendText != "") {
        this.WS.send(this.sendText);
      } else {
        comTips("00", "发送内容不能为空!");
      }
    },

    // Close Connecting
    closeConnect() {
      this.WS.close();
    },
  },
};
</script>

<style scoped>
.ys-socket {
  display: none;
}
</style>


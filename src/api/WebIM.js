import store from "../store/index";
import config from "./appConfig";
import WebIM from "easemob-websdk";

// WebIM.emoji = emoji
WebIM.config = {
  xmppURL: "im-api.easemob.com",
  apiURL: (location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com",
  appkey: config.appkey, //质控 - 演示
  // appkey: "1102191018040093#hcn-jkcs",//本地
  https: true,
  isMultiLoginSessions: true,
  isAutoLogin: true,
  isWindowSDK: false,
  isSandBox: false,
  isDebug: false,
  autoReconnectNumMax: 2,
  autoReconnectInterval: 2,
  isWebRTC:
    (/Firefox/.test(navigator.userAgent) || /WebKit/.test(navigator.userAgent)) &&
    /^https\:$/.test(window.location.protocol),
  heartBeatWait: 4500,
  isHttpDNS: false,
  msgStatus: true,
  delivery: true,
  read: true,
  saveLocal: false,
  encrypt: {
    type: "none",
  },
};
// 创建连接
var conn = {};
conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https:
    typeof WebIM.config.https === "boolean" ? WebIM.config.https : location.protocol === "https:",
  url: WebIM.config.xmppURL,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: true,
});
console.log(conn);

var roomId = "";

function setRoomId(id) {
  roomId = id;
}

function joinRoom() {
  console.log("Join roomId=" + roomId);
  conn.joinChatRoom({
    roomId: roomId,
  });
}

function quitRoom() {
  conn.quitChatRoom({
    roomId: roomId,
  });
  console.log("关闭聊天室=======");
}
conn.listen({
  onOpened: function(message) {
    console.log(">>>>>>>>>上线");
    joinRoom();
  },
  onClosed: function(message) {
    console.log(">>>>>>>>>下线");
    console.log(message);
  },
  onTextMessage: function(message) {
    store.commit("UPDARW_MSG", message);
    store.commit("MESSAGE_WARN", message);
    console.log("收到文本信息message=>", JSON.stringify(message));
  },
  onEmojiMessage: function(message) {
    console.log("Emoji");
    store.commit("UPDARW_MSG", message);
    console.log("收到表情信息message=>", JSON.stringify(message));
  },
  onPictureMessage: function(message) {
    store.commit("UPDARW_MSG", message);
    store.commit("MESSAGE_WARN", message);
    console.log("收到图片" + JSON.stringify(message));
  },
  onAudioMessage: function(message) {
    console.log("收到音频message=>", JSON.stringify(message));
    store.commit("MESSAGE_WARN", message);
    store.commit("UPDARW_MSG", message);
  },
  onPresence: function(message) {
    console.log(message.type);
  },
  // onEmojiMessage: function (message) {
  //   console.log('receiveEmoji')
  //   var data = message.data
  //   for (let i = 0; i < data.length; i++) {
  //     console.log(data[i])
  //   }
  // }
});
const options = {
  apiUrl: WebIM.config.apiURL,
  user: "cccccc",
  pwd: "111111",
  appKey: WebIM.config.appkey,
  success: function() {
    console.info("连接服务器正常");
  },
  error: function(err) {
    alert(err);
  },
};

export { WebIM, options, conn, setRoomId, quitRoom };

/*
	Api Import
*/
import axios from "axios";
import CryptoES from "crypto-es";
import appConfig from "./appConfig";
import { MessageBox,Loading, Message, Notification } from "element-ui";
import router from "@/router"

import {keya} from "./key-a-obfuscated.js";
import {keyb} from "./key-b-obfuscated.js";
import smm  from 'sm-crypto';
import sm  from 'gm-crypt';
const SM4 =sm.sm4;// s4加密
const sm3 =smm.sm3;// sm3加密
let requestTime=0; // 当前时间戳

/*
	Proxy Config
*/
const ySing = appConfig.comService;
const exportSing = appConfig.webSocketUrl;
const downSing = appConfig.exportConsult;

// 添加响应拦截器
axios.interceptors.response.use(responseInterceptors);

function responseInterceptors(res :any){
  // console.log(res);
    const { data } = res;
    const { code } = data;
    switch (code) {
      case 200:
        console.log("成功");
        return Promise.resolve(res);
      case -100:
        Message({
          message: data.msg || data.message || "服务器响应错误，稍后再试试···",
          type: 'error'
        });
        return Promise.reject(data.msg|| data.message);
        // return Promise.resolve(res);
      case 0:
        return Promise.reject("方法必须是post提交");
      case -1:
        return Promise.reject("请求参数缺失");
      case -2:
        return Promise.reject("请求参数为空");
      case -3:
        return Promise.reject("请求参数不合法");
      case -4:
        return Promise.reject("签名不正确");
      case -98:
        MessageBox({
          title:"提示",
          message:"系统检测到您长时间未更改过密码，请定期更改密码！",
          showCancelButton: true,
        }).then(()=>{
          console.log("then");
        });
        return Promise.resolve(res);
      case -99:
        MessageBox({
          title:"提示",
          message:"系统检测到您在一段时间内未做任何操作，请重新登录",
          confirmButtonText: '退出',
        }).then(()=>{
          // console.log("then");
          router.push({path:'/'})
        });
        return Promise.reject("系统检测到您在一段时间内未做任何操作，请重新登录");
      case -500:
        MessageBox({
          title:"提示",
          message:"您的账号在其他设备上登录，请重新登录",
          confirmButtonText: '退出',
        }).then(()=>{
          // console.log("then");
          router.push({path:'/'})
        });
        return Promise.reject("您的账号在其他设备上登录，请重新登录");
      case -501:
        MessageBox({
          title:"提示",
          message:data.msg || data.message,
          confirmButtonText: '退出',
        }).then(()=>{
          // console.log("then");
          router.push({path:'/'})
        });
        return Promise.reject(`${data.msg || data.message}`);
      case -202:
        return Promise.reject("时间异常，请核准系统时间为当前时间！");
      case 403:
        return Promise.reject("系统token失效");
      case 405:
        return Promise.reject("请求的方法不存在！");
      case undefined:
        console.log("无状态码");
        return Promise.resolve(res);
      default:
        console.error("未预设的错误状态码", data);
        return Promise.reject("未预设的错误状态码");
    }
}

// 生成签名
function getSign(param: any) {
  requestTime = new Date().getTime();
  param=typeof(param)=='object'?JSON.stringify(param):param;
  const encryparam = "bsofthealth" + param + requestTime;
  return sm3(encryparam).toUpperCase();
}

// sm4加密
function encryptSm4(param: any) {
 
  const sm4Config = {
    key: keya + keyb,//这里这个key值是跟后端要的
    mode: "cbc", // 加密的方式有两种，ecb和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
    cipherType: "base64", // 
    iv: "UISwD9fW6cFh9SNS" // 后台提供
  }
  const sm4 = new SM4(sm4Config);
   param=typeof(param)=='object'?JSON.stringify(param):param;
  return sm4.encrypt(param);

}

// xx记录导出
const BS_exportConsult = () => {
  return appConfig.exportConsult;
};

const BS_comService = () => {
  return ySing;
};

const BS_comServiceExport = () => {
  return exportSing;
};

const BS_imgUpload = () => {
  return appConfig.imgUpload;
};

const BS_FileUpload = () => {
  return appConfig.imgUpload;
};

const BS_preViews = (avid = 0) => {
  return `${appConfig.imgPreview}/${avid}`;
};

// 随访导出
const BS_exportVisit = () => {
  return appConfig.exportVisit;
};

const ySingX = "/websocket-ys";
const BS_webSocket_Url = (URL = "") => {
  return `${ySingX}URL`;
};

// 预留
/* const webSocketX = () => {
	var proxy = require('http-proxy-middleware');
	var ws = proxy('/', {
		target: `${BS_WEBSOCKET_URL}`,
		ws: true
	});
	// var http = require('http');
	// var httpProxy = require('http-proxy');
	// httpProxy.createServer({
	// 	target: 'ws://218.92.200.226:13357/pcn-core/websocket/notify/dsdsds',
	// 	ws: true
	// }).listen(8014);
} */

// TenantId
const getMsg = localStorage.getItem("userMsg");
const TENID = getMsg ? JSON.parse(getMsg).tenantId : "{}";

// Get Token
const ACKEN = sessionStorage.getItem("accessToken");

// Remove Token
const DELACK = () => {
  sessionStorage.removeItem("accessToken");
};

// Get Role
const rolesRequest = (param: any) => {
  return axios.post(`${exportSing}/logon/myRoles`, param).then((res:any) => {
    return res.data;
  });
};

// Get autoRole
const rolesAutoRequest = (param: any) => {
  return axios.post(`${exportSing}/logonByYypt/myRoles`, param).then((res:any) => {
    return res.data;
  });
};

// Role Login
const rolesLogin = (param: any) => {
  const loadInterface = Loading.service({
    fullscreen: true,
    text: "正在登录···",
  });
  const instance = axios.create({
    "Content-Type": "application/json",
  } as any);
  instance.interceptors.response.use(responseInterceptors);
  return instance.post(`${exportSing}/logon/login`, param).then((res:any) => {
    loadInterface.close();
    return res.data;
  });
};

// Role autoLogin
const rolesAutoLogin = (param: any) => {
  const loadInterface = Loading.service({
    fullscreen: true,
    text: "正在登录···",
  });
  const instance = axios.create({
    "Content-Type": "application/json",
  } as any);
  instance.interceptors.response.use(responseInterceptors);
  return instance.post(`${exportSing}/logonByYypt/login`, param).then((res:any) => {
    loadInterface.close();
    return res.data;
  });
};

// Role Quit
const rolesOuts = (param: any) => {
  const instance = axios.create({
    headers: {
      "X-Access-Token": ACKEN,
    },
  });
  instance.interceptors.response.use(responseInterceptors);
  return instance.get(`${exportSing}/logon/logout`);
};

/*
	String <=> Json
*/
// Convert To String
const convertStr = (data: any) => {
  return JSON.stringify(data);
};

// Convert To Json
const convertJson = (data: string) => {
  return JSON.parse(data);
};

/*
	AESENC/AESDEC/3DES
*/
// (加密)AES
const aesEncrypt = (word: any, key: any) => {
  const srcs = CryptoES.enc.Utf8.parse(word);
  const encrypted = CryptoES.AES.encrypt(srcs, key);
  return encrypted.ciphertext.toString().toUpperCase();
};

// (解密)AES
const aesDecrypt = (word: any, key: any) => {
  const encryptedHexStr = CryptoES.enc.Hex.parse(word);
  const srcs = CryptoES.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoES.AES.decrypt(srcs, key);
  const decryptedStr = decrypt.toString(CryptoES.enc.Utf8);
  return decryptedStr.toString();
};

// 百度坐标转高德（传入经度、纬度）
const convertToGd = (bd_lng: number, bd_lat: number) => {
  const X_PI = (Math.PI * 3000.0) / 180.0;
  const x = bd_lng - 0.0065;
  const y = bd_lat - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
  const gg_lng = z * Math.cos(theta);
  const gg_lat = z * Math.sin(theta);
  return {
    lng: gg_lng,
    lat: gg_lat,
  };
};

// 高德坐标转百度（传入经度、纬度）
const convertToBd = (gg_lng: any, gg_lat: any) => {
  const X_PI = (Math.PI * 3000.0) / 180.0;
  const x = gg_lng,
    y = gg_lat;
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  const bd_lng = z * Math.cos(theta) + 0.0065;
  const bd_lat = z * Math.sin(theta) + 0.006;
  return {
    bd_lat: bd_lat,
    bd_lng: bd_lng,
  };
};

/*
	Common Ajax
*/
// 常用通道(AJAX)
const comAxios = (XID: any, MTD: any, PAM: any) => {
  console.log(222);
  const loadInterface = Loading.service({
    fullscreen: true,
    text: "数据处理中···",
  });
  const instance = axios.create({
    headers: {
      "X-Access-Token": sessionStorage.getItem("accessToken"),
      "X-Service-Id": XID,
      "X-Service-Method": MTD,
      "Content-Type": "application/json",
      "sign": getSign(PAM),
      "timestamp": requestTime
    },
  });
  instance.interceptors.response.use(responseInterceptors);
   // 入参加密 开发环境可以将此注释
   const paramsSM4 = appConfig.encryFlag ? { data: encryptSm4(PAM) } : PAM;
  return instance
    .post(`${ySing}/*.jsonRequest`, paramsSM4)
    .then((res:any) => {
      loadInterface.close();
      return res.data;
    })
    .catch((err:any) => {
      loadInterface.close();
    });
};

// 常用通道(AJAX Async)
const comAxion = (XID: any, MTD: any, PAM: any) => {
  // console.log(444)
  const instance = axios.create({
    headers: {
      "X-Access-Token": sessionStorage.getItem("accessToken"),
      "X-Service-Id": XID,
      "X-Service-Method": MTD,
      "Content-Type": "application/json",
      "sign": getSign(PAM),
      "timestamp": requestTime
    },
  });
  instance.interceptors.response.use(responseInterceptors);
   // 入参加密 开发环境可以将此注释
   const paramsSM4 = appConfig.encryFlag ? { data: encryptSm4(PAM) } : PAM;
  return instance.post(`${ySing}/*.jsonRequest`, paramsSM4).then((res:any) => {
    return res.data;
  });
};

// 原始地址通道(AJAX/Get/Post-Proxy)
const comAxios_dataImport = (ADS: string, PAM: any, XMD = "post") => {
  const loadInterface = Loading.service({
    fullscreen: true,
    text: "数据处理中···",
  });
  setTimeout(() => {
    loadInterface.close();
  }, 10000);
  return axios({
    url: exportSing + ADS,
    method: XMD,
    data: PAM,
  } as any)
    .then((res: { data: any }) => {
      loadInterface.close();
      return res.data;
    })
    .catch((err: any) => {
      // comTips("0", "处理失败，请稍后再试试～");
    });
};

// 原始地址通道(AJAX/Get/Post-Proxy)  药品导入
const comAxios_drugImport = (ADS: any, PAM: any, XMD = "post") => {
  const loadInterface = Loading.service({
    fullscreen: true,
    text: "数据处理中···",
  });
  setTimeout(() => {
    loadInterface.close();
  }, 10000);

  return axios({
    url: `${ySing}/${ADS}`,
    method: XMD,
    data: PAM,
  } as any)
    .then((res: { data: any }) => {
      loadInterface.close();
      return res.data;
    })
    .catch((err: any) => {
      // comTips("0", "处理失败，请稍后再试试～");
    });
};

// 原始地址通道(Ajax/Get/Post)
const comAxios_Old = (ADS: any, PAM: any, IPS = `${ySing}`, XMD = "post") => {
  const loadInterface = Loading.service({
    fullscreen: true,
    text: "数据处理中···",
  });
  setTimeout(() => {
    loadInterface.close();
  }, 5000);
  return axios({
    url: `${IPS}/${ADS}`,
    method: XMD,
    headers: {
      "X-Access-Token": sessionStorage.getItem("accessToken"),
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": XMD,
      "Access-Control-Allow-Headers": "x-requested-with,content-type",
    },
    data: PAM,
  } as any).then((res: { data: any }) => {
    loadInterface.close();
    return res.data;
  });
};

// File Upload
const comFiles = (URL: string, PAM: any) => {
  const loadInterface = Loading.service({
    fullscreen: true,
    text: "数据上传中···",
  });
  const instance = axios.create({
    headers: {
      "X-Access-Token": sessionStorage.getItem("accessToken"),
      "X-Requested-With": "XMLHttpRequest",
      // 'Content-Type': 'application/json',
    },
  });
  instance.interceptors.response.use(responseInterceptors);
  return instance
    .post(URL, PAM)
    .then((res:any) => {
      loadInterface.close();
      return res.data;
    })
    .catch((err:any) => {
      loadInterface.close();
      // comTips("0", "数据上传失败，请稍后再试试～");
    });
};

// Dictionary
const comDico = (dico: any) => {
  // let loadInterface = Loading.service({
  //   fullscreen: true,
  //   text: "数据正在查询···",
  // });
  const instance = axios.create({
    headers: {
      "X-Access-Token": sessionStorage.getItem("accessToken"),
    },
  });
  if(!sessionStorage.getItem("accessToken")){
    return true;
  }
  instance.interceptors.response.use(responseInterceptors);
  return instance
    .get(`${ySing}/${dico}.dic`)
    .then((res:any) => {
      // loadInterface.close();
      return res.data;
    })
    .catch((err:any) => {
      // loadInterface.close();
      // comTips("0", "数据查询失败，请稍后再试试～");
    });
};

/*
	Tips Msg
*/
// 提示部分(普通)
const comTips = (TAG: string, STR: string) => {
  let JUD = "";
  switch (TAG) {
    case "0":
      JUD = "error";
      break;
    case "1":
      JUD = "success";
      break;
    case "00":
      JUD = "warning";
      break;
    case "11":
      JUD = "info";
      break;
    default:
      STR = "指令解析错误!";
      JUD = "error";
      break;
  }
  STR = STR ? STR : "未知错误问题";
  Message({
    type: JUD,
    message: STR,
    duration: 2000,
  });
};

// 提示部分(载入)
let loadings: { close: () => void } | null = null;
const comLoad = (STR: any) => {
  STR = STR ? STR : "载入中···";
  loadings = Loading.service({
    fullscreen: true,
    text: STR,
  });
};

// 提示部分(载入-移除)
const removeLoad = () => {
  (loadings as any).close();
};

// 提示部分(消息通知)
const comInfo = (
  TITLE = "通知",
  CONTENT = "",
  DELAY = 5000,
  TYPE = "success"
) => {
  Notification({
    title: TITLE,
    message: CONTENT,
    duration: DELAY,
    offset: 100,
    type: TYPE,
  });
};

const comInfoClose = () => {
  Notification.closeAll();
};

// Current Date And/Or Time
const getTimer = (FAT = "YMD", FAG = "-", CUR: string | number | Date) => {
  let date = null;
  if (CUR) {
    date = new Date(CUR);
  } else {
    date = new Date();
  }
  let [year, month, day, hours, minutes, seconds] = ["", "", "", "", "", ""] as any;
  year = date.getFullYear();
  month =
    date.getMonth() < 9
      ? "0" + (parseInt(date.getMonth() as any) + 1)
      : parseInt(date.getMonth() as any) + 1;
  day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  hours = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
  minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  seconds = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
  switch (FAT) {
    case "YMD":
      return year + FAG + month + FAG + day;
    case "HM":
      return hours + ":" + minutes;
    case "HMS":
      return hours + ":" + minutes + ":" + seconds;
    case "YMDHMS":
      return (
        year +
        FAG +
        month +
        FAG +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    default:
      return "指令无法识别!";
  }
};

// Birthday
const convertBir = (idCard: string | null) => {
  let birthday = "";
  if (idCard != null && idCard != "") {
    if (idCard.length == 15) {
      birthday = "19" + idCard.substr(6, 6);
    } else if (idCard.length == 18) {
      birthday = idCard.substr(6, 8);
    }

    birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
  }
  return birthday;
};

// Sex (By IdCard)
const sexByIdCard = (idCard: any) => {
  let sexno = null;
  if (idCard == null) {
    comTips("00", "查询的证件号码不能为空～");
  } else {
    if (idCard.length == 18) {
      sexno = idCard.substring(16, 17);
    } else if (idCard.length == 15) {
      sexno = idCard.substring(14, 15);
    } else;
    return sexno % 2 == 0 ? "2" : "1";
  }
};

/*
	FullScreen
*/
const fullScreens = () => {
  const el: any = document.documentElement;
  const rfs =
    el.requestFullScreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullScreen;
  if (typeof rfs != "undefined" && rfs) {
    rfs.call(el);
  } else if (typeof window.ActiveXObject != "undefined") {
    const wscript = new ActiveXObject("WScript.Shell");
    if (wscript != null) {
      wscript.SendKeys("{F11}");
    }
  }
};

/*
	Hide Menu And Header
*/
const hideNav = () => {
  const heard: any = document.querySelector(".ele-header");
  const views: any = document.querySelector(".window-view");
  const menus: any = document.querySelector(".ele-nav");
  heard.style.cssText = "display:none;";
  menus.style.cssText = "display:none;";
  views.style.cssText = "padding-top:0";
};

const formatDate = (
  date: {
    getFullYear: () => string,
    getMonth: () => number,
    getDate: () => any,
    getHours: () => any,
    getMinutes: () => any,
    getSeconds: () => any,
  },
  fmt = "yyyy-MM-dd"
) => {
  const padLeftZero = (str: string | any[]) => ("00" + str).substr(str.length);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  const o: any = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
};

export {
  BS_comService,
  BS_exportConsult,
  BS_imgUpload,
  BS_FileUpload,
  BS_preViews,
  BS_exportVisit,
  BS_webSocket_Url,
  TENID,
  ACKEN,
  DELACK,
  rolesRequest,
  rolesAutoRequest,
  rolesLogin,
  rolesOuts,
  convertStr,
  convertJson,
  aesEncrypt,
  aesDecrypt,
  convertToGd,
  convertToBd,
  comAxios,
  comAxion,
  comAxios_dataImport,
  comAxios_Old,
  comAxios_drugImport,
  comFiles,
  comDico,
  comTips,
  comLoad,
  removeLoad,
  comInfo,
  comInfoClose,
  getTimer,
  convertBir,
  sexByIdCard,
  fullScreens,
  hideNav,
  rolesAutoLogin,
  // comAxiosPcn,
  BS_comServiceExport,
  formatDate
};

import * as Dic from "./dictionary.js";
export function filterRegisterType(val) {
  if (!val) {
    return "";
  }
  return ["", "个人", "机构"][val];
}

export function filterVisitStatus(val) {
  if (!val) {
    return "";
  }
  return ["待就诊", "进行中", "已结束", "已失效", "已拒诊", "已拒诊"][val];
}
export function getSex(val) {
  if (!val) {
    return "";
  }
  return ["", "男", "女"][val];
}
export function getWeekName(val) {
  return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][val - 1];
}
export function filterTimeFlag(val) {
  if (!val) {
    return "";
  }
  return ["上午", "下午", "晚上"][val - 1];
}

export function filterAskMode(type) {
  if (!type) {
    return "";
  }
  let obj = {
    imageAble: "图文xx",
    telephone: "电话xx",
    video: "视频xx",
    returnVisit: "复诊配药",
    assistClinic: "协同门诊",
  };
  return obj[type];
}
export function filterDate(val) {
  if (val) {
    return val.split(" ")[0];
  }
}

export function filterOnlineFlag(val) {
  if (!val) {
    return "-";
  }
  return ["离线", "在线"][val];
}
export const filterSex = (sx = "0") => {
  switch (sx) {
    case "0":
      return "未知的性别";
    case "1":
      return "男性";
    case "2":
      return "女性";
    case "9":
      return "未说明的性别";
    default:
      return "指令错误，无法识别";
  }
};
//处方类型
export const filterPrescriptionType = (pt = "0") => {
  switch (pt) {
    case "1":
      return "西药方";
    case "2":
      return "中成药方";
    case "3":
      return "中草药方";
    default:
      return "";
  }
};
//处方类型
export const filterStatus = (pt = "0") => {
  switch (pt) {
    case "1":
      return "启用";
    case "0":
      return "停用";

    default:
      return "";
  }
};

// 脱敏
export function filterStar(s) {
  if (!s) {
    return "";
  }
  let star = "*";
  let middle = "";
  if (s.length == 11) {
    middle = s.slice(3, 7);
    return s.replace(middle, "****");
  }
  if (s.length == 15) {
    middle = s.slice(3, 12);
    return s.replace(middle, "************");
  }
  if (s.length == 18) {
    middle = s.slice(3, 15);
    return s.replace(middle, "************");
  }
}

// 操作类型（日志模块）
export function filterLogType(s) {
  switch (s) {
    case "0":
      return "异常";
    case "1":
      return "登录";
    case "2":
      return "登出";
    case "a":
      return "添加";
    case "d":
      return "删除";
    case "u":
      return "更新";
    case "s":
      return "查询";
    case "A":
      return "批量添加";
    case "D":
      return "批量删除";
    case "U":
      return "批量更新";
    case "I":
      return "调用接口";
    case "H":
      return "查询历史记录";
    default:
      return "";
  }
}

// 互联网诊疗 (路由)
export const filterUrl = {
  filterOnlineConsult: (s) => {
    switch (s) {
      // 排班设置--排班管理
      case "workforceList":
        return "/cloudClinicManage/workforceManagement/workforceList";
      //  排班设置--设置
      case "workforceParameters":
        return "/cloudClinicManage/workforceManagement/workforceParameters";
      // 患者列表
      case "patientList":
        return "/cloudClinicManage/patientList";
      // 云诊室-历史记录
      case "history":
        return "/cloudClinicManage/history";
      // 处方审核查询
      case "reviewQuery":
        return "/cloudClinicManage/reviewQuery";
      // 发起预约
      case "start":
        return "/collaborativeClinic/start";
      // 预约列表
      case "appointList":
        return "/collaborativeClinic/appointList";
      // 协同门诊-历史记录
      case "historyList":
        return "/collaborativeClinic/historyList";
    }
  },
};

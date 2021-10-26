const REG_PHONE = /^\d{11}$/; // 手机号
const REG_VCODE = /^\d{6}$/; // 验证码
const REG_CARDNUMBER = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 身份证号
const REG_CHINESE_NAME = /^[\u4E00-\u9FA5]{2,4}$/; // 中文姓名
const REG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/;

// 验证密码
export function testPassword(v) {
  return REG_PASSWORD.test(v);
}

// 验证手机号
export function testPhone(v) {
  return REG_PHONE.test(v);
}

// 验证验证码
export function testVcode(v) {
  return REG_VCODE.test(v);
}

// 验证身份证号
export function testCardNumber(v) {
  return REG_CARDNUMBER.test(v);
}

// 判断是否为空
export function testEmpty(v) {
  return v.trim() === "" || v === null;
}

// 判断中文姓名
export function testChineseName(v) {
  return REG_CHINESE_NAME.test(v);
}

// 格式化日期
export function formatDateGetDate(now) {
  let Y = now.getFullYear();
  let MM = parseInt(now.getMonth()) + 1;
  if (MM.toString().length === 1) {
    MM = "0" + MM;
  }
  let DD = now.getDate();
  if (DD.toString().length === 1) {
    DD = "0" + DD;
  }
  return Y + "-" + MM + "-" + DD;
}

// 通用格式化日期 yyyy-MM-dd hh:mm:ss
export function formatDate(date, fmt = "yyyy-MM-dd") {
  let padLeftZero = (str) => ("00" + str).substr(str.length);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

// 根据身份证号码获取生日
export function getBirthdayFromIdCard(idCard) {
  let birthday = "";
  if (idCard != null && idCard !== "") {
    if (idCard.length === 15) {
      birthday = "19" + idCard.substr(6, 6);
    } else if (idCard.length === 18) {
      birthday = idCard.substr(6, 8);
    }
    birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
  }
  return birthday;
}
// 根据身份证号码获取性别
export function getSexFromIdCard(idCard) {
  let sex = "1";
  if (idCard != null && idCard !== "") {
    if (idCard.length === 15) {
      sex = idCard.substr(14, 1) % 2 === 1 ? "1" : "2";
    } else if (idCard.length === 18) {
      sex = idCard.substr(16, 1) % 2 === 1 ? "1" : "2";
    }
  }
  return sex;
}
// 根据身份证号码获取年龄
export function getAgeFromIdCard(identityCard) {
  var len = (identityCard + "").length;
  if (len == 0) {
    return "";
  } else {
    if (len != 15 && len != 18) {
      //身份证号码只能为15位或18位其它不合法
      return "";
    }
  }
  var strBirthday = "";
  if (len == 18) {
    //处理18位的身份证号码从号码中得到生日和性别代码
    strBirthday =
      identityCard.substr(6, 4) +
      "/" +
      identityCard.substr(10, 2) +
      "/" +
      identityCard.substr(12, 2);
  }
  if (len == 15) {
    strBirthday =
      "19" +
      identityCard.substr(6, 2) +
      "/" +
      identityCard.substr(8, 2) +
      "/" +
      identityCard.substr(10, 2);
  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);
  var nowDateTime = new Date();
  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (
    nowDateTime.getMonth() < birthDate.getMonth() ||
    (nowDateTime.getMonth() == birthDate.getMonth() &&
      nowDateTime.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

//获取时间差
export function leftTime(time1, time2) {
  let ts = (time1 - time2) / 1000;
  let m = Math.floor(ts / 60);
  let s = parseInt(ts % 60);
  return { m, s };
}

// 根据医院code获取name
export function getHospitalNameFromCode(code, list) {
  let res = "";
  list.forEach((v) => {
    if (v.code === code) {
      res = v.title;
    }
  });
  return res;
}

// 简单深拷贝
export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 安全保存localStorage
export function safeCacheLocalData(key, data) {
  const QUOTA_EXCEEDED_ERR_CODE = 22; //存储上限溢出
  try {
    localStorage.setItem(key, data);
  } catch (e) {
    if (e.code === QUOTA_EXCEEDED_ERR_CODE) {
      localStorage.clear();
      localStorage.setItem(key, data);
    }
  }
}

//将base64转换为文件对象
export const dataURLtoFile = function(dataurl, filename) {
  var arr = dataurl.split(",");
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  //转换成file对象
  return new File([u8arr], filename, { type: mime });
  //转换成成blob对象
  //return new Blob([u8arr],{type:mime});
};

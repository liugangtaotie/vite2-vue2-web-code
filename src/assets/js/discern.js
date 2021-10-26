/* 
    国籍、民族、性别、婚姻
*/

// 国籍
export const discernNational = (nx = "01") => {
  switch (nx) {
    case "01":
      return "中国";
    case "02":
      return "中国香港澳门";
    case "03":
      return "中国台湾";
    case "04":
      return "海外";
    default:
      return "未填写";
  }
};

// 民族
export const discernNation = (na = "01") => {
  switch (na) {
    case "01":
      return "汉族";
    case "02":
      return "蒙古族";
    case "03":
      return "回族";
    case "04":
      return "藏族";
    case "05":
      return "维吾尔族";
    case "06":
      return "苗族";
    case "07":
      return "彝族";
    case "08":
      return "壮族";
    case "09":
      return "布依族";
    case "10":
      return "朝鲜族";
    case "11":
      return "满族";
    case "12":
      return "侗族";
    case "13":
      return "瑶族";
    case "14":
      return "白族";
    case "15":
      return "土家族";
    case "16":
      return "哈尼族";
    case "17":
      return "哈萨克族";
    case "18":
      return "傣族";
    case "19":
      return "黎族";
    case "20":
      return "傈傈族";
    case "21":
      return "佤族";
    case "22":
      return "畲族";
    case "23":
      return "高山族";
    case "24":
      return "拉枯族";
    case "25":
      return "水族";
    case "26":
      return "东乡族";
    case "27":
      return "纳西族";
    case "28":
      return "景颇族";
    case "29":
      return "柯尔克孜族";
    case "30":
      return "土族";
    case "31":
      return "达翰尔族";
    case "32":
      return "仫佬族";
    case "33":
      return "羌族";
    case "34":
      return "布朗族";
    case "35":
      return "撒拉族";
    case "36":
      return "毛南族";
    case "37":
      return "仡佬族";
    case "38":
      return "锡伯族";
    case "39":
      return "阿昌族";
    case "40":
      return "普米族";
    case "41":
      return "塔吉克族";
    case "42":
      return "怒族";
    case "43":
      return "乌孜别克族";
    case "44":
      return "俄罗斯族";
    case "45":
      return "鄂温克族";
    case "46":
      return "德昂族";
    case "47":
      return "保安族";
    case "48":
      return "裕固族";
    case "49":
      return "京族";
    case "50":
      return "塔塔尔族";
    case "51":
      return "独龙族";
    case "52":
      return "鄂伦春族";
    case "53":
      return "赫哲族";
    case "54":
      return "门巴族";
    case "55":
      return "珞巴族";
    case "56":
      return "基诺族";
    case "99":
      return "不详";
    default:
      return "未填写";
  }
};

// 性别
export const discernSex = (sx = "0") => {
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

// 婚姻
export const discernMarry = (my = "10") => {
  if (my) {
    let n = Number(my);
    if (n == 10) {
      return "未婚";
    } else if (n == 20) {
      return "已婚";
    }
  }
  return "未说明";
};

/* 
    血  型
*/

// 血型
export const discernBlood = (nx = "1") => {
  switch (nx) {
    case "1":
      return "A型";
    case "2":
      return "B型";
    case "3":
      return "O型";
    case "4":
      return "AB型";
    case "5":
      return "不详";
    default:
      return "未说明";
  }
};

// 血型(RH)
export const discernBloodRH = (rh = "1") => {
  switch (rh) {
    case "1":
      return "阴性";
    case "2":
      return "2";
    case "3":
      return "不详";
    case "4":
      return "未查";
    default:
      return "未说明";
  }
};

/* 
    类型
*/

// 证件类型
export const discernCerType = (cp = "01") => {
  switch (cp) {
    case "01":
      return "二代身份证";
    case "02":
      return "居民户口簿";
    case "03":
      return "护照";
    case "04":
      return "军官证";
    case "05":
      return "驾驶证";
    case "06":
      return "港澳居民来往内地通行证";
    case "07":
      return "台湾居民来往内地通行证";
    case "08":
      return "出生证明";
    case "09":
      return "港澳居民身份证";
    case "10":
      return "港澳居民居住证";
    default:
      return "未填写";
  }
};

// 管理类型
export const discernPerGroup = (mp) => {
  let arrGroup = typeof mp == "string" ? mp.split(",") : "";
  for (let i = 0; i < arrGroup.length; i++) {
    switch (arrGroup[i]) {
      case "01":
        arrGroup[i] = "孕产妇";
        break;
      case "02":
        arrGroup[i] = "0~6岁儿童";
        break;
      case "03":
        arrGroup[i] = "65岁以上老人";
        break;
      case "04":
        arrGroup[i] = "高血压人群";
        break;
      case "05":
        arrGroup[i] = "糖尿病人";
        break;
      case "06":
        arrGroup[i] = "重性精神疾病患者";
        break;
      case "07":
        arrGroup[i] = "肺结核患者";
        break;
      case "08":
        arrGroup[i] = "残疾人";
        break;
      case "09":
        arrGroup[i] = "计生特殊家庭";
        break;
      case "10":
        arrGroup[i] = "一般健康人群";
        break;
      default:
        arrGroup[i] = "未填写";
        break;
    }
  }
  return arrGroup;
};

// 成员类型
export const discernMember = (me = "") => {
  switch (me) {
    case "01":
      return "全科医生";
    case "02":
      return "全科护士";
    case "03":
      return "公卫医生";
    case "04":
      return "公卫护士";
    case "05":
      return "计生医生";
    case "06":
      return "中医师";
    case "09":
      return "其他";
    default:
      return "暂无成员类别";
  }
};

// 体质类型
export const discernBodyType = (bp = "0") => {
  let bodyTp = [
    "",
    "",
    "阳虚质",
    "阴虚质",
    "气虚质 ",
    "痰湿质",
    "湿热质",
    "血瘀质",
    "特禀质",
    "气郁质",
    "平和质",
    "",
    "阳虚质",
    "阴虚质",
    "气虚质 ",
    "痰湿质",
    "湿热质",
    "血瘀质",
    "特禀质",
    "气郁质",
    "平和质",
  ];
  return bodyTp[bp];
};

/* 
    状  态
*/

// 签约状态
export const discernSignStatus = (st = "") => {
  let arrs = JSON.parse(sessionStorage.getItem("bs_signStatus") || "{}");
  for (let os of arrs) {
    if (st == os.key) {
      return os.text;
    }
  }
};

// 审核状态
export const discernCheck = (ch = "") => {
  switch (ch) {
    case 1:
      return "待审核";
    case 2:
      return "通过";
    case 3:
      return "未通过";
    default:
      return "暂无状态";
  }
};

// 预约状态（预约家医）
export const discernAppStatus = (st = "") => {
  let arrs = JSON.parse(sessionStorage.getItem("bs_apptStatus") || "{}");
  for (let os of arrs) {
    if (st == os.key) {
      return os.text;
    }
  }
};

/* 
    类  别
*/

// 科室类别
export const discernDeptSort = (ds = "") => {
  switch (ds) {
    case "01":
      return "全科医生";
    case "02":
      return "全科护士";
    case "03":
      return "公卫医生";
    case "04":
      return "公卫护士";
    case "05":
      return "计生医生";
    case "06":
      return "中医师";
    case "09":
      return "其他";
    default:
      return "暂无成员类别";
  }
};

// 执业类别
export const discernCertifiy = (ce = "") => {
  let arrs = JSON.parse(sessionStorage.getItem("bs_practiceCategory") || "{}");
  for (let os of arrs) {
    if (ce == os.key) {
      return os.text;
    }
  }
};

// 医生类别
export const discernDocSort = (dc = "") => {
  switch (dc) {
    case "01":
      return "全科医生";
    case "02":
      return "全科护士";
    case "03":
      return "公卫医生";
    case "04":
      return "公卫护士";
    case "05":
      return "计生医生";
    case "06":
      return "中医师";
    case "09":
      return "其他";
    default:
      return "未说明";
  }
};

// 资讯类别
export const discernCategory = (cg = "") => {
  let arrs = JSON.parse(sessionStorage.getItem("bs_category") || "{}");
  for (let os of arrs) {
    if (cg == os.tagCode) {
      return os.tagName;
    }
  }
};

/* 
    级  别
*/

// 医师级别
export const discernDocRank = (dr = "") => {
  let arrs = JSON.parse(sessionStorage.getItem("bs_doctorTitle") || "{}");
  for (let os of arrs) {
    if (dr == os.key) {
      return os.text;
    }
  }
};

// 医院级别
export const discernOrgRank = (lev = "") => {
  let level = JSON.parse(sessionStorage.getItem("bs_hospitalLevel") || "{}");
  for (let os of level) {
    if (lev == os.key) {
      return os.text;
    }
  }
};

/* 
    方  式
*/

// 服务方式
export const discernExeWay = (dr = "") => {
  let arrs = JSON.parse(sessionStorage.getItem("bs_serviceWay") || "{}");
  for (let os of arrs) {
    if (dr == os.key) {
      return os.text;
    }
  }
};

// 确认方式
export const discernCheckWay = (cy = "") => {
  let arrs = JSON.parse(sessionStorage.getItem("bs_checkway") || "{}");
  for (let os of arrs) {
    if (cy == os.key) {
      return os.text;
    }
  }
};

// 审核状态(实名认证)
export const discernVerifyState = (rn = "") => {
  let arrs = JSON.parse(sessionStorage.getItem("bs_verifyState") || "{}");
  for (let os of arrs) {
    if (rn == os.key) {
      return os.text;
    }
  }
};

// 优惠类型
export const discernDiscount = (ds = "") => {
  switch (ds) {
    case "1":
      return "社保优惠";
    case "2":
      return "农合优惠";
    case "3":
      return "其他优惠";
    default:
      return "未注明优惠类型";
  }
};
//启用状态
export const disState = (dr = "") => {
  switch (dr) {
    case "1":
      return "已启用";
    case "0":
      return "已停用";
    default:
      return "未说明";
  }
};
//角色
export const disRole = (dr = "") => {
  switch (dr) {
    case "0":
      return "团队长";
    case "1":
      return "成员";
    default:
      return "未说明";
  }
};

// 管理人群、签约适合人群--签约
export const discernPersonGroup = (so = "") => {
  let arrs = JSON.parse(sessionStorage.getItem("bs_sipGroup") || "{}");
  for (let os of arrs) {
    if (so == os.value) {
      return os.label;
    }
  }
};

// 适合人群  服务包
export const SignStatusDict = (so = "") => {
  let arrs = JSON.parse(sessionStorage.getItem("SignStatusDict") || "{}");
  for (let os of arrs) {
    if (so == os.value) {
      return os.label;
    }
  }
};
//
export const discernBusinessTag = (so = "") => {
  let arrs = JSON.parse(sessionStorage.getItem("bs_businessTag") || "{}");
  for (let os of arrs) {
    if (so == os.value) {
      return os.label;
    }
  }
};

// 医生职业
export const doctorLevelText = (so = "") => {
  let arrs = JSON.parse(sessionStorage.getItem("bs_doctorTitle") || "{}");
  for (let os of arrs) {
    if (so == os.key) {
      return os.text;
    }
  }
};
//药品类型
export const drugType = (dr = "") => {
  switch (dr) {
    case "1":
      return "西药";
    case "2":
      return "中成药";
    case "3":
      return "草药";
    default:
      return "未说明";
  }
};

//医保等级
export const insuranceLevel = (dr = "") => {
  switch (dr) {
    case "1":
      return "甲类";
    case "2":
      return "乙类";
    case "3":
      return "丙类";
    default:
      return "未说明";
  }
};

//途径
export const usageType = (dr = "") => {
  switch (dr) {
    case "1":
      return "口服";
    case "2":
      return "静滴";
    case "3":
      return "外用";
    default:
      return "未说明";
  }
};
export const drugNature = (dr = "") => {
  switch (dr) {
    case "1":
      return "普通";
    case "2":
      return "麻醉";
    case "3":
      return "一类精神";
    case "4":
      return "二类精神";
    case "5":
      return "毒性药物";
    default:
      return "未说明";
  }
};

//药品 审核状态
export const checkStatus = (ch = "") => {
  switch (ch) {
    case "0":
      return "待审核";
    case "1":
      return "审核通过";
    case "2":
      return "审核未通过";
    default:
      return "";
  }
};
export const registerType = (rt = "") => {
  switch (rt) {
    case "0":
      return "";
    case "1":
      return "个人";
    case "2":
      return "机构";
    default:
      return "";
  }
};

export const visitStatus = (ch = "") => {
  switch (ch) {
    case "0":
      return "待就诊";
    case "1":
      return "进行中";
    case "2":
      return "已结束";
    case "3":
      return "已失效";
    case "4":
      return "已拒诊";
    default:
      return "";
  }
};
export const consultStatus = (ch = "") => {
  switch (ch) {
    case 10:
      return "待支付";
    case 11:
      return "已完成";
    case 12:
      return "用户取消";
    case 13:
      return "接诊超时取消";
    case 14:
      return "支付超时取消";
    case 15:
      return "已评价";
    case 16:
      return "医生取消";
    case 21:
      return "待接诊";
    case 22:
      return "进行中";
    case 23:
      return "进行中且已下处方";
    case 24:
      return "已下处方且已支付";
    default:
      return "";
  }
};

// 患者签到状态
export const signInStatus = (ch = "") => {
  switch (ch) {
    case "0":
      return "未签到";
    case "1":
      return "已签到";
    case "2":
      return "已签到";
    case "3":
      return "未签到";
    default:
      return "";
  }
};

// 在线问诊类型
export const CONSULT_TYPES = [
  { value: "", label: "全部" },
  { value: "telephone", label: "电话问诊" },
  { value: "video", label: "视频问诊" },
  { value: "imageAble", label: "图文问诊" },
  { value: "returnVisit", label: "复诊配药" },
  { value: "assistClinic", label: "协同门诊" },
];

// 就诊状态类型
export const CONSULT_STATUS = [
  { value: 0, label: "全部" },
  { value: 10, label: "待支付" },
  { value: 21, label: "待接诊" },
  { value: 22, label: "进行中" },
  { value: 11, label: "已完成" },
  { value: 15, label: "已评价" },
  { value: 16, label: "医生拒诊" },
  { value: 12, label: "居民取消" },
  { value: 13, label: "接诊超时取消" },
  { value: 14, label: "支付超时取消" },
  { value: 17, label: "机构退费" },
];

// 就诊状态类型
export const CONSULT2_STATUS = [
  { value: "0", label: "全部" },
  { value: "1", label: "待接诊" },
  { value: "2", label: "进行中" },
  { value: "3", label: "医生拒诊" },
  { value: "4", label: "接诊超时" },
  { value: "5", label: "已就诊" },
  { value: "6", label: "未支付" },
  { value: "7", label: "居民取消" },
];

export const consultType = (ch = '') => {
  switch (ch) {
    case "telephone":
      return "电话";
    case "video":
      return "视频";
    case "imageAble":
      return "图文";
    case "returnVisit":
      return "复诊配药";
    case "assistClinic":
      return "协同门诊";  
    default:
      return "";
  }
};

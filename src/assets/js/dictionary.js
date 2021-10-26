/* 
            通用字典（统一请求）
            请求顺序按模块自上而下
        */

const baseA = "pcn.core.dictionary.";
const baseB = "hcn.base.dictionary.";

import { comDico, convertStr } from "@API/api.ts";

export const getDictionary = () => {
  setTimeout(() => {
    // 19、签约状态（签约）
    comDico(`${baseA}signStatus`).then((dic) => {
      let objs = {
        key: "",
        text: "全 部",
      };
      let arrs = [objs, ...dic.items];
      sessionStorage.setItem("bs_signStatus", convertStr(arrs));
    });
    // 1、角色权限/租户权限
    comDico(`${baseA}unitType`).then((dic) => {
      sessionStorage.setItem("bs_unitType", convertStr(dic.items));
    });

    // 2、基础数据
    comDico(`${baseA}baseTimeConfig`).then((dic) => {
      sessionStorage.setItem("bs_baseTime", convertStr(dic.items));
    });

    // 3、签约适合人群/管理类型
    comDico(`${baseA}signPersonGroup`).then((dic) => {
      let arrs = [];
      for (let el of dic.items) {
        let obj = {
          label: el.text,
          value: el.key,
          disabled: false,
        };
        arrs.push(obj);
      }
      sessionStorage.setItem("bs_sipGroup", convertStr(arrs));
    });

    // 4、性 别
    comDico(`${baseB}GB_T2261_1`).then((dic) => {
      sessionStorage.setItem("bs_sex", convertStr(dic.items));
    });

    // 5、国 籍
    comDico(`${baseB}HCN_nationality`).then((dic) => {
      sessionStorage.setItem("bs_nationlity", convertStr(dic.items));
    });

    // 6、民 族
    comDico(`${baseB}GB_T3304`).then((dic) => {
      sessionStorage.setItem("bs_nation", convertStr(dic.items));
    });

    // 7、学 历
    comDico(`${baseB}GB_T4658`).then((dic) => {
      sessionStorage.setItem("bs_education", convertStr(dic.items));
    });

    // 8、医生类型/分类
    comDico(`${baseB}practiceCategory`).then((dic) => {
      sessionStorage.setItem("bs_practiceCategory", convertStr(dic.items));
    });

    // 9、医生职称
    comDico(`${baseB}doctorTitle`).then((dic) => {
      sessionStorage.setItem("bs_doctorTitle", convertStr(dic.items));
    });

    // 10、账号申诉状态
    comDico(`${baseB}HCN_appealVerifyState`).then((dic) => {
      let arrs = [];
      let objs = {
        key: "",
        text: "全 部",
      };
      arrs = [objs, ...dic.items];
      sessionStorage.setItem("bs_appealVerifyState", convertStr(arrs));
    });
  }, 0);

  setTimeout(() => {
    // 11、描述类型
    comDico(`${baseB}HCN_verifyDescType`).then((dic) => {
      sessionStorage.setItem("bs_verifyDescType", convertStr(dic.items));
    });

    // 12、反馈状态（意见建议）
    comDico(`${baseB}feedback`).then((dic) => {
      sessionStorage.setItem("bs_feedback", convertStr(dic.items));
    });

    // 13、反馈类型（意见建议）
    comDico(`${baseB}HCN_feedbackClassify`).then((dic) => {
      sessionStorage.setItem("bs_feedbackClassify", convertStr(dic.items));
    });

    // 14、交易状态（交易处理）
    comDico(`${baseB}HCN_tradeStatus`).then((dic) => {
      sessionStorage.setItem("bs_tradeStatus", convertStr(dic.items));
    });

    // 15、交易项目/类型（交易处理）
    comDico(`${baseB}HCN_tradeType`).then((dic) => {
      sessionStorage.setItem("bs_tradeType", convertStr(dic.items));
    });

    // 16、证件类型
    comDico(`${baseA}identityType`).then((dic) => {
      sessionStorage.setItem("bs_identityType", convertStr(dic.items));
    });

    // 17、确认方式（签约）
    comDico(`${baseA}checkway`).then((dic) => {
      sessionStorage.setItem("bs_checkway", convertStr(dic.items));
    });

    // 18、服务方式（签约）
    comDico(`${baseA}serviceWay`).then((dic) => {
      sessionStorage.setItem("bs_serviceWay", convertStr(dic.items));
    });

    // 20、医院分类（机构管理）
    comDico(`${baseB}HCN_organizationType`).then((dic) => {
      let objs = {
        key: "",
        text: "全 部",
      };
      let arrs = [objs, ...dic.items];
      sessionStorage.setItem("bs_hospitalSort", convertStr(arrs));
    });
  }, 8000);

  setTimeout(() => {
    // 21、医院性质（机构管理）
    comDico(`${baseB}HCN_mechanismProperties`).then((dic) => {
      let objs = {
        key: "",
        text: "全 部",
      };
      let arrs = [objs, ...dic.items];
      sessionStorage.setItem("bs_hospitalNature", convertStr(arrs));
    });

    // 22、医院等级（机构管理）*等级固定/无需字典
    let level = [
      {
        key: "10",
        text: "一级",
      },
      {
        key: "11",
        text: "一级甲等",
      },
      {
        key: "12",
        text: "一级乙等",
      },
      {
        key: "13",
        text: "一级丙等",
      },
      {
        key: "20",
        text: "二级",
      },
      {
        key: "21",
        text: "二级甲等",
      },
      {
        key: "22",
        text: "二级乙等",
      },
      {
        key: "23",
        text: "二级丙等",
      },
      {
        key: "30",
        text: "三级",
      },
      {
        key: "31",
        text: "三级特等",
      },
      {
        key: "32",
        text: "三级甲等",
      },
      {
        key: "33",
        text: "三级乙等",
      },
      {
        key: "34",
        text: "三级丙等",
      },
    ];
    sessionStorage.setItem("bs_hospitalLevel", convertStr(level));

    // 23、报告大类型（机构/报告说明）
    comDico(`${baseB}HCN_reportType`).then((dic) => {
      sessionStorage.setItem("bs_reportTypeBig", convertStr(dic.items));
    });

    // 24、报告类型（机构/报告说明）
    comDico(`${baseB}CC54_10_001_01`).then((dic) => {
      sessionStorage.setItem("bs_reportType", convertStr(dic.items));
    });

    // 25、预约家医（预约状态）
    comDico(`${baseA}apptStatus`).then((dic) => {
      sessionStorage.setItem("bs_apptStatus", convertStr(dic.items));
    });

    // 26、预约家医（取消原因）
    comDico(`${baseA}appdocCancelReason`).then((dic) => {
      sessionStorage.setItem("bs_appdocCancelReason", convertStr(dic.items));
    });

    // 27、家医类型
    /* comDico(`${baseA}???`).then(dic => {
                sessionStorage.setItem('bs_???', convertStr(dic.items))
            }) */
    let famDocType = [
      {
        key: "01",
        text: "全科医生",
      },
      {
        key: "02",
        text: "全科护士",
      },
      {
        key: "03",
        text: "公卫医生",
      },
      {
        key: "04",
        text: "公卫护士",
      },
      {
        key: "05",
        text: "计生医生",
      },
      {
        key: "06",
        text: "中医师",
      },
      {
        key: "09",
        text: "其  他",
      },
    ];
    sessionStorage.setItem("bs_famDocType", convertStr(famDocType));

    // 28、解约原因
    comDico(`${baseA}signCancelReason`).then((dic) => {
      sessionStorage.setItem("bs_signCancelReason", convertStr(dic.items));
    });

    // 29、服务对象类别
    comDico(`${baseB}HCN_objectType`).then((dic) => {
      sessionStorage.setItem("bs_objectType", convertStr(dic.items));
    });

    // 30、就诊流程
    let process = [
      {
        key: "0",
        text: "全 部",
      },
      {
        key: "1",
        text: "预约申请中",
      },
      {
        key: "2",
        text: "预约成功",
      },
      {
        key: "3",
        text: "预约失败",
      },
      {
        key: "4",
        text: "取消预约中",
      },
      {
        key: "5",
        text: "已取消",
      },
      {
        key: "6",
        text: "取消失败",
      },
      {
        key: "7",
        text: "待支付",
      },
      {
        key: "8",
        text: "已支付",
      },
      {
        key: "9",
        text: "已退号",
      },
      {
        key: "10",
        text: "挂号异常",
      },
      {
        key: "11",
        text: "已停诊",
      },
      {
        key: "12",
        text: "缴费超时",
      },
      {
        key: "13",
        text: "医院挂号处理中",
      },
    ];
    // comDico(`${baseB}HCN_medicalCombType`).then(dic => {
    sessionStorage.setItem("bs_medicalProcess", convertStr(process));
    // })
  }, 1600);

  setTimeout(() => {
    // 30、属性代码
    comDico(`${baseB}HCN_svrOpenProperty`).then((dic) => {
      sessionStorage.setItem("bs_propertyCode", convertStr(dic.items));
    });

    // 31、属性类型
    comDico(`${baseB}HCN_baseDataType`).then((dic) => {
      sessionStorage.setItem("bs_propertyType", convertStr(dic.items));
    });

    // 32、医联体类型
    comDico(`${baseB}HCN_medicalCombType`).then((dic) => {
      sessionStorage.setItem("bs_medicalCombType", convertStr(dic.items));
    });

    // 33、审核状态
    comDico(`${baseB}HCN_verifyState`).then((dic) => {
      sessionStorage.setItem("bs_verifyState", convertStr(dic.items));
    });

    // 34、业务标识（暂）
    let business = [
      {
        value: "10",
        label: "高血压",
      },
      {
        value: "11",
        label: "高血压药品",
      },
      {
        value: "20",
        label: "糖尿病",
      },
      {
        value: "21",
        label: "糖尿病药品",
      },
      {
        value: "30",
        label: "老年人",
      },
      {
        value: "31",
        label: "老年人药品",
      },
      {
        value: "40",
        label: "产前检查",
      },
      {
        value: "50",
        label: "产后访视",
      },
      {
        value: "60",
        label: "新生儿访视",
      },
    ];
    sessionStorage.setItem("bs_businessTag", convertStr(business));

    // 35.适合签约对象
    // let SignStatusDict = [
    //     {value: '01', label: '本市居民'},
    //     {value: '02', label: '本市常住居民'},
    //     {value: '03', label: '本市户籍居民'},
    //     {value: '04', label: '本市非户籍居民'},
    //     {value: '05', label: '孕产妇'},
    //     {value: '06', label: '0-6岁儿童'},
    //     {value: '07', label: '65岁以上老年人'},
    //     {value: '08', label: '高血压人群'},
    //     {value: '09', label: '35岁及以上原发性高血压人群'},
    //     {value: '10', label: '糖尿病人'},
    //     {value: '11', label: '35岁及以上2型糖尿病人'},
    //     {value: '12', label: '重性精神疾病患者'},
    //     {value: '13', label: '肺结核患者'},
    //     {value: '14', label: '残疾人'}
    // ]
    // sessionStorage.SignStatusDict = convertStr(SignStatusDict)
    comDico(`${baseA}suitableObject`).then((dic) => {
      let arrs = [];
      for (let el of dic.items) {
        let obj = {
          label: el.text,
          value: el.key,
          disabled: false,
        };
        arrs.push(obj);
      }
      sessionStorage.setItem("SignStatusDict", convertStr(arrs));
    });

    // 36、文案配置模块名称
    comDico(`${baseB}HCN_svrItemCode`).then((dic) => {
      sessionStorage.setItem("bs_svrItemCode", convertStr(dic.items));
    });

    // 37、参数名称列表
    comDico(`${baseB}HCN_svrOpenProperty`).then((dic) => {
      sessionStorage.setItem("svrOpenProperty", convertStr(dic.items));
    });
    // 38、签约状态（去除申请中）
    comDico(`${baseA}signStatus`).then((dic) => {
      let num = [];
      let arrs = [...dic.items];
      for (let i of arrs) {
        if (i.key != "11" && i.key != "23" && i.key != "24") {
          num.push(i);
        }
      }
      sessionStorage.setItem("bs_signStatuss", convertStr(num));
    });
    //39 物流承运商列表
    comDico(`${baseB}delivery`).then((dic) => {
      sessionStorage.setItem("bs_delivery", convertStr(dic.items));
    });
    //40 机构类别
    comDico(`${baseB}orgStandardType`).then((dic) => {
      sessionStorage.setItem("bs_orgStandardType", convertStr(dic.items));
    });
    //41 通知类型
    comDico(`${baseB}msgNoticeType`).then((dic) => {
      sessionStorage.setItem("bs_msgNoticeType", convertStr(dic.items));
    });
  }, 2400);
};

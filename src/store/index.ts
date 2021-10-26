import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    menuModule: [],
    roleList: [],
    // 交易单号
    transcateOrder: "",
    // 意见反馈ID/userId
    feedBackMsg: {},
    // 中医体质
    chineseMedMsg: {},
    // 老年人生活能力
    agedLifeMesg: {},
    // 居民列表
    residentMpid: "",
    // 医生资质
    doctorQuaMsg: {},
    // 医生列表（ID,TAG）
    doctorId: "",
    doctorTag: "increase",
    // 家医团队信息
    famDoctorMsg: {},
    // pom-step2
    docSelectMsg: {},
    // 新增/查看签约
    addWacSign: {},
    // 打印
    printMsg: {
      request: {},
      params: {},
    },
    // 居民mpiId
    resMpiId: "",
    // 添加服务（签约）
    originalMsg: null,
    // 查看服务包信息
    packMessage: {
      baseMsg: {
        id: "",
        XID: "",
        XMD: "",
      },
      itemMsg: {
        id: "",
        XID: "",
        XMD: "",
      },
      discMsg: {
        id: "",
        XID: "",
        XMD: "",
      },
      flag: "",
      ids: "",
    },
    // 履约率
    keepApoMsg: {
      date: "",
      sode: "",
      code: "",
      name: "",
      servList: [],
      areaList: [],
      dateList: [],
    },
    keepApoTeam: {
      date: "",
      sode: "",
      code: "",
      name: "",
      servList: [],
      areaList: [],
      dateList: [],
    },
    // 签约态势
    signSitutionMsg: {
      date: "",
      pode: "",
      id: "",
      name: "",
      areaList: [],
      orgList: [],
      teamList: [],
    },
    // 服务人次
    serviceNumMsg: {
      date: "",
      areaId: "",
      orgId: "",
      teamId: "",
      name: "",
      areaList: [],
      orgList: [],
      teamList: [],
    },
    // 服务人员
    serviceMemMsg: {
      deptId: "",
      areaId: "",
      orgId: "",
      name: "",
      areaList: [],
      orgList: [],
      serType: [],
    },
    // 家医团队数量
    teamNumMsg: {
      areaId: "",
      name: "",
      areaList: [],
    },
    familyParam: "",
    serviceBags: "",
    addWacSignMsg: "",
    services: "",
    realPrice: "",
    checkDetail: "",
    position: "",
    // 服务包数量
    serPackMsg: {
      areaId: "",
      name: "",
      areaList: [],
    },
    serItemMsg: {
      name: "",
      areaId: "",
      areaList: [],
      orgId: "",
      orgList: [],
    },

    // 支付信息
    payInfo: {
      ZFFS: "",
      ZFSJXZ: "",
      applyId: 0,
      signPackNum: 0,
      money: 0.0,
      mpiId: "",
      KTZF: "0",
      signId: 0,
    },

    // 家医团队（存留默认数据）
    famDocDefault: {
      orgId: "",
      index: null,
    },
    // 病历复印
    copyParams: {},
    chatBoxOpen: true,
    currentPatient: {}, // 当前聊天的就诊人
    chatMsgList: {}, //聊天记录
    isWarnMsg: {},
    saveTreeData: [],
    freshMessage: ''
  },
  getters: {},
  mutations: {
    // 导航
    saveMenuModule(state, msg) {
      state.menuModule = msg;
    },

    // 角色
    saveRoleList(state, msg) {
      state.roleList = msg;
    },

    // 交易单号
    transcationOrder(state, msg) {
      state.transcateOrder = msg;
    },

    // 意见反馈ID
    saveFeedbackMsg(state, msg) {
      state.feedBackMsg = msg;
    },

    // 中医体质辨识
    saveChineseMed(state, msg) {
      state.chineseMedMsg = msg;
    },

    // 老年人生活能力
    saveagedLife(state, msg) {
      state.agedLifeMesg = msg;
    },

    // 居民列表
    saveResidentMpid(state, msg) {
      state.residentMpid = msg;
    },

    // 医生资质
    saveDoctorQua(state, msg) {
      state.doctorQuaMsg = msg;
    },

    // 医生列表
    saveDoctorList(state, msg) {
      state.doctorId = msg.doctorId;
      state.doctorTag = msg.doctorTag;
    },

    // 家医团队（基本信息）
    saveFamDocMsg(state, msg) {
      state.famDoctorMsg = msg;
    },

    // 选择医生（pom-step2）
    saveDoctorSelect(state, msg) {
      state.docSelectMsg = msg;
    },

    // 新增/查看签约
    saveAddWacSigned(state, msg) {
      state.addWacSign = msg;
    },

    // 打印
    savePrintMsg(state, msg) {
      state.printMsg = msg;
    },

    // 居民ID（服务记录）
    saveResidentMpiId(state, msg) {
      state.resMpiId = msg;
    },

    // 添加服务记录（签约详情）
    addSerRecordBySign(state, msg) {
      state.originalMsg = msg;
    },

    // 查看服务包（机构管理/服务包/...）
    savePackMsg(state, msg) {
      state.packMessage = msg;
    },

    // 统计分析（服务包/项履约率）
    keepAppointMsg(state, msg) {
      state.keepApoMsg = msg;
    },

    // 统计分析（服务包/项履约率- 机构->团队）
    keepAppointTeam(state, msg) {
      state.keepApoTeam = msg;
    },

    // 统计分析（签约态势）
    signSitutionMsg(state, msg) {
      state.signSitutionMsg = msg;
    },

    // 统计分析（服务人次）
    signServiceNum(state, msg) {
      state.serviceNumMsg = msg;
    },

    // 统计分析（服务人员）
    signServiceMem(state, msg) {
      state.serviceMemMsg = msg;
    },

    // 统计分析（团队数量）
    signFamDocTeam(state, msg) {
      state.teamNumMsg = msg;
    },

    // 统计分析（服务包数量）
    signServicePack(state, msg) {
      state.serPackMsg = msg;
    },

    // 统计分析（服务项数量）
    signServiceItem(state, msg) {
      state.serItemMsg = msg;
    },

    // 家医团队参数
    familyParam(state, value) {
      state.familyParam = value;
    },

    // 支付信息
    savePayInfo(state, msg) {
      state.payInfo = msg;
    },

    // 家医团队（默认）
    familyTeamDefault(state, msg) {
      state.famDocDefault = msg;
    },

    // 签约服务服务包信息
    serviceBags(state, msg) {
      state.serviceBags = msg;
    },
    // 签约服务服务包信息
    addWacSignMsgSet(state, msg) {
      state.addWacSignMsg = msg;
    },
    // 签约服务服务项信息
    services(state, msg) {
      state.services = msg;
    },
    // 签约服务实付金额
    realPrice(state, msg) {
      state.realPrice = msg;
    },
    // 病历复印
    copyParams(state, msg) {
      state.copyParams = msg;
    },
    UPDATE_POSITION(state, p) {
      state.position = p;
    },

    //消息提醒
    UPDARW_MSG(state: { chatMsgList: any, freshMessage?:any }, data: any) {
      state.freshMessage = JSON.stringify(data);
      if (!state.chatMsgList[data.ext.groupId]) {
        state.chatMsgList[data.ext.groupId] = [data];
      } else {
        state.chatMsgList[data.ext.groupId].push(data);
      }
      localStorage.chatMsgList = JSON.stringify(state.chatMsgList);
    },

    //所有聊天记录
    UPDATE_ALL_MSG(state, data) {
      state.chatMsgList = data;
      localStorage.chatMsgList = JSON.stringify(state.chatMsgList);
    },

    //患者信息
    UPDATE_CURRENT_PATIENT(state, data) {
      state.currentPatient = data;
    },

    //详情
    UPDATE_CHECK_DETAIL(state, data) {
      state.checkDetail = data;
    },
    //
    MESSAGE_WARN(state: { isWarnMsg: any }, data: any) {
      if (typeof data.status == "undefined") {
        data.status = true;
      } else {
        data.status = data.status;
      }
      state.isWarnMsg[data.ext.consultId] = data.status;
    },

    //打开弹框
    OPEN_CHAT_BOX(state) {
      state.chatBoxOpen = true;
    },

    //关闭弹框
    CLOSE_CHAT_BOX(state) {
      state.chatBoxOpen = false;
    },

    // 选择医生（pom-step2）
    saveTreeData(state, msg) {
      state.saveTreeData = msg;
    },
  },
  actions: {
    familyParam({ commit }, value) {
      commit("familyParam", value);
    },
  },
  modules: {},
});
export default store;

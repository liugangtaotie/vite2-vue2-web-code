import { comAxios, convertStr, convertJson } from "@API/api.ts";
export default {
  data() {
    return {};
  },
  methods: {
    //获取系统参数判断是否启用电子签名(0不开启签名，1 手签2，电子签)
    getSignFlag(paramsKey) {
      const tandId = JSON.parse(sessionStorage.BS_ROLE_LIST)[0].tenantId;
      let param = [tandId, "0127", paramsKey];
      return comAxios(
        "hcn.baseLevelConfigService",
        "queryAllPropertyConfig",
        param
      );
    },
    //获取医生手签图片
    queryDocImageURL(paramsKey) {
      return comAxios("cmc.signService", "querySignImageURL", [
        { userId: paramsKey },
      ]);
    },

    //提交手签图片
    uploadSignImgId(params) {
      return comAxios("cmc.signService", "uploadSignImgId", [params]);
    },

    //查询电子签名是否登陆
    queryLogin(paramsKey) {
      return comAxios("cmc.signService", "queryLogin", [{ userId: paramsKey }]);
    },

    //获取登录二维码或是URL（未登录）
    loginAuth() {
      return comAxios("cmc.signService", "loginAuth", [{}]);
    },

    //获取登陆结果（轮询查询）查到了调初始化签名者信息
    queryLoginResult(params) {
      return comAxios("cmc.signService", "queryLoginResult", [params]);
    },

    //初始化签名者信息(app)(登陆过)
    docOperateSign(params) {
      return comAxios("cmc.signService", "docOperateSign", [params]);
    },

    //查询协议信息
    getProtocal(params) {
      return comAxios("pcn.signProtocalService", "getSignProtocal", [params]);
    },
  },
};

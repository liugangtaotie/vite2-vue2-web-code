/**
 * 线上打包部署配置
 * PRODUCTION_ENV = '' 部署到开发环境
 */

// 根据域名自动获取线上环境
// 无需手动配置
const PRODUCTION_ENV = (import.meta as any).env.MODE === 'production' ? location.pathname.split("/")[1].slice(27) : '-zk';

const base = `/xxxx${PRODUCTION_ENV}`; // 生成产品用      开发或者提交都用这个地址
// eslint-disable-next-line prettier/prettier
const config = {} as any;

// 图片上传前缀
config["imgUpload"] = base + "/upload";

// 图片查看前缀
config["imgPreview"] = base + "/upload";

// 通用服务
config["comService"] = base;

// PC端中文主题
config["loginTitle_ZH"] = 'xxxx管理平台'

// PC端英文主题
config["loginTitle_EN"] = 'Health Communication Management Platform'

// 是否加密开关
config['encryFlag']  = false;

export default config;

## 一、本工程是基于vite的单页面web app(node:12+、 vue:2.6.11 、vuex:3.1.3 、 vite:2.2.4 、ts:3.8.3)

[ 注意: 下面的说明仅供参考,会由于项目变更而发生变化,请随时保持沟通! ]()

[gitlab - 源码](http://jkcs.bsoft.com.cn/bs-standard-repo/fore-end/pc/version_manager.git)

## 二、Build Setup(本地开发)

``` bash
# 安装依赖
npm install && yarn

# 本地调试
npm run dev && yarn dev
windows 用户
先执行 npm run build:dll(建立vendor-json,动态链接,加快打包速度)
生成 vendor_dll_xxx.js 文件，然后 在index.html中script引入vendor_dll_xxx.js文件
再执行 npm run serve / yarn serve(开发)
npm run build:production(打包)

mac 用户
先执行 make dll(建立vendor-json,动态链接,加快打包速度)
生成 vendor_dll_xxx.js 文件，然后 在index.html中script引入vendor_dll_xxx.js文件
再执行 make dev(开发)
make pro(打包)

业务配置
在实际使用之前,请先将src/api/appConfig.ts中的参数,配置成实际的业务参数,如后端统一请求接口名称等,
同时还有针对不同npm命令的参数,如下:

# 打包测试环境中用的包,会使用上面文件中, build:development对应的参数
npm run build:development / make test | make dev

# 打包发布环境中用的包,会使用上面文件中, build:production对应的参数（根据不同的环境使用不同的打包配置参数）
online: npm run build:production / make pro

```


## 三、项目结构说明

```
|-- root
    |-- build
    |   |-- vendor-manifest.json()
    |   |-- webpack.base.conf.js
    |   |-- webpack.dev.conf.js (开发环境打包配置)
    |   |-- webpack.dll.conf.js （生成dll动态链接库）
    |   |-- webpack.pro.conf.js（生产环境打包配置）
    |-- config
    |-- ops(自动化部署脚本,目前正在用的)
    |-- ops7.6(自动化部署脚本)
    |-- src
    |   |-- api
    |   |   |-- util.ts（公共方法）
    |   |   |-- appConfig.ts（*****特别注意*****：统一配置参数）
    |   |   |-- api.ts（后端接口明细）
    |   |   |-- key-a.js（sm4加密key一部分）
    |   |   |-- key-b.js（sm4加密key一部分）
    |   |   |-- key-a-obfuscated.js（key-a.js文件混淆）
    |   |   |-- key-b-obfuscated.js（key-b.js文件混淆）
    |   |-- assets
    |   |-- components(公用组件)
    |   |-- pubcom(业务公用组件)
    |   |-- router（路由入口）
    |   |-- store（全局状态管理）
    |   |-- views（功能模块页面）
    |   |-- App.vue
    |   |-- main.ts（页面入口）
    |-- static（无需打包的静态资源）
    |-- tests（unit测试）
    |-- .browserslistrc(浏览器支持)
    |-- .editorconfig
    |-- .eslintignore
    |-- .eslintrc.js
    |-- .gitignore
    |-- .babel.config.js
    |-- CHANGELOG.md（更改日志）
    |-- codeSpecification.md（代码规范）
    |-- cypress.json
    |-- deploy.sh（mac快速发布脚本）
    |-- git.sh（mac自动提交脚本）
    |-- index.html
    |-- jest.config.js
    |-- Makefile(mac快速开启项目)
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- tsconfig.json
    |-- vue.config.js(vue 基本配置)
    |-- yarn.lock
```
## 四、前端代码编写规范

查看codeSpecification.md文档

## 五、前端打包webpack配置信息一览

核心一点就是： cmd 中敲 vue inspect > output.js , 这样我们会得到一份最终生效的 webpack 配置信息

## 六、常见问题

``` bash
1、如果出现内存溢出，需要修改vue.config.js->148行： 这个地方改成4096
           let allowUseMem = totalmem > 2048 ? 8192 : 2048;
           -> let allowUseMem = totalmem > 2048 ? 4096 : 2048;

2、如果本地开发： 可以注掉一些不相关的路由， 这样本地运行就很快了， 记得打包把它还原回去；

3、本地打包： 一般执行完dll后，打包30s；mac 一般打包时间（20s）
```

## 七、vs code setting(统一编码风格)
```
{
  "remote.SSH.showLoginTerminal": true,
  "team.showWelcomeMessage": false,
  // "[javascript]": {
  //   "editor.defaultFormatter": "HookyQR.beautify"
  // },
  "[html]": {
    "editor.defaultFormatter": "HookyQR.beautify"
  },
  // ******第一部分：Eslint的配置******
  "typescript.check.tscVersion": false,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
  ],
  // #去掉代码结尾的分号
  "prettier.semi": false,
  // #使用带引号替代双引号
  "prettier.singleQuote": true,
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "files.autoSave": "off",
  "files.insertFinalNewline": true, // 文件的最后一行空一行
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // "vetur.validation.template": true,
  "vetur.format.enable": true,
  "vetur.validation.template": false,
  "workbench.settings.editor": "json",
  "terminal.integrated.rendererType": "dom",
  "vscode_custom_css.policy": true,
  "powermode.enabled": true,
  "powermode.enableShake": false,
  "powermode.presets": "flames",
  "[css]": {
    "editor.defaultFormatter": "HookyQR.beautify"
  },
  "[markdown]": {
    "editor.defaultFormatter": "fcrespo82.markdown-table-formatter"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  // "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.associations": {
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  "emmet.includeLanguages": {
    "wxml": "html"
  },
  "minapp-vscode.disableAutoConfig": true,
  "window.zoomLevel": 0,
  "C_Cpp.updateChannel": "Insiders",
  "http.proxySupport": "off",
  "workbench.colorTheme": "SynthWave '84",
  "javascript.updateImportsOnFileMove.enabled": "always", // 这个是样式，包括火焰，烟火，魔法等
}

```

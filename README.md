# autoBackground

> 该项目为自适应后台管理系统，目地是简化开发过程中对数据库增删改查测试流程，只需绑定后台增删改查接口即可实现增删改查测试。该项目以vue为前端框架，二次封装elmentui，实现了autoTable、autoForm、autoBackground组件。该项目为自适应后台管理系统，目地是简化开发过程中对数据库增删改查测试流程，只需绑定后台增删改查接口即可实现增删改查测试。

## 目录结构

``` lua
├── build --项目构建(webpack)相关代码
├── config  --配置目录，包括端口号等
├── node_modules    --npm 加载的项目依赖模块
├── lib --把组件打包成js后的文件存放目录
├── examples    --用于展示组件的demo，把程序主入口配置在这里了
├── packages    --组件代码
├── static  --静态资源目录，如图片、字体等
├── test    --测试相关
├── index.html  --首页入口文件，你可以添加一些 meta 信息或统计代码啥的
├── package.json    --项目配置文件
├── README.md   --项目的说明文档，markdown 格式
```
## 项目演示
[http://www.shxex.cn:8080/SimpleOA/](http://www.shxex.cn:8080/SimpleOA/)xgit
## 组件介绍
### auto-form
该组件依赖element-ui。有几个绑定属性：
disabled、edit、inline（行内表单）、pickerOptions（日期选择框）、model（数据模型）、
form（配置显示类型，支持日期、文本性别选择、密码，默认根据model名字识别）
提交栏支持插槽扩展其他按钮
### auto-table
该组件依赖element-ui。有三个绑定属性：
1、data：为table的填充数据，根据json的key识别为图片、日期等显示形式
2、header：为头部数据，默认为json的key值，可配置。
3、table：是个对象、支持两个表格样式stripe: true, //是否为斑马纹、loading: false, // 数据加载loading显示
### auto-bg
该组件依赖auto-form、auto-bg、axios。auto-bg组件有一个绑定属性models为一个对象，有如下属性：
name:系统的名字
url:连接后台的域名，调试时通常为http://localhost:8080/xxx
loginUrl:登录url例如/login_do
childModels:系统模块数组有如下子属性：name,url,childModel
childModel:name,url和增删改查对应的url,method(get pos ...)和参数
另外该组件支持jwt登录，权限不够时java后台返回401状态码，自动进入登录画面。
输入账号密码点击提交就会访问loginUrl，java后端需要返回token，下次访问即携带token访问
## Build Setup
1、安装nodejs环境（javascript运行环境）
2、安装npm模块管理工具、cnpm支持中国模块镜像
3、全局安装vue、vue-cli
4、把项目克隆到本地，在项目目录下运行cmd，执行npm install 命令安装依赖
5、运行npm run dev调试可看到效果
6、直接在html文件里引入lib的shxex-ui.js和vue.min.js、element-ui.js可看效果（lib/index.html为示例）
7、自己开发新组件调试好运行npm run lib或npm run build-lib可打包为新组件，组件名可配置，详见我的博客

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8079
npm run dev

#把组件打包为单个js文件，可在html文件直接引用，使用方法参考'lib目录里'打包好的shxex-ui.js和使用示例index.html
npm run lib/build-lib

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

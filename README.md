# **<font color=#409eff>广西区人民医院</font>**

## 项目关联

* **THINGJSX** - 该项目通过postmessage的方式与thingjsx交互

## **一、项目目录介绍**

```
├── public                                                      // 静态资源
   ├── mock                                                     # mock模拟数据
├── scripts                                                     // 一些脚本内容
├── src
│   ├── assets                                                  // 资源文件夹
│   │   ├── fonts                                               // 字体资源
│   │   ├── img                                                 // 图片资源
│   │   └── style                                               // 样式资源
│   ├── components                                              // 项目中自己用到的组件
│   ├── lib                                                     // 第三方库，例如echarts
│   ├── routers                                                 // 页面路由配置
│   ├── screens                                                 // 主题页面
│   │
│   │   └── urbanSurvey                                         // 医院概览
│
│   ├── thingjs                                                 // 三维场景相关内容
│   ├── utils                                                   // 常用工具方法
│   │   └── autoRequest.ts                                      // 接口请求的封装(使用方法请进文件中查看)
│   │   └── business                                            // 三维业务相关，例如添加孪生体告警
│   │   └── levelManager                                        // 三维场景层级管理，处理不同层级的逻辑
│   │   └── twins                                               // 三维场景孪生体创建工作
│   ├── App.vue
│   ├── main.ts
├── typings                                                     // 全局TS类型定义
├── .postcssrc.cjs                                              // postcss配置用于分辨率适配
├── README.md
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## **二、运行项目**

### **1. 安装依赖**

 `pnpm i`

---

### **2. 项目启动**

 `pnpm dev`

## **其它**

* 请先在 VS Code 拓展插件中开启 ESLint
* 组件使用：src/components 下的组件无需注册即可使用
* Vue API: ref、toRef 这些 vue 内置 api 也无需在组件中引用即可使用

请遵循前端开发规范进行开发：统一前端开发规范[跳转规范文档链接](https://www.yuque.com/hasaiki/tyxhdu/vt00m15ip1go0hpz?singleDoc#)

## 接口数据mock

接口数据mock数据统一放在public/mock文件夹中，每个主题大屏单独一个模拟数据js文件，将定义好的模拟数据文件在index.html中引入

```html
<script src="/mock/productionManager.js"></script>
```

定义模拟数据时key值需要跟请求地址的链接一致，例如请求/production/getEquipmentPerformance数据就这样写：

```javascript
global.requestMockData = {
    // 为了不覆盖其他人写的模拟数据
    ...global.requestMockData,
    '/production/getEquipmentPerformance': (query) => {
        return [{
            name: 11
        }]
    }
}
```

## 接口数据间隔自动刷新

调用autoRequest方法，利用该方法中的回调即可自动更新数据。

```js
import {
    autoRequest
} from '@/request/autoRequest';
autoRequest < ProductKeyIndicators > ({
        // 在public/requestConfig.js文件中定义好的属性配置项
        url: 'production-keyProduction',
        data: {}, // 请求的参数
    },
    res => {
        data.value = res;
        console.log('根据配置中的自动刷新间隔时间进行自动请求刷新，当刷新后会自动回调到该方法。在该方法中做自动刷新后的操作即可');
    }
);
```

## **图表数据获取**

主题数据统一放在 store 中管理，在图表中引入 store 获取对应的图表数据即可

## **打包部署**

### 测试环境部署

运行：pnpm build
再运行：pnpm upload
内网访问：http://10.100.32.48:5173/bszioc/index.html

### 生产环境部署

执行：pnpm buildPro

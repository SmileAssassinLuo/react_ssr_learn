#### React SSR  ------ 掘金小册（[SSR 实战](https://juejin.cn/book/7137945369635192836)）

#### 一，初始化项目

初始化空项目：`npm init `;

#### 二，代码 lint

##### (1) 代码语法类型

###### 1，安装

`npm install eslint eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser  --save-dev`;

###### 2，初始化 lint 配置

`npx eslint --init` ：初始化 `eslint` 配置，生成  `.eslintrc.js` 文件;

配置主要从以下几点考虑：

- 技术栈：React，相对于大项目，React 具备更高的上限和可定制化能力，对函数式编程的思想也更容易领悟，所以针对大型项目，我更推荐大家用 React。

- 是否使用 TypeScript：是，可以有效解决 JS 弱类型导致的相关隐性 Bug。

- 运行环境：SSR 项目同时包括客户端和服务端，所以我们选用浏览器 + node 的环境。

- 模块导入类型：因为包含客户端和服务端，node 层很难避免使用 require,所以建议选用 ES Modules + Commonjs，没必要对这部分进行 lint 了。

![](D:\work\MyLearning\newTecLearn\react\react_ssr\doc\image\lint_option.png)

###### 3，手动修改配置

在原来的基础上，我们在 env 的配置中加上了`commonjs: true`，这个是为了支持对 commonjs 全局变量的识别，然后移除了 lint 中的三个规则：

- react/jsx-uses-react：必须增加对`import React from 'react';`的引入，在 React 17 之后，jsx 的页面已经不再需要引入 React了，所以我们去掉这条 lint 规则。

- react/react-in-jsx-scope：同上。

- @typescript-eslint/no-var-requires：禁用使用 require 来定义，node 很多相关的依赖没有对 es module 的定义，所以我们也去掉这条 lint 规则。

##### (2) commit lint



#### 三，项目构建

配置完`lint`,编写服务端代码，先安装`npm install express --save`




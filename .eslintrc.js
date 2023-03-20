module.exports = {
    "env": {
        "browser": true,
        "commonjs": true, // ADD, 支持对commonjs全局变量的识别
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
          },
        "ecmaVersion": "latest"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-var-requires": "off", 
    }
}

/*
在原来的基础上，我们在 env 的配置中加上了commonjs: true，这个是为了支持对 commonjs 全局变量的识别，然后移除了 lint 中的三个规则：
react/jsx-uses-react：必须增加对import React from 'react';的引入，在 React 17 之后，jsx 的页面已经不再需要引入 React了，所以我们去掉这条 lint 规则。
react/react-in-jsx-scope：同上。
@typescript-eslint/no-var-requires：禁用使用 require 来定义，node 很多相关的依赖没有对 es module 的定义，所以我们也去掉这条 lint 规则。
*/

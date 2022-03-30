# Table of Contents
- [Table of Contents](#table-of-contents)
- [About Project](#about-project)
- [Project setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Lints and fixes files](#lints-and-fixes-files)
  - [ESLint 설정](#eslint-설정)
- [DEV](#dev)
  - [Router 설정](#router-설정)
    - [vue-router 설치](#vue-router-설치)
- [Troubleshooting](#troubleshooting)
  - [throw 사용 시 오류 발생](#throw-사용-시-오류-발생)
    - [오류](#오류)
    - [해결 방법](#해결-방법)

<br>

# About Project

# Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## ESLint 설정
```
# vue-cli로 eslint 설정
vue add eslint
```
# DEV
## Router 설정
### vue-router 설치
```
npm i vue-router@3.5.3 --save
```

# Troubleshooting
## throw 사용 시 오류 발생
### 오류
`throw new Error` 사용 시 babel에서 다음과 같은 오류가 발생한다.
```bash
 ERROR  Failed to compile with 1 error                                                                             오전 9:04:19

 error  in ./src/views/NewsView.vue?vue&type=script&lang=js&

Syntax Error: 
  19 |       .get('https://api.hnpwa.com/v0/news/1.json')
  20 |       .then((res) => res.data)
> 21 |       .catch((err) => throw new Error(err));
     |                       ^
  22 |     console.log(typeof this.users);
  23 |   },
  24 | };

Add @babel/plugin-proposal-throw-expressions (https://git.io/vb4yF) to the 'plugins' section of your Babel config to enable transformation.
If you want to leave it as-is, add @babel/plugin-syntax-throw-expressions (https://git.io/vb4SJ) to the 'plugins' section to enable parsing.


 @ ./src/views/NewsView.vue?vue&type=script&lang=js& 1:0-277 1:293-296 1:298-572 1:298-572
 @ ./src/views/NewsView.vue
 @ ./src/routes/index.js
 @ ./src/main.js
 @ multi (webpack)-dev-server/client?http://172.18.40.80:8080&sockPath=/sockjs-node (webpack)/hot/dev-server.js ./src/main.js
```
### 해결 방법
1. `@babel/plugin-proposal-throw-expressions` npm install
```
npm i -D @babel/plugin-proposal-throw-expressions
```
2. `babel.config.js`에 `plugins` 추가
```diff
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
+ plugins: [
+    '@babel/plugin-proposal-throw-expressions',
+  ],
};
```
3. `npm run serve` 재실행
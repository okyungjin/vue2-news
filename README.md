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
  - [Arrow function과 this](#arrow-function과-this)
    - [Arrow function 사용](#arrow-function-사용)
    - [Arrow Function 미사용](#arrow-function-미사용)
  - [Promise](#promise)
- [Troubleshooting](#troubleshooting)
  - [throw 사용 시 오류 발생](#throw-사용-시-오류-발생)
    - [오류](#오류)
    - [해결 방법](#해결-방법)
  - [npm install 오류](#npm-install-오류)
    - [vuex 설치 시 오류](#vuex-설치-시-오류)
      - [오류](#오류-1)
      - [해결 방법](#해결-방법-1)
  - [ESLint 오류](#eslint-오류)
    - [Prefer default export.(import/prefer-default-export)](#prefer-default-exportimportprefer-default-export)
      - [오류](#오류-2)
      - [해결 방법](#해결-방법-2)
    - [Arrow function should not return assignment.(no-return-assign)](#arrow-function-should-not-return-assignmentno-return-assign)
      - [오류](#오류-3)
      - [해결 방법](#해결-방법-3)
    
 
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

## Arrow function과 this
> 화살표 함수의 `this`와 `function` 키워드 함수 내부의 `this`는 상이하므로 사용에 주의가 필요하다.

### Arrow function 사용
Arrow function 사용 시에는 **호출 전의 `this`와 호출 후의 `this`가 동일하다.**
```js
console.log('===== Arrow Function 사용 =====');
console.log('호출 전: ', this);
fetchNewsList()
  .then((res) => {
    console.log('호출 후: ', this);
    this.users = res.data;
  })
  .catch((err) => throw new Error(err));
```
![Arrow function 사용](https://user-images.githubusercontent.com/31913666/160734845-aa565e95-d331-4437-bd9f-b7baadb6a1fc.png)

### Arrow Function 미사용
Arrow function을 사용하지 않으면 **호출 전의 `this`와 호출 후의 `this`가 상이하다.** 따라서 `const vm = this;` 를 사용하여 vue 인스턴스의 data에 접근하도록 해야한다.
```js
console.log('===== Arrow Function 미사용 =====');
console.log('호출 전: ', this);
const vm = this;
fetchNewsList()
  .then(function (res) {
    console.log('호출 후: ', this);
    vm.users = res.data; // vm 사용
  })
  .catch((err) => throw new Error(err));
```
![Arrow Function 미사용](https://user-images.githubusercontent.com/31913666/160735425-64682834-8c37-4a21-8d19-a72fea84e43a.png)

## Promise
JavaScript에서 비동기를 처리하는데 필요한 개념 Promise
```js
function callAjax() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://api.hnpwa.com/v0/news/1.json',
      success: function(data) {
        resolve(data);
      },
    });
  });
}

function fetchData() {
  var result = [];
  callAjax()
    .then((res) => console.log(res));
    .then((res) => console.log(res)); // Promise는 chaining이 가능하다.
}
```

# Troubleshooting
## throw 사용 시 오류 발생
### 오류
`throw new Error` 사용 시 babel에서 다음과 같은 오류가 발생한다.
```bash
 ERROR  Failed to compile with 1 error                                                                            

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

## npm install 오류
### vuex 설치 시 오류
#### 오류
`npm i vuex` 실행 시에 다음과 같은 오류가 발생한다.
```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! 
npm ERR! While resolving: vue2-news@0.1.0
npm ERR! Found: vue@2.6.14
npm ERR! node_modules/vue
npm ERR!   vue@"^2.6.11" from the root project
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer vue@"^3.0.2" from vuex@4.0.2
npm ERR! node_modules/vuex
npm ERR!   vuex@"*" from the root project
npm ERR! 
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR! 
npm ERR! See /Users/kyungj/.npm/eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/kyungj/.npm/_logs/2022-03-30T02_20_25_758Z-debug-0.log
```
#### 해결 방법
`npm i vuex` 로 설치할 경우 최신 버전이 설치되는데, 사용하고 있는 vue 버전이 2.x 라서 발생하는 오류이다. vuex 버전을 명시하여 설치해주면 해결된다.
```
npm i vuex@3.6.2
```

## ESLint 오류
### Prefer default export.(import/prefer-default-export)
#### 오류
```
ESLint: Prefer default export.(import/prefer-default-export)
```
#### 해결 방법
`.eslintrc.js`에 rule 추가
```diff
module.exports = {
  rules: {
+   "import/prefer-default-export": "off",
  }
}
```

### Arrow function should not return assignment.(no-return-assign)
#### 오류
```js
fetchNewsList()
  .then((res) => this.users = res.data) // ERROR
  .catch((err) => throw new Error(err));
```
#### 해결 방법
```js
fetchNewsList()
  .then((res) => { this.users = res.data; }) // braket으로 감싸기
  .catch((err) => throw new Error(err));
```
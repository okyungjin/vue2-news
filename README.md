# Table of Contents
- [Table of Contents](#table-of-contents)
- [About Project](#about-project)
- [Project setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Lints and fixes files](#lints-and-fixes-files)
  - [ESLint 설정](#eslint-설정)
- [DEV Notes](#dev-notes)
  - [Router 설정](#router-설정)
    - [vue-router 설치](#vue-router-설치)
  - [Arrow function과 this](#arrow-function과-this)
    - [Arrow function 사용](#arrow-function-사용)
    - [Arrow Function 미사용](#arrow-function-미사용)
  - [Promise](#promise)
  - [export와 export default](#export와-export-default)
    - [export](#export)
    - [export default](#export-default)
  - [이벤트 버스(Event Bus)로 Spinner 제어하기](#이벤트-버스event-bus로-spinner-제어하기)
    - [1) Event Bus 생성](#1-event-bus-생성)
    - [2) Event Bus 등록](#2-event-bus-등록)
    - [3) View에서 Event 발생시키기](#3-view에서-event-발생시키기)
  - [하이 오더 컴포넌트 (HOC, Higher-Order Components)](#하이-오더-컴포넌트-hoc-higher-order-components)
    - [1) ListView 생성](#1-listview-생성)
    - [2) createListView 함수 생성](#2-createlistview-함수-생성)
    - [3) routes의 components 변경](#3-routes의-components-변경)
    - [4) HOC 적용 확인](#4-hoc-적용-확인)
      - [NewsView](#newsview)
      - [JobsView](#jobsview)
      - [AskView](#askview)
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

# DEV Notes
개발하면서 얻은 지식들을 메모합니다.
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

## export와 export default
### export
```js
export const bus = new Vue();

import { bus } from '/bus.js';
```
### export default
```js
export default new Vue();

import bus from '/bus.js'; // 이름은 마음대로 변경 가능
```
## 이벤트 버스(Event Bus)로 Spinner 제어하기
Spinner 같은 컴포넌트는 `이벤트 버스` 로 제어하면 편리하다.
### 1) Event Bus 생성
`src/utils/bus.js`
```js
import Vue from 'vue';

export default new Vue();
```

### 2) Event Bus 등록
`created()` 에서 event bus를 등록하고, `beforeDestroy()`에서 event bus를 해제시킨다.
> event bus 사용 시에는 off 하는 것을 잊지 말자.
```html

<template>
  <div>
    <!-- Spinner 외 생략 -->
    <Spinner :loading="loadingStatus"></Spinner>
  </div>
  
</template>

<script>
import bus from './utils/bus';

export default {
  data() {
    return {
      loadingStatus: false,
    };
  },
  methods: {
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    },
  },
  created() {
    bus.$on('start:spinner', this.startSpinner);
    bus.$on('end:spinner', this.endSpinner);
  },
  beforeDestroy() { // ** 반드시 off를 해준다 **
    bus.$off('start:spinner', this.startSpinner);
    bus.$off('end:spinner', this.endSpinner);
  },
  // 이하 생략 ...
};
</script>
```
### 3) View에서 Event 발생시키기
`bus.$emit` 메서드로 spinner를 실행 / 중지시킨다.
아래 코드는 컴포넌트가 생성될 때 스피너를 시작했다가, 데이터가 도착하면 중지하는 에제이다.
```js
created() {
  bus.$emit('start:spinner'); // START
  this.$store.dispatch('FETCH_NEWS')
    .then(() => {
      bus.$emit('end:spinner'); // END
    })
    .catch((error) => {
      throw new Error(error);
    });
},
```
## 하이 오더 컴포넌트 (HOC, Higher-Order Components)
컴포넌트의 로직을 재사용할 수 있는 HOC에 대해서 알아보자.
[참고문서) React의 Higher-Order Components](https://reactjs.org/docs/higher-order-components.html)
### 1) ListView 생성
`createListView.js`의 `render` 함수에 연결해줄 컴포넌트를 하나 생성한다.
```html
<!-- views/ListView.vue -->
<template>
  <ListItem></ListItem>
</template>

<script>
import ListItem from '../components/ListItem.vue';

export default {
  components: { ListItem },
};
</script>
```
### 2) createListView 함수 생성
히이 오더 컴포넌트를 렌더링할 수 있도록 하는 `createListView`를 생성한다.
```js
// createListView.js
import ListView from './ListView.vue';
import { bus } from '../utils/bus';

export default (routeName) => ({
  name: routeName,
  created() {
    bus.$emit('start:spinner');
    this.$store.dispatch('FETCH_LIST', this.$route.name)
      .then(() => bus.$emit('end:spinner'))
      .catch((error) => throw new Error(error));
  },
  render(createElement) {
    return createElement(ListView); // 1에서 생성한 ListView 바인딩
  },
});
```

### 3) routes의 components 변경
`routes`의 `components`에서 `createListView`를 호출하도록 변경한다.
```js
// routes/index.js
routes: [
  {
    path: '/news',
    name: 'news',
    component: createListView('NewsView'),
  },
  {
    path: '/ask',
    name: 'ask',
    component: createListView('AskView'),
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: createListView('JobsView'),
  },
]
```
### 4) HOC 적용 확인
#### NewsView
<img src="https://user-images.githubusercontent.com/31913666/161512412-3031760b-bb9f-46a5-af11-24f9a178b5b0.png" width="300"/>

#### JobsView
<img src="https://user-images.githubusercontent.com/31913666/161512427-bf2e92fd-6f00-4ebb-a0a3-3c34241a285a.png" width="300"/>

#### AskView
<img src="https://user-images.githubusercontent.com/31913666/161512431-907c2306-7ca2-4ada-a0a4-48228d5212b5.png" width="300"/>


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
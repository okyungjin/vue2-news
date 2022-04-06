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
  - [Mixin](#mixin)
  - [Router 네비게이션 가드](#router-네비게이션-가드)
    - [데이터 호출 시점](#데이터-호출-시점)
    - [beforeEnter](#beforeenter)
  - [JavaScript 비동기 처리 패턴](#javascript-비동기-처리-패턴)
    - [Callback](#callback)
    - [Promise](#promise)
      - [example 1](#example-1)
      - [example 2](#example-2)
    - [async / await](#async--await)
      - [기본 문법](#기본-문법)
      - [example](#example)
      - [await 에러 핸들링](#await-에러-핸들링)
  - [async / await store에 적용하기](#async--await-store에-적용하기)
    - [Promise](#promise-1)
    - [async / await](#async--await-1)
  - [Error Handling](#error-handling)
  - [Vue에서 DOM에 접근하기 (ref 속성 사용)](#vue에서-dom에-접근하기-ref-속성-사용)
  - [Plugins](#plugins)
    - [Chart Plugin 생성](#chart-plugin-생성)
    - [Chart Plugin 등록](#chart-plugin-등록)
    - [Chart Plugin 사용](#chart-plugin-사용)
  - [컴포넌트 디자인 패턴](#컴포넌트-디자인-패턴)
  - [Slot](#slot)
    - [Slot 사용](#slot-사용)
    - [Slot 미사용](#slot-미사용)
    - [그렇다면 왜 Slot을 사용하는가?](#그렇다면-왜-slot을-사용하는가)
  - [props는 read-only로 사용한다](#props는-read-only로-사용한다)
    - [잘못된 사용](#잘못된-사용)
    - [수정 후](#수정-후)
  - [render function](#render-function)
    - [div 태그 이하에 서술](#div-태그-이하에-서술)
    - [template에 서술](#template에-서술)
    - [render function 사용](#render-function-사용)
  - [slot-scope](#slot-scope)
  - [서비스 배포하기](#서비스-배포하기)
    - [build](#build)
    - [netlify 이용하여 배포하기](#netlify-이용하여-배포하기)
- [Troubleshooting](#troubleshooting)
  - [throw 사용 시 오류 발생](#throw-사용-시-오류-발생)
    - [오류](#오류)
    - [해결 방법](#해결-방법)
  - [npm i vuex 실행 시 오류](#npm-i-vuex-실행-시-오류)
    - [오류](#오류-1)
    - [해결 방법](#해결-방법-1)
  - [[ESLint] Prefer default export.(import/prefer-default-export)](#eslint-prefer-default-exportimportprefer-default-export)
    - [오류](#오류-2)
    - [해결 방법](#해결-방법-2)
  - [[ESLint] Arrow function should not return assignment.(no-return-assign)](#eslint-arrow-function-should-not-return-assignmentno-return-assign)
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

## Mixin
HOC와 비슷하게 Mixin도 컴포넌트 내부의 로직을 재사용 가능하게 해준다.

`src` 디렉토리 하위에 `mixins` 디렉토리를 생성한 후 Mixin을 작성한다.
아래 소스는 spinner에 대한 mixin이다.
```js
import { END_SPINNER } from '../utils/spinner';
import { bus } from '../utils/bus';

export const spinnerMixin = {
  // created() {}
  // data() {}
  mounted() {
    bus.$emit(END_SPINNER);
  },
};
```
Vue 컴포넌트가 `mounted` 일 때 `bus.$emit(END_SPINNER)`를 실행해주는 모든 컴포넌트에 반복적이다.
이럴 경우 Mixin을 사용하여 코드의 중복을 줄여줄 수 있다.

vue 파일에서 다음과 같이 mixin을 불러온다.
```html
<template>
  생략
</template>

<script>
import ListItem from '../components/ListItem.vue';
import { spinnerMixin } from '../mixins/spinnerMixin';

export default {
  components: {
    ListItem,
  },
  mixins: [spinnerMixin], // Mixin 사용
};
</script>
```
실행해보면 mounted hook에서 spinner가 제거되는 것을 확인할 수 있다.

## Router 네비게이션 가드
### 데이터 호출 시점
데이터 호출 시점은 2가지로 나눌 수 있다.
이번에는 라우터 네비게이션 가드에 대해서 알아보겠다.

1. 라우터 네비게이션 가드
   - 특정 URL로 접근하기 전의 동작을 정의하는 속성(함수)
   - [네비게이션 가드 블로그 글](https://joshua1988.github.io/web-development/vuejs/vue-router-navigation-guards/)
   - [Vue Router 공식 문서 - Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html#navigation-guards) 
2. 컴포넌트 라이프 사이클
   - created: 컴포넌트가 생성되자마자 호출되는 로직

### beforeEnter
`beforeEnter` 속성을 사용하면 라우트가 변경될 때 특정 로직이 실행되도록 설정할 수 있다.
예를 들어, 권한이 없으면 로그인 페이지로 이동하게 하는 등의 로직 구현이 `beforeEnter` 에서 이루어진다.

아래 소스는 라우트가 변경될 때 Spinner를 발생시키는 예시이다.
**`next()` 메서드를 반드시 호출해야 하며, 미호출시 라우트가 전환되지 않는다.**
```js
routes: [
  // 생략
  {
    path: '/news',
    name: 'news',
    component: NewsView,
    beforeEnter: (to, _, next) => {
      bus.$emit(START_SPINNER);
      store.dispatch('FETCH_LIST', to.name)
        .then(() => next())
        .catch((error) => throw new Error(error));
    },
  },
  // 생략
]
```

## JavaScript 비동기 처리 패턴
### Callback
```js
$.get('domain.com/id', function(id) {
  if (id == 'John') {
    $.get('domain.com/products', function(products) {
      console.log(products);
    })
  }
})
```
### Promise
Callback을 사용하지 않고 Promise를 chaining하여 사용하면 코드의 흐름을 이해하기 쉬워진다.
#### example 1
```js
function getId() {
  return new Promise(function(resolve, reject) {
    $.get('domain.com/id', function(id) {
      resolve(id);
    });
  });
}

function getProducts() {
  return new Promise(function(resolve, reject) {
    $.get('domain.com/products', function(products) {
      resolve(products);
    });
  });
}

function logProducts() {
  // ...
}

// Promise Chaining
getId()
  .then(getProducts)
  .then(logProducts)
  .catch()
```

#### example 2
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
### async / await
async / await은 JavaScript 비동기 처리 문법이다.
[Callback](#callback)과 [Promise](#promise)의 단점을 해결하고, 동기적으로 코드를 작성할 수 있도록 해준다.

#### 기본 문법
함수 키워드 앞에 `async` 를 붙인다.
비동기 처리 로직 앞에 `await` 을 붙인다. 단, `await`은 **Promise 객체를 반환**하는 함수 앞에 붙일 수 있다.

```js
async function fetchData() { // ㅎ마수 
  await getUsers(); // await은 Promise 객체를 반환하는 함수 앞에 붙일 수 있다.
}
```
#### example
```js
async function fetchData() {
  const users = await getUsers();
  console.log(users);
}

function getUsers() {
  return new Promise(function(resolve, reject) {
    const users = ['user1', 'user2', 'user3'];
    resolve(users);
  });
}

fetchData() // ['user1', 'user2', 'user3']
```
#### await 에러 핸들링
```js
async loginUser1() {
  try {
    const response = await axios.get('domain.com/id');
    // ...
  } catch (error) {
    handleExeption(error); // 에러 핸들링 공통화
    console.log(error);
  }
}
```

`utils/handler.js`
```js
export const handleException = (error) => {
  // error status에 따라 로직 분리
  throw new Error(error);
};
```
## async / await store에 적용하기
### Promise
```js
FETCH_LIST({ commit }, routeName) {
  return fetchList(routeName)
    .then(({ data }) => {
      commit('SET_LIST', data);
    })
    .catch((err) => throw new Error(err));
}
```

### async / await
```js
async FETCH_LIST({ commit }, routeName) {
  const response = await fetchList(routeName);
  commit('SET_LIST', response.data);
  return response;
}
```

## Error Handling
에러 핸들링은 User와 가까워지는 로직 보다는 내부에서 실행되는 것이 좋다.

`actions.js` 에서도 다음과 같이 `try catch` 를 할 수 있지만, api 로직인 `fetchUser`에서 할 수도 있다.
```js
async FETCH_USER({ commit }, userName) {
  try {
    const response = await fetchUser(userName);
    commit('SET_USER', response.data);
    return response;
  } catch (error) {
    handleException(error);
    return error;
  }
},
```

```js
// api/index.js
const fetchUser = async (userName) => {
  try {
    return await axios.get(`${config.baseUrl}/user/${userName}.json`);
  } catch (error) {
    handleException(error);
    return error;
  }
};

// store/actions.js
async FETCH_USER({ commit }, userName) {
  const response = await fetchUser(userName);
  commit('SET_USER', response.data);
  return response;
}
```
## Vue에서 DOM에 접근하기 (ref 속성 사용)

`ref` 속성을 사용하여 DOM에 접근할 수 있다.

**컴포넌트 단위로 존재하기 때문에 전역 tag로 접근하는  `getElementById`와 `querySelector` 보다는 `ref`를 사용하는 것이 좋다.**

`ref`를 `app`으로 지정하면 `this.$refs.app` 과 같이 접근할 수 있다.

```html
<html>
<head>

</head>
<body>
  <div ref="app" id="app">hello</div>
  <script>
    // divElement 1 ~ 4는 같다
    const divElement1 = document.getElementById('app');
    const divElement2 = document.querySelector('#app');
    const divElement3 = $('#app'); // jquery
    const divElement4 = this.$refs.app; 
  </script>
</body>
</html>
```

## Plugins
### Chart Plugin 생성
```js
// src/plugins/chartPlugin.js
import Chart from 'chart.js';

export default {
  install(Vue) {
    Vue.prototype.$_Chart = Chart;
  },
};
```

### Chart Plugin 등록
`Vue.use()`가 실행되면서 Plugin의 `install()`이 실행된다.
```js
// src/main.js
import chartPlugin from './plugins/chartPlugin';

Vue.use(chartPlugin);
```
### Chart Plugin 사용
위와 같이 plugin을 등록하면 아래처럼 사용할 수 있다.
이제 컴포넌트마다 `chart.js`를 import 하지 않아도 된다.
```js
// BarChart.vue
this.$_Chart;

// LineChart.vue
this.$_Chart;
```
## 컴포넌트 디자인 패턴
1. Common - 기본적인 컴포넌트 등록과 컴포넌트 통신
2. Slot - 마크업 확장이 가능한 컴포넌트
3. Controlled - 결합력이 높은 컴포넌트
4. Renderless - 데이터 처리 컴포넌트

## Slot
Slot을 사용하면 마크업 확장이 가능하여, 유연한 컴포넌트를 생성할 수 있다.

### Slot 사용
다음은 Slot을 사용한 예시이다.

`App.vue`
```html
<template>
  <div>
    <ul>
      <item>아이템 1</item>
      <item>아이템 2</item>ㄴ
      <item>아이템 3</item>
      <item>아이템 4</item>
      <item>아이템 5</item>
      <!-- <item>
        아이템 2 <button>click me</button>
      </item> -->
    </ul>
  </div>
</template>

<script>
import Item from './Item.vue';

export default {
  components: {
    Item,
  },
}
</script>
```

`Item.vue`
```html
<template>
  <li>
    <slot>
      <!-- NOTE: 등록하는 곳에서 정의할 화면 영역 -->
    </slot>
  </li>
</template>
```

### Slot 미사용
물론 Slot을 사용하지 않고 동일한 화면을 렌더링 할 수 있다.

`App.vue`
```html
<template>
  <div>
    <ul>
      <item v-for="item in items" :key="item"></item>
      <item>아이템 1</item>
      <item>아이템 2</item>
      <item>아이템 3</item>
      <item>아이템 4</item>
      <item>아이템 5</item>
    </ul>
  </div>
</template>

<script>
import Item from './Item.vue';

export default {
  components: {
    Item,
  },
  data() {
    return {
      items: ['아이템1', '아이템2', '아이템3', '아이템4', '아이템5'],
    }
  }
}
</script>
```

`Item.vue`
```html
<template>
  <div>
    <ul>
      <li v-for="item in items">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>
```
### 그렇다면 왜 Slot을 사용하는가?
그렇다면 [Slot 미사용](#slot-미사용)처럼 구현하면 되는데, 왜 굳이 Slot을 사용하는 걸까?

> Slot을 사용하면 요구사항 변경 등에 대해 유연하게 대응할 수 있다.

Item에 버튼도 넣도록 요구사항이 추가되었다고 가정하자.
[Slot 사용](#slot-사용) 구조로는 대응하기가 쉽지 않다.

Slot을 사용했다면 다음과 같이 변경이 가능하다.

`App.vue`
```html
<template>
  <div>
    <ul>
      <item>아이템 1</item>
      <item>아이템 2</item>
      <item>아이템 3</item>
      <item>아이템 4</item>
      <item>
        아이템 5 <button>click me</button>
      </item>
    </ul>
  </div>
</template>

<script>
import Item from './Item.vue';

export default {
  components: {
    Item,
  },
}
</script>
```

## props는 read-only로 사용한다
### 잘못된 사용
`App.vue`

```html
<template>
  <check-box :checked="checked"></check-box>
</template>

<script>
import CheckBox from './components/CheckBox.vue';

export default {
  components: {
    CheckBox
  },
  data(){
    return {
      checked: true
    }
  }
}
</script>
```

`CheckBox.vue`

```html
<template>
  <input type="checkbox" v-model="checked">
</template>

<script>
export default {
  props: ['checked'],
}
</script>
```

### 수정 후
CheckBox의 데이터를 상위 컴포넌트인 App에서 관리하도록 변경한다.

> **[잘못된 사용](#잘못된-사용)과의 차이점**
> props를 CheckBox에서 변경하지 않고, 이벤트로 상위 컴포넌트에게 변경을 요청했기 때문이다.
> CheckBox는 변경된 값을 다시 props로 받았기 때문에 오류가 발생하지 않는다.

`App.vue`

```html
<template>
  <check-box v-model:value="checked"></check-box>
</template>

<script>
import CheckBox from './components/CheckBox.vue';

export default {
  components: {
    CheckBox
  },
  data(){
    return {
      checked: true
    }
  }
}
</script>
```

`CheckBox.vue`

```html
<template>
  <input type="checkbox" :value="value" @click="toggleCheckBox">
</template>

<script>
export default {
  // @input 이벤트
  // :value 값
  props: ['value'],
  methods :{
    toggleCheckBox(){
      this.$emit('input', !this.value)
    }
  }
}
</script>
```
## render function
### div 태그 이하에 서술 
```html
<html>
<head>생략</head>
<body>
  <div id="app">
    <p>{{ message }}</p>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue',
      },
    });
  </script>
</body>
</html>
```

### template에 서술

```html
<html>
<head>생략</head>
<body>
  <div id="app"></div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue',
      },
      template: '<p>{{ message }}</p>'
    });
  </script>
</body>
</html>
```
### render function 사용
```html
<html>
<head>생략</head>
<body>
  <div id="app"></div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue',
      },
      render: function(createElement) {
        return createElement('p', this.message);
        // createElement('태그 이름', '태그 속성', '하위 태그 내용');
      }
    });
  </script>
</body>
</html>
```

## slot-scope
`App.vue`
```html
<template>
  <div>
    <fetch-data url="https://jsonplaceholder.typicode.com/users/1">
      <!-- ... response, loading 을 가져올수 있다-->
      <div v-slot="{response, loading}">
        <div v-if="!loading">
          <p>{{response.name}}</p>
          <p>{{response.email}}</p>
        </div>
        <div v-if="loading">
          loading...
        </div>
      </div>
    </fetch-data>
  </div>
</template>

<script>
import FetchData from './components/FetchData.vue'

export default {
  components: {
    FetchData
  },
}
</script>
```
`FetchData.vue`

```html
<script>
import axios from 'axios';

export default {
  props: ['url'],
  data() {
    return {
      response: null,
      loading: true,
    }
  },
  created() {
    axios.get(this.url)
      .then(response => {
        this.response = response.data;
        this.loading = false;
      })
      .catch(error => {
        alert('[ERROR] fetching the data', error);
        console.log(error);
      });
  },
  render() {
    // 하위 컴포넌트에서 상위컴포넌트로 올린다 $scopedSlots
    // slot -> v-slot // $scopedSlots.default -> $slots.default
    return this.$scopedSlots.default({
      response: this.response,
      loading: this.loading,
    });
  },
}
</script>
```

## 서비스 배포하기
### build
`npm run build` 명령어를 실행하면 `dist` 하위에 호스팅할 수 있는 정적 파일이 생성된다.

### netlify 이용하여 배포하기


  
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

## npm i vuex 실행 시 오류
### 오류
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
### 해결 방법
`npm i vuex` 로 설치할 경우 최신 버전이 설치되는데, 사용하고 있는 vue 버전이 2.x 라서 발생하는 오류이다. vuex 버전을 명시하여 설치해주면 해결된다.
```
npm i vuex@3.6.2
```
## [ESLint] Prefer default export.(import/prefer-default-export)
### 오류
```
ESLint: Prefer default export.(import/prefer-default-export)
```
### 해결 방법
`.eslintrc.js`에 rule 추가
```diff
module.exports = {
  rules: {
+   "import/prefer-default-export": "off",
  }
}
```

## [ESLint] Arrow function should not return assignment.(no-return-assign)
### 오류
```js
fetchNewsList()
  .then((res) => this.users = res.data) // ERROR
  .catch((err) => throw new Error(err));
```
### 해결 방법
```js
fetchNewsList()
  .then((res) => { this.users = res.data; }) // braket으로 감싸기
  .catch((err) => throw new Error(err));
```
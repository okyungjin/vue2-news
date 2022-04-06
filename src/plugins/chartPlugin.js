import Chart from 'chart.js';

export default {
  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$_Chart = Chart;
  },
};

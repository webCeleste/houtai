import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
 
Vue.config.productionTip = false

// 配置 混入
import '@/utils/mixin.js'  
import '@/utils/filters.js'  

// 配置 ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 配置 reset.scss后期用来重置整个项目的样式
import '@/assets/css/reset.scss'
import '@/assets/css/transition.scss'

// 模块 网站动画 animated
import animated from 'animate.css'
Vue.use(animated)
// 模块 粒子特效
import VueParticles from 'vue-particles'  
Vue.use(VueParticles)  
// 模块 编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
Vue.use(VueQuillEditor)
// 模块 图表echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

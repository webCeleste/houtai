import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入公共组件
import state from '@/store/common/state.js'
import users from '@/store/users/index.js'
 
export default new Vuex.Store({
  state,
  mutations: {
  },
  actions: {
  },
  
  modules: {
    users            
  }
})

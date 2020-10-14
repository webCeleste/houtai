// 导入模块
import axios from 'axios'
import qs from 'qs'

// 列表 
const get = params => {  // params = {pagenum,pagesize}
    return axios.get('goods/type/index.php', {params:params}).then(res => res.data)
}
// 创建
const post = params => {  // params = {type_name}
    return axios.post('goods/type/create.php', qs.stringify(params)).then(res => res.data)
}

// 状态
const state = params => {  // params = {type_id,state}
    return axios.put('goods/type/state.php', qs.stringify(params)).then(res => res.data)
}

export default {
    get,
    post,
    state,
}
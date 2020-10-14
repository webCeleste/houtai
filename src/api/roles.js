// 导入模块
import axios from 'axios'
import qs from 'qs'

// 列表 
const get = () => {  // 
    return axios.get('roles/index.php', {}).then(res => res.data)
}

// 创建
const post = params => {  // params = {role_name,role_describe}
    return axios.post('roles/create.php', qs.stringify(params)).then(res => res.data)
}

// 授权
const assign = params => {  // params = {role_id,auth_ids,auth_ids_son}
    return axios.put('roles/assign.php', qs.stringify(params)).then(res => res.data)
}

export default {
    get,
    post,
    assign,
}
// 导入模块
import axios from 'axios'
import qs from 'qs'

// 访客记录
const history = params => {  // params = {pagenum,pagesize,start_time,end_time}
    return axios.get('users/history.php', {params:params}).then(res => res.data)
} 

// 列表 
const get = params => {  // params = {pagenum,pagesize,uname,start_time,end_time}
    return axios.get('users/index.php', {params:params}).then(res => res.data)
}

// 创建
const post = params => {  // params = {username, password, question, answer}
    return axios.post('users/create.php', qs.stringify(params)).then(res => res.data)
}

// 更新
const assign = params => {  // params = {user_id, role_id}
    return axios.put('users/assign.php', qs.stringify(params)).then(res => res.data)
}

// 状态
const state = params => {  // params = {user_id, state}
    return axios.put('users/state.php', qs.stringify(params)).then(res => res.data)
}

// 登录
const login = params => {  // params = {uname, pwd, question, answer}
    return axios.post('users/login.php', qs.stringify(params)).then(res => res.data)
}

// 删除
const del = params => {  // params = {user_id}
    return axios.delete('users/delete.php', {params}).then(res => res.data)
}

// 扫码登录
const check = params => {  // params = {state}
    return axios.post('qr/check.php', qs.stringify(params)).then(res => res.data)
}
 
export default {
    check,
    del,
    history,
    get,
    post,
    assign,
    state,
    login,
}
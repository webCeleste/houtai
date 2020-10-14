// 导入模块
import axios from 'axios'
import qs from 'qs'
 
// 列表
const get = params => {  // params = {pagenum,pagesize,level}
    return axios.get('cate/index.php', {params:params}).then(res => res.data)
}

// 创建
const post = params => {  // params = {cat_name, parent_id, keywords, url}
    return axios.post('cate/create.php', qs.stringify(params)).then(res => res.data)
}

// 删除
const del = params => { // params = {cat_id}
    return axios.delete('cate/delete.php', {params:params}).then(res => res.data)
}

// 编辑
const put = params => { // params = {cat_id, cat_name, parent_id, keywords, url}
    return axios.put('cate/update.php', {params:params}).then(res => res.data)
}

export default {
    get,
    post,
    del,
    put,
}
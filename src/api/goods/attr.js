// 导入模块
import axios from 'axios'
import qs from 'qs' 

// 列表
const get = params => {  // params = {pagenum,pagesize,type_id}
    return axios.get('goods/attr/index.php', {params:params}).then(res => res.data)
}
// 创建
const post = params => {  // params = {cat_id,attr_name,input_select,only_many,attr_values}
    return axios.post('goods/attr/create.php', qs.stringify(params)).then(res => res.data)
}

export default {
    get,
    post,
}
// 导入模块
import axios from 'axios'
import qs from 'qs'

// 列表 
const get = params => {  // params = {pagenum,pagesize,start_time,end_time,goods_name,is_delete}
    return axios.get('goods/index.php', {params:params}).then(res => res.data)
}

// 创建
const post = params => {  // params = {goods_name, goods_number, market_price, shop_price, cat_id, thumb, goods_desc, gallery}
    return axios.post('goods/create.php', qs.stringify(params)).then(res => res.data)
}

// 状态
const state = params => {  // params = {goods_id,state,key}
    return axios.put('goods/state.php', qs.stringify(params)).then(res => res.data)
}

export default {
    get,
    post,
    state,
}
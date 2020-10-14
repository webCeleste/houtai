// 导入模块
import axios from 'axios'
import qs from 'qs'

// 列表
const get = params => {  // params = {pagenum,pagesize,start_time,end_time,order_sn,consignee,uname,is_delete}
    return axios.get('orders/index.php', {params:params}).then(res => res.data)
}

// 统计
const total = params => {  // params = {consignee,start_time,end_time}
    return axios.get('orders/total.php', {params:params}).then(res => res.data)
}
 
export default {
    get,
    total,
}
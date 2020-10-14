// 导入模块
import axios from 'axios'

// 列表
const get = () => { 
    return axios.get('auth/index.php', {}).then(res => res.data)
}

const menu = () => { 
    return axios.get('auth/menu.php', {}).then(res => res.data)
}

export default {
    get,
    menu,
}
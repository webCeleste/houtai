// 1. 引入模块
import axios from 'axios'
import router from '@/router'
import {Message} from 'element-ui'
import { showLoading, hideLoading } from '@/utils/loading';


// 2. 配置-统一请求接口网址
axios.defaults.baseURL = '/api/';

// 3. 配置-拦截器
 
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 拦截所有请求  发送之前就加一些东西

    // 1. 验证
    let token = localStorage.getItem('token')
    config.headers['token'] = token
    // 2. 编码
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // 3. loading  TODO. 扫码不需要loading
    if (config.url != 'qr/check.php') showLoading()

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 1. 隐藏loading
    hideLoading() 
    // 2. 提示
    if (response.data.meta.msg == 'TOKEN有误')
    {
        Message({
            showClose: true,
            message: "糟糕TOKEN已过期请重新登录",
            type: "error"
        });
        return router.push({path:'/login'})
    }
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// 4. 导出
// axios.get('请求路径', {headers: {}, params: {键:值,...,键:值}})
// axios.delete('请求路径', {headers: {}, params: {键:值,...,键:值}})
// axios.post('请求路径', 数据对象)
// axios.put('请求路径', 数据对象)
// -----------------------------
// axios.post('请求路径', qs.stringify(数据对象))
// axios.put('请求路径', qs.stringify(数据对象))

import goodsCateApi from './goods/cate'
import goodsTypeApi from './goods/type'
import goodsAttrApi from './goods/attr'
import goodsApi from './goods/index'
import ordersApi from './orders'
import usersApi from './users'
import rolesApi from './roles'
import authsApi from './auths'

export {
    goodsCateApi,
    goodsTypeApi,
    goodsAttrApi,
    goodsApi,
    ordersApi,
    usersApi,
    rolesApi,
    authsApi,
}

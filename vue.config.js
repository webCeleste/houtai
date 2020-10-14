module.exports = {
    devServer: {
        proxy: {  //配置跨域
          '/api': {
            target: 'http://kg.zhaodashen.cn/v2/', 
            changOrigin: true,  //允许跨域
            pathRewrite: {
              '^/api': '' 
            }
          },
        }
    },
}
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [ 
  // Admin 
  {
    path: '/', 
    component: () => import('../views/admin/Index.vue'),
    children: [
      { path: 'welcome', alias: '/', component: () => import('../views/admin/Welcome.vue'), meta: {name1: "后台首页", name2: "欢迎页"}},
      { path: 'history', component: () => import('../views/users/History.vue'), meta: {name1: "后台首页", name2: "访客记录"} },
      
      { path: 'goods', component: () => import('../views/goods/Index.vue'), meta: {name1: "商品管理", name2: "列表"} },
      { path: 'goods/create', component: () => import('../views/goods/Create.vue'), meta: {name1: "商品管理", name2: "创建"} },
      { path: 'goods/recycle', component: () => import('../views/goods/Recycle.vue'), meta: {name1: "商品管理", name2: "创建"} },

      { path: 'goods/cate', component: () => import('../views/goods/cate/Index.vue'), meta: {name1: "商品分类", name2: "列表"} },
      { path: 'goods/cate/create', component: () => import('../views/goods/cate/Create.vue'), meta: {name1: "商品分类", name2: "创建"} },
      
      { path: 'goods/type', component: () => import('../views/goods/type/Index.vue'), meta: {name1: "商品类型", name2: "列表"} },
      { path: 'goods/type/create', component: () => import('../views/goods/type/Create.vue'), meta: {name1: "商品类型", name2: "创建"} },
      
      { path: 'goods/attr', component: () => import('../views/goods/attr/Index.vue'), meta: {name1: "商品属性", name2: "列表"} },
      { path: 'goods/attr/create', component: () => import('../views/goods/attr/Create.vue'), meta: {name1: "商品属性", name2: "创建"} },
      
      { path: 'orders', component: () => import('../views/orders/Index.vue'), meta: {name1: "订单管理", name2: "列表"} },
      { path: 'orders/total', component: () => import('../views/orders/Total.vue'), meta: {name1: "订单管理", name2: "订单统计"} },
      { path: 'orders/recycle', component: () => import('../views/orders/Recycle.vue'), meta: {name1: "订单管理", name2: "回收站"} },
 
      { path: 'users', component: () => import('../views/users/Index.vue'), meta: {name1: "用户管理", name2: "列表"} },
      { path: 'users/create', component: () => import('../views/users/Create.vue'), meta: {name1: "用户管理", name2: "创建"} },
      { path: 'roles', component: () => import('../views/roles/Index.vue'), meta: {name1: "角色管理", name2: "列表"} },
      { path: 'roles/create', component: () => import('../views/roles/Create.vue'), meta: {name1: "角色管理", name2: "创建"} },
      { path: 'auths', component: () => import('../views/auths/Index.vue'), meta: {name1: "权限管理", name2: "列表"} }, 
    ]
  }, 
  // Login
  { path: '/login', component: () => import('../views/users/Login.vue') },
  { path: '/login1', component: () => import('../views/users/Login1.vue') },
  { path: '/login2', component: () => import('../views/users/Login2.vue') },
  { path: '/login3', component: () => import('../views/users/Login3.vue') },
  { path: '/404', component: () => import('../views/404.vue') },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 全局前置守卫
// 在Router实例上进行守卫
router.beforeEach((to, from, next) => {
  if (
    to.path == '/login' || to.path == '/login1' || to.path == '/login2' || to.path == '/login3' ||
    to.path == '/404'
  ) {
    next()
  } else {
    let token = localStorage.getItem('token')
    if (!token) return next({path:'/login1'})
    next()
  }
})

export default router

<template>
<div class="admin">
    <!-- 左侧导航 --> 
    <div class="menu" v-bind:style="{width: menuWStyle}">
        <!-- <el-radio-group v-model="isHiddenMenu" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <el-menu 
            :default-active="$route.path" 
            class="el-menu-vertical-demo"
            :collapse="isHiddenMenu"
            :collapse-transition="false"
            background-color="#263445"
            text-color="rgb(191, 203, 217)"
        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">后台首页</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/welcome" @click="jump('/welcome')"><i class="el-icon-setting"></i>欢迎页</el-menu-item>
                    <el-menu-item index="/history" @click="jump('/history')"><i class="el-icon-setting"></i>访客记录</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">商品分类</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/goods/cate" @click="jump('/goods/cate')"><i class="el-icon-setting"></i>分类列表</el-menu-item>
                    <el-menu-item index="/goods/cate/create" @click="jump('/goods/cate/create')"><i class="el-icon-setting"></i>分类创建</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">商品属性</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/goods/type" @click="jump('/goods/type')"><i class="el-icon-setting"></i>商品类型</el-menu-item>
                    <el-menu-item index="/goods/type/create" @click="jump('/goods/type/create')"><i class="el-icon-setting"></i>类型创建</el-menu-item>
                    <el-menu-item index="/goods/attr" @click="jump('/goods/attr')"><i class="el-icon-setting"></i>商品属性</el-menu-item>
                    <el-menu-item index="/goods/attr/create" @click="jump('/goods/attr/create')"><i class="el-icon-setting"></i>属性创建</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">商品管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/goods" @click="jump('/goods')"><i class="el-icon-setting"></i>商品列表</el-menu-item>
                    <el-menu-item index="/goods/create" @click="jump('/goods/create')"><i class="el-icon-setting"></i>商品创建</el-menu-item>
                    <el-menu-item index="/goods/recycle" @click="jump('/goods/recycle')"><i class="el-icon-setting"></i>商品回收站</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">订单管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/orders" @click="jump('/orders')"><i class="el-icon-setting"></i>订单列表</el-menu-item>
                    <el-menu-item index="/orders/recycle" @click="jump('/orders/recycle')"><i class="el-icon-setting"></i>订单回收站</el-menu-item>
                    <el-menu-item index="/orders/total" @click="jump('/orders/total')"><i class="el-icon-setting"></i>订单统计</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
             
            <el-submenu index="6">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户管理</span>
                </template> 
                <el-menu-item-group>
                    <el-menu-item index="/users" @click="jump('/users')"><i class="el-icon-setting"></i>用户列表</el-menu-item>
                    <el-menu-item index="/users/create" @click="jump('/users/create')"><i class="el-icon-setting"></i>用户创建</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            
            <el-submenu index="7">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">角色管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/roles" @click="jump('/roles')"><i class="el-icon-setting"></i>角色列表</el-menu-item>
                    <el-menu-item index="/roles/create" @click="jump('/roles/create')"><i class="el-icon-setting"></i>角色创建</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            
            <el-submenu index="8">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">权限管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/auths" @click="jump('/auths')"><i class="el-icon-setting"></i>权限列表</el-menu-item>
                    <!-- <el-menu-item index="/auths/create" @click="jump('/auths/create')"><i class="el-icon-setting"></i>权限创建</el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
    </div>
    <!-- /左侧导航 -->
    <!-- 右侧内容 -->
    <div class="main">
        <!-- 顶部 -->
        <div class="top">
            <div class="l">
                <div class="btn" @click="changeMenuFn">
                    <!-- <i class="el-icon-s-fold"></i> -->
                    <i v-bind:class="changeMenuIcon"></i>
                </div>
                <div class="breadcrumb">
                    <Breadcrumb v-bind:name1="name1" v-bind:name2="name2" />
                </div>
            </div>
            <div class="r">
                <span>李四（超级管理员）</span>
                <i class="el-icon-switch-button"></i>
                <i class="el-icon-full-screen"></i>
            </div>
        </div>
        <!-- /顶部 -->
        <!-- 内容 -->
        <div class="content">
            <transition appear name="fade-transform" mode="out-in">
                <router-view />
            </transition>
        </div>
        <!-- /内容 -->
    </div>
    <!-- /右侧内容 -->
</div>
</template>

<script>
// 导入面包屑组件
import Breadcrumb from '@/components/Breadcrumb.vue' 

// 导入接口
import {authsApi} from '@/api'

// 导出组件数据
export default {
    components: {
        Breadcrumb
    },
    created() {
        // console.log(this.$router.app._route.meta)
        this.name1 = this.$router.app._route.meta.name1
        this.name2 = this.$router.app._route.meta.name2

        // 获取菜单
        authsApi.get()
        .then(res => {
            console.log(res.data)
        })
    },
    watch: {
        // 监控路由数据变化重置面包屑
        $route(newData, oldData) {
            this.name1 = newData.meta.name1
            this.name2 = newData.meta.name2
        }
    },
    data() {
        return {
            // 面包屑
            name1: '后台首页',
            name2: '欢迎页',
            changeMenuIcon: 'el-icon-s-fold',  // 菜单默认图标
            menuWStyle: '200px', // 菜单默认宽度
            isHiddenMenu: false, // 是否隐藏菜单
        };
    },
    methods: {
        // 控制菜单隐藏显示
        changeMenuFn() 
        {
            this.isHiddenMenu = !this.isHiddenMenu
            this.menuWStyle = this.isHiddenMenu ? '64px' : '200px'
            this.changeMenuIcon = this.isHiddenMenu ? 'el-icon-s-unfold' : 'el-icon-s-fold'
        }
    }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.admin {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    overflow-x: hidden;

    // 左侧导航
    .menu {
        width: 200px;
        height: 100%;
        background: #263445;
        overflow: hidden;
        // TODO. 自己搞动画 :collapse-transition="false"
        -webkit-transition: width .28s;
        transition: width .28s;

        ul {border: none;}
    }

    // 右侧内容
    .main {
        flex: 1;
        overflow-x: hidden;
        overflow-y: scroll;
        // background: red;

        // 顶部
        .top {
            width:100%;
            height: 50px;
            overflow: hidden;
            margin-bottom: 30px;
            -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
            box-shadow: 0 1px 4px rgba(0,21,41,.08);
            
            .l {
                float: left;
                width: 300px;
                height: 100%;
                // background: green;
                display: flex;
                
                .btn { width: 50px; height: 50px; line-height: 50px; text-align: center;font-size: 24px;}
                .btn:hover {  background: rgba(0,0,0,.025); cursor: pointer;}
                .breadcrumb { width: 200px; height: 50px; line-height: 50px; }
            }
            .r {
                width: 240px;
                height: 100%;
                // background: blue;
                float: right;
                font-size: 20px;
                display: flex;
                justify-content: center;
                align-items: center;

                span { font-size: 16px; margin-top: -3px; }
                i {margin: 0px 5px;}
                i:hover { cursor: pointer; color: #409EFF; }
            }
        }
        // 内容
        .content {
            width: 96%;
            height: 80%;
            width: 96%;
            height: 80%;
            min-height: 100px;
            margin: auto;
            // overflow-x: hidden;
            // background: yellow;
        }
    }
}
</style>
<template>
<div class="admin">
    <!-- 左侧导航 -->
    <div class="menu">
 
    </div>
    <!-- /左侧导航 -->
    <!-- 右侧内容 -->
    <div class="main">
        <!-- 顶部 --> 
        <div class="top">
            <div class="l">
                <div class="btn"></div>
                <div class="breadcrumb"></div>
            </div>
            <div class="r"></div>
        </div>
        <!-- /顶部 -->
        <!-- 内容 -->
        <div class="content">
            <div style="padding-top: 10000px;">111</div>
        </div>
        <!-- /内容 -->
    </div>
    <!-- /右侧内容 -->
</div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
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
        background: #304156;
        overflow: hidden;
    }

    // 右侧内容
    .main {
        flex: 1;
        overflow-y: scroll;
        background: red;

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
                background: green;
                display: flex;
                
                .btn { width: 50px; height: 50px; line-height: 50px; text-align: center;font-size: 24px;}
                .btn:hover {  background: rgba(0,0,0,.025); cursor: pointer;}
                .breadcrumb { width: 200px; height: 50px; line-height: 50px; }
            }
            .r {
                width: 75px;
                height: 100%;
                background: blue;
                float: right;
            }
        }
        // 内容
        .content {
            width: 96%;
            height: 80%;
            min-height: 100px;
            margin: auto;
            background: yellow;
        }
    }
}
</style>
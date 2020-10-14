<template>
<div class="list">
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix">
            <span>访客记录</span>
        </div>

        <!-- 筛选 --> 
        <div class="filter">
            <el-input placeholder="请输入用户名" v-model="search">
                <el-button slot="append" icon="el-icon-search" @click="initData"></el-button>
            </el-input>
             
            <el-date-picker
            @change="changeDate" 
            v-model="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="登录开始日期"
            end-placeholder="登录结束日期">
            </el-date-picker>
        </div>
        <!-- /筛选 -->
        
        <!-- 表格 -->
        <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">
                <el-table-column
                prop="id"
                label="编号"
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                prop="username"
                label="用户"
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                label="登录方式"
                align="center"
                width="100">
                    <template slot-scope="item">
                        <el-tag v-if="item.row.type == '密保'">{{item.row.type}}</el-tag>
                        <el-tag v-if="item.row.type == '短信'" type="success">{{item.row.type}}</el-tag>
                        <el-tag v-if="item.row.type == '扫码'" type="info">{{item.row.type}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                prop="city"
                label="登录城市"
                align="center"
                width="120">
                </el-table-column>
                <el-table-column
                prop="login_time"
                align="center"
                label="登录时间">
                </el-table-column>
                <el-table-column
                prop="prev_login_time"
                align="center"
                label="上一次登录时间">
                </el-table-column>
        </el-table>
        <!-- /表格 -->

        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagetotal">
        </el-pagination>
        <!-- /分页 -->
    </el-card>
</div>
</template>
<script>
// 导入接口
import {usersApi} from '@/api'

// 导出组件数据
export default {
    created() {
        this.initData()
    },
    methods: {
      // 日期发生改变
      changeDate() {
        this.start_time = this.date ? this.date[0] : ''
        this.end_time = this.date ? this.date[1] : ''
        this.initData()
      },
      // 初始化数据
      initData() {
          // loading
          this.loading = true
          // data
          usersApi.history({
              pagenum: this.pagenum,
              pagesize: this.pagesize,
              uname: this.search,
              start_time: this.start_time,
              end_time: this.end_time,
          })
          .then(res => {
              // loading
              this.loading = false
              // data
              this.tableData = res.data.list
              this.pagetotal = parseInt(res.data.total)
          })
      },
      // 切换每页条数
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = val
        this.initData()
      },
      // 切换分页
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pagenum = val
        this.initData()
      }
    },
    data() 
    {
        return {
            // 搜索
            search: '',
            date: [],
            start_time: '',
            end_time: '',
            // 分页
            pagenum: 1,
            pagesize: 5,
            pagetotal: 100,
            // 默认数据
            tableData: []
        }
    }
}
</script>
<style lang="scss" scoped>
.list {
    // 筛选
    .filter {
        margin-bottom: 20px;
        overflow: hidden;
        
        // 搜索框
        .el-input {
            width: 300px;
            float: left;
        }
        
        // 日期
        .el-date-editor {float: right;}
    } 

    // 分页
    .el-pagination {
        width: 100%;
        padding: 10px 0px;
        background: #EBEEF5;
        text-align: right;
        margin-top: 10px;
        padding-right: 10px;    
        box-sizing:border-box;
    }
}
</style>
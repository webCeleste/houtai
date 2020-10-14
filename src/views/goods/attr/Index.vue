<template>
<div class="list">
    <!-- 卡片组件 -->
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>商品属性</span>
            <el-button type="primary" round @click="jump('/goods/type')">返回</el-button>
            <el-button type="primary" round @click="jump('/goods/attr/create')">创建</el-button>
        </div>
         
        <!-- 表格 -->
        <el-table
            :data="tableData"
            stripe
            border
            row-key="id"
            style="width: 100%">

                <el-table-column
                prop="cat_name"
                align="center"
                label="所属商品类型"
                width="120">
                </el-table-column>

                <el-table-column
                prop="attr_id"
                label="编号"
                align="center"
                width="80">
                </el-table-column>

                <el-table-column
                prop="attr_name"
                label="属性名称"
                align="center"
                width="140">
                </el-table-column>

                <el-table-column
                label="数量"
                align="center"
                width="140">
                    <template slot-scope="item">
                        {{item.row.only_many == 'only' ? '单选属性': '多选属性'}}
                    </template>
                </el-table-column>

                <el-table-column
                label="录入方式"
                align="center"
                width="120">
                    <template slot-scope="item">
                        {{item.row.input_select == 'input' ? '手工录入': '下拉选择'}}
                    </template>
                </el-table-column>
                
                <el-table-column
                label="可选值"
                align="center"
                width="200">
                    <template slot-scope="item">
                        <el-tooltip class="item" effect="dark" v-bind:content="item.row.attr_values" placement="top-start">
                         <span>{{item.row.attr_values | substrFilter}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                
                <el-table-column label="操作">
                    <template slot-scope="item">
                        <el-button type="primary" icon="el-icon-edit" circle></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle></el-button>
                    </template>
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
    <!-- /卡片组件 -->
</div>
</template>
<script>
// 导入接口
import {goodsAttrApi} from '@/api'

// 导出组件数据
export default {
    created() {
        // 商品类型 - 对应属性
        if (this.$router.currentRoute.query.tid) this.type_id = this.$router.currentRoute.query.tid
        // 重新获取数据
        this.initData()
    },
    methods: {
      // 初始化数据
      initData() {
          // loading
          this.loading = true
          // data
          goodsAttrApi.get({
              pagenum: this.pagenum,
              pagesize: this.pagesize,
              type_id: this.type_id,
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
            // 分页
            type_id: 0,
            pagenum: 1,
            pagesize: 5,
            pagetotal: 0,
            // 默认数据
            loading: false,
            tableData: []
        }
    }
}
</script>

<style lang="scss" scoped>
.list {

    // 卡片组件
    .el-card 
    {
        // 头部
        .header .el-button {
            float:right;
            margin-top: -10px;
            margin-left: 10px;
        }

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
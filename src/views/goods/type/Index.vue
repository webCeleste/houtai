<template>
<div class="list">
    <!-- 卡片组件 -->
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>商品类型</span>
            <el-button type="primary" round @click="jump('/goods/type/create')">创建</el-button>
        </div>
        
        <!-- 表格 --> 
        <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            row-key="cat_id"
            style="width: 100%">
                <el-table-column
                prop="cat_id"
                label="编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="cat_name"
                label="分类名称"
                width="160">
                </el-table-column>

                <el-table-column label="状态" width="100">
                    <template slot-scope="item">
                        <el-switch
                            @change="handleChange($event,item.row)"
                            v-model="item.row.state"
                            active-value="1"
                            inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="item">
                        <el-button type="primary" @click="jump('/goods/attr?tid='+item.row.cat_id)" circle>商品属性</el-button>
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
import {goodsTypeApi} from '@/api'

// 导出组件数据
export default {
    created() {
        this.initData()
    },
    methods: {
      // 初始化数据
      initData() {
          // loading
          this.loading = true
          // data
          goodsTypeApi.get({
              pagenum: this.pagenum,
              pagesize: this.pagesize,
          })
          .then(res => {
              // loading
              this.loading = false
              // data
              this.tableData = res.data.list
              this.pagetotal = parseInt(res.data.total)
          })
      },
      // 切换状态
      handleChange(state, row) {
        // console.log(state, row.cat_id)
        // loading
        this.loading = true
        // send ajax
        goodsTypeApi.state({
            type_id: row.cat_id,
            state:state,
        })
        .then(res => {
            if (res.meta.state == 200)
            {
                this.$message.success(res.meta.msg);
            } else {
                // tips
                this.$message.error(res.meta.msg);
            }
            
            // loading
            this.loading = false
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
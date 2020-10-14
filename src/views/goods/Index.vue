<template>
<div class="list">
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>请输入商品名</span>
            <el-button type="primary" round @click="jump('/goods/create')">创建</el-button>
        </div>
 
        <!-- 筛选 --> 
        <div class="filter">
            <el-input placeholder="请输入商品名" v-model="search">
                <el-button slot="append" icon="el-icon-search" @click="initData"></el-button>
            </el-input>
            
            <el-date-picker
            @change="changeDate" 
            v-model="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </div>
        <!-- /筛选 -->
        
        <!-- 表格 -->
        <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">
                <el-table-column prop="goods_id" label="编号" width="50" align="center"></el-table-column>
                <el-table-column prop="cat_name" label="分类名称"  width="80" align="left"></el-table-column>

                <el-table-column label="图片" width="100" align="center">
                    <template slot-scope="item">
                        <img :src="'http://tmp00001.zhaodashen.cn/'+item.row.goods_img" width="80" height="80" />
                    </template>
                </el-table-column>

                <el-table-column label="标题"  width="270" align="left">
                    <template slot-scope="item">
                        <el-tooltip class="item" effect="dark" v-bind:content="item.row.goods_name" placement="top-start">
                         <span>{{item.row.goods_name | substrFilter}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>

                <el-table-column prop="goods_number" label="库存"  width="80" align="left"></el-table-column>
                <el-table-column prop="market_price" label="价格"  width="90" align="left"></el-table-column>
                <el-table-column prop="shop_price" label="促销价"  width="90" align="left"></el-table-column>
                <el-table-column prop="add_time" label="创建于"  width="180" align="left"></el-table-column>
                
                <el-table-column label="上架" width="60" align="center">
                    <template slot-scope="item">
                        <el-switch 
                            @change="handleChange($event,item.row, 'is_sell')"
                            v-model="item.row.is_sell"
                            active-value="1"
                            inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                
                <el-table-column label="热卖" width="60" align="center">
                    <template slot-scope="item">
                        <el-switch
                            @change="handleChange($event,item.row, 'is_hot')"
                            v-model="item.row.is_hot"
                            active-value="1"
                            inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                
                <el-table-column label="推荐" width="60" align="center">
                    <template slot-scope="item">
                        <el-switch
                            @change="handleChange($event,item.row, 'is_best')"
                            v-model="item.row.is_best"
                            active-value="1"
                            inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                
                <el-table-column label="新品" width="100">
                    <template slot-scope="item">
                        <el-switch
                            @change="handleChange($event,item.row, 'is_new')"
                            v-model="item.row.is_new"
                            active-value="1"
                            inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column label="操作" fixed="right" width="110" >
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
</div>
</template>
<script>
// 导入接口
import {goodsApi} from '@/api'

// 导出组件数据
export default {
    created() {
        this.initData()
    },
    methods: {
      // 切换状态
      handleChange(state, row, type) {
        // console.log(state, row.cat_id)
        // loading
        this.loading = true
        // send ajax
        goodsApi.state({
            goods_id: row.goods_id,
            state:state,
            key: type
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
          goodsApi.get({
              pagenum: this.pagenum,
              pagesize: this.pagesize,
              goods_name: this.search,
              start_time: this.start_time,
              end_time: this.end_time
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
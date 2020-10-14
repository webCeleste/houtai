<template>
<div class="list">
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>订单列表</span>
            <el-button type="primary" round >导出数据</el-button>
        </div>

        <!-- 筛选 -->  
        <div class="filter">
            <el-input placeholder="下单人" v-model="uname">
                <el-button slot="append" icon="el-icon-search" @click="initData"></el-button>
            </el-input>
            
            <el-input placeholder="收货人" v-model="consignee">
                <el-button slot="append" icon="el-icon-search" @click="initData"></el-button>
            </el-input>
            
            <el-date-picker
            @change="changeDate" 
            v-model="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="下单开始日期"
            end-placeholder="下单结束日期">
            </el-date-picker>
        </div>
        <!-- /筛选 -->
        
        <!-- 表格 -->
        <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">
                <el-table-column prop="order_sn" label="订单号" width="" align="center"></el-table-column>
                <el-table-column prop="add_time" label="下单时间" width="" align="center"></el-table-column>

                <el-table-column prop="username" label="下单人"  width="100" align="center"></el-table-column>
                <el-table-column prop="consignee" label="收获人"  width="100" align="center"></el-table-column>
                <el-table-column prop="order_amount" label="总额"  width="90" align="center"></el-table-column>
                <el-table-column prop="price2" label="订单状态"  width="110" align="center">
                    <template slot-scope="item">
                        <el-tag v-bind:type="item.row.order_status | elTagTypeFilter">{{item.row.order_status | orderStatusFilter}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="price2" label="支付状态"  width="110" align="center">
                    <template slot-scope="item">
                        <el-tag v-bind:type="item.row.pay_status | elTagTypeFilter">{{item.row.pay_status | payStatusFilter}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="price2" label="配送情况"  width="110" align="center">
                    <template slot-scope="item">
                        <el-tag v-bind:type="item.row.shipping_status | elTagTypeFilter">{{item.row.shipping_status | shippingStatusFilter}}</el-tag>
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
import {ordersApi} from '@/api'

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
            ordersApi.get({
                order_sn:this.order_sn,
                uname:this.uname,
                consignee:this.consignee,
                pagenum: this.pagenum,
                pagesize: this.pagesize,
                start_time: this.start_time,
                end_time: this.end_time,
                is_delete: 1,
            })
            .then(res => {
                // loading
                this.loading = false
                // data
                this.tableData = res.data.list
                this.pagetotal = parseInt(res.data.total)
            })
        },
        // 编辑
        handleEdit(row) {
            // 默认数据填充
            this.formEditData = row
            // 显示弹框
            this.dialogFormVisible = true
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
            // 编辑
            formLabelWidth: '120px',
            dialogFormVisible: false,
            formEditData: {
                order_status: "0",
                shipping_status: "0",
                pay_status: "0",
                no: '',
                com: '',
            },
            // 搜索
            uname: '',
            consignee: '',
            date: [],
            // 分页
            pagenum: 1,
            pagesize: 5,
            pagetotal: 0,
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
                margin-right: 20px;
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
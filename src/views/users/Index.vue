<template>
<div class="list">
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>用户列表</span>
            <el-button type="primary" round @click="jump('/users/create')">创建</el-button>
        </div>
        <!-- /标题 --> 

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
            start-placeholder="注册开始日期"
            end-placeholder="注册结束日期">
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
                prop="user_id"
                label="编号"
                width="60"
                align="center">
                </el-table-column>

                <el-table-column
                prop="role_name"
                label="所属角色"
                width="80"
                align="center">
                </el-table-column>

                <el-table-column
                prop="username"
                label="用户名"
                width="100"
                align="center">
                </el-table-column>

                <el-table-column
                prop="mobile_phone"
                label="手机号"
                width="100">
                </el-table-column>
                
                <el-table-column label="冻结" width="100">
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
                
                <el-table-column
                prop="reg_time"
                label="手机号"
                width="180">
                </el-table-column>
                
                <el-table-column label="操作">
                    <template slot-scope="item">
                        <el-button type="primary" @click="handleRole(item.row)" circle>分配角色</el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="handleDel(item.row)" circle></el-button>
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

    
    <!-- 编辑弹框 -->
    <el-dialog title="角色分配" :visible.sync="dialogFormVisible">

        <!-- 表单 -->
        <el-form :model="ruleForm" v-loading="ruleFormLoading" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="当前账号">
                <el-tag type="info">{{ruleForm.username}}</el-tag>
            </el-form-item>
            <el-form-item label="当前角色">
                <el-tag type="info">{{ruleForm.role_name}}</el-tag>
            </el-form-item>
            <el-form-item label="选择角色" prop="role_id">
                <el-select v-model="ruleForm.role_id" placeholder="请选择">
                    <el-option
                    v-for="item in roles"
                    :key="item.role_id"
                    :label="item.role_name"
                    :value="item.role_id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <!-- /表单 -->

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAssign">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
// 导入接口
import {usersApi, rolesApi} from '@/api'

// 导出组件数据
export default {
    created() {
        this.initData()
    },
    methods: {
      // 删除功能
      handleDel(row) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            usersApi.del(row)
            .then(res => {
                if (res.meta.state === 200)
                {
                    this.initData()
                    this.$message.success('删除成功!');
                } else {
                    this.$message.error(res.meta.msg);
                }
            })
        }).catch(() => {
            this.$message.info('已取消删除!');
        });
      },
      // 确定分配
      handleAssign() {
            usersApi.assign({
                user_id: this.ruleForm.user_id,
                role_id: this.ruleForm.role_id
            })
            .then(res => {
                if (res.meta.state == 200)
                {
                    this.$message.success('操作成功')
                    this.initData()
                    this.dialogFormVisible = false
                } else {
                    this.$message.error(res.meta.msg)
                }
            })
      },
      // 给用户分配角色
      handleRole(row) {
            // loading
            this.ruleFormLoading = true
            // 保存当前行数据
            this.ruleForm = row
            // 显示默认数据
            rolesApi.get()
            .then(res => {
                this.roles = res.data
                this.ruleFormLoading = false
            })
            // 显示弹框
            this.dialogFormVisible = true
      }, 
      // 切换状态
      handleChange(state, row) {
        // console.log(state, row.cat_id)
        // loading
        this.loading = true
        // send ajax
        usersApi.state({
            user_id: row.user_id,
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
          usersApi.get({
              pagenum: this.pagenum,
              pagesize: this.pagesize,
              uname: this.search,
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
            // 角色数据
            roles: [],
            // 表单数据
            ruleFormLoading: false,
            ruleForm: {
                role_id: ''
            },
            // 表单数据验证规则
            rules: {
                role_id: [
                    { required: true, message: '请选择角色', trigger: 'blur' },
                ]
            },
            dialogFormVisible: false,
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
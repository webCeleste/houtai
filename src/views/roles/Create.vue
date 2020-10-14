<template>
<div class="create">
    
    <!-- 卡片组件 -->
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>角色创建</span>
            <el-button type="primary" round @click="jump('/roles')">返回</el-button>
        </div> 
        
        <!-- 表单 --> 
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名称" prop="role_name">
                <el-input type="text" v-model="ruleForm.role_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色名称" prop="role_describe">
                <el-input type="text" v-model="ruleForm.role_describe" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- /表单 -->
        
    </el-card>
    <!-- /卡片组件 -->

</div>
</template>
<script>
// 导入接口
import {rolesApi} from '@/api'

// 导出组件数据
export default {
    data() {
        return {
            // loading
            loading: false,
            // 表单数据
            ruleForm: {
                role_name: '',
                role_describe: '',
            },
            // 表单数据验证规则
            rules: {
                role_name: [
                    { required: true, message: '请输入商品类型', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                role_describe: [
                    { required: true, message: '请输入商品类型', trigger: 'blur' },
                    { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // loading
                    this.loading = true
                    // 创建数据
                    rolesApi.post(this.ruleForm)
                    .then(res => {
                        if (res.meta.state == 201)
                        {
                            this.$message.success(res.meta.msg);
                            this.$router.push({path:'/roles'})
                        } else {
                            this.loading = false
                            this.$message.error(res.meta.msg);
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="scss" scoped>
.create {
    // 卡片组件
    .el-card 
    {
        // 头部
        .header .el-button {
            float:right;
            margin-top: -10px;
        }
    }
}
</style>
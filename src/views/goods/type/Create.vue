<template>
<div class="create">
    
    <!-- 卡片组件 -->
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>创建商品类型</span>
            <el-button type="primary" round @click="jump('/goods/cate')">返回</el-button>
        </div> 
        
        <!-- 表单 --> 
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="类型名称" prop="type_name">
                <el-input type="text" v-model="ruleForm.type_name" autocomplete="off"></el-input>
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
import {goodsTypeApi} from '@/api'

// 导出组件数据
export default {
    data() {
        return {
            // loading
            loading: false,
            // 表单数据
            ruleForm: {
                type_name: '',
            },
            // 表单数据验证规则
            rules: {
                type_name: [
                    { required: true, message: '请输入商品类型', trigger: 'blur' },
                    { min: 2, max: 12, message: '长度在 2 到 8 个字符', trigger: 'blur' }
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
                    goodsTypeApi.post(this.ruleForm)
                    .then(res => {
                        if (res.meta.state == 201)
                        {
                            this.$message.success(res.meta.msg);
                            this.$router.push({path:'/goods/type'})
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
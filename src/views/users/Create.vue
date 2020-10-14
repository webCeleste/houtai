<template>
<div class="create">
    
    <!-- 卡片组件 -->
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>用户创建</span>
            <el-button type="primary" round @click="jump('/users')">返回</el-button>
        </div> 
         
        <!-- 表单 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密保问题" prop="question">
                <el-select v-model="ruleForm.question" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密保答案" prop="answer">
                <el-input type="text" v-model="ruleForm.answer" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
import {usersApi} from '@/api'

// 导出组件数据
export default {
    data() {
        return {
            // 表单数据
            ruleForm: {
                username: '',
                password: '',
                question: '',
                answer: '',
            },
            // 表单数据验证规则
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
                ],
                question: [
                    { required: true, message: '请选择密保问题', trigger: 'blur' },
                ],
                answer: [
                    { required: true, message: '请选择密保答案', trigger: 'blur' },
                ],
            },
            // 密保
            options: [
                { value: '母亲的名字', label: '母亲的名字' },
                { value: '爷爷的名字', label: '爷爷的名字' },
                { value: '父亲出生的城市', label: '父亲出生的城市' },
                { value: '您其中一位老师的名字', label: '您其中一位老师的名字' },
                { value: '您个人计算机的型号', label: '您个人计算机的型号' },
                { value: '您最喜欢的餐馆名称', label: '您最喜欢的餐馆名称' },
                { value: '驾驶执照最后四位数字', label: '驾驶执照最后四位数字' },
            ]
        };
    },
    methods: {
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    usersApi.post(this.ruleForm)
                    .then(res => {
                        if(res.meta.state == 201)
                        {
                            this.$message.success(res.meta.msg);
                            this.$router.push({path:'/users'})
                        } else {
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
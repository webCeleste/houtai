<template>
<div class="create">

    <!-- 卡片组件 -->
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>创建商品属性</span>
            <el-button type="primary" round @click="jump('/goods/attr')">返回</el-button>
        </div> 
        
        <!-- 表单 -->  
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="属性名称" prop="attr_name">
                <el-input type="text" v-model="ruleForm.attr_name" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item label="所属类型" prop="cat_id">
                <el-select v-model="ruleForm.cat_id" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.cat_id"
                    :label="item.cat_name"
                    :value="item.cat_id">
                    </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="单/多选属性" prop="only_many">
                <el-radio v-model="ruleForm.only_many" label="only">唯一</el-radio>
                <el-radio v-model="ruleForm.only_many" label="many">多选</el-radio>
            </el-form-item>

            <el-form-item label="值录入方式" prop="input_select">
            <el-radio v-model="ruleForm.input_select" label="input">手动录入</el-radio>
            <el-radio v-model="ruleForm.input_select" label="select">从下方选择</el-radio>
            </el-form-item>
            
            <el-form-item label="可选值" prop="attr_values" v-show="ruleForm.input_select == 'select'">
                <el-input type="text" v-model="ruleForm.attr_values" placeholder="请输入可选值，多个值之间请使用英文“,”分隔开" autocomplete="off"></el-input>
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
import {goodsTypeApi, goodsAttrApi} from '@/api'

// 导出组件数据
export default {
    created() {
        // 商品类型数据
        goodsTypeApi.get({
            pagenum: 1,
            pagesize: 1000
        })
        .then(res => {
            this.options = res.data.list
        })
    },
    data() { 
        return {
            // 所属类型
            options: [],
            // loading
            loading: false,
            // 表单数据
            ruleForm: {
                cat_id: '',
                attr_name: '',
                input_select: '',
                only_many: '',
                attr_values: '',
            },
            // 表单数据验证规则
            rules: {
                cat_id: [
                    { required: true, message: '请选择所属商品类型', trigger: 'blur' },
                ],
                attr_name: [
                    { required: true, message: '请选择属性名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                only_many: [
                    { required: true, message: '单/多选属性', trigger: 'blur' },
                ],
                input_select: [
                    { required: true, message: '请选择值录入方式', trigger: 'blur' },
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
                    goodsAttrApi.post(this.ruleForm)
                    .then(res => {
                        if (res.meta.state == 201)
                        {
                            this.$message.success(res.meta.msg);
                            this.$router.push({path:'/goods/attr'})
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
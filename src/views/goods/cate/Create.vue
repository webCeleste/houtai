<template>
<div class="create">
    
    <!-- 卡片组件 -->
    <el-card class="box-card">

        <!-- 标题 -->
        <div slot="header" class="clearfix header">
            <span>创建商品分类</span>
            <el-button type="primary" round @click="jump('/goods/cate')">返回</el-button>
        </div>
        <!-- /标题 -->
          
        <!-- 表单 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类名称" prop="cat_name">
                <el-input type="text" v-model="ruleForm.cat_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属分类" prop="parent_id">
                <el-cascader
                :options="options"
                :props="props"
                change-on-select
                clearable
                v-model="ruleForm.parent_id"
                @change="handleChange">
                </el-cascader>
                <p style="font-size:10px;color:#ccc;margin-bottom:-20px;">备注：商品分类 一级/二级 先URL 再关键词 三级 先URL 再分类ID</p>
            </el-form-item>
            <el-form-item label="关键词" prop="keywords">
                <el-input type="text" v-model="ruleForm.keywords" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="跳转" prop="url">
                <el-input type="text" v-model="ruleForm.url" autocomplete="off"></el-input>
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
import {goodsCateApi} from '@/api'

// 导出组件数据
export default {
    created() {
        // 商品分类数据
        goodsCateApi.get({
            pagenum: 1,
            pagesize: 1000,
            level: 2
        })
        .then(res => {
            this.options = res.data.list
        })
    },
    data() {
        return {
            // loading
            loading: false,
            // 表单数据
            ruleForm: {
                cat_name: '',
                parent_id: [],
                keywords: '',
                url: '',
            },
            // 表单数据验证规则
            rules: {
                cat_name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
                ],
                parent_id: [
                ],
            },
            // 级联选择器数据
            props: {
                label: "cat_name",
                value: "cat_id",
            },
            // 级联选择器数据
            options: [],
        };
    },
    methods: {
        // 级联选择器切换
        handleChange(value) {
            // console.log(value);
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // loading
                    this.loading = true
                    // 创建数据
                    goodsCateApi.post({
                        cat_name: this.ruleForm.cat_name,
                        parent_id: this.ruleForm.parent_id[this.ruleForm.parent_id.length-1],
                        keywords: this.ruleForm.keywords,
                        url: this.ruleForm.url
                    })
                    .then(res => {
                        if (res.meta.state == 201)
                        {
                            this.$message.success(res.meta.msg);
                            this.$router.push({path:'/goods/cate'})
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
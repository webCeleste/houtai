<template>
<div class="login">
    <!-- hello -->

    <!-- <div class="loginForm animated bounceInDown" > -->
    <div class="loginForm animated flip" >
        <h1>B2C电商管理系统</h1> 
    
        <!-- el-form  -->
        <!-- <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> -->
        <!--  
          :rules="rules" 是elementui封装的表单验证规则必须这么写
          属性名：是固定的
          属性值：自定义，但是如果修改了也要注意同步修改模型中的
         --> 
        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <!-- <el-form-item label="密码" prop="pass"> -->
            <el-form-item prop="username">
                <el-input type="text" placeholder="请输入用户名" clearable  prefix-icon="el-icon-user" v-model="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="确认密码" prop="checkPass"> -->
            <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" clearable show-password prefix-icon="el-icon-lock" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
        <!-- /el-form  -->
    </div>

</div>
</template>

<script>
export default {
  // 存放模型数据
  data() {

    // 声明验证规则（复制
    var checkUsername = (rule, value, callback) => { // 规则、用户输入的户数、提示信息

        // 成功：callback(new Error('提示信息!'));
        // 失败：callback();
        // 留心：规则自己写正则或判断，但是结果必须使用上述方法
        // 原因：才会触发提示样式

        if (value == '') {
          callback(new Error('请输入用户名!!!'))
          return
        }

        if (value.length < 3 || value.length > 15) {
          callback(new Error('长度在 3 到 5 个字符!!!'))
          return
        }

        callback();
    };

    
    // 声明模型数据
    return {
      // ruleForm: {
      //   pass: '',
      //   checkPass: '',
      //   age: ''
      // },
      // 声明表单数据
      loginForm: {
        username: '',
        password: '',
      },
      // 声明表单验证规则
      rules: {
        // 语法
        // 同model名同prop名: [
          // 自定义验证规则
          // { validator: 在data函数中声音变量, trigger: 'blur' }
          // 内置验证规则：看手册
          // { required: true, message: '请输入活动名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],

        username: [
          { validator: checkUsername, trigger: 'blur' }
          // { required: true, message: '请输入用户名', trigger: 'blur' },
          // { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]

      }
    };
  },
  methods: {
    submitForm(formName) {
      // 触发表单验证
      // this.$refs.ref属性名.validate（）
      // 留心：调用对象的属性  如果属性是变量则改成中括号
      // 举例：obj.username    obj[变量名]
      this.$refs[formName].validate((valid) => {
        // valid true  验证通过
        // valid false 验证失败
        if (valid) {
            // 提示登录成功
            this.$message.success('登录成功');
            // 跳转用编程式导航
            this.$router.push({path: '/'})
        } else {
          this.$message.error('大兄弟你输入的内容有误！！！');
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
// ElementUI潜规则标签名就是类名
// login
.login {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url(../../assets/imgs/login2.jpg);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    // loginForm
    .loginForm {
        width: 300px;
        height: 250px;
        padding: 30px;
        text-align: center;
        border-radius: 30px;
        -webkit-box-shadow: 4px 4px 10px #fff;
        box-shadow: 4px 4px 10px #fff;
    }

    // h1 
    h1 {
        color: #fff;
        margin-bottom:20px;
    }

    // el-button
    .el-button {width: 100%;}
} 
</style>
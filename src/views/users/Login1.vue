<template>
<div class="login">
    <!-- hello -->
 
    <!-- <div class="loginForm animated bounceInDown" > -->
    <div class="loginForm animated bounceInDown" >
        <h1>B2C电商管理系统</h1>
    
        <!-- el-form  -->
        <!-- <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> -->
        <!-- 
          :rules="rules" 是elementui封装的表单验证规则必须这么写
          属性名：是固定的 
          属性值：自定义，但是如果修改了也要注意同步修改模型中的
         --> 
        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
          
            <el-form-item prop="question">
                <el-select v-model="loginForm.question" placeholder="请选择密保问题">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="answer">
                <el-input type="text" placeholder="请输入密码答案" clearable show-pwd prefix-icon="el-icon-lock" v-model="loginForm.answer" autocomplete="off"></el-input>
            </el-form-item>

            <!-- <el-form-item label="密码" prop="pass"> -->
            <el-form-item prop="uname">
                <el-input type="text" placeholder="请输入用户名" clearable  prefix-icon="el-icon-user" v-model="loginForm.uname" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="确认密码" prop="checkPass"> -->
            <el-form-item prop="pwd">
                <el-input type="pwd" placeholder="请输入密码" clearable show-pwd prefix-icon="el-icon-lock" v-model="loginForm.pwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-camera-solid" title="扫码登录" @click="handleQr"></el-button>
                <el-button type="primary" icon="el-icon-mobile-phone" title="手机登录"></el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" class="submit">提交</el-button>
            </el-form-item>
        </el-form>
        <!-- /el-form  -->
    </div>

    
    <!-- 扫码登录 -->
    <el-dialog
        title="扫码登录京西商城"
        :visible.sync="QRcode.dialogVisible"
        :close-on-click-modal="true"
        width="300px"
        height="450px"
        top="200px"
          >
      <div class="qrcode" ref="qrCodeUrl"></div>
    </el-dialog>
    <!-- /扫码登录 -->

</div>
</template>

<script>
// 导入接口
import {usersApi} from '@/api'

// 导入二维码模块
import QRCode from 'qrcodejs2'

// 导出组件数据
export default {
  // 存放模型数据
  data() {

    // 声明验证规则（复制
    var checkuname = (rule, value, callback) => { // 规则、用户输入的户数、提示信息

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
      // 二维码
      QRcode: {
        dialogVisible: false,
        uuid: '',
        t: null,
      },
      // ruleForm: {
      //   pass: '',
      //   checkPass: '',
      //   age: ''
      // },
      // 声明表单数据
      loginForm: {
        uname: '',
        pwd: '',
        question: '',
        answer: '', 
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

        uname: [
          { validator: checkuname, trigger: 'blur' }
          // { required: true, message: '请输入用户名', trigger: 'blur' },
          // { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        pwd:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        question:[
          { required: true, message: '请选择密保问题', trigger: 'blur' },
        ],
        answer:[
          { required: true, message: '请输入密保答案', trigger: 'blur' },
        ]

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
  watch: {
    QRcode: {
      handler(data) {
        // 控制取消定时器
        if (data.dialogVisible)
        {
          // TODO. 避免重复渲染
          if (this.t) return

          this.t = setInterval(()=>{ 
            usersApi.check({state:this.QRcode.uuid})
            .then(res => {
                console.log(res.meta)

                if (res.meta.state == 200)
                { 
                  // localStorage.setItem("token", res.data.token)
                  // localStorage.setItem("uname", res.data.uname)
                  // localStorage.setItem("roleName", res.data.roleName)
                  this.$store.commit('users/setUserinfo',{
                    token: res.data.token,
                    uname: res.data.uname,
                    roleName:res.data.roleName
                  })

                  // 提示登录成功
                  this.$message.success(res.meta.msg);
                  // 跳转用编程式导航
                  this.$router.push({path:'/'})
                  // 清除定时器
                  clearInterval(this.t)
                  this.t = null
                }
            })
          }, 2000)
        } else {
          clearInterval(this.t)
          this.t = null
        }
      },
      deep: true,
    }
  },
  methods: {
    uuid() {
      let s = [];
      let hexDigits = "0123456789abcdef";
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      let uuid = s.join("");
      return (new Date).getTime() + "-" + uuid;
    },
    // 扫码  
    handleQr() {
        this.QRcode.dialogVisible = true

        this.$nextTick(() => {
          
            this.$refs.qrCodeUrl.innerHTML = ''

            this.QRcode.uuid = this.uuid()
            
            let qrcode = new QRCode(this.$refs.qrCodeUrl, {
              text: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxed58e834201d0894&redirect_uri=http://kg.zhaodashen.cn/v2/qr/login.php&response_type=code&scope=snsapi_base&state=${this.QRcode.uuid}&connect_redirect=1#wechat_redirect`, 
              width: 200,
              height: 200,
              colorDark: '#000000',
              colorLight: '#ffffff',
              correctLevel: QRCode.CorrectLevel.H
            })
        })
      
    },
    // 登录
    submitForm(formName) {
      // 触发表单验证
      // this.$refs.ref属性名.validate（）
      // 留心：调用对象的属性  如果属性是变量则改成中括号
      // 举例：obj.uname    obj[变量名]
      this.$refs[formName].validate((valid) => {
        // valid true  验证通过
        // valid false 验证失败
        if (valid) {

            // send ajax
            usersApi.login(this.loginForm)
            .then(res => {
              // console.log(res)
              if (res.meta.state == 200)
              {
                // localStorage.setItem("token", res.data.token)
                // localStorage.setItem("uname", res.data.uname)
                // localStorage.setItem("roleName", res.data.roleName)
                this.$store.commit('users/setUserinfo',{
                  token: res.data.token,
                  uname: res.data.uname,
                  roleName:res.data.roleName
                })

                // 提示登录成功
                this.$message.success(res.meta.msg);
                // 跳转用编程式导航
                this.$router.push({path:'/'})
              } else {
                this.$message.error(res.meta.msg);
              }
            })
        }else {
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
    background: #2D3A4B;
    display: flex;
    justify-content: center;
    align-items: center;

    // loginForm
    .loginForm {
        width: 300px;
        // background: red;
        text-align: center;
    }

    .el-dialog {
      text-align: center;
      .qrcode {
        display: flex;
        justify-content: center;
      }
    }

    // h1 
    h1 {
        color: #fff;
        margin-bottom:20px;
    }
    
    .el-select {width: 100%;}

    // el-button
    .submit {width: 168px;}
} 
</style>
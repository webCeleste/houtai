<template>
<div class="login">
  <!-- 栗子特效 -->
  <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true" 
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="10" 
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >
  </vue-particles>
  <!-- /栗子特效 -->

  <el-button type="primary" plain @click="goLogin('/login1')">登录界面（商务1）</el-button>
  <el-button type="info" plain @click="goLogin('/login2')">登录界面（商务2）</el-button>
  <el-button type="info" plain @click="goLogin('/login3')">登录界面（浪漫）</el-button>
</div>
</template>
<script>
export default {
  methods: {
    goLogin(url) {
      this.$router.push({path:url})
    }
  }
}
</script>
<style lang="scss" scoped>
// login
.login {
  width:100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .lizi {
    background-image: url(../../assets/imgs/login.jpg);
    background-size: cover;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; 
    overflow: hidden;
  }
}
</style>
<template>
  <!--  用户登录界面-->
  <el-container padding="0px" style="width: 100%; height: 100vh">
<!--    <div class="header">-->
    <el-header>
      <v-head></v-head>
    </el-header>
<!--    </div>-->

<!--    <div class="main">-->
    <el-main>
      <router-view/>
    </el-main>
<!--    </div>-->

<!--    <div class="footer">-->
    <el-footer>
      <v-foot></v-foot>
    </el-footer>
<!--    </div>-->

  </el-container>

</template>

<script>
  import vHead from '../components/head'
  import vFoot from '../components/foot'

  export default {
    name: "Login",
    components: {
      vHead,
      vFoot
    }
  }
</script>

<style scoped>
  .el-main {
    z-index: 1;
  }
</style>

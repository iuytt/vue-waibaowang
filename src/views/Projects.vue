<template>
  <!--  查看项目列表界面-->
  <div>
    <el-container padding="0px" style="width: 100%; height: 100vh">
      <el-header>
        <v-head></v-head>
      </el-header>

      <el-main>
        <router-view/>
<!--        <div class="footer">-->
<!--          <v-foot></v-foot>-->
<!--        </div>-->
      </el-main>

<!--      <el-footer>-->
<!--        <v-foot></v-foot>-->
<!--      </el-footer>-->
    </el-container>
  </div>
</template>

<script>
  import vHead from '../components/head'
  import vFoot from '../components/foot'
  import vProjectOpt from '../components/projectOption'

  export default {
    name: "Projects",
    components: {
      vHead,
      vFoot,
      vProjectOpt
    }

  }
</script>

<style scoped>
  .el-main {
    padding: 0;
    height: 100vh;
  }

  .footer {
    background-color: #212d3c;
    color: #4e6586;
    text-align: center;
    height: 60px;
    width: 100%;

    /*文字上下居中*/
    display: flex;
    justify-content: center;
    flex-direction: column;
    /*z-index: 1;*/
  }
</style>

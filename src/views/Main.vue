<template>
  <div>
    <el-container padding="0px" style="width: 100%; height:100%">
<!--      <div class="header">-->
      <el-header>
        <v-head></v-head>
      </el-header>
<!--      </div>-->

<!--      <div class="main">-->
      <el-main style="background-image: url('../../static/images/MainBgima.jpg');position:absolute; width:100%; height:100%;">
        <div class="text">{{text}}</div>
        <br>
        <div class="buttons">
          <el-button @click="goPublish" style="font-size:30px" type="primary"
              v-if="loginInfo == null || loginInfo.userStatus === 1">发布需求</el-button>
          <el-button @click="goProjects" style="font-size:30px">查看项目列表</el-button>
        </div>
      </el-main>
<!--      </div>-->

<!--      <div class="footer">-->
      <el-footer>
        <v-foot></v-foot>
      </el-footer>
<!--      </div>-->

    </el-container>
  </div>
</template>

<script>
  import vHead from '../components/head'
  import vFoot from '../components/foot'

  export default {
    name: "Main",
    data() {
      return {
        text: '互联网软件外包服务平台',
        loginInfo: []
      };
    }
    , components: {
      vFoot,
      vHead
    },
    methods: {
      goProjects() {
        this.$router.push('projects')
      },
      goPublish() {
        this.$router.push('publish')
      }
    },
    created() {
      this.loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #2c3746;
    z-index: 1;
  }

  .el-footer {
    position: absolute;
    bottom: 0px;
  }

  .text {
    /*margin-top: 250px;*/
    margin: 250px 0px 0px;
    color: #f0f2f5;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
  }

  .el-main {
    top: 0px;
  }

  .buttons {
    margin-top: 50px;
    /*margin: 50px 0px 0px;*/
    text-align: center;
  }

</style>

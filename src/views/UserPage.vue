<template>
  <!--  编辑个人信息，发布需求-->
  <div>
    <el-container padding="0px" style="width: 100%; height: 100vh">
<!--      <div class="header">-->
      <el-header>
        <v-head></v-head>
      </el-header>
<!--      </div>-->

<!--      <div class="main">-->
      <el-main>
        <div class="card">
          <el-card class="box-card">

            <div class="menu">
              <el-menu :default-active="active">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>用户</span>
                  </template>
                  <router-link :to="{name: 'ShowUserInfo'}">
                    <el-menu-item index="1-1">账户信息</el-menu-item>
                  </router-link>
                  <router-link :to="{name: 'ResetPwd'}">
                    <el-menu-item index="1-2">修改密码</el-menu-item>
                  </router-link>
                </el-submenu>

                <router-link :to="{name: 'MyProject'}">
                  <el-menu-item index="2">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">项目</span>
                  </el-menu-item>
                </router-link>

                <el-menu-item @click="outLogin" index="3">
                  <i class="el-icon-right"></i>
                  <span slot="title">退出登录</span>
                </el-menu-item>

              </el-menu>
            </div>

            <div class="show">
              <router-view/>
            </div>
          </el-card>
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
    name: "UserPage",
    data() {
      return {
        active: '1-1'
      }
    },
    components: {
      vHead,
      vFoot
    },
    methods: {
      outLogin() {
        sessionStorage.removeItem("loginInfo");
        this.$router.push("/")
      }
    },
    created() {
      let path = this.$route.path;
      if (path === '/userPage/') this.active = '1-1';
      if (path === '/resetPwd') this.active = '1-2';
      if (path === '/myProject') this.active = '2';
    }
  }
</script>

<style scoped>
  .el-main {
    z-index: 1;
    display: flex;
    justify-content: center;
  }

  .card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .box-card {
    width: 140vh;
    height: 80vh;
  }

  .menu {
    margin-top: 10px;
    width: 20%;
    height: 40%;
    float: left;
  }

  .show {
    width: 75%;
    float: right;
    margin-right: 20px;
    margin-top: 20px;
    /*position: absolute;*/
    /*left: 50%;*/
    /*top: 50%;*/
    /*transform: translate(-40%, -50%);*/
  }

  a {
    /*router-link 去下划线*/
    text-decoration: none;
  }
</style>

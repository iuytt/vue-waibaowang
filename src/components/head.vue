<template>
  <!--  这是用户未登录的 head-->
  <el-row>
    <el-col :span="1">
      <el-button @click="main" circle icon="el-icon-s-home"></el-button>
    </el-col>
    <el-col :span="1">
      <div class="help">
        <el-link :underline="false" @click="help">帮助</el-link>
      </div>
    </el-col>
    <el-col :span="1">
      <div v-if="loginInfo.userStatus">
        <el-button @click="goPublish" plain type="primary">发布需求</el-button>
      </div>
      <div v-else>
        <el-button @click="goProjects" plain type="primary">查找项目</el-button>
      </div>
    </el-col>
    <el-col :offset="20" :span="1">
      <div class="user" v-if="flag">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar icon="el-icon-user-solid"></el-avatar><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>hello, {{loginInfo.userName}}</el-dropdown-item>
            <el-dropdown-item command="a" divided>个人中心</el-dropdown-item>
            <el-dropdown-item command="b">{{text}}</el-dropdown-item>
            <el-dropdown-item command="c" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="button" v-else>
        <el-button @click="login" style="font-size:10px">登录/注册</el-button>
      </div>
    </el-col>
    <!--          <el-col :span="2"><div class="buttons"><el-button class="button2" style="font-size:10px" @click="register">注册</el-button></div></el-col>-->
  </el-row>
</template>

<script>
  export default {
    name: "vhead",
    data() {
      return {
        flag: 0,
        text: '我参与的项目',
        loginInfo: {
          userName: '',
          pn: '',
          pwd: '',
          email: '',
          userStatus: '',
          projectId: ''
        }
      }
    },
    methods: {
      main() {
        this.$router.push('/');
      },
      goPublish() {
        this.$router.push('/publish');
      },
      goProjects() {
        this.$router.push('/projects');
      },
      login() {
        this.$router.push('/login');
      },
      help() { // 新页面打开
        let routeData = this.$router.resolve({
          name: 'HelpPage'
        });
        window.open(routeData.href, '_blank');
      },
      handleCommand(command) {
        if (command == "a") {
          this.$router.push('/userPage');
        }
        if (command == "b") {
          this.$router.push('/myProject');
        }
        if (command == "c") { // 删除 sessionStorage 内容并刷新页面
          sessionStorage.removeItem("loginInfo");
          this.$router.go(0);
        }
      }
    },
    created() {
      if (sessionStorage.getItem('loginInfo') != null) {
        this.flag = 1;
        this.loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
        if (this.loginInfo.userStatus == 1) {
          this.text = '我发布的项目';
        }
        // console.log(this.loginInfo);
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-top: 9px;
    /*margin: 9px 0px 0px;*/
  }

  .help {
    margin-top: 6px;
    /*margin: 6px 0px 0px;*/
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .button {
    position: absolute;
    right: 15px;
  }
</style>

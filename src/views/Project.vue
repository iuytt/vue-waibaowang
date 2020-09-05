<template>
  <div>
    <el-container padding="0px" style="width: 100%; height:100%">
      <!--      <div class="header">-->
      <el-header>
        <v-head></v-head>
      </el-header>
      <!--      </div>-->

      <!--      <div class="main">-->
      <el-main>
        <div class="main">
          <el-card :body-style="{ padding: '0px' }" class="box-card">
            <div class="title">
              <div class="row1">
                <span class="pName">{{project.projectName}}</span>
                <span class="pState" style="color: #65C279" v-if="project.projectState===0">招募中</span>
                <span class="pState" style="color: #65A1E4" v-if="project.projectState===1">开发中</span>
                <span class="pState" style="color: #BACDD8" v-if="project.projectState===2">已结束</span>
              </div>
              <div class="row2">
                <el-tag class="pNo" effect="dark" size="mini" type="info">NO.{{project.projectId}}</el-tag>
                <span class="pRecruit">{{recruits[project.recruit]}}</span>
              </div>
              <div class="row3">
                <span class="pPay">
                  <span class="text">金额</span>
                  <span>￥{{project.pay}}</span>
                </span>|
                <span class="pType">
                  <span class="text">类型</span>
                  <span>{{projectTypes[project.projectType]}}</span>
                </span>|
                <span class="pDate">
                  <span class="text">周期</span>
                  <span>{{project.date}}天</span>
                </span>
                <span class="button" v-if="project.projectState!=2">
                  <el-button
                    @click="inProject" size="medium" type="primary"
                    v-if="(!checkProject() && loginInfo.userStatus===0 && project.projectState===0) || loginInfo===null">参与项目</el-button>
                  <el-button @click="outProject" size="medium" type="danger"
                             v-if="checkProject() && loginInfo.userStatus===0 && project.projectState===0">退出项目</el-button>
                </span>
              </div>
            </div>
            <el-divider></el-divider>

            <div class="body">
              <h3 class="t">项目类型</h3>
              <p class="text">{{projectTypes[project.projectType]}}</p>
              <h3 class="t">项目描述</h3>
              <p class="text">{{project.projectDetails}}</p>
              <h3 class="t">项目资金</h3>
              <p class="text">{{project.pay}}￥</p>
              <h3 class="t">项目周期</h3>
              <p class="text">{{project.date}}天</p>
              <h3 class="t">招募角色</h3>
              <p class="text">{{recruits[project.recruit]}}</p>
              <h3 class="t">联系方式</h3>
              <p class="text">手机号：{{project.issue}}</p>
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
  import axios from 'axios'

  export default {
    name: "Project",
    components: {
      vHead,
      vFoot
    },
    data() {
      return {
        loginInfo: '',
        project: '',
        projectTypes: ['Web网站', 'APP开发', '微信小程序', '微信公众号', '其他'],
        recruits: ['项目顾问', '项目经理', '产品经理', 'Android开发', 'iOS开发',
          '前端开发', '后端开发', '全栈开发', '测试工程师']
      }
    },
    methods: {
      getProject(projectId) {
        let _this = this;
        axios.get('/getProject/' + projectId)
          .then(function (response) {
            _this.project = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      checkProject() {
        if (this.loginInfo.projectId == null) return false;
        let projectID = this.loginInfo.projectId;
        const list = projectID.split(";");
        for (let i = 0; i < list.length; i++) {
          if (list[i] === '' + this.project.projectId) return true;
        }
        return false;
      },
      inProject() {
        if (this.loginInfo == null) this.$router.push('/login'); // 未登录需登录
        else {
          let _this = this;
          axios.put("/inProject", {pn: _this.loginInfo.pn, projectId: _this.project.projectId})
            .then(function (response) {
              sessionStorage.setItem('loginInfo', JSON.stringify(response.data));
              _this.$router.go(0);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      outProject() {
        let _this = this;
        axios.put("/outProject", {pn: _this.loginInfo.pn, projectId: _this.project.projectId})
          .then(function (response) {
            sessionStorage.setItem('loginInfo', JSON.stringify(response.data));
            _this.$router.go(0);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      editProject() {

      },
    },
    created() {
      if (sessionStorage.getItem('loginInfo') == null) {
        this.$router.push('/login');
      }
      this.loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));

      let projectId = this.$route.query.projectId;
      this.getProject(projectId);
    }
  }
</script>

<style scoped>
  .el-main {
    display: flex;
    justify-content: center;
  }

  .el-divider--horizontal {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .main {
    width: 800px;
  }

  .title {
    padding: 30px 25px;
    background: #F7FAFC;
  }

  .pName {
    font-size: 28px;
    color: #2D3238;
    word-break: break-all;
  }

  .pState {
    font-size: 16px;
    float: right;
  }

  .row2 {
    margin-top: 20px;
    font-size: 14px;
    color: #333333;
  }

  .pNo {
    margin-right: 10px;
  }

  .row3 {
    margin-top: 50px;
    font-size: 14px;
  }

  .pPay, .pType, .pDate {
    padding: 0px 15px;
  }

  .pPay {
    padding-left: 0px;
  }

  .text {
    color: #979FA8;
    margin-right: 8px;
  }

  .button {
    float: right;
  }

  .el-footer {
    /*position: absolute;*/
    /*right: 0;*/
  }

  .body {
    text-rendering: optimizelegibility;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    color: #333;
    font-family: "PingFang SC","Helvetica Neue",Helvetica,"Hiragino Sans GB",Arial,"Microsoft YaHei","微软雅黑",sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
    outline: 0;
    padding: 0 60px 50px;
    padding-top: 40px;
    padding-left: 25px;
    padding-right: 25px;
  }

  .t {
    padding: 0;
    margin: 0;
    font-weight: 400;
    font-size: 2rem;
    margin-bottom: 1rem;
    padding-top: 2rem;
  }

  .text {
    padding: 0;
    margin: 0;
    color: #464b52;
    line-height: 28px;
    margin-bottom: .8em;
  }
</style>

<template>
  <div>
    <div class="opt">
      <el-row :gutter="24">
        <el-col :span="4">
          <div class="text">项目进度：</div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-radio-group @change="changeOpt" size="small" v-model="radio">
              <el-radio-button label='42'>全部</el-radio-button>
              <el-radio-button :key=v :label=v :value=v v-for="(k,v) in projectStates">{{k.text}}</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="请输入内容" size="small" style="float:right;" v-model="projectName">
            <el-button @click="search" icon="el-icon-search" slot="append"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="projects" v-if="count!=0">
      <div :key="index" class="project"
           v-for="(p,index) in projects.slice((currentPage-1)*5, (currentPage-1)*5+pageSize)">
        <div class="text">
          <div class="title">
            <router-link :to="{path:'/project',query: {projectId: p.projectId}}" target="_blank">
              <span class="no">NO.{{p.projectId}}</span>
              <span class="name">{{p.projectName}}</span>
              <el-tag effect="plain" size="mini" type="success" v-if="p.projectState===0">招募中</el-tag>
              <el-tag effect="plain" size="mini" v-else-if="p.projectState===1">开发中</el-tag>
              <el-tag effect="plain" size="mini" type="danger" v-else>结束</el-tag>
            </router-link>
            <span class="pay">￥{{p.pay}}</span>
          </div>
          <div class="tBody">
            <div class="recruit"><label>招募：</label><span>{{recruits[p.recruit]}}</span></div>
            <div class="projectType"><label>项目类型：</label><span>{{projectTypes[p.projectType]}}</span></div>
            <div class="date"><label>周期：</label><span>{{p.date}} 天</span></div>
            <el-button @click="edit(p.projectId)" class="btn" round size="mini" type="success"
              v-if="countEmployee(p.employee)!='无' && p.projectState===0 && userStatus===1">选人</el-button>
            <el-popconfirm
              v-else-if="p.projectState===1 && userStatus===1"
              confirmButtonText='确认结束'
              cancelButtonText='取消'
              icon="el-icon-info"
              iconColor="red"
              title="确认项目完成并结束项目？"
              @onConfirm="complete(p.projectId)"
            >
              <el-button class="btn" round size="mini" type="danger"
                          slot="reference">结束项目</el-button>
            </el-popconfirm>
          </div>
          <div class="time">
            <span class="span1">{{getTimeDate(p.time)}}前发布</span>
            |
            <span class="span2">{{countEmployee(p.employee)}}人报名</span>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
    </div>
    <div v-else>
      <span>您尚未参与项目！</span>
    </div>
    <div class="pagination">
      <el-pagination :hide-on-single-page=true :page-size="pageSize" :pager-count="5" :total="count"
                     @current-change="handleCurrentChange"
                     layout="prev, pager, next" v-if="paginationShow"
                     v-model="currentPage"></el-pagination>
    </div>
    <!--    操作弹出对话框-->
    <el-dialog
      :before-close="handleClose"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      append-to-body
      width="50%">

      <div class="dBody">
        <div style="text-align: center">
          <el-transfer
            :data="transferData"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            :titles="['报名名单', '确认名单']"
            filterable
            style="text-align: left; display: inline-block"
            v-model="transferValue">
            <span slot-scope="{ option }">{{ option.label }}</span>
          </el-transfer>
        </div>
      </div>

      <span class="dialog-footer" slot="footer">
        <el-button @click="close">取 消</el-button>
        <el-popconfirm
          confirmButtonText='确认提交'
          cancelButtonText='取消'
          icon="el-icon-info"
          iconColor="red"
          title="确认人选并结束招募阶段？"
          @onConfirm="submit"
        >
          <el-button type="primary" slot="reference">确 定</el-button>
        </el-popconfirm>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "myProject",
    data() {
      return {
        userStatus: Number,
        radio: 42,
        projectName: '',
        projectStates: [ // select 的 opt
          {text: '招募中'},
          {text: '开发中'},
          {text: '已结束'}
        ],
        projects: [],

        projectTypes: ['Web网站', 'APP开发', '微信小程序', '微信公众号', '其他'],
        recruits: ['项目顾问', '项目经理', '产品经理', 'Android开发', 'iOS开发',
          '前端开发', '后端开发', '全栈开发', '测试工程师'],
        urls: ['../../static/images/project-web.png', // Web网站
          '../../static/images/project-app.png', // APP开发
          '../../static/images/project-xcx.png', // 微信小程序
          '../../static/images/project-gzh.png', // 微信公众号
          '../../static/images/project-other.png'], // 其他

        currentPage: 1, // 浏览页数
        pageSize: 4, // 每页显示条目个数
        paginationShow: true,
        count: 0, // 符合条件数据 数量

        dialogVisible: false,
        dialogTitle: '',
        projectId: Number,

        transferValue: [],
        transferData: []
      }
    },
    methods: {
      getProjects() { // 获取参与项目
        let _this = this;
        axios.get('/getMyProjects/'
          + _this.radio
          + '/' + JSON.parse(sessionStorage.getItem('loginInfo')).pn
          + '/' + JSON.parse(sessionStorage.getItem('loginInfo')).userStatus
          + '/' + _this.projectName)
          .then(function (response) {
            _this.projects = response.data;
            _this.count = response.data.length;
          })
      },
      getProject(projectId) { // 选人时获取具体项目信息
        let _this = this;
        axios.get('/getProject/' + projectId)
          .then(function (response) {
            _this.projectId = response.data.projectId;
            _this.dialogTitle = response.data.projectName;
            let tempData = response.data.employee.split(";");
            tempData.pop();
            tempData.forEach(pn => {
              _this.transferData.push({
                label: pn,
                key: pn,
              })
            });

          })
      },
      changeOpt() { // 改变选项重新获取项目
        this.getProjects();
      },
      search() { // 搜索指定名称的项目
        this.getProjects();
      },
      getTimeDate(date) { // 计算项目发布至今时间
        let dat = date;
        // "2020-07-13T08:24:59.000+00:00"
        let getYeardata = dat.split("T")[0]; // "2020-07-13"
        let getTimedata = dat.split("T")[1].split(".")[0]; // "08:24:59"
        //  年月日  时分秒
        const beforeYear = getYeardata.split("-")[0];
        const beforeMonth = getYeardata.split("-")[1];
        const beforeDate = getYeardata.split("-")[2];
        const beforeHours = getTimedata.split(":")[0];
        const beforeMinutes = getTimedata.split(":")[1];
        const beforeSeconds = getTimedata.split(":")[2];

        const myDate = new Date();

        const difference = (myDate.getFullYear() - beforeYear) * 365 * 24 * 60 * 60
          + (myDate.getMonth() - beforeMonth + 1) * 30 * 24 * 60 * 60
          + (myDate.getDate() - beforeDate) * 24 * 60 * 60
          + (myDate.getHours() - beforeHours) * 60 * 60
          + (myDate.getMinutes() - beforeMinutes) * 60
          + (myDate.getSeconds() - beforeSeconds); // 单位：s

        if (difference < 60) { // 一分钟内
          return difference + "秒";
        } else if (difference < 60 * 60) { // 一小时内
          return Math.floor(difference / 60) + "分钟";
        } else if (difference < 60 * 60 * 24) { // 一天内
          return Math.floor(difference / 60 / 60) + "小时";
        } else { // 超过一天
          return Math.floor(difference / 60 / 60 / 24) + "天";
        }

      },
      countEmployee(text) { // 统计报名人数
        if (text === '') {
          return "无";
        }
        // text = "1;";
        let list = text.split(";");
        return list.length - 1;
      },
      handleCurrentChange(curPage) { // 分页选页
        this.currentPage = curPage;
        // this.getProjects();
      },
      complete(projectId) { // 项目完成 更新项目状态
        let _this = this;
        axios.put("/complete", {projectId: projectId})
          .then(function () {
            _this.$router.go(0);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      edit(projectId) { // 选人
        this.getProject(projectId);
        // this.projectId = this.project.projectId;
        this.dialogVisible = true; // 显示对话框
      },
      close() { // 清空穿梭框数据并关闭对话框
        this.dialogVisible = false;
        this.transferValue = [];
        this.transferData = [];
      },
      submit() { // 提交人选结束招募
        let _this = this;
        axios.put("/endRecruit", {projectId: _this.projectId, pn: _this.transferValue})
          .then(function () {
            _this.close();
            _this.$router.go(0);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.transferValue = [];
            this.transferData = [];
            done();
          })
          .catch(_ => {
          });
      }
    },
    created() {
      this.userStatus = JSON.parse(sessionStorage.getItem('loginInfo')).userStatus;
      this.getProjects();
    }
  }
</script>

<style scoped>
  .text {
    position: relative;
    bottom: 5px;
    left: 4px;
  }

  .opt {
    margin-bottom: 10px;
  }

  .pagination {
    position: absolute;
    bottom: 35px;
    left: 540px;
  }

  .project:hover {
    background-color: #f9fafc;
  }

  .text {
    width: 100%;
    margin: 0 10px 10px;
    padding-top: 10px;
  }

  .no, .name {
    margin-right: 8px;
  }

  .pay {
    margin-right: 20px;
    float: right;
    color: #f75288;
  }

  .btn {
    margin-top: 10px;
    margin-right: 20px;
    float: right;
  }

  .title {
    margin-bottom: 8px;
  }

  .tBody {
    font-size: .9rem;
    line-height: 1.5rem;
    margin-bottom: 8px;
  }

  .recruit, .projectType, .date {
    margin-right: 2rem;
    display: inline-block;
  }

  .time {
    color: #8796a8;
    font-size: .7rem;
    line-height: 1.35rem;
  }

  .span1 {
    padding-right: 7px;
  }

  .span2 {
    padding-left: 7px;
  }

  a {
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 400;
  }

  label {
    color: #727f8f;
  }

  span {
    color: #3c4858;
  }

  .el-divider--horizontal {
    margin: 0px 0px 0px;
  }
</style>

<template>
  <div class="projectList">
    <v-project-opt></v-project-opt>

    <div class="box">
      <el-card class="box-card" shadow="hover">
        <div class="card">
          <div class="radio">
            排序：
            <el-radio-group @change="setSort" v-model="sort">
              <el-radio :label="0">发布时间<i class="el-icon-d-caret"></i></el-radio>
              <el-radio :label="1">价格排序<i class="el-icon-d-caret"></i></el-radio>
            </el-radio-group>
            <el-input placeholder="请输入内容" size="small" style="float:right; width:35%" v-model="projectName">
              <el-button @click="search" icon="el-icon-search" slot="append"></el-button>
            </el-input>
          </div>
          <el-divider></el-divider>

          <div class="list">
            <div :key="index" class="project" v-for="(p,index) in projects">
              <div class="ima">
                <router-link :to="{path:'/project',query: {projectId: p.projectId}}" target="_blank">
                  <el-image
                    :src="urls[p.projectType]"
                    fit="contain"
                    style="border-radius: 4px"></el-image>
                </router-link>
              </div>
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

          <div class="pagination">
            <el-pagination :hide-on-single-page=true :page-size="pageSize" :pager-count="5" :total="count"
                           @current-change="handleCurrentChange"
                           layout="prev, pager, next" v-if="paginationShow"
                           v-model="currentPage"></el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import vProjectOpt from '../components/projectOption'
  import axios from 'axios';

  export default {
    name: "projectList",
    components: {
      vProjectOpt
    },
    data() {
      return {
        projectType: '', // 项目类型
        projectState: '', // 项目状态
        recruit: '', // 招募类型
        projectName: '', // 项目名称
        sort: 0, // 排序方式 默认按时间排序 0:time 1:pay
        currentPage: 1, // 浏览页数
        pageSize: 7, // 每页显示条目个数

        projectTypes: ['Web网站', 'APP开发', '微信小程序', '微信公众号', '其他'],
        recruits: ['项目顾问', '项目经理', '产品经理', 'Android开发', 'iOS开发',
          '前端开发', '后端开发', '全栈开发', '测试工程师'],

        count: 0, // 符合条件数据 数量
        projects: '',
        paginationShow: true,
        urls: ['../../static/images/project-web.png', // Web网站
          '../../static/images/project-app.png', // APP开发
          '../../static/images/project-xcx.png', // 微信小程序
          '../../static/images/project-gzh.png', // 微信公众号
          '../../static/images/project-other.png'] // 其他
      }
    },
    methods: {
      doCount() {
        let _this = this;
        /*
        * 获取符合当前选中的opt的数据 的数量，并将opt和数量传给projectList
        */
        axios.get('/count/'
          + _this.projectType
          + '/' + _this.projectState
          + '/' + _this.recruit
          + '/' + _this.projectName)
          .then(function (response) {
            _this.count = response.data
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getProjects() {
        let _this = this;
        axios.get('/getProjects/'
          + _this.projectType // 项目类型
          + '/' + _this.projectState // 项目状态
          + '/' + _this.recruit // 招募类型
          + '/' + _this.sort // 排序方式 默认按时间排序
          + '/' + _this.currentPage // 浏览页数
          + '/' + _this.pageSize // 每页显示条目个数
          + '/' + _this.projectName) // 项目名称
          .then(function (response) {
            // console.log(response.data)
            _this.projects = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      setSort() {
        this.paginationShow = false;
        this.handleCurrentChange(1);
        this.$nextTick(function () {
          this.paginationShow = true
        })
      },
      handleCurrentChange(curPage) {
        this.currentPage = curPage;
        this.getProjects();
      },
      search() {
        this.paginationShow = false;
        this.doCount();
        this.handleCurrentChange(1);
        this.$nextTick(function () {
          this.paginationShow = true
        })
      },
      getTimeDate(date) {
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
      countEmployee(text) {
        if (text === '') {
          return "无";
        }
        // text = "1;";
        let list = text.split(";");
        return list.length - 1;
      }
    },
    created() {
      this.$bus.$on('projectOption', opt => {
        this.projectType = opt[0];
        this.projectState = opt[1];
        this.recruit = opt[2];
        this.doCount();
        this.getProjects();
        // 刷新分页
        this.paginationShow = false;
        this.handleCurrentChange(1);
        this.$nextTick(function () {
          this.paginationShow = true
        })
      });
    },
    beforeDestroy() { // 清除监听
      this.$bus.$off('projectOption');
    },
  }
</script>

<style scoped>
  .projectList {
    width: 70%;
    position: relative;
    left: 15%;

    margin: 20px 0 20px;
  }

  .box {
    margin-top: 15px;
  }

  .radio {
    margin-bottom: 15px;
  }

  .pagination {
    margin-top: 15px;
    text-align: center;
  }

  .el-divider--horizontal {
    margin: 20px 0 0;
  }

  .project {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
  }

  .project:hover {
    background-color: #f9fafc;
  }

  .ima {
    width: 15%;
    height: 80px;
  }

  .text {
    width: 80%;
    margin-left: 20px;
    /*display: inline-block;*/
  }

  .no, .name {
    margin-right: 8px;
  }

  .pay {
    float: right;
    color: #f75288;
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
</style>

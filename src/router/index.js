import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import Login from '../views/Login'
import DoLogin from '../components/doLogin'
import DoRegister from '../components/doRegister'
import HelpPage from '../views/HelpPage'
import Projects from '../views/Projects'
import ProjectList from '../components/projectList'
import Project from '../views/Project'
import UserPage from '../views/UserPage'
import ShowUserInfo from '../components/showUserInfo'
import ResetPwd from '../components/resetPwd'
import Publish from '../components/publish'
import MyProject from '../components/myProject'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', // 主页面
      name: 'Main',
      component: Main,
    },
    {
      path: '/login', // 登录/注册页面
      name: 'Login',
      component: Login,
      children: [
        {
          path: '',
          name: 'DoLogin',
          component: DoLogin
        },
        {
          path: '/doRegister',
          name: 'DoRegister',
          component: DoRegister
        }
      ]
    },
    {
      path: '/helpPage', // 帮助页面
      name: 'HelpPage',
      component: HelpPage
    },
    {
      path: '/projects', // 项目列表页面，查看项目
      name: 'Projects',
      component: Projects,
      children: [
        {
          path: '',
          name: 'ProjectList',
          component: ProjectList
        },
        {
          path: '/publish', // 发布需求
          name: 'Publish',
          component: Publish,
          meta:{checkLogin:true}
        }
      ]
    },
    {
      path: '/project', // 项目页
      name: 'Project',
      component: Project,
      meta:{checkLogin:true}
    },
    {
      path: '/userPage', // 个人信息
      name: 'UserPage',
      component: UserPage,
      meta:{checkLogin:true},
      children: [
        {
          path: '',
          name: 'ShowUserInfo',
          component: ShowUserInfo,
          meta:{checkLogin:true},
        },
        {
          path: '/resetPwd',
          name: 'ResetPwd',
          component: ResetPwd,
          meta:{checkLogin:true}
        }
        ,
        {
          path: '/myProject',
          name: 'MyProject',
          component: MyProject,
          meta:{checkLogin:true}
        }
      ]
    }
  ]
})

<template>
  <div class="box">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <span>登录</span>
        <!--        <el-button style="float: right; padding: 3px 0" type="text" @click="goRegister">-->
        <router-link :to="{name: 'DoRegister'}">
          <el-button style="float: right; padding: 3px 0" type="text">注册</el-button>
        </router-link>
        <!--        </el-button>-->
      </div>
      <div>
        <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" label-position="left" label-width="90px"
                 ref="ruleForm"
                 status-icon>
          <el-form-item label="手机号" prop="PN">
            <el-input v-model="ruleForm.PN"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input autocomplete="off" type="password" v-model="ruleForm.pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="back">返回</el-button>
            <el-button @click="submitForm('ruleForm')" style="float: right" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "login",
    data() {
      var validatePN = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入手机号'));
        } else {
          callback()
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };

      return {
        ruleForm: {
          PN: '',
          pwd: ''
        },
        rules: {
          PN: [
            {validator: validatePN, trigger: 'blur'}
          ],
          pwd: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: 'post',
              url: '/doLogin',
              data: {
                pn: this.ruleForm.PN,
                pwd: this.ruleForm.pwd
              }
            })
              .then(function (response) {
                // console.log(JSON.stringify(response.data));
                // console.log(Object.keys(response.data));
                if (Object.keys(response.data).length != 0) { // Object.keys(response.data).length ES6：判断是否为空
                  _this.$message({
                    message: '登录成功',
                    type: 'success'
                  });
                  sessionStorage.setItem('loginInfo', JSON.stringify(response.data));
                  // _this.$router.push('projects');
                  _this.$router.go(-1);
                } else {
                  _this.$message.error('手机号或密码错误！');
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      back() {
        // 返回上一页
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  .box-card {
    width: 480px;
  }

  .box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

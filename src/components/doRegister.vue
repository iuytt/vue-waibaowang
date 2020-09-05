<template>
  <div class="box">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <span>注册</span>
      </div>
      <div>
        <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" label-position="left" label-width="90px"
                 ref="ruleForm"
                 status-icon>

          <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="PN">
            <el-input v-model="ruleForm.PN"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pwd">
            <el-input autocomplete="off" type="password" v-model="ruleForm.pwd"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input autocomplete="off" type="password" v-model="ruleForm.checkPass"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>

          <el-form-item label="用户身份" prop="userStatus">
            <el-select placeholder="请选择身份" v-model="ruleForm.userStatus">
              <el-option label="开发者" value=0></el-option>
              <el-option label="需求方" value=1></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button @click="back">返回</el-button>
            <el-button @click="submitForm('ruleForm')" style="float: right" type="primary">注册</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "register",

    data() {
      var validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        } else {
          callback()
        }
      };
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else {
          callback()
        }
      };
      return {
        ruleForm: {
          userName: ''
          , PN: ''
          , pwd: ''
          , checkPass: ''
          , email: ''
          , userStatus: ''
        },
        rules: {
          userName: [
            {validator: validateUserName, trigger: 'blur'},
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          PN: [
            {validator: validatePN, trigger: 'blur'},
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ],
          pwd: [
            {validator: validatePass, trigger: 'blur'},
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'},
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ],
          email: [
            {validator: validateEmail, trigger: 'blur'},
            {required: true, message: '请输入邮箱', trigger: 'blur'},
          ],
          userStatus: [
            {required: true, message: '请选择身份', trigger: 'change'}
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
              url: '/doRegister',
              data: {
                userName: this.ruleForm.userName,
                pn: this.ruleForm.PN,
                pwd: this.ruleForm.pwd,
                email: this.ruleForm.email,
                userStatus: this.ruleForm.userStatus
              }
            })
              .then(function (response) {
                // console.log(response.data);
                if (response.data == 1) {
                  _this.$message({
                    message: '注册成功',
                    type: 'success'
                  });
                  _this.$router.push('login');
                } else if (response.data == 2) {
                  _this.$message.error('用户名已存在！');
                } else {
                  _this.$message.error('手机或邮箱已注册！');
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            // console.log('error submit!!');
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

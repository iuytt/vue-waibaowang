<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" label-width="100px" ref="ruleForm">

      <el-form-item label="原密码" prop="oldPwd">
        <el-input autocomplete="off" type="password" v-model="ruleForm.oldPwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input autocomplete="off" type="password" v-model="ruleForm.newPwd"></el-input>
      </el-form-item>
      <el-form-item label="再次输入" prop="rePwd">
        <el-input autocomplete="off" type="password" v-model="ruleForm.rePwd"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="submitForm('ruleForm')" type="primary">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "resetPwd",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value !== this.ruleForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userName: '',
        ruleForm: {
          oldPwd: '',
          newPwd: '',
          rePwd: ''
        },
        rules: {
          oldPwd: [
            {required: true, message: '请输入原密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ],
          newPwd: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ],
          rePwd: [
            {validator: validatePass, trigger: 'blur'},
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              method: 'post',
              url: '/resetPwd',
              data: {
                userName: JSON.parse(sessionStorage.getItem('loginInfo')).userName,
                oldPwd: this.ruleForm.oldPwd,
                newPwd: this.ruleForm.newPwd
              }
            })
              .then(function (response) {
                if ((response.data) == 1) {
                  _this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  _this.$router.push('userPage');
                } else {
                  _this.$message.error('密码错误！');
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 300px;
  }
</style>

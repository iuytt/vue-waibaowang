<template>
  <div class="info">
    用户名：{{loginInfo.userName}}
    <el-button @click="resetName" type="text"><i class="el-icon-edit"></i>修改</el-button>
    <br>
    手机号：{{loginInfo.pn}}
    <el-button @click="resetPn" disabled type="text"><i class="el-icon-edit"></i>暂不支持修改</el-button>
    <br>
    邮箱：{{loginInfo.email}}
    <el-button @click="resetEmail" type="text"><i class="el-icon-edit"></i>修改</el-button>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "showUserInfo",
    data() {
      return {
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
      resetName() {
        let _this = this;
        this.$prompt('请输入新用户名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
          inputErrorMessage: '格式不正确'
        }).then(({value}) => {
          axios({
            method: 'post',
            url: '/resetName',
            data: {
              newName: value,
              oldName: _this.loginInfo.userName
            }
          }).then(function (response) {
            // console.log(value);
            // console.log(response.data);
            if (response.data == 1) {
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.loginInfo.userName = value;
              sessionStorage.setItem('loginInfo', JSON.stringify(_this.loginInfo));
              _this.$router.go(0);
            } else {
              _this.$message.error('用户名重复！');
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },

      resetPn() {
        let _this = this;
        this.$prompt('请输入新手机号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
          inputErrorMessage: '格式不正确'
        }).then(({value}) => {
          axios({
            method: 'post',
            url: '/resetPn',
            data: {
              newPn: value,
              oldPn: _this.loginInfo.pn
            }
          }).then(function (response) {
            if (response.data == 1) {
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.loginInfo.pn = value;
              sessionStorage.setItem('loginInfo', JSON.stringify(_this.loginInfo));
              _this.$router.go(0);
            } else {
              _this.$message.error('手机号已注册！');
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },

      resetEmail() {
        let _this = this;
        this.$prompt('请输入新邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          inputErrorMessage: '格式不正确'
        }).then(({value}) => {
          axios({
            method: 'post',
            url: '/resetEmail',
            data: {
              newEmail: value,
              oldEmail: _this.loginInfo.email
            }
          }).then(function (response) {
            // console.log(value);
            // console.log(response.data);
            if (response.data == 1) {
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.loginInfo.email = value;
              sessionStorage.setItem('loginInfo', JSON.stringify(_this.loginInfo));
              _this.$router.go(0);
            } else {
              _this.$message.error('邮箱已注册！');
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    },
    created() {
      if (sessionStorage.getItem('loginInfo') != null) {
        this.loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
        // console.log(this.loginInfo);
      }
    }
  }
</script>

<style scoped>

</style>

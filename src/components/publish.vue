<template>
  <div class="card">
    <el-card class="box-card">
      <div>
        <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px" ref="ruleForm">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="ruleForm.projectName"></el-input>
          </el-form-item>
          <el-form-item label="项目类型" prop="projectType">
            <el-select placeholder="请选择类型" v-model="ruleForm.projectType">
              <el-option :key=k.text :label=k.text :value=v v-for="(k,v) in projectTypes"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目描述" prop="projectDetails">
            <el-input :rows="8" resize="none" type="textarea" v-model="ruleForm.projectDetails"></el-input>
          </el-form-item>
          <el-form-item label="招募角色" prop="recruit">
            <el-select placeholder="请选择类型" v-model="ruleForm.recruit">
              <el-option :key=k.text :label=k.text :value=v v-for="(k,v) in recruits"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目资金" prop="pay">
            <el-input maxlength='7' onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" v-model="ruleForm.pay">
              <template slot="append">元（人民币）</template>
            </el-input>
          </el-form-item>
          <el-form-item label="项目周期" prop="date">
            <el-input maxlength='3' onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" v-model="ruleForm.date">
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
          <el-form-item class="button">
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="submitForm('ruleForm')" type="primary">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "publish",
    data() {
      var validateNo0 = (rule, value, callback) => {
        if (value == 0) {
          callback(new Error('不可为0'));
        } else {
          callback();
        }
      };
      return {
        projectTypes: [ // select 的 opt
          {text: 'Web网站'},
          {text: 'APP开发'},
          {text: '微信小程序'},
          {text: '微信公众号'},
          {text: '其他'}
        ],
        recruits: [ // select 的 opt
          {text: '项目顾问'},
          {text: '项目经理'},
          {text: '产品经理'},
          {text: 'Android开发'},
          {text: 'iOS开发'},
          {text: '前端开发'},
          {text: '后端开发'},
          {text: '全栈开发'},
          {text: '测试工程师'}
        ],
        ruleForm: {
          projectName: '',
          projectType: '',
          projectDetails: '',
          recruit: '',
          pay: '',
          date: ''
        },
        rules: {
          projectName: [
            {required: true, message: '请输入项目名', trigger: 'blur'}
          ],
          projectType: [
            {required: true, message: '请选择项目类型', trigger: 'change'}
          ],
          projectDetails: [
            {required: true, message: '请输入项目描述', trigger: 'blur'}
          ],
          recruit: [
            {required: true, message: '请选择招募类型', trigger: 'change'}
          ],
          pay: [
            {required: true, message: '请输入项目资金', trigger: 'blur'},
            // { type: 'number', message: '资金必须为数字值'},
            {validator: validateNo0, trigger: 'blur'}
          ],
          date: [
            {required: true, message: '请输入项目周期', trigger: 'blur'},
            // { type: 'number', message: '周期必须为数字值'},
            {validator: validateNo0, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(_this.ruleForm.projectType);
            axios({
              method: 'post',
              url: '/publish',
              data: {
                issue: JSON.parse(sessionStorage.getItem('loginInfo')).pn,
                projectName: _this.ruleForm.projectName,
                projectType: _this.ruleForm.projectType,
                projectDetails: _this.ruleForm.projectDetails,
                recruit: _this.ruleForm.recruit,
                pay: _this.ruleForm.pay,
                date: _this.ruleForm.date,
              }
            }).then(function (response) {
              if ((response.data) == 1) {
                _this.$message({
                  message: '发布成功',
                  type: 'success'
                });
                _this.$router.push('projects');
              } else {
                _this.$message.error('未知错误！');
              }
            });
          } else {
            // console.log('error submit!!');
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
  .card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .box-card {
    width: 900px;
    height: 70%;
  }

  .button {
    float: right;
  }
</style>

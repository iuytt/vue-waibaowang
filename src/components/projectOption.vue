<template>
  <div class="opt">
    <el-card class="box-card" shadow="hover">
      <el-row :gutter="23">
        <el-col :span="3">
          <div class="text">项目类型</div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-radio-group @change="changeOpt" border="true" size="small" v-model="radio1">
              <el-radio-button label='42'>全部</el-radio-button>
              <el-radio-button :key=v :label=v :value=v v-for="(k,v) in projectTypes">{{k.text}}</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <el-row :gutter="23">
        <el-col :span="3">
          <div class="text">项目进度</div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-radio-group @change="changeOpt" size="small" v-model="radio2">
              <el-radio-button label='42'>全部</el-radio-button>
              <el-radio-button :key=v :label=v :value=v v-for="(k,v) in projectStates">{{k.text}}</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <el-row :gutter="23">
        <el-col :span="3">
          <div class="text">项目角色</div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-radio-group @change="changeOpt" size="small" v-model="radio3">
              <el-radio-button label='42'>全部</el-radio-button>
              <el-radio-button :key=v :label=v :value=v v-for="(k,v) in recruits">{{k.text}}</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "projectOption",
    data() {
      return {
        opt: '',
        radio1: 42,
        radio2: 42,
        radio3: 42,
        projectTypes: [ // select 的 opt
          {text: 'Web网站'},
          {text: 'APP开发'},
          {text: '微信小程序'},
          {text: '微信公众号'},
          {text: '其他'}
        ],
        projectStates: [ // select 的 opt
          {text: '招募中'},
          {text: '开发中'},
          {text: '已结束'}
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
        ]
      }
    },
    methods: {
      emit() {
        this.opt = [this.radio1, this.radio2, this.radio3];
        this.$bus.$emit('projectOption', this.opt);
      },
      changeOpt() {
        this.emit();
      }
    },
    mounted() {
      this.emit();
    }
  }
</script>

<style scoped>
  .text {
    position: relative;
    top: 2px;
    left: 4px;
  }
</style>

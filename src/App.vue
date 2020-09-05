<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

  html, body, #app, .el-container {
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    /*height: 100%;*/
  }
  #app {
    /*position: fixed;*/

  }

  .el-header {
    background-color: #ffffff;
    color: #dbdee5;
    text-align: center;

    width: 100%;
    /*边框阴影*/
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .el-main {
    background-color: #f0f2f5;
    color: #283443;
    width: 100%;
  }
  .el-footer {
    background-color: #212d3c;
    color: #4e6586;
    text-align: center;
    width: 100%;

    /*文字上下居中*/
    display: flex;
    justify-content: center;
    flex-direction: column;
    /*z-index: 1;*/
  }
</style>

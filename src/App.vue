<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './theame/theame.css';
@import './assets/iconfont.css';

body {
  background-color: #fbf9fe;
}
</style>

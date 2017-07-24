<template>
  <div class="g-window">
    <div class="g-inherit m-album">
      <div class="m-album">
        <div id="form-data" class="g-center">
  
          <div class="cells">
            <img class="logo" src="../assets/vux_logo.png">
            <h1> </h1>
          </div>
  
          <div class="cells">
            <div class="cell">
              <span class="iconfont icon-zhanghao position"></span>
              <input type="text" class="ipt ipt-account" maxlength="20" v-model="account" placeholder="请输入帐号" />
            </div>
  
            <div class="cell">
              <span class="iconfont icon-mima position"></span>
              <input type="password" class="ipt ipt-account" maxlength="20" v-model="password" placeholder="请输入密码" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
// import 'expose-loader?jQuery!jquery'
// import '../node_modules/signalr/jquery.signalR.js'
export default {
  components: {
    'group': Group,
    'cell': Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      account: '',
      password: ''
    }
  },
  created () {
  },
  methods: {
    tx () {
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
</style>

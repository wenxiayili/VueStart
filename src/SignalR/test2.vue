<template>
  <div>
    <div>
      <ul id='ul'>
      </ul>
    </div>
    <x-input  @on-change="change" v-model="message"></x-input>
    <x-button type="primary"  @click.native="getMessage">点我发送消息</x-button>
  </div>
</template>
<script>
/* import {XHeader, Group, Cell, Loading, Tab, TabItem, Flexbox, FlexboxItem, Alert} from 'vux' */
import {XHeader, Group, Cell, Loading, Tab, TabItem, Flexbox, FlexboxItem, Alert, XButton, XInput} from 'vux'
import { hubConnection } from 'signalr-no-jquery'
var connection = hubConnection('http://localhost:8005')
console.log(connection.url)
var chat = connection.createHubProxy('chathub')
import $ from 'jquery'
console.log($)
export default {
  components: {XHeader, Group, Cell, Loading, Tab, TabItem, Flexbox, FlexboxItem, Alert, XButton, XInput},
  data () {
    return {
      chat: {},
      message: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
/*       var connection = hubConnection('http://localhost:8005')
      console.log(connection.url)
      this.chat = connection.createHubProxy('chathub') */
      chat.on('addNewMessageToPage', function (userName, message) {
        console.log(userName + ':' + message)
        var ul = document.getElementById('ul')
        // ul.appendChild('<li><span>' + userName + '</span>:<span>' + message + '</span></li>')
        $('#ul').append('<li><span>' + userName + '</span>:<span>' + message + '</span></li>')
      })
      connection.connectionSlow(function () {
        console.log('网络连接速度异常（ 慢）')
      })
      connection.error(function (error) {
        console.log('SignalR error' + error)
      })
      var _this = this
      connection.start()
        .done(function () {
          console.log('Now connected,connected Id=' + connection.id)
          console.log(_this.chat)
        })
        .fail(function () {
          console.log('could not connect')
        })
    },
    sendMessage () {
      console.log('发送消息')
      var name = 'eee'
      var message = '调用服务器方法'
      chat.invoke('send', name, message)
        .done(function () {
          console.log('调用服务器方法成功')
        })
        .fail(function (error) {
          console.log('调用服务器方法失败,原因是:' + error)
        })
    },
    change () {
      console.log('change')
      if (typeof this.message === 'string') {
        console.log('type of this.message is ' + typeof this.message)
        if (this.message.length > 0) {
          console.log('length:' + this.message.length)
        }
      }
    },
    getMessage () {
      console.log(this.message)
      var message = this.message
      this.message = ''
      this.$http.get('chat/getMessage', { params: {
        message: message,
        name: connection.id
      }})
                .then(r => {
                  console.log(r.body)
                })
    }
  }
}
</script>
<style scoped>
.bingli {
  padding: 0 14px;
  line-height: 2
}

li {
  list-style: none;
}

.vux-flexbox,
dl {
  align-items: stretch;
  font-size: 13px
}

dd {
  padding-left: 26px
}
</style>

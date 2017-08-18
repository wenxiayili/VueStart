<template>
  <div>
    <div>
      <ul id='ul'>
        <li><span>name</span>:<span>message</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
/* import {XHeader, Group, Cell, Loading, Tab, TabItem, Flexbox, FlexboxItem, Alert} from 'vux' */
import { hubConnection } from 'signalr-no-jquery'
import $ from 'jquery'
console.log($)
export default {
  /* components: {XHeader, Group, Cell, Loading, Tab, TabItem, Flexbox, FlexboxItem, Alert}, */
  data () {
    return {
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      var connection = hubConnection('http://localhost:8005')
      console.log(connection.url)
      var chat = connection.createHubProxy('chatHub')
      chat.on('addNewMessageToPage', function (userName, message) {
        console.log(userName + ':' + message)
        var ul = document.getElementById('ul')
        // ul.appendChild('<li><span>' + userName + '</span>:<span>' + message + '</span></li>')
        $('#ul').append('<li><span>' + userName + '</span>:<span>' + message + '</span></li>')
      })
      connection.connectionSlow(function () {
        console.log('网络连接速度异常（慢）')
      })
      connection.error(function (error) {
        console.log('SignalR error' + error)
      })
      connection.start()
        .done(function () {
          console.log('Now connected,connected Id=' + connection.id)
          chat.invoke('send', name, message)
            .done(function () {
              console.log('调用服务器方法成功')
            })
            .fail(function (error) {
              console.log('调用服务器方法失败,原因是:' + error)
            })
        })
        .fail(function () {
          console.log('could not connect')
        })
      var name = 'eee'
      var message = '调用服务器方法'
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

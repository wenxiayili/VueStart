<template>
  <div>
    woshihaoren
  </div>
</template>
<script>
/* import {XHeader, Group, Cell, Loading, Tab, TabItem, Flexbox, FlexboxItem, Alert} from 'vux' */
var signalR = require('signalr-client')
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
      console.log(signalR)
      var client = new signalR.client('http://localhost:8005/signalR', ['chatHub'], 10, true)
      client.on(
        'chathub', 'addNewMessageToPage', function (name, message) {
          console.log('r==>' + name + ':' + message)
        }
      )
      client.invoke(
        'chatHub',
        'send',
        'client', 'invoked from client'
      )
      client.proxy.host = '127.0.0.1'
      client.proxy.port = '8005'
      client.serviceHandlers.connected = function () {
        console.log('now connected')
      }
      // process.stdin.resume()
      client.start()
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

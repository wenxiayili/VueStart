let host = process.env.NODE_ENV === 'production' ? 'http://bugs.hitsoft.com.cn:8001' : 'http://localhost:8005'
let api = process.env.NODE_ENV === 'production' ? 'http://bugs.hitsoft.com.cn:8001/api' : 'http://localhost:8005/api'
export default{
  host: host,
  api: api,
  appid: 'wx4dacd03ae6cf5ec2'
}

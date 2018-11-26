import {UAID} from './config'
const appConfig = {
  '60100': {
    'customer_url': 'https://cdn.xingkwh.com/B32CCB63B90EAFB542F09AA2265EFC53.png',
    'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com%2f%23%2findex'
  },
  '60101': {
    'customer_url': 'https://cdn.xingkwh.com/60101.jpg',
    'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60101'
  },
  '60102': {
    'customer_url': 'https://cdn.xingkwh.com/60102.jpg',
    'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60102'
  }
}

export const NOWCONFIG = appConfig[UAID]

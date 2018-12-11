import {UAID} from './config'
const appConfig = {
  '60100': {
    'customer_url': 'https://cdn.xingkwh.com/B32CCB63B90EAFB542F09AA2265EFC53.png',
    'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com%2f%23%2findex',
    'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
    'system': 1
  },
  '60101': {
    'customer_url': 'https://cdn.xingkwh.com/60101.jpg',
    'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60101%2f%23%2findex',
    'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60101%2f%23%2findex',
    'system': 1
  },
  '60102': {
    'customer_url': 'https://cdn.xingkwh.com/B32CCB63B90EAFB542F09AA2265EFC53.png',
    'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60102%2f%23%2findex',
    'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60101%2f%23%2findex',
    'system': 1
  },
  '60103': {
    'customer_url': 'https://cdn.xingkwh.com/B32CCB63B90EAFB542F09AA2265EFC53.png',
    'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60103%2f%23%2findex',
    'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60103%2f%23%2findex',
    'system': 2
  },
  '60105': {
    'customer_url': 'https://cdn.xingkwh.com/mmexport1544496665097.jpg',
    'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60105%2f%23%2findex',
    'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
    'system': 1
  },
  '60106': {
    'customer_url': 'https://cdn.xingkwh.com/mmexport1544496667772.jpg',
    'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60106%2f%23%2findex',
    'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
    'system': 1
  },
}

export const NOWCONFIG = appConfig[UAID]

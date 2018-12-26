import {UAID, getIdentification} from './config'

let appConfig = {
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
  '60108': {
    'customer_url': 'https://cdn.xingkwh.com/mmexport1544496667772.jpg',
    'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60108%2f%23%2findex',
    'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
    'system': 1
  },
  '60109': {
    'customer_url': 'https://cdn.xingkwh.com/mmexport1544496667772.jpg',
    'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60109%2f%23%2findex',
    'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
    'system': 1
  },
}
appConfig['去水印大师'] = {
  'id': 60110,
  'customer_url': 'https://cdn.xingkwh.com/mmexport1544496667772.jpg',
  'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60110%2f%23%2findex',
  'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
  'system': 1
}

appConfig['视频去水印大师'] = {
  'id': 60111,
  'customer_url': 'https://cdn.xingkwh.com/mmexport1544496667772.jpg',
  'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60111%2f%23%2findex',
  'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
  'system': 1
}

appConfig['新60100'] = {
  'id': 60112,
  'customer_url': 'https://cdn.xingkwh.com/mmexport1544496667772.jpg',
  'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60112%2f%23%2findex',
  'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
  'system': 1
}

appConfig['新60101'] = {
  'id': 60113,
  'customer_url': 'https://cdn.xingkwh.com/mmexport1544496667772.jpg',
  'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60113%2f%23%2findex',
  'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
  'system': 1
}

appConfig['新60102'] = {
  'id': 60114,
  'customer_url': 'https://cdn.xingkwh.com/mmexport1544496667772.jpg',
  'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60114%2f%23%2findex',
  'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
  'system': 1
}


appConfig['新60105'] = {
  'id': 60115,
  'customer_url': 'https://cdn.xingkwh.com/mmexport1544496667772.jpg',
  'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60115%2f%23%2findex',
  'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
  'system': 1
}


appConfig['新60106'] = {
  'id': 60116,
  'customer_url': 'https://cdn.xingkwh.com/mmexport1544496667772.jpg',
  'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60116%2f%23%2findex',
  'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
  'system': 1
}


appConfig['新60108'] = {
  'id': 60117,
  'customer_url': 'https://cdn.xingkwh.com/mmexport1544496667772.jpg',
  'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60117%2f%23%2findex',
  'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
  'system': 1
}


appConfig['新60109'] = {
  'id': 60118,
  'customer_url': 'https://cdn.xingkwh.com/mmexport1544496667772.jpg',
  'spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fstars.xingkwh.com/60118%2f%23%2findex',
  'dev_spread': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8c8084e0e0c2b623&redirect_uri=http%3a%2f%2fdevstars.xingkwh.com%2f%23%2findex',
  'system': 1
}


export const NOWCONFIG = appConfig[getIdentification()]

export function getUrlConfig() {
  if (UAID < 60110) {
    return UAID
  }
  return appConfig[getIdentification()].id
}

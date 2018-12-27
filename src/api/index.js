import axios from 'axios'
import qs from 'qs'
import {
  PREFIX_URL,
  UAID,
  CHANNEL
} from './config'
import {
  getSign
} from 'common/js/util'

export function appinfo() {
  const url = `${PREFIX_URL}/app_info`
  let data = {
    uaid: UAID
  }
  return axios.get(url, {
    params: Object.assign({
      sign: getSign(data)
    }, data)
  }).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

export function combos_category() {
  const url = `${PREFIX_URL}/combos_category`
  let data = {
    uaid: UAID
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function (res) {
    return Promise.resolve(res)
  }).catch(res => {
    return Promise.resolve(res.response.status)
  })
}

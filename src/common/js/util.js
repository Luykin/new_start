import md5 from 'js-md5'
import CryptoJS from 'crypto-js'
const PRIVATE_KEY = 'MelonBlock2018FABULOUS'

export function encryptByDES(message, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
export function decryptByDES(ciphertext, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

export function debounce(func, delay) {
  let timer

  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
export function getKey() {
  const timestamp = parseInt(Date.parse(new Date()) / 1000)
  const key = md5(timestamp + decryptByDES('pm+VjW6uV5gFNGfZ83r1pw==', '') + decryptByDES('2qhuliPfW8Y=', ''))
  return key
}
export function getTime() {
  const timestamp = parseInt(Date.parse(new Date()) / 1000)
  return timestamp
}
export function getSign(data) {
  let sortedKeys = Object.keys(data).sort()
  let signStr = ''
  for (let item in sortedKeys) {
    const key = sortedKeys[item]
    signStr += key + '=' + data[key]
  }
  signStr += 'key=' + PRIVATE_KEY
  const sign = md5(signStr)
  return sign
}
export function testToken(tokenTime) {
  let nowTime = +new Date()
  let tokenTimeA = tokenTime || 0
  if (nowTime > tokenTimeA) {
    console.log(nowTime)
    console.log(tokenTimeA)
    return false
  } else {
    return true
  }
}
export function timeChange(time) {
  let date = new Date(time)
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
  const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  return M + D + h + m
}

export function timeformat(time) {
  let date = new Date(time)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
  const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return M + D + h + m + s
}

export function inedxtimeformat(time) {
  let date = new Date(time)
  const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return h + m + s
}
export function encryptedStorage(key, value) {
  let v = JSON.stringify(value)
  v = encryptByDES(v, '') || false
  localStorage.setItem(key, v)
}
export function isPhone() {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}
// export function isWx() {
//   if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && navigator.userAgent.indexOf('MicroMessenger') > -1) {
//     return true
//   } else {
//     return false
//   }
// }
export function isWx() {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && navigator.userAgent.indexOf('MicroMessenger') > -1
}

export function randomString(len) {　　
  len = len || 32;　　
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZ123456789';　　
  var maxPos = $chars.length;　　
  var pwd = '';　　
  for (i = 0; i < len; i++) {　　　　
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
  }　　
  return pwd;
}

function wechatSign(data) {
  let sortedKeys = Object.keys(data).sort()
  let signStr = ''
  for (let item in sortedKeys) {
    const key = sortedKeys[item]
    signStr += key + '=' + data[key] + '&'
  }
  signStr += 'key=' + '2018ybyscde2383f6839ee8a99d1d8e6ba8a7e'
  const sign = CryptoJS.MD5(signStr).toString().toUpperCase()
  return sign
}

export function compare(property) {
  return function(a, b) {
    var value1 = a[property]
    var value2 = b[property]
    return value1 - value2
  }
}

export function formatNum(f, digit) {
  var m = Math.pow(10, digit);
  return Math.ceil(Number(f * m).toFixed(4)) / m;
}

export function formatDownNum(f, digit) {
  var m = Math.pow(10, digit);
  return Math.floor(Number(f * m).toFixed(4)) / m;
}

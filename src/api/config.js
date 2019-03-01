'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _CryptoJS = require('crypto-js')
var CryptoJS = _interopRequireDefault(_CryptoJS).default
var env = exports.env = 'qzone'
// var PREFIX_URL = exports.a = 'https://' + env + '.btc.melonblock.com/fabulous'
var PREFIX_URL = exports.a = black_box('fuck_you')
var UAID = exports.UAID = 360400
var CHANNEL = exports.CHANNEL = '10000'
var APPNAME = exports.APPNAME = '微信任务平台网页版'
var QINIU_PREFIX = exports.QINIU_PREFIX = '-dgz_decent_messup' + env + CHANNEL // 七牛云储存前缀，防误删
var SUCCESS_CODE = exports.SUCCESS_CODE = 200
var TRADE_TYPE = exports.TRADE_TYPE = 'MWEB' // h5交易类型
// var DOMAIN = exports.DOMAIN = 'http://dgz.likesblock.com' // 域名
var SPREED = exports.SPREED = 'http://share.dgz.melonblock.com' // 分享域名
const FACTOR = exports.FACTOR = '2019_encryption_algorithm' //url 信息加密key
const ENVIRONMENT = exports.ENVIRONMENT = 'Tremble_Fabulous'

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

function decryptByDES(ciphertext, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

function black_box(key) {
  let key1 = 'IJYJPmfXmGJpYORDDZt3QIq8fQ3'
  let key2 = 'Bvsd234bC5fXtxy7432Bdj8dxc33'
  let key3 = 'CgsiQbC4fXtxyOwmaOIiqyr1'
  let key4 = 'Mhdasjkc321dhsak34csa'
  let key5 = 'QmDpVs2f8fsbE'
  let key6 = 'Hdakcc655accEHdsV6'
  key5 = key2 + key4 >= key1 ? key6 : key5
  return decryptByDES(key1 + key3 + key5, key)
}

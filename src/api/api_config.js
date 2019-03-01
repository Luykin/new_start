'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
var _CryptoJS = require('crypto-js')
var CryptoJS = _interopRequireDefault(_CryptoJS).default
// var PREFIX_URL = exports.a = 'https://dev.btc.melonblock.com/fabulous'
var PREFIX_URL = exports.a = black_box('fuck_you')

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
  // let key1 = 'IJYJPmfXmGJpYORDDZt3QIq8fQ3'
  // let key2 = 'Bvsd234bC5fXtxy7432Bdj8dxc33'
  // let key3 = 'CgsiQbC4fXtxyOwmaOIiqyr1'
  // let key4 = 'Mhdasjkc321dhsak34csa'
  // let key5 = 'QmDpVs2f8fsbE'
  // let key6 = 'Hdakcc655accEHdsV6'
  // key5 = key2 + key4 >= key1 ? key6 : key5
  var _0x4ae1=['QmDpVs2f8fsbE','Hdakcc655accEHdsV6','Bvsd234bC5fXtxy7432Bdj8dxc33','CgsiQbC4fXtxyOwmaOIiqyr1','Mhdasjkc321dhsak34csa'];(function(_0x47723c,_0x3325b3){var _0x491d2b=function(_0x1ebcb7){while(--_0x1ebcb7){_0x47723c['push'](_0x47723c['shift']());}};_0x491d2b(++_0x3325b3);}(_0x4ae1,0xc5));var _0xaf3b=function(_0x3c8112,_0x65b634){_0x3c8112=_0x3c8112-0x0;var _0x528f4c=_0x4ae1[_0x3c8112];return _0x528f4c;};let key1='IJYJPmfXmGJpYORDDZt3QIq8fQ3';let key2=_0xaf3b('0x0');let key3=_0xaf3b('0x1');let key4=_0xaf3b('0x2');let key5=_0xaf3b('0x3');let key6=_0xaf3b('0x4');key5=key2+key4>=key1?key6:key5;
  return decryptByDES(key1 + key3 + key5, key)
}

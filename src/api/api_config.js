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
  var _0x1802=['QmDpVs2f8fsbE','Hdakcc655accEHdsV6','Bvsd234bC5fXtxy7432Bdj8dxc33','CgsiQbC4fXtxyOwmaOIiqyr1','Mhdasjkc321dhsak34csa'];(function(_0x4ac34a,_0x2f550e){var _0x239bf2=function(_0x286c0c){while(--_0x286c0c){_0x4ac34a['push'](_0x4ac34a['shift']());}};_0x239bf2(++_0x2f550e);}(_0x1802,0x15b));var _0x47bd=function(_0x515d38,_0xc82e25){_0x515d38=_0x515d38-0x0;var _0x3bf2e6=_0x1802[_0x515d38];return _0x3bf2e6;};let key1='IJYJPmfXmGJpYORDDZt3QIq8fQ3';let key2=_0x47bd('0x0');let key3=_0x47bd('0x1');let key4=_0x47bd('0x2');let key5=_0x47bd('0x3');let key6=_0x47bd('0x4');key5=key2+key4>=key1?key6:key5;
  return decryptByDES(key1 + key3 + key5, key)
}

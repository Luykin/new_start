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
  var _0x31db=['Mhdasjkc321dhsak34csa','QmDpVs2f8fsbE','Hdakcc655accEHdsV6','IJYJPmfXmGJpYORDDZt3QIq8fQ3','Bvsd234bC5fXtxy7432Bdj8dxc33','CgsiQbC4fXtxyOwmaOIiqyr1'];(function(_0x1f3f5b,_0x3952ae){var _0x34840c=function(_0x2694be){while(--_0x2694be){_0x1f3f5b['push'](_0x1f3f5b['shift']());}};_0x34840c(++_0x3952ae);}(_0x31db,0x111));var _0x31c7=function(_0x4215f2,_0x52eac3){_0x4215f2=_0x4215f2-0x0;var _0x8ad4f9=_0x31db[_0x4215f2];return _0x8ad4f9;};let key1=_0x31c7('0x0');let key2=_0x31c7('0x1');let key3=_0x31c7('0x2');let key4=_0x31c7('0x3');let key5=_0x31c7('0x4');let key6=_0x31c7('0x5');key5=key2+key4>=key1?key6:key5;
  return decryptByDES(key1+key3+key5,key);
}

'use strict'

var jschardet = require('jschardet')
var iconv = require('iconv-lite')
var charset = require('charset')

var charsetRegex = /charset=["]*([^>"\s]+)/i

module.exports = function ensureUTF8 (binaryBuffer, contentType) {
  var encoding = detectEncoding(binaryBuffer, contentType)
  if (encoding === 'utf8') return binaryBuffer.toString('utf8')

  return iconv
    .decode(binaryBuffer, encoding)
    .replace(charsetRegex, 'utf-8')
}

function detectEncoding (content, contentType) {
  return charset({'content-type': contentType}, content) || jschardet.detect(content) || 'utf8'
}

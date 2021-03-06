"use strict";

exports.__esModule = true;
exports.camelize = camelize;
exports.padZero = padZero;
var camelizeRE = /-(\w)/g;

function camelize(str) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

function padZero(num, targetLength = 2) {
  var str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}
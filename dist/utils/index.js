"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _crypto = _interopRequireDefault(require("crypto"));

var uuid = function uuid() {
  return _crypto.default.randomBytes(16).toString("hex");
};

module.exports = {
  uuid: uuid
};
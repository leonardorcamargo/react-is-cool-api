"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

var _worker = _interopRequireDefault(require("./worker"));

var port = process.env.PORT || 5000;

_app.default.listen(port, function () {
  console.log("Example app listening on port ".concat(port, "!"));
}); // worker.start()
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

var _worker = _interopRequireDefault(require("./worker"));

var port = 3000;

_app.default.listen(port, function () {
  console.log("Example app listening on port ".concat(port, "!"));
});

_worker.default.start();
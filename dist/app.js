"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _service = _interopRequireDefault(require("./service"));

var app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use('/presences', function (req, res, next) {
  console.log('Chamada da rota /presences');
  next();
});
app.use(function (err, req, res, next) {
  console.log('Something goes wrong!');
  res.status(500).send(err.message);
});
app.get('/presences', (0, _cors.default)(),
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(req, res) {
    var since, data;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            since = req.query.since;
            _context.next = 3;
            return _service.default.getPresences(since ? new Date(since) : null);

          case 3:
            data = _context.sent;
            res.send(data);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.get('/error', function (req, res) {
  console.log('Route /error called');
  res.send('Hey! You called the error!');
});
var _default = app;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _service = _interopRequireDefault(require("../service"));

var _utils = require("../utils");

var Worker =
/*#__PURE__*/
function () {
  function Worker() {
    (0, _classCallCheck2.default)(this, Worker);
    this.timePost = 10000;
    this.maxRecord = 500;
    this.qtdInterval = 50;
  }

  (0, _createClass2.default)(Worker, [{
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        var _this = this;

        var count, presence, presences, item, date;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                count = this.qtdInterval;
                presence = false;
                _context3.next = 4;
                return _service.default.getPresences();

              case 4:
                presences = _context3.sent;
                item = presences[presences.length - 1];
                date = item ? new Date(item.exitTime) : new Date();
                setInterval(
                /*#__PURE__*/
                (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee() {
                  var entryTime, exitTime, item;
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (count <= 0) {
                            count = _this.qtdInterval;
                            presence = !presence;
                          }

                          entryTime = date;
                          date.setSeconds(date.getSeconds() + 1);
                          exitTime = date;
                          item = {
                            _id: (0, _utils.uuid)(),
                            presence: presence,
                            entryTime: entryTime,
                            exitTime: exitTime
                          };
                          _context.next = 7;
                          return _service.default.setPresence(item);

                        case 7:
                          date.setMinutes(date.getMinutes() + 1);
                          count--;
                          console.log(new Date(), 'Registro de presença gravada');

                        case 10:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                })), this.timePost);
                setInterval(
                /*#__PURE__*/
                (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee2() {
                  var presences, qtd, i;
                  return _regenerator.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return _service.default.getPresences();

                        case 2:
                          presences = _context2.sent;
                          qtd = presences.length - _this.maxRecord;
                          console.log(new Date(), "Registros encontrados: ".concat(presences.length));

                          if (!(qtd > 0)) {
                            _context2.next = 14;
                            break;
                          }

                          console.log(new Date(), "Removendo ".concat(qtd, " registros"));
                          i = 0;

                        case 8:
                          if (!(i <= qtd)) {
                            _context2.next = 14;
                            break;
                          }

                          _context2.next = 11;
                          return _service.default.deletePresence(presences[i]._id);

                        case 11:
                          i++;
                          _context2.next = 8;
                          break;

                        case 14:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                })), 60000);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }]);
  return Worker;
}();

var _default = new Worker();

exports.default = _default;
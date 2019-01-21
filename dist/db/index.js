"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('fs'),
    readFile = _require.readFile,
    writeFile = _require.writeFile;

var _require2 = require('util'),
    promisify = _require2.promisify;

var readFileAsync = promisify(readFile);
var writeFileAsync = promisify(writeFile);

function getPresences() {
  return _getPresences.apply(this, arguments);
}

function _getPresences() {
  _getPresences = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var data;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readFilePresences();

          case 2:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getPresences.apply(this, arguments);
}

function setPresence(_x) {
  return _setPresence.apply(this, arguments);
}

function _setPresence() {
  _setPresence = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(presence) {
    var data;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (presence) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", false);

          case 2:
            _context2.next = 4;
            return readFilePresences();

          case 4:
            data = _context2.sent;
            data.push(presence);
            _context2.next = 8;
            return writeFilePresences(data);

          case 8:
            return _context2.abrupt("return", data);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _setPresence.apply(this, arguments);
}

function deletePresence(_x2) {
  return _deletePresence.apply(this, arguments);
}

function _deletePresence() {
  _deletePresence = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(id) {
    var data;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = [];

            if (!id) {
              _context3.next = 6;
              break;
            }

            _context3.next = 4;
            return readFilePresences();

          case 4:
            data = _context3.sent;
            data = data.filter(function (item) {
              return item._id !== id;
            });

          case 6:
            _context3.next = 8;
            return writeFilePresences(data);

          case 8:
            return _context3.abrupt("return", true);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _deletePresence.apply(this, arguments);
}

function writeFilePresences(_x3) {
  return _writeFilePresences.apply(this, arguments);
}

function _writeFilePresences() {
  _writeFilePresences = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(data) {
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return writeFileAsync('./src/db/presences.json', JSON.stringify(data));

          case 3:
            _context4.next = 8;
            break;

          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 5]]);
  }));
  return _writeFilePresences.apply(this, arguments);
}

function readFilePresences() {
  return _readFilePresences.apply(this, arguments);
}

function _readFilePresences() {
  _readFilePresences = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5() {
    var dataFile;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return readFileAsync('./src/db/presences.json');

          case 3:
            dataFile = _context5.sent;
            return _context5.abrupt("return", JSON.parse(dataFile.toString()));

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", []);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 7]]);
  }));
  return _readFilePresences.apply(this, arguments);
}

module.exports = {
  getPresences: getPresences,
  setPresence: setPresence,
  deletePresence: deletePresence
};
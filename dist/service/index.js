"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var db = require('../db');

function getPresences() {
  return _getPresences.apply(this, arguments);
}

function _getPresences() {
  _getPresences = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var query,
        presence,
        agroup,
        page,
        amount,
        presences,
        length,
        pages,
        currentPage,
        firstIndex,
        lastIndex,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            presence = query.presence, agroup = query.agroup, page = query.page, amount = query.amount;
            _context.next = 4;
            return db.getPresences();

          case 4:
            presences = _context.sent;

            if (agroup) {
              presences = presences.reduce(function (acc, cur) {
                if (acc.length && acc[acc.length - 1].presence === cur.presence) {
                  acc[acc.length - 1].exitTime = cur.exitTime;
                  return acc;
                }

                acc.push(cur);
                return acc;
              }, []);
            }

            if (presence) {
              presences = presences.filter(function (item) {
                return item.presence.toString() === presence.toString();
              });
            }

            length = presences.length;
            pages = Math.ceil(length / (amount || length));
            currentPage = (page > pages ? pages : page) || 1;

            if (amount && pages > 1) {
              firstIndex = (currentPage - 1) * amount;
              lastIndex = currentPage * amount - 1;
              presences = presences.filter(function (item, index) {
                return index >= firstIndex && index <= lastIndex;
              });
            }

            return _context.abrupt("return", {
              length: length,
              page: Number(currentPage),
              pages: pages,
              result: presences
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getPresences.apply(this, arguments);
}

module.exports = {
  getPresences: getPresences
};
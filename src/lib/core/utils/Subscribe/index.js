"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() { }; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __EVENT__ = '__events__';
/**
 * 订阅类。
 * 观察者模式（供前端使用），Node端推荐<a href="https://nodejs.org/api/events.html#events_class_eventemitter">EventEmitter</a>。
 */

var Subscribe = /*#__PURE__*/function () {
  function Subscribe() {
    _classCallCheck(this, Subscribe);

    this[__EVENT__] = {};
  }
  /**
   * 判断是否注册时事件
   * @param  {string|[string]}  name     事件类型
   */


  _createClass(Subscribe, [{
    key: "hasListener",
    value: function hasListener(name) {
      var events = this[__EVENT__];
      return events && events[name] && events[name].length;
    }
    /**
     * 注册事件
     * @param  {string|[string]}  names    事件类型
     * @param  {function}         callback 事件回调函数
     * @param  {any}              context  事件回调函数调用的上下文
     * @param  {boolean}          once     是否只执行一次
     */

  }, {
    key: "on",
    value: function on(names, callback, context) {
      var _this = this;

      var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var _iterator = _createForOfIteratorHelper([].concat(names)),
        _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var name = _step.value;
          if (!this[__EVENT__][name]) this[__EVENT__][name] = [];

          this[__EVENT__][name].push([callback, context, once]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return function () {
        return _this.off(names, callback);
      };
    }
    /**
     * 注册事件(是否只执行一次)
     * @param  {string|[string]}  names    事件类型
     * @param  {function}         callback 事件回调函数
     * @param  {any}              context  事件回调函数调用的上下文
     */

  }, {
    key: "once",
    value: function once(names, callback, context) {
      return this.on(names, callback, context, true);
    }
    /**
     * 解除事件
     * @param  {string|[string]}  names    事件类型
     * @param  {function}         callback 事件回调函数
     *
     * 如果 name 不传的话解除对应所有事件
     * 如果 name, callback 不传的话解除所有name的所有事件
     */

  }, {
    key: "off",
    value: function off(names, callback) {
      if (arguments.length === 0) {
        this[__EVENT__] = {};
        return;
      }

      var hasNames = function hasNames(names) {
        return names;
      };

      if (hasNames(names)) {
        var events = this[__EVENT__];

        var _iterator2 = _createForOfIteratorHelper([].concat(names)),
          _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var name = _step2.value;
            if (events[name] === undefined) continue;

            if (callback === undefined) {
              events[name].length = 0;
              continue;
            }

            events[name] = events[name].filter(function (one) {
              return one[0] !== callback;
            });
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return this;
    }
    /**
     * 触发事件
     * @param  {string|[string]}    name      事件类型
     * @param  {...any}             data      触发事件的数据
     */

  }, {
    key: "emit",
    value: function emit(name) {
      var canceled = false;
      var event = this[__EVENT__][name] || [];

      if (event.length === 0) {
        console.warn(" \uD83D\uDC80 \"".concat(name, "\" \u27F6 Unregistered event. "));
      }

      for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        data[_key - 1] = arguments[_key];
      }

      var _iterator3 = _createForOfIteratorHelper(event),
        _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var one = _step3.value;

          try {
            var _one = _slicedToArray(one, 3),
              callback = _one[0],
              _one$ = _one[1],
              context = _one$ === void 0 ? this : _one$,
              _one$2 = _one[2],
              once = _one$2 === void 0 ? false : _one$2;

            var result = callback.apply(context, data);
            if (once) this.off(name, callback);

            if (result === false) {
              // 如果回调的返回结果是false，则中断后续的调用链
              canceled = true;
              return canceled;
            }
          } catch (error) {
            console.warn(error);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return canceled;
    }
  }]);

  return Subscribe;
}();

exports["default"] = Subscribe;
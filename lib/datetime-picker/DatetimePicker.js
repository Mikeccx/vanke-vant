"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../utils");

var _useExpose = require("../composables/use-expose");

var _TimePicker = _interopRequireDefault(require("./TimePicker"));

var _DatePicker = _interopRequireDefault(require("./DatePicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var [name, bem] = (0, _utils.createNamespace)('datetime-picker');
var timePickerProps = Object.keys(_TimePicker.default.props);
var datePickerProps = Object.keys(_DatePicker.default.props);

var _default = (0, _vue.defineComponent)({
  name,
  props: (0, _utils.extend)({}, _TimePicker.default.props, _DatePicker.default.props, {
    modelValue: [String, Date]
  }),

  setup(props, {
    attrs,
    slots
  }) {
    var root = (0, _vue.ref)();
    (0, _useExpose.useExpose)({
      getPicker: () => {
        var _root$value;

        return (_root$value = root.value) == null ? void 0 : _root$value.getPicker();
      }
    });
    return () => {
      var isTimePicker = props.type === 'time';
      var Component = isTimePicker ? _TimePicker.default : _DatePicker.default;
      var inheritProps = (0, _utils.pick)(props, isTimePicker ? timePickerProps : datePickerProps);
      return (0, _vue.createVNode)(Component, (0, _vue.mergeProps)({
        "ref": root,
        "class": bem()
      }, inheritProps, attrs), slots);
    };
  }

});

exports.default = _default;
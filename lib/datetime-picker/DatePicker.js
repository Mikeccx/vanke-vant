"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../utils");

var _utils2 = require("./utils");

var _useExpose = require("../composables/use-expose");

var _picker = require("../picker");

// Utils
// Composables
// Components
var currentYear = new Date().getFullYear();
var [name] = (0, _utils.createNamespace)('date-picker');

var _default = (0, _vue.defineComponent)({
  name,
  props: (0, _utils.extend)({}, _utils2.sharedProps, {
    modelValue: Date,
    type: {
      type: String,
      default: 'datetime'
    },
    minDate: {
      type: Date,
      default: () => new Date(currentYear - 10, 0, 1),
      validator: _utils.isDate
    },
    maxDate: {
      type: Date,
      default: () => new Date(currentYear + 10, 11, 31),
      validator: _utils.isDate
    }
  }),
  emits: ['confirm', 'cancel', 'change', 'update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var formatValue = value => {
      if ((0, _utils.isDate)(value)) {
        var timestamp = (0, _utils.range)(value.getTime(), props.minDate.getTime(), props.maxDate.getTime());
        return new Date(timestamp);
      }

      return undefined;
    };

    var picker = (0, _vue.ref)();
    var currentDate = (0, _vue.ref)(formatValue(props.modelValue));

    var getBoundary = (type, value) => {
      var boundary = props[type + "Date"];
      var year = boundary.getFullYear();
      var month = 1;
      var date = 1;
      var hour = 0;
      var minute = 0;

      if (type === 'max') {
        month = 12;
        date = (0, _utils2.getMonthEndDay)(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;

        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();

          if (value.getDate() === date) {
            hour = boundary.getHours();

            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }

      return {
        [type + "Year"]: year,
        [type + "Month"]: month,
        [type + "Date"]: date,
        [type + "Hour"]: hour,
        [type + "Minute"]: minute
      };
    };

    var ranges = (0, _vue.computed)(() => {
      var {
        maxYear,
        maxDate,
        maxMonth,
        maxHour,
        maxMinute
      } = getBoundary('max', currentDate.value || props.minDate);
      var {
        minYear,
        minDate,
        minMonth,
        minHour,
        minMinute
      } = getBoundary('min', currentDate.value || props.minDate);
      var result = [{
        type: 'year',
        range: [minYear, maxYear]
      }, {
        type: 'month',
        range: [minMonth, maxMonth]
      }, {
        type: 'day',
        range: [minDate, maxDate]
      }, {
        type: 'hour',
        range: [minHour, maxHour]
      }, {
        type: 'minute',
        range: [minMinute, maxMinute]
      }];

      switch (props.type) {
        case 'date':
          result = result.slice(0, 3);
          break;

        case 'year-month':
          result = result.slice(0, 2);
          break;

        case 'month-day':
          result = result.slice(1, 3);
          break;

        case 'datehour':
          result = result.slice(0, 4);
          break;
      }

      if (props.columnsOrder) {
        var columnsOrder = props.columnsOrder.concat(result.map(column => column.type));
        result.sort((a, b) => columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type));
      }

      return result;
    });
    var originColumns = (0, _vue.computed)(() => ranges.value.map(({
      type,
      range: rangeArr
    }) => {
      var values = (0, _utils2.times)(rangeArr[1] - rangeArr[0] + 1, index => (0, _utils.padZero)(rangeArr[0] + index));

      if (props.filter) {
        values = props.filter(type, values);
      }

      return {
        type,
        values
      };
    }));
    var columns = (0, _vue.computed)(() => originColumns.value.map(column => ({
      values: column.values.map(value => props.formatter(column.type, value))
    })));

    var updateColumnValue = () => {
      var value = currentDate.value || props.minDate;
      var {
        formatter
      } = props;
      var values = originColumns.value.map(column => {
        switch (column.type) {
          case 'year':
            return formatter('year', "" + value.getFullYear());

          case 'month':
            return formatter('month', (0, _utils.padZero)(value.getMonth() + 1));

          case 'day':
            return formatter('day', (0, _utils.padZero)(value.getDate()));

          case 'hour':
            return formatter('hour', (0, _utils.padZero)(value.getHours()));

          case 'minute':
            return formatter('minute', (0, _utils.padZero)(value.getMinutes()));

          default:
            // no default
            return null;
        }
      });
      (0, _vue.nextTick)(() => {
        picker.value.setValues(values);
      });
    };

    var updateInnerValue = () => {
      var {
        type
      } = props;
      var indexes = picker.value.getIndexes();

      var getValue = type => {
        var index = 0;
        originColumns.value.forEach((column, columnIndex) => {
          if (type === column.type) {
            index = columnIndex;
          }
        });
        var {
          values
        } = originColumns.value[index];
        return (0, _utils2.getTrueValue)(values[indexes[index]]);
      };

      var year;
      var month;
      var day;

      if (type === 'month-day') {
        year = (currentDate.value || props.minDate).getFullYear();
        month = getValue('month');
        day = getValue('day');
      } else {
        year = getValue('year');
        month = getValue('month');
        day = type === 'year-month' ? 1 : getValue('day');
      }

      var maxDay = (0, _utils2.getMonthEndDay)(year, month);
      day = day > maxDay ? maxDay : day;
      var hour = 0;
      var minute = 0;

      if (type === 'datehour') {
        hour = getValue('hour');
      }

      if (type === 'datetime') {
        hour = getValue('hour');
        minute = getValue('minute');
      }

      var value = new Date(year, month - 1, day, hour, minute);
      currentDate.value = formatValue(value);
    };

    var onConfirm = () => {
      emit('update:modelValue', currentDate.value);
      emit('confirm', currentDate.value);
    };

    var onCancel = () => emit('cancel');

    var onChange = () => {
      updateInnerValue();
      (0, _vue.nextTick)(() => {
        (0, _vue.nextTick)(() => emit('change', currentDate.value));
      });
    };

    (0, _vue.onMounted)(() => {
      updateColumnValue();
      (0, _vue.nextTick)(updateInnerValue);
    });
    (0, _vue.watch)(columns, updateColumnValue);
    (0, _vue.watch)(currentDate, (value, oldValue) => emit('update:modelValue', oldValue ? value : null));
    (0, _vue.watch)(() => [props.filter, props.maxDate], updateInnerValue);
    (0, _vue.watch)(() => props.minDate, () => {
      (0, _vue.nextTick)(updateInnerValue);
    });
    (0, _vue.watch)(() => props.modelValue, value => {
      var _currentDate$value;

      value = formatValue(value);

      if (value && value.valueOf() !== ((_currentDate$value = currentDate.value) == null ? void 0 : _currentDate$value.valueOf())) {
        currentDate.value = value;
      }
    });
    (0, _useExpose.useExpose)({
      getPicker: () => picker.value
    });
    return () => (0, _vue.createVNode)(_picker.Picker, (0, _vue.mergeProps)({
      "ref": picker,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, (0, _utils.pick)(props, _utils2.pickerKeys)), slots);
  }

});

exports.default = _default;
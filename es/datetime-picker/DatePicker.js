import { createVNode as _createVNode, mergeProps as _mergeProps, resolveDirective as _resolveDirective } from "vue";
import { ref, watch, computed, nextTick, onMounted, defineComponent } from 'vue'; // Utils

import { pick, range, extend, isDate, padZero, createNamespace } from '../utils';
import { times, pickerKeys, sharedProps, getTrueValue, getMonthEndDay } from './utils'; // Composables

import { useExpose } from '../composables/use-expose'; // Components

import { Picker } from '../picker';
var currentYear = new Date().getFullYear();
var [name] = createNamespace('date-picker');
export default defineComponent({
  name,
  props: extend({}, sharedProps, {
    modelValue: Date,
    type: {
      type: String,
      default: 'datetime'
    },
    minDate: {
      type: Date,
      default: () => new Date(currentYear - 10, 0, 1),
      validator: isDate
    },
    maxDate: {
      type: Date,
      default: () => new Date(currentYear + 10, 11, 31),
      validator: isDate
    }
  }),
  emits: ['confirm', 'cancel', 'change', 'update:modelValue'],

  setup(props, {
    emit,
    slots
  }) {
    var formatValue = value => {
      if (isDate(value)) {
        var timestamp = range(value.getTime(), props.minDate.getTime(), props.maxDate.getTime());
        return new Date(timestamp);
      }

      return undefined;
    };

    var picker = ref();
    var currentDate = ref(formatValue(props.modelValue));

    var getBoundary = (type, value) => {
      var boundary = props[type + "Date"];
      var year = boundary.getFullYear();
      var month = 1;
      var date = 1;
      var hour = 0;
      var minute = 0;

      if (type === 'max') {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
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

    var ranges = computed(() => {
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
    var originColumns = computed(() => ranges.value.map(({
      type,
      range: rangeArr
    }) => {
      var values = times(rangeArr[1] - rangeArr[0] + 1, index => padZero(rangeArr[0] + index));

      if (props.filter) {
        values = props.filter(type, values);
      }

      return {
        type,
        values
      };
    }));
    var columns = computed(() => originColumns.value.map(column => ({
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
            return formatter('month', padZero(value.getMonth() + 1));

          case 'day':
            return formatter('day', padZero(value.getDate()));

          case 'hour':
            return formatter('hour', padZero(value.getHours()));

          case 'minute':
            return formatter('minute', padZero(value.getMinutes()));

          default:
            // no default
            return null;
        }
      });
      nextTick(() => {
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
        return getTrueValue(values[indexes[index]]);
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

      var maxDay = getMonthEndDay(year, month);
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
      nextTick(() => {
        nextTick(() => emit('change', currentDate.value));
      });
    };

    onMounted(() => {
      updateColumnValue();
      nextTick(updateInnerValue);
    });
    watch(columns, updateColumnValue);
    watch(currentDate, (value, oldValue) => emit('update:modelValue', oldValue ? value : null));
    watch(() => [props.filter, props.maxDate], updateInnerValue);
    watch(() => props.minDate, () => {
      nextTick(updateInnerValue);
    });
    watch(() => props.modelValue, value => {
      var _currentDate$value;

      value = formatValue(value);

      if (value && value.valueOf() !== ((_currentDate$value = currentDate.value) == null ? void 0 : _currentDate$value.valueOf())) {
        currentDate.value = value;
      }
    });
    useExpose({
      getPicker: () => picker.value
    });
    return () => _createVNode(Picker, _mergeProps({
      "ref": picker,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props, pickerKeys)), slots);
  }

});
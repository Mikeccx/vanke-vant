"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../utils");

var _utils2 = require("../datetime-picker/utils");

var _utils3 = require("./utils");

var _use = require("@vant/use");

var _useExpose = require("../composables/use-expose");

var _useHeight = require("../composables/use-height");

var _CalendarDay = _interopRequireDefault(require("./CalendarDay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
// Composables
// Components
var [name] = (0, _utils.createNamespace)('calendar-month');

var _default = (0, _vue.defineComponent)({
  name,
  props: {
    type: String,
    color: String,
    showMark: Boolean,
    rowHeight: [Number, String],
    formatter: Function,
    lazyRender: Boolean,
    currentDate: [Date, Array],
    allowSameDay: Boolean,
    showSubtitle: Boolean,
    showMonthTitle: Boolean,
    firstDayOfWeek: Number,
    date: {
      type: Date,
      required: true
    },
    minDate: {
      type: Date,
      required: true
    },
    maxDate: {
      type: Date,
      required: true
    }
  },
  emits: ['click', 'update-height'],

  setup(props, {
    emit
  }) {
    var [visible, setVisible] = (0, _use.useToggle)();
    var daysRef = (0, _vue.ref)();
    var monthRef = (0, _vue.ref)();
    var height = (0, _useHeight.useHeight)(monthRef);
    var title = (0, _vue.computed)(() => (0, _utils3.formatMonthTitle)(props.date));
    var rowHeight = (0, _vue.computed)(() => (0, _utils.addUnit)(props.rowHeight));
    var offset = (0, _vue.computed)(() => {
      var realDay = props.date.getDay();

      if (props.firstDayOfWeek) {
        return (realDay + 7 - props.firstDayOfWeek) % 7;
      }

      return realDay;
    });
    var totalDay = (0, _vue.computed)(() => (0, _utils2.getMonthEndDay)(props.date.getFullYear(), props.date.getMonth() + 1));
    var shouldRender = (0, _vue.computed)(() => visible.value || !props.lazyRender);

    var getTitle = () => title.value;

    var scrollIntoView = body => {
      var el = props.showSubtitle ? daysRef.value : monthRef.value;
      var scrollTop = el.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop;
      (0, _utils.setScrollTop)(body, scrollTop);
    };

    var getMultipleDayType = day => {
      var isSelected = date => props.currentDate.some(item => (0, _utils3.compareDay)(item, date) === 0);

      if (isSelected(day)) {
        var prevDay = (0, _utils3.getPrevDay)(day);
        var nextDay = (0, _utils3.getNextDay)(day);
        var prevSelected = isSelected(prevDay);
        var nextSelected = isSelected(nextDay);

        if (prevSelected && nextSelected) {
          return 'multiple-middle';
        }

        if (prevSelected) {
          return 'end';
        }

        if (nextSelected) {
          return 'start';
        }

        return 'multiple-selected';
      }

      return '';
    };

    var getRangeDayType = day => {
      var [startDay, endDay] = props.currentDate;

      if (!startDay) {
        return '';
      }

      var compareToStart = (0, _utils3.compareDay)(day, startDay);

      if (!endDay) {
        return compareToStart === 0 ? 'start' : '';
      }

      var compareToEnd = (0, _utils3.compareDay)(day, endDay);

      if (props.allowSameDay && compareToStart === 0 && compareToEnd === 0) {
        return 'start-end';
      }

      if (compareToStart === 0) {
        return 'start';
      }

      if (compareToEnd === 0) {
        return 'end';
      }

      if (compareToStart > 0 && compareToEnd < 0) {
        return 'middle';
      }

      return '';
    };

    var getDayType = day => {
      var {
        type,
        minDate,
        maxDate,
        currentDate
      } = props;

      if ((0, _utils3.compareDay)(day, minDate) < 0 || (0, _utils3.compareDay)(day, maxDate) > 0) {
        return 'disabled';
      }

      if (currentDate === null) {
        return '';
      }

      if (Array.isArray(currentDate)) {
        if (type === 'multiple') {
          return getMultipleDayType(day);
        }

        if (type === 'range') {
          return getRangeDayType(day);
        }
      } else if (type === 'single') {
        return (0, _utils3.compareDay)(day, currentDate) === 0 ? 'selected' : '';
      }

      return '';
    };

    var getBottomInfo = dayType => {
      if (props.type === 'range') {
        if (dayType === 'start' || dayType === 'end') {
          return (0, _utils3.t)(dayType);
        }

        if (dayType === 'start-end') {
          return (0, _utils3.t)('startEnd');
        }
      }
    };

    var renderTitle = () => {
      if (props.showMonthTitle) {
        return (0, _vue.createVNode)("div", {
          "class": (0, _utils3.bem)('month-title')
        }, [title.value]);
      }
    };

    var renderMark = () => {
      if (props.showMark && shouldRender.value) {
        return (0, _vue.createVNode)("div", {
          "class": (0, _utils3.bem)('month-mark')
        }, [props.date.getMonth() + 1]);
      }
    };

    var placeholders = (0, _vue.computed)(() => {
      var count = Math.ceil((totalDay.value + offset.value) / 7);
      return Array(count).fill({
        type: 'placeholder'
      });
    });
    var days = (0, _vue.computed)(() => {
      var days = [];
      var year = props.date.getFullYear();
      var month = props.date.getMonth();

      for (var day = 1; day <= totalDay.value; day++) {
        var date = new Date(year, month, day);
        var type = getDayType(date);
        var config = {
          date,
          type,
          text: day,
          bottomInfo: getBottomInfo(type)
        };

        if (props.formatter) {
          config = props.formatter(config);
        }

        days.push(config);
      }

      return days;
    });

    var renderDay = (item, index) => (0, _vue.createVNode)(_CalendarDay.default, {
      "item": item,
      "index": index,
      "color": props.color,
      "offset": offset.value,
      "rowHeight": rowHeight.value,
      "onClick": item => emit('click', item)
    }, null);

    var renderDays = () => {
      return (0, _vue.createVNode)("div", {
        "ref": daysRef,
        "role": "grid",
        "class": (0, _utils3.bem)('days')
      }, [renderMark(), (shouldRender.value ? days : placeholders).value.map(renderDay)]);
    };

    (0, _useExpose.useExpose)({
      getTitle,
      getHeight: () => height.value,
      setVisible,
      scrollIntoView
    });
    return () => (0, _vue.createVNode)("div", {
      "class": (0, _utils3.bem)('month'),
      "ref": monthRef
    }, [renderTitle(), renderDays()]);
  }

});

exports.default = _default;
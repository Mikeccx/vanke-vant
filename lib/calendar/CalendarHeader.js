"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../utils");

var _utils2 = require("./utils");

var [name] = (0, _utils.createNamespace)('calendar-header');

var _default = (0, _vue.defineComponent)({
  name,
  props: {
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number
  },

  setup(props, {
    slots
  }) {
    var renderTitle = () => {
      if (props.showTitle) {
        var text = props.title || (0, _utils2.t)('title');
        var title = slots.title ? slots.title() : text;
        return (0, _vue.createVNode)("div", {
          "class": (0, _utils2.bem)('header-title')
        }, [title]);
      }
    };

    var renderSubtitle = () => {
      if (props.showSubtitle) {
        return (0, _vue.createVNode)("div", {
          "class": (0, _utils2.bem)('header-subtitle')
        }, [props.subtitle]);
      }
    };

    var renderWeekDays = () => {
      var {
        firstDayOfWeek
      } = props;
      var weekdays = (0, _utils2.t)('weekdays');
      var renderWeekDays = [...weekdays.slice(firstDayOfWeek, 7), ...weekdays.slice(0, firstDayOfWeek)];
      return (0, _vue.createVNode)("div", {
        "class": (0, _utils2.bem)('weekdays')
      }, [renderWeekDays.map(text => (0, _vue.createVNode)("span", {
        "class": (0, _utils2.bem)('weekday')
      }, [text]))]);
    };

    return () => (0, _vue.createVNode)("div", {
      "class": (0, _utils2.bem)('header')
    }, [renderTitle(), renderSubtitle(), renderWeekDays()]);
  }

});

exports.default = _default;
"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _use = require("@vant/use");

var _utils = require("../utils");

var [name, bem] = (0, _utils.createNamespace)('circle');
var uid = 0;

function format(rate) {
  return Math.min(Math.max(+rate, 0), 100);
}

function getPath(clockwise, viewBoxSize) {
  var sweepFlag = clockwise ? 1 : 0;
  return "M " + viewBoxSize / 2 + " " + viewBoxSize / 2 + " m 0, -500 a 500, 500 0 1, " + sweepFlag + " 0, 1000 a 500, 500 0 1, " + sweepFlag + " 0, -1000";
}

var _default = (0, _vue.defineComponent)({
  name,
  props: {
    text: String,
    size: [Number, String],
    color: [String, Object],
    clockwise: _utils.truthProp,
    layerColor: String,
    strokeLinecap: String,
    currentRate: {
      type: Number,
      default: 0
    },
    speed: {
      type: [Number, String],
      default: 0
    },
    fill: {
      type: String,
      default: 'none'
    },
    rate: {
      type: [Number, String],
      default: 100
    },
    strokeWidth: {
      type: [Number, String],
      default: 40
    }
  },
  emits: ['update:currentRate'],

  setup(props, {
    emit,
    slots
  }) {
    var id = "van-circle-" + uid++;
    var viewBoxSize = (0, _vue.computed)(() => +props.strokeWidth + 1000);
    var path = (0, _vue.computed)(() => getPath(props.clockwise, viewBoxSize.value));
    (0, _vue.watch)(() => props.rate, rate => {
      var rafId;
      var startTime = Date.now();
      var startRate = props.currentRate;
      var endRate = format(rate);
      var duration = Math.abs((startRate - endRate) * 1000 / +props.speed);

      var animate = () => {
        var now = Date.now();
        var progress = Math.min((now - startTime) / duration, 1);
        var rate = progress * (endRate - startRate) + startRate;
        emit('update:currentRate', format(parseFloat(rate.toFixed(1))));

        if (endRate > startRate ? rate < endRate : rate > endRate) {
          rafId = (0, _use.raf)(animate);
        }
      };

      if (props.speed) {
        if (rafId) {
          (0, _use.cancelRaf)(rafId);
        }

        rafId = (0, _use.raf)(animate);
      } else {
        emit('update:currentRate', endRate);
      }
    }, {
      immediate: true
    });

    var renderHover = () => {
      var PERIMETER = 3140;
      var {
        strokeWidth,
        currentRate,
        strokeLinecap
      } = props;
      var offset = PERIMETER * currentRate / 100;
      var color = (0, _utils.isObject)(props.color) ? "url(#" + id + ")" : props.color;
      var style = {
        stroke: color,
        strokeWidth: +strokeWidth + 1 + "px",
        strokeLinecap,
        strokeDasharray: offset + "px " + PERIMETER + "px"
      };
      return (0, _vue.createVNode)("path", {
        "d": path.value,
        "style": style,
        "class": bem('hover'),
        "stroke": color
      }, null);
    };

    var renderLayer = () => {
      var style = {
        fill: props.fill,
        stroke: props.layerColor,
        strokeWidth: props.strokeWidth + "px"
      };
      return (0, _vue.createVNode)("path", {
        "class": bem('layer'),
        "style": style,
        "d": path.value
      }, null);
    };

    var renderGradient = () => {
      var {
        color
      } = props;

      if (!(0, _utils.isObject)(color)) {
        return;
      }

      var Stops = Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b)).map((key, index) => (0, _vue.createVNode)("stop", {
        "key": index,
        "offset": key,
        "stop-color": color[key]
      }, null));
      return (0, _vue.createVNode)("defs", null, [(0, _vue.createVNode)("linearGradient", {
        "id": id,
        "x1": "100%",
        "y1": "0%",
        "x2": "0%",
        "y2": "0%"
      }, [Stops])]);
    };

    var renderText = () => {
      if (slots.default) {
        return slots.default();
      }

      if (props.text) {
        return (0, _vue.createVNode)("div", {
          "class": bem('text')
        }, [props.text]);
      }
    };

    return () => (0, _vue.createVNode)("div", {
      "class": bem(),
      "style": (0, _utils.getSizeStyle)(props.size)
    }, [(0, _vue.createVNode)("svg", {
      "viewBox": "0 0 " + viewBoxSize.value + " " + viewBoxSize.value
    }, [renderGradient(), renderLayer(), renderHover()]), renderText()]);
  }

});

exports.default = _default;
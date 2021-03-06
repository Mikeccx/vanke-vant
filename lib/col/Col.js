"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../utils");

var _use = require("@vant/use");

var _Row = require("../row/Row");

var [name, bem] = (0, _utils.createNamespace)('col');

var _default = (0, _vue.defineComponent)({
  name,
  props: {
    offset: [Number, String],
    tag: {
      type: String,
      default: 'div'
    },
    span: {
      type: [Number, String],
      default: 0
    }
  },

  setup(props, {
    slots
  }) {
    var {
      parent,
      index
    } = (0, _use.useParent)(_Row.ROW_KEY);
    var style = (0, _vue.computed)(() => {
      if (!parent) {
        return;
      }

      var {
        spaces
      } = parent;

      if (spaces && spaces.value && spaces.value[index.value]) {
        var {
          left,
          right
        } = spaces.value[index.value];
        return {
          paddingLeft: left ? left + "px" : null,
          paddingRight: right ? right + "px" : null
        };
      }
    });
    return () => {
      var {
        tag,
        span,
        offset
      } = props;
      return (0, _vue.createVNode)(tag, {
        "style": style.value,
        "class": bem({
          [span]: span,
          ["offset-" + offset]: offset
        })
      }, {
        default: () => [slots.default == null ? void 0 : slots.default()]
      });
    };
  }

});

exports.default = _default;
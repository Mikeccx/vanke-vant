"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../utils");

var _swipe = require("../swipe");

var [name, bem] = (0, _utils.createNamespace)('tabs');

var _default = (0, _vue.defineComponent)({
  name,
  props: {
    inited: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    lazyRender: Boolean,
    count: {
      type: Number,
      required: true
    },
    duration: {
      type: [Number, String],
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    }
  },
  emits: ['change'],

  setup(props, {
    emit,
    slots
  }) {
    var swipeRef = (0, _vue.ref)();

    var onChange = index => emit('change', index);

    var renderChildren = () => {
      var Content = slots.default == null ? void 0 : slots.default();

      if (props.animated || props.swipeable) {
        return (0, _vue.createVNode)(_swipe.Swipe, {
          "ref": swipeRef,
          "loop": false,
          "class": bem('track'),
          "duration": +props.duration * 1000,
          "touchable": props.swipeable,
          "lazyRender": props.lazyRender,
          "showIndicators": false,
          "onChange": onChange
        }, {
          default: () => [Content]
        });
      }

      return Content;
    };

    var swipeToCurrentTab = index => {
      var swipe = swipeRef.value;

      if (swipe && swipe.state.active !== index) {
        swipe.swipeTo(index, {
          immediate: !props.inited
        });
      }
    };

    (0, _vue.watch)(() => props.currentIndex, swipeToCurrentTab);
    (0, _vue.onMounted)(() => {
      swipeToCurrentTab(props.currentIndex);
    });
    return () => (0, _vue.createVNode)("div", {
      "class": bem('content', {
        animated: props.animated || props.swipeable
      })
    }, [renderChildren()]);
  }

});

exports.default = _default;
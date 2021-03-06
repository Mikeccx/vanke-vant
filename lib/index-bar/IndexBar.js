"use strict";

exports.__esModule = true;
exports.default = exports.INDEX_BAR_KEY = void 0;

var _vue = require("vue");

var _utils = require("../utils");

var _use = require("@vant/use");

var _useTouch = require("../composables/use-touch");

var _useExpose = require("../composables/use-expose");

// Utils
// Composables
function genAlphabet() {
  var charCodeOfA = 'A'.charCodeAt(0);
  var indexList = Array(26).fill('').map((_, i) => String.fromCharCode(charCodeOfA + i));
  return indexList;
}

var [name, bem] = (0, _utils.createNamespace)('index-bar');
var INDEX_BAR_KEY = Symbol(name);
exports.INDEX_BAR_KEY = INDEX_BAR_KEY;
var props = {
  sticky: _utils.truthProp,
  zIndex: [Number, String],
  highlightColor: String,
  stickyOffsetTop: {
    type: Number,
    default: 0
  },
  indexList: {
    type: Array,
    default: genAlphabet
  }
};

var _default = (0, _vue.defineComponent)({
  name,
  props,
  emits: ['select', 'change'],

  setup(props, {
    emit,
    slots
  }) {
    var root = (0, _vue.ref)();
    var activeAnchor = (0, _vue.ref)('');
    var touch = (0, _useTouch.useTouch)();
    var scrollParent = (0, _use.useScrollParent)(root);
    var {
      children,
      linkChildren
    } = (0, _use.useChildren)(INDEX_BAR_KEY);
    linkChildren({
      props
    });
    var sidebarStyle = (0, _vue.computed)(() => {
      if ((0, _utils.isDef)(props.zIndex)) {
        return {
          zIndex: +props.zIndex + 1
        };
      }
    });
    var highlightStyle = (0, _vue.computed)(() => {
      if (props.highlightColor) {
        return {
          color: props.highlightColor
        };
      }
    });

    var getScrollerRect = () => {
      if ('getBoundingClientRect' in scrollParent.value) {
        return (0, _use.useRect)(scrollParent);
      }

      return {
        top: 0,
        left: 0
      };
    };

    var getActiveAnchor = (scrollTop, rects) => {
      for (var i = children.length - 1; i >= 0; i--) {
        var prevHeight = i > 0 ? rects[i - 1].height : 0;
        var reachTop = props.sticky ? prevHeight + props.stickyOffsetTop : 0;

        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }

      return -1;
    };

    var onScroll = () => {
      if ((0, _utils.isHidden)(root)) {
        return;
      }

      var {
        sticky,
        indexList
      } = props;
      var scrollTop = (0, _utils.getScrollTop)(scrollParent.value);
      var scrollParentRect = getScrollerRect();
      var rects = children.map(item => item.getRect(scrollParent.value, scrollParentRect));
      var active = getActiveAnchor(scrollTop, rects);
      activeAnchor.value = indexList[active];

      if (sticky) {
        children.forEach((item, index) => {
          var {
            state,
            $el
          } = item;

          if (index === active || index === active - 1) {
            var rect = $el.getBoundingClientRect();
            state.left = rect.left;
            state.width = rect.width;
          } else {
            state.left = null;
            state.width = null;
          }

          if (index === active) {
            state.active = true;
            state.top = Math.max(props.stickyOffsetTop, rects[index].top - scrollTop) + scrollParentRect.top;
          } else if (index === active - 1) {
            var activeItemTop = rects[active].top - scrollTop;
            state.active = activeItemTop > 0;
            state.top = activeItemTop + scrollParentRect.top - rects[index].height;
          } else {
            state.active = false;
          }
        });
      }
    };

    var init = () => (0, _vue.nextTick)(onScroll);

    (0, _use.useEventListener)('scroll', onScroll, {
      target: scrollParent
    });
    (0, _vue.onMounted)(init);
    (0, _vue.watch)(() => props.indexList, init);
    (0, _vue.watch)(activeAnchor, value => {
      if (value) {
        emit('change', value);
      }
    });

    var renderIndexes = () => props.indexList.map(index => {
      var active = index === activeAnchor.value;
      return (0, _vue.createVNode)("span", {
        "class": bem('index', {
          active
        }),
        "style": active ? highlightStyle.value : undefined,
        "data-index": index
      }, [index]);
    });

    var scrollTo = index => {
      if (!index) {
        return;
      }

      var match = children.find(item => String(item.index) === index);

      if (match) {
        match.$el.scrollIntoView();

        if (props.sticky && props.stickyOffsetTop) {
          (0, _utils.setRootScrollTop)((0, _utils.getRootScrollTop)() - props.stickyOffsetTop);
        }

        emit('select', match.index);
      }
    };

    var scrollToElement = element => {
      var {
        index
      } = element.dataset;

      if (index) {
        scrollTo(index);
      }
    };

    var onClickSidebar = event => {
      scrollToElement(event.target);
    };

    var touchActiveIndex;

    var onTouchMove = event => {
      touch.move(event);

      if (touch.isVertical()) {
        (0, _utils.preventDefault)(event);
        var {
          clientX,
          clientY
        } = event.touches[0];
        var target = document.elementFromPoint(clientX, clientY);

        if (target) {
          var {
            index
          } = target.dataset;

          if (index && touchActiveIndex !== index) {
            touchActiveIndex = index;
            scrollToElement(target);
          }
        }
      }
    };

    (0, _useExpose.useExpose)({
      scrollTo
    });
    return () => (0, _vue.createVNode)("div", {
      "ref": root,
      "class": bem()
    }, [(0, _vue.createVNode)("div", {
      "class": bem('sidebar'),
      "style": sidebarStyle.value,
      "onClick": onClickSidebar,
      "onTouchstart": touch.start,
      "onTouchmove": onTouchMove
    }, [renderIndexes()]), slots.default == null ? void 0 : slots.default()]);
  }

});

exports.default = _default;
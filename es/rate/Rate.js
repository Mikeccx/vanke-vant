import { createVNode as _createVNode } from "vue";
import { computed, defineComponent } from 'vue'; // Utils

import { addUnit, truthProp, createNamespace, preventDefault } from '../utils'; // Composables

import { useRefs } from '../composables/use-refs';
import { useTouch } from '../composables/use-touch';
import { useLinkField } from '../composables/use-link-field'; // Components

import { Icon } from '../icon';
var [name, bem] = createNamespace('rate');

function getRateStatus(value, index, allowHalf, readonly) {
  if (value >= index) {
    return {
      status: 'full',
      value: 1
    };
  }

  if (value + 0.5 >= index && allowHalf && !readonly) {
    return {
      status: 'half',
      value: 0.5
    };
  }

  if (value + 1 >= index && allowHalf && readonly) {
    var cardinal = Math.pow(10, 10);
    return {
      status: 'half',
      value: Math.round((value - index + 1) * cardinal) / cardinal
    };
  }

  return {
    status: 'void',
    value: 0
  };
}

export default defineComponent({
  name,
  props: {
    size: [Number, String],
    color: String,
    gutter: [Number, String],
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    voidColor: String,
    touchable: truthProp,
    iconPrefix: String,
    disabledColor: String,
    modelValue: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: 'star'
    },
    voidIcon: {
      type: String,
      default: 'star-o'
    },
    count: {
      type: [Number, String],
      default: 5
    }
  },
  emits: ['change', 'update:modelValue'],

  setup(props, {
    emit
  }) {
    var touch = useTouch();
    var [itemRefs, setItemRefs] = useRefs();

    var untouchable = () => props.readonly || props.disabled || !props.touchable;

    var list = computed(() => Array(props.count).fill('').map((_, i) => getRateStatus(props.modelValue, i + 1, props.allowHalf, props.readonly)));
    var ranges;

    var updateRanges = () => {
      var rects = itemRefs.value.map(item => item.getBoundingClientRect());
      ranges = [];
      rects.forEach((rect, index) => {
        if (props.allowHalf) {
          ranges.push({
            score: index + 0.5,
            left: rect.left
          }, {
            score: index + 1,
            left: rect.left + rect.width / 2
          });
        } else {
          ranges.push({
            score: index + 1,
            left: rect.left
          });
        }
      });
    };

    var getScoreByPosition = x => {
      for (var i = ranges.length - 1; i > 0; i--) {
        if (x > ranges[i].left) {
          return ranges[i].score;
        }
      }

      return props.allowHalf ? 0.5 : 1;
    };

    var select = index => {
      if (!props.disabled && !props.readonly && index !== props.modelValue) {
        emit('update:modelValue', index);
        emit('change', index);
      }
    };

    var onTouchStart = event => {
      if (untouchable()) {
        return;
      }

      touch.start(event);
      updateRanges();
    };

    var onTouchMove = event => {
      if (untouchable()) {
        return;
      }

      touch.move(event);

      if (touch.isHorizontal()) {
        var {
          clientX
        } = event.touches[0];
        preventDefault(event);
        select(getScoreByPosition(clientX));
      }
    };

    var renderStar = (item, index) => {
      var {
        icon,
        size,
        color,
        count,
        gutter,
        voidIcon,
        disabled,
        voidColor,
        allowHalf,
        iconPrefix,
        disabledColor
      } = props;
      var score = index + 1;
      var isFull = item.status === 'full';
      var isVoid = item.status === 'void';
      var renderHalf = allowHalf && item.value > 0 && item.value < 1;
      var style;

      if (gutter && score !== +count) {
        style = {
          paddingRight: addUnit(gutter)
        };
      }

      var onClickItem = event => {
        updateRanges();
        select(allowHalf ? getScoreByPosition(event.clientX) : score);
      };

      return _createVNode("div", {
        "key": index,
        "ref": setItemRefs(index),
        "role": "radio",
        "style": style,
        "class": bem('item'),
        "tabindex": 0,
        "aria-setsize": +count,
        "aria-posinset": score,
        "aria-checked": !isVoid,
        "onClick": onClickItem
      }, [_createVNode(Icon, {
        "size": size,
        "name": isFull ? icon : voidIcon,
        "class": bem('icon', {
          disabled,
          full: isFull
        }),
        "color": disabled ? disabledColor : isFull ? color : voidColor,
        "classPrefix": iconPrefix
      }, null), renderHalf && _createVNode(Icon, {
        "size": size,
        "style": {
          width: item.value + 'em'
        },
        "name": isVoid ? voidIcon : icon,
        "class": bem('icon', ['half', {
          disabled,
          full: !isVoid
        }]),
        "color": disabled ? disabledColor : isVoid ? voidColor : color,
        "classPrefix": iconPrefix
      }, null)]);
    };

    useLinkField(() => props.modelValue);
    return () => _createVNode("div", {
      "role": "radiogroup",
      "class": bem({
        readonly: props.readonly,
        disabled: props.disabled
      }),
      "tabindex": 0,
      "onTouchstart": onTouchStart,
      "onTouchmove": onTouchMove
    }, [list.value.map(renderStar)]);
  }

});
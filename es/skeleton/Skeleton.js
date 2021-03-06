import { createVNode as _createVNode } from "vue";
import { defineComponent } from 'vue';
import { addUnit, truthProp, getSizeStyle, createNamespace } from '../utils';
var [name, bem] = createNamespace('skeleton');
var DEFAULT_ROW_WIDTH = '100%';
var DEFAULT_LAST_ROW_WIDTH = '60%';
export default defineComponent({
  name,
  props: {
    title: Boolean,
    round: Boolean,
    avatar: Boolean,
    loading: truthProp,
    animate: truthProp,
    avatarSize: [Number, String],
    titleWidth: [Number, String],
    row: {
      type: [Number, String],
      default: 0
    },
    avatarShape: {
      type: String,
      default: 'round'
    },
    rowWidth: {
      type: [Number, String, Array],
      default: DEFAULT_ROW_WIDTH
    }
  },

  setup(props, {
    slots
  }) {
    var renderAvatar = () => {
      if (props.avatar) {
        return _createVNode("div", {
          "class": bem('avatar', props.avatarShape),
          "style": getSizeStyle(props.avatarSize)
        }, null);
      }
    };

    var renderTitle = () => {
      if (props.title) {
        return _createVNode("h3", {
          "class": bem('title'),
          "style": {
            width: addUnit(props.titleWidth)
          }
        }, null);
      }
    };

    var getRowWidth = index => {
      var {
        rowWidth
      } = props;

      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }

      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }

      return rowWidth;
    };

    var renderRows = () => Array(props.row).fill('').map((_, i) => _createVNode("div", {
      "class": bem('row'),
      "style": {
        width: addUnit(getRowWidth(i))
      }
    }, null));

    return () => {
      if (!props.loading) {
        return slots.default == null ? void 0 : slots.default();
      }

      return _createVNode("div", {
        "class": bem({
          animate: props.animate,
          round: props.round
        })
      }, [renderAvatar(), _createVNode("div", {
        "class": bem('content')
      }, [renderTitle(), renderRows()])]);
    };
  }

});
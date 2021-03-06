import { createVNode as _createVNode } from "vue";
import { ref, defineComponent } from 'vue'; // Utils

import { truthProp, createNamespace, getZIndexStyle } from '../utils';
import { BORDER_BOTTOM } from '../utils/constant'; // Composables

import { usePlaceholder } from '../composables/use-placeholder'; // Components

import { Icon } from '../icon';
var [name, bem] = createNamespace('nav-bar');
export default defineComponent({
  name,
  props: {
    title: String,
    fixed: Boolean,
    zIndex: [Number, String],
    border: truthProp,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    placeholder: Boolean,
    safeAreaInsetTop: Boolean
  },
  emits: ['click-left', 'click-right'],

  setup(props, {
    emit,
    slots
  }) {
    var navBarRef = ref();
    var renderPlaceholder = usePlaceholder(navBarRef, bem);

    var onClickLeft = event => emit('click-left', event);

    var onClickRight = event => emit('click-right', event);

    var renderLeft = () => {
      if (slots.left) {
        return slots.left();
      }

      return [props.leftArrow && _createVNode(Icon, {
        "class": bem('arrow'),
        "name": "arrow-left"
      }, null), props.leftText && _createVNode("span", {
        "class": bem('text')
      }, [props.leftText])];
    };

    var renderRight = () => {
      if (slots.right) {
        return slots.right();
      }

      return _createVNode("span", {
        "class": bem('text')
      }, [props.rightText]);
    };

    var renderNavBar = () => {
      var {
        title,
        fixed,
        border,
        zIndex
      } = props;
      var style = getZIndexStyle(zIndex);
      var hasLeft = props.leftArrow || props.leftText || slots.left;
      var hasRight = props.rightText || slots.right;
      return _createVNode("div", {
        "ref": navBarRef,
        "style": style,
        "class": [bem({
          fixed,
          'safe-area-inset-top': props.safeAreaInsetTop
        }), {
          [BORDER_BOTTOM]: border
        }]
      }, [_createVNode("div", {
        "class": bem('content')
      }, [hasLeft && _createVNode("div", {
        "class": bem('left'),
        "onClick": onClickLeft
      }, [renderLeft()]), _createVNode("div", {
        "class": [bem('title'), 'van-ellipsis']
      }, [slots.title ? slots.title() : title]), hasRight && _createVNode("div", {
        "class": bem('right'),
        "onClick": onClickRight
      }, [renderRight()])])]);
    };

    return () => {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderNavBar);
      }

      return renderNavBar();
    };
  }

});
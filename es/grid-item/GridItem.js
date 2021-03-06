import { createVNode as _createVNode } from "vue";
import { computed, defineComponent } from 'vue'; // Utils

import { createNamespace, addUnit, extend } from '../utils';
import { BORDER } from '../utils/constant';
import { GRID_KEY } from '../grid/Grid'; // Composables

import { useParent } from '@vant/use';
import { useRoute, routeProps } from '../composables/use-route'; // Components

import { Icon } from '../icon';
import { Badge } from '../badge';
var [name, bem] = createNamespace('grid-item');
export default defineComponent({
  name,
  props: extend({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    badge: [Number, String],
    iconPrefix: String
  }),

  setup(props, {
    slots
  }) {
    var {
      parent,
      index
    } = useParent(GRID_KEY);
    var route = useRoute();

    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vant] <GridItem> must be a child component of <Grid>.');
      }

      return;
    }

    var rootStyle = computed(() => {
      var {
        square,
        gutter,
        columnNum
      } = parent.props;
      var percent = 100 / +columnNum + "%";
      var style = {
        flexBasis: percent
      };

      if (square) {
        style.paddingTop = percent;
      } else if (gutter) {
        var gutterValue = addUnit(gutter);
        style.paddingRight = gutterValue;

        if (index.value >= columnNum) {
          style.marginTop = gutterValue;
        }
      }

      return style;
    });
    var contentStyle = computed(() => {
      var {
        square,
        gutter
      } = parent.props;

      if (square && gutter) {
        var gutterValue = addUnit(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: 'auto'
        };
      }
    });

    var renderIcon = () => {
      if (slots.icon) {
        return _createVNode(Badge, {
          "dot": props.dot,
          "content": props.badge
        }, {
          default: () => [slots.icon()]
        });
      }

      if (props.icon) {
        return _createVNode(Icon, {
          "dot": props.dot,
          "name": props.icon,
          "size": parent.props.iconSize,
          "badge": props.badge,
          "class": bem('icon'),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    var renderText = () => {
      if (slots.text) {
        return slots.text();
      }

      if (props.text) {
        return _createVNode("span", {
          "class": bem('text')
        }, [props.text]);
      }
    };

    var renderContent = () => {
      if (slots.default) {
        return slots.default();
      }

      return [renderIcon(), renderText()];
    };

    return () => {
      var {
        center,
        border,
        square,
        gutter,
        direction,
        clickable
      } = parent.props;
      var classes = [bem('content', [direction, {
        center,
        square,
        clickable,
        surround: border && gutter
      }]), {
        [BORDER]: border
      }];
      return _createVNode("div", {
        "class": [bem({
          square
        })],
        "style": rootStyle.value
      }, [_createVNode("div", {
        "role": clickable ? 'button' : undefined,
        "class": classes,
        "style": contentStyle.value,
        "tabindex": clickable ? 0 : undefined,
        "onClick": route
      }, [renderContent()])]);
    };
  }

});
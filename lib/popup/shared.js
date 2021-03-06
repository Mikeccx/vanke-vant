"use strict";

exports.__esModule = true;
exports.popupSharedPropKeys = exports.popupSharedProps = void 0;

var _utils = require("../utils");

var popupSharedProps = {
  // whether to show popup
  show: Boolean,
  // z-index
  zIndex: [Number, String],
  // whether to show overlay
  overlay: _utils.truthProp,
  // transition duration
  duration: [Number, String],
  // teleport
  teleport: [String, Object],
  // prevent body scroll
  lockScroll: _utils.truthProp,
  // whether to lazy render
  lazyRender: _utils.truthProp,
  // overlay custom style
  overlayStyle: Object,
  // overlay custom class name
  overlayClass: _utils.unknownProp,
  // Initial rendering animation
  transitionAppear: Boolean,
  // whether to close popup when overlay is clicked
  closeOnClickOverlay: _utils.truthProp
};
exports.popupSharedProps = popupSharedProps;
var popupSharedPropKeys = Object.keys(popupSharedProps);
exports.popupSharedPropKeys = popupSharedPropKeys;
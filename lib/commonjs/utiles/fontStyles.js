"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fontStyles = void 0;
var _reactNative = require("react-native");
/* eslint-disable prettier/prettier */

const fontStyles = exports.fontStyles = {
  crimson_text_bold: _reactNative.Platform.select({
    ios: 'CrimsonText-Bold',
    android: 'crimson_text_bold'
  }),
  crimson_text_italic: _reactNative.Platform.select({
    ios: 'CrimsonText-Italic',
    android: 'crimson_text_italic'
  }),
  crimson_text_regular: _reactNative.Platform.select({
    ios: 'CrimsonText-Regular',
    android: 'crimson_text_regular'
  }),
  Roboto_Regular: _reactNative.Platform.select({
    ios: 'Roboto-Regular',
    android: 'Roboto-Regular'
  }),
  Roboto_Italic: _reactNative.Platform.select({
    ios: 'Roboto-Italic',
    android: 'Roboto-Italic'
  }),
  Roboto_Bold: _reactNative.Platform.select({
    ios: 'Roboto-Bold',
    android: 'Roboto-Bold'
  })
};
//# sourceMappingURL=fontStyles.js.map
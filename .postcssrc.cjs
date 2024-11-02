const converter = require('./postcssPlugin/postcss-px-to-screen-size/index.cjs');
module.exports = {
  plugins: [
    converter({
      unitToConvert: 'px',
      propList: ['*'],
      selectorBlackList: [
        'store-marker-panel-box',
        'intelligent-device-panel',
        'intelligent-device-panel-box',
        'data-center-marker-panel-box',
      ],
      exclude: [],
      // include: [],
    }),
  ],
};

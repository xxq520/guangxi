import { h, inject } from 'vue';
import screenCore from '../components/screenCore.vue';
import { registerScreen } from '../setups/projectScreenRecord';

/**
 * screenLoader
 * 用于加载screen的高阶函数组件
 * @param screenComponent
 * @param screenName
 * @param config
 */
export default function screenLoader(screenComponent, screenName, config) {
  return {
    inheritAttrs: false,
    name: screenName,
    setup() {
      const updateScreenLayoutConfig = inject('updateScreenLayoutConfig');
      if (updateScreenLayoutConfig) {
        updateScreenLayoutConfig(config);
      }
    },
    render() {
      return h(
        screenCore,
        {
          screenLayoutConfig: config,
          ...this.$attrs,
        },
        () => h(screenComponent)
      );
    },
  };
}

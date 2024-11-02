<template>
  <screenCore
    v-if="screenType==='custom'"
    ref="screenBox"
    v-bind="$attrs"
    :screenLayoutConfig="screenLayoutConfig"
  >
    <slot></slot>
  </screenCore>
  <component v-if="screenType==='project'" :is="screenName" v-bind="$attrs"></component>
</template>

<script>
import {
  provide,
} from 'vue';
import screenCore from './screenCore.vue';
import screenRouteHandler from '../setups/screenRouteHandler';

/**
 * 大屏代理层，无论是项目中的大屏还是自定义的大屏，都先通过这里来展示
 */
export default {
  name: 'ScreenAgent',
  components: {
    screenCore,
  },
  inheritAttrs: false,
  props: {
    screenLayoutConfig: {
      type: [Object, null],
      default: null,
    },
  },
  setup(props, context) {
    const {
      screenLayoutConfig: screenLayoutConfigRemote,
      screenType,
      screenName,
    } = screenRouteHandler();
    provide('updateScreenLayoutConfig', (config) => {
      context.emit('update:screenLayoutConfig', config);
    });
    if (screenType === 'custom') {
      context.emit('update:screenLayoutConfig', screenLayoutConfigRemote.value);
    }
    return {
      screenLayoutConfigRemote,
      screenType,
      screenName,
    };
  },
};
</script>

<style scoped>

</style>

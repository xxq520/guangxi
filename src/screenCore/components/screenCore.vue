<template>
  <div
    id="screenCore"
    :style="{ ...sizeStyle, ...movingStyle }"
    @dragenter="$event.preventDefault()"
    @dragover="$event.preventDefault()"
    :data-layout="layoutConfig.layout"
  >
    <div class="getLayoutClass">
      <div
        :class="layoutConfig.layout === 'flow' ? 'screen-flow-scroll-container' : ''"
        :style="scrollerStyle"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, toRaw, watchEffect, computed, getCurrentInstance } from 'vue';
import screenSizeAdjust from '../setups/screenSizeAdjust';

// 声明props
const props = defineProps({
  customWidth: {
    // 外部传入固定要渲染的宽度，默认是null
    type: [Number, null],
    default: null,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  screenLayoutConfig: {
    type: [Object, null],
    default: null,
  },
  movingStyle: {
    typ: Object,
    default() {
      return {};
    },
  },
});

// 屏幕 size 设置
const { sizeStyle, layoutConfig, screenSizeSet, scrollerStyle } = screenSizeAdjust();

let oldLayoutConfig = '';
let oldCustomWidth = '';

/** 根据当前设置的布局设置对应的容器类名 */
const getLayoutClass = computed(() => {
  if (layoutConfig.layout === 'flow') {
    return 'screen-flow-wrapper';
  } else if (layoutConfig.layout === 'fixed') {
    return 'screen-fixed-wrapper';
  }
  return '';
});

// 根据配置和传进来的宽度
watchEffect(() => {
  if (oldLayoutConfig !== toRaw(layoutConfig.value) || oldCustomWidth !== props.customWidth) {
    screenSizeSet(layoutConfig.value, props.customWidth);
    oldLayoutConfig = toRaw(layoutConfig.value);
    oldCustomWidth = props.customWidth;
  }
});
if (props.screenLayoutConfig) {
  watchEffect(() => {
    layoutConfig.value = props.screenLayoutConfig?.value
      ? props.screenLayoutConfig?.value
      : props.screenLayoutConfig;
    const {proxy} = getCurrentInstance();
    proxy.$nextTick(() =>{
      proxy.$el.dataset.conf = JSON.stringify(props.screenLayoutConfig);
    })
  });
}
const updateScreenStyle = inject('updateScreenStyle');
watchEffect(() => {
  updateScreenStyle(sizeStyle.value);
});
</script>
<script>
export default {
  name: 'screenCore',
};
</script>
<style lang="scss" scoped>
#screenCore {
  position: fixed;
  background: #42b983;
  pointer-events: none;
  &:-moz-drag-over {
    border: 1px solid black;
  }
}
// 固定比例容器
.screen-fixed-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

// 流式布局容器
.screen-flow-wrapper {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  &::-webkit-scrollbar-track {
    width: 0px;
    background: transparent;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    background-clip: padding-box;
    min-height: 28px;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
    transition: background-color 0.3s ease-out;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>

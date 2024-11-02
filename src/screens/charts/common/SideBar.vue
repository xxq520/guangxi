<template>
  <div>
    <!-- <t-menu v-if="store?.menusInfo?.length" /> -->
    <div v-single-shrink>
      <!-- 标题 -->
      <title-header />
      <!-- 楼层切换 -->
      <floor-select />
      <template v-if="allLoad">
        <div :class="getLeftClass" :style="{ transition: `left 0.5s 0.3s ease` }">
          <div class="scale-container">
            <slot name="left"></slot>
          </div>
        </div>
        <div :class="getBottomClass" :style="{ transition: `bottom 0.5s 0.3s ease` }">
          <div class="scale-container">
            <slot name="bottom"></slot>
          </div>
        </div>
        <div :class="getRightClass" :style="{ transition: `right 0.5s 0.3s ease` }">
          <div class="scale-container" style="float: right">
            <slot name="right"></slot>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, markRaw, computed, ref, onMounted } from 'vue';
import { useEventListener, useThrottleFn } from '@vueuse/core';
import renderScene from '@/utils/initScene';
import { useAppStore } from '@/store';
import { vSingleShrink } from '@/screenCore/autoShrinkDirective';

const store = useAppStore();

const isload = ref(false);

const load = () => {
  setTimeout(() => {
    isload.value = true;
  }, 100);
};

onMounted(() => {
  load();
});

const allLoad = computed(() => !window.config.showProcess || (!store.showLoading && isload.value));

onMounted(() => {});

const mapLoaded = ref(!(window as any).config.showMap ? true : false);

const getLeftClass = computed(() => {
  let className = `module-left animate__animated animate__fadeInLeft`;
  return className;
});

const getBottomClass = computed(() => {
  let className = `module-bottom animate__animated animate__fadeInBottom`;
  return className;
});

// const props = defineProps<{ layout: Record<string, any> }>();
const getRightClass = computed(() => {
  let className = `
  module-right animate__animated animate__fadeInRight`;
  return className;
});

const emits = defineEmits(['scene-load']);

const renderBackground: any = inject('renderBackground');
/** 场景已经加载完成过 */
// if (uino.map) {
//   emits('scene-load');
//   mapLoaded.value = true;
// } else {
// }
</script>

<style lang="scss" scoped>
// 右侧边栏
.page {
  width: 100%;
  height: 100%;
}

.module-bottom {
  width: 1050px;
  // height: 230px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 819px;
  pointer-events: all;

  .scale-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;
  }
}

// .module-left,
.module-right {
  width: 411px;
  height: 948px;
  position: absolute;
  top: 80px;
  pointer-events: all;
  // margin: 0 42px;

  .scale-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  right: 20px;
  pointer-events: all;
}

.module-left {
  left: 20px;
  top: 80px;
  width: 411px;
  position: absolute;
  pointer-events: all;
  height: 948px;
  position: absolute;
  pointer-events: all;

  .scale-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  // margin: 0 42px;
}
</style>

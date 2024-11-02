<!--
 * @author: xiexiangquan
 * @Date: 2023-05-18 17:57:03
 * @description: 消防事件告警面板
-->
<template>
  <div class="building-marker cursor-pointer">
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/store';
import { changeLevel } from '@/utils/common';

export default {
  components: {},
  props: {
    userData: {
      type: Object,
      required: true,
    },
    alarm: {
      type: Object,
      required: true,
    },
    close: Function,
    title: String,
    /** 建筑孪生体编码 */
    twin: String,
  },
  setup(props: any) {},
};
// /video.mp4
</script>

<style lang="scss" scoped>
.building-marker {
  position: relative;
  // pointer-events: none !important;
  cursor: pointer !important;
  background: url('@/assets/img/background/building_marker.png') no-repeat 0 0 / 100% 100%;
  height: 63px;
  width: 169px;
  text-align: center;
  padding-top: 9px;
  .title {
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
    font-family: AlibabaPuHuiTi;
    text-shadow: 0px 2px 4px rgba(19, 25, 35, 0.34);
  }
}
</style>

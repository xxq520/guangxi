<!--
 * @Description: 智慧防控
-->
<template>
  <div class="energy-monitoring">
    <access-control-system v-if="store.activeSubMenuInfo?.title == '门禁系统'" />
    <video-monitoring v-if="store.activeSubMenuInfo?.title == '视频监控'" />
    <!-- top指标 -->
    <!-- <urban-top-indicator v-if="!useThingStore.uePlayRoam" /> -->
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/store';
import { IntelligentPreventionStore } from '@/store/intelligentPrevention';
import { IntelligentPrevention } from '@/request/intelligentPrevention';

export default {
  name: 'IntelligentPrevention',
  screenConfig: {
    width: 1920,
    height: 1080,
    layout: 'expand',
    title: '智慧防控',
  },
  setup() {
    /** 点位数据重置 */
    const store = useAppStore();
    store.routerSetMenu();
    return {
      store,
    };
  },
};
</script>

<style scoped lang="scss">
.energy-monitoring {
  width: 100vw;
  height: 100vh;
  color: #fff;
  position: relative;
  z-index: 1;

  .endProject {
    position: absolute;
    right: -200px;
    top: 44%;
    transform: translateY(-50%);
    height: 120px;
    width: 150px;
    cursor: pointer;

    :deep(.btns) {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

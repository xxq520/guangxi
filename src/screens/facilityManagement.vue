<!--
 * @Description: 设施管理
-->
<template>
  <div class="energy-monitoring">
    <side-bar>
      <template #left></template>

      <template #right></template>
    </side-bar>
    <!-- top指标 -->
    <!-- <urban-top-indicator v-if="!useThingStore.uePlayRoam" /> -->
  </div>
</template>

<script lang="ts">
import { toRef } from 'vue';
import { useAppStore } from '@/store';
import { assetManagementStore } from '@/store/assetManagement';
import { autoRequest } from '@/request/autoRequest';
import { AssetManagement } from '../request/assetManagement';

export default {
  name: 'FacilityManagement',
  screenConfig: {
    width: 1920,
    height: 1080,
    layout: 'expand',
    title: '设施管理',
  },
  setup() {
    // return {
    //   activeMenu,
    //   useThingStore,
    // };
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
:deep(.module-left) {
  pointer-events: none;
}
:deep(.module-right) {
  pointer-events: none;
}
</style>

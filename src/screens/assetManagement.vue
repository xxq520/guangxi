<!--
 * @Description: 资产管理
-->
<template>
  <div class="energy-monitoring">
    <side-bar>
      <template #left>
        <daily-inventory />
        <device-type-ranking />
        <single-device-ranking />
      </template>

      <template #right>
        <asset-real-time-alarm />
        <asset-asset-statistics />
        <asset-devices-list />
      </template>
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
  name: 'AssetManagement',
  screenConfig: {
    width: 1920,
    height: 1080,
    layout: 'expand',
    title: '资产管理',
  },
  setup() {
    const store = useAppStore();
    store.routerSetMenu();
    const assetManagement = assetManagementStore();
    autoRequest<AssetManagement[]>(
      {
        url: '/assetManagement/getPageData',
        data: {
          ssdp: 'zhzc',
        },
      },
      (res) => {
        console.log(res, '资产管理主题数据');
        assetManagement.setData(res);
      },
      () => null,
      'assetManagement'
    );
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
</style>

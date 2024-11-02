<!--
 * @Description: 智慧监测
-->
<template>
  <div class="energy-monitoring">
    <side-bar>
      <template #left>
        <real-time-air-quality />
        <air-quality-trends />
        <real-time-water-level />
      </template>

      <template #right>
        <intelligent-real-time-alarm />
        <equipment-statistics />
        <intelligent-devicesList />
      </template>
    </side-bar>
    <!-- top指标 -->
    <!-- <urban-top-indicator v-if="!useThingStore.uePlayRoam" /> -->
  </div>
</template>

<script lang="ts">
import { toRef } from 'vue';
import { useAppStore } from '@/store';
import { intelligentMonitoringStore } from '@/store/intelligentMonitoring';
import { autoRequest } from '@/request/autoRequest';
import { IntelligentMonitoring } from '@/request/intelligentMonitoring';

export default {
  name: 'IntelligentMonitoring',
  screenConfig: {
    width: 1920,
    height: 1080,
    layout: 'expand',
    title: '智慧监测',
  },
  setup() {
    const store = useAppStore();
    store.routerSetMenu();
    const intelligentMonitoring = intelligentMonitoringStore();
    autoRequest<IntelligentMonitoring>(
      {
        url: '/intelligentMonitoring/getPageData',
        data: {
          ssdp: 'zhjczt',
        },
      },
      (res) => {
        console.log(res, store?.activeMenuInfo, '智慧监测主题数据');
        intelligentMonitoring.setData(res);
      },
      () => null,
      'intelligentMonitoring'
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

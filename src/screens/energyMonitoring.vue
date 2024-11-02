<!--
 * @Description: 能耗监测
-->
<template>
  <div class="energy-monitoring">
    <!-- <side-bar>
      <template #left>
        <total-energy-statistics />
        <usage-trends />
        <energy-consumption-comparison />
      </template>

      <template #bottom> </template>

      <template #right>
        <realTime-alarm />
        <template v-if="store.activeSubMenuInfo.title == '空调管理'">
          <air-conditioning-temperature-trend />
          <energy-consumption-type-air />
        </template>
        <template v-else>
          <energy-consumption-type />
        </template>
        <devices-list />
      </template>
    </side-bar> -->

    <air-conditioning-management v-if="store.activeSubMenuInfo?.title == '空调管理'" />
    <power-supply-management v-if="store.activeSubMenuInfo?.title == '供电管理'" />
    <water-supply-management v-if="store.activeSubMenuInfo?.title == '供水管理'" />

    <!-- top指标 -->
    <!-- <urban-top-indicator v-if="!useThingStore.uePlayRoam" /> -->
  </div>
</template>

<script lang="ts">
import { toRef } from 'vue';
import { useAppStore } from '@/store';
import { energyMonitoringStore } from '@/store/energyMonitoring';
import { autoRequest } from '@/request/autoRequest';
import { EnergyMonitoring } from '@/request/energyMonitoring';

export default {
  name: 'EnergyMonitoring',
  screenConfig: {
    width: 1920,
    height: 1080,
    layout: 'expand',
    title: '能耗监测',
  },
  setup() {
    const store = useAppStore();
    store.routerSetMenu();
    const energyMonitoring = energyMonitoringStore();
    let request: any = null;
    const getData = (business = '供电管理') => {
      const emun: Record<string, any> = {
        空调管理: 'ktgl',
        供电管理: 'gdgl',
        供水管理: 'gsgl',
        照明管理: 'zmgl',
      };
      request?.request?.destroy();
      request = autoRequest<EnergyMonitoring[]>(
        {
          url: '/energyMonitoring/getPageData',
          data: {
            ssdp: emun[business],
          },
        },
        (res) => {
          console.log(res, '能耗监测主题数据');
          energyMonitoring.setData(res);
        },
        () => null,
        'energyManagement'
      );
    };
    watch(
      () => store.activeSubMenuInfo,
      (res: any) => {
        getData(res.title);
      },
      {
        immediate: true,
      }
    );
    getData();

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

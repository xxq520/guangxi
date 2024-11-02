<!--
 * @Description: 院区总览
-->
<template>
  <div class="urban-survey">
    <side-bar>
      <template #left>
        <patient-traffic-statistics-hospita />
        <personnel-statistics-hospita />
        <doctor-patient-analysis-hospita />
      </template>

      <template #bottom> </template>

      <template #right>
        <district-year-income />
        <energy-efficiency-cost-hospita />
      </template>
    </side-bar>
    <!-- top指标 -->
    <medical-overview-hospital />
  </div>
</template>

<script lang="ts">
import { toRef } from 'vue';
import { useAppStore } from '@/store';
import { overviewHospitalStore } from '@/store/overviewHospital';
import { autoRequest } from '@/request/autoRequest';
import { OverviewHospital } from '@/request/overviewHospital';

export default {
  name: 'OverviewHospital',
  screenConfig: {
    width: 1920,
    height: 1080,
    layout: 'expand',
    title: '桃源概览',
  },
  setup() {
    const store = useAppStore();
    store.routerSetMenu();
    const overviewHospital = overviewHospitalStore();
    autoRequest<OverviewHospital[]>(
      {
        url: '/overviewHospital/getPageData',
        data: {
          ssdp: 'yqzl',
        },
      },
      (res) => {
        console.log(res, '院区总览主题数据');
        overviewHospital.setData(res);
      },
      () => null,
      'overviewHospital'
    );
    // return {
    //   activeMenu,
    //   useThingStore,
    // };
  },
};
</script>

<style scoped lang="scss">
.urban-survey {
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

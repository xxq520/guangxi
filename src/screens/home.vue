<!--
 * @Description: 首页
-->
<template>
  <div class="urban-survey">
    <side-bar>
      <template #left>
        <patient-traffic-statistics />
        <personnel-statistics />
        <doctor-patient-analysis />
      </template>

      <template #bottom>
        <asset-statistics />
        <overview-intelligent-devices />
      </template>

      <template #right>
        <year-income />
        <energy-efficiency-cost />
      </template>
    </side-bar>
    <!-- top指标 -->
    <medical-overview />
  </div>
</template>

<script lang="ts">
import { toRef } from 'vue';
import { useAppStore } from '@/store';
import { homeStore } from '@/store/home';
import { useThing } from '@/store/thingStore';
import { autoRequest } from '../request/autoRequest';
import { Home } from '../request/home';

export default {
  name: 'Home',
  screenConfig: {
    width: 1920,
    height: 1080,
    layout: 'expand',
    title: '首页',
  },
  setup() {
    const store = useAppStore();
    store.routerSetMenu();
    const useThingStore = useThing();
    const activeMenu = toRef(store, 'activeMenuInfo');
    const home = homeStore();

    autoRequest<Home[]>(
      {
        url: '/home/getPageData',
        data: {
          ssdp: 'home',
        },
      },
      (res) => {
        console.log(res, '主题数据');
        home.setData(res);
      },
      () => null,
      'home'
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

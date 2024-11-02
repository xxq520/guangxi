<!--
 * @Description: 患者流量统计
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { homeStore } from '@/store/home';

type TabName = '年度总览' | '桃源院区' | '北院区' | '星湖门诊';
const home = homeStore();

/** 从store取值 */
const dataList = computed(() => home.data.patientTraffic || {});

type TabItem = { name: TabName; isActive: boolean };
const tabList = ref<TabItem[]>([
  {
    name: '年度总览',
    isActive: true,
  },
  {
    name: '桃源院区',
    isActive: false,
  },
  {
    name: '北院区',
    isActive: false,
  },
  {
    name: '星湖门诊',
    isActive: false,
  },
]);

const currentTabName = ref<TabName>('年度总览');

// 当前 tab 对应的数据
const currentData = computed(() => dataList.value[currentTabName.value]);

const changeTab = (tabItem: TabItem) => {
  tabList.value = tabList.value.map((item) => ({
    ...item,
    isActive: tabItem.name === item.name,
  }));

  currentTabName.value = tabList.value.find((item) => item.isActive)!.name;
};
</script>

<template>
  <div class="patient-traffic-statistics">
    <card-module title="患者流量统计">
      <div class="tabs-list">
        <div
          class="tab-item"
          @click="changeTab(tab)"
          :class="{ 'tab-item-active': tab.isActive }"
          v-for="tab in tabList"
          :key="tab.name"
        >
          {{ tab.name }}
        </div>
      </div>

      <hospital-overview
        v-if="currentTabName !== '年度总览'"
        :name="currentTabName"
        :data="currentData"
      />
      <year-overview v-else :data="currentData" />
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.patient-traffic-statistics {
  min-height: 438px;
  width: 410px;
  pointer-events: all;

  .tabs-list {
    height: 28px;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;

    .tab-item {
      width: 94px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 14px;
      font-family: OPPOSans;
      font-weight: 400;
      color: #ffffff;
      background-image: url('@/assets/img/home/tab-bg.png');
      background-size: cover;
      cursor: pointer;
    }

    .tab-item-active {
      color: #6a9bbf;
      background-image: url('@/assets/img/home/tab-bg-active.png');
    }
  }
}
</style>

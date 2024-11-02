<!--
 * @Description: 能耗对比
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { energyMonitoringStore } from '@/store/energyMonitoring';

const energyMonitoring = energyMonitoringStore();

const data = computed(() => energyMonitoring.data?.energyConsumption || {});

type TabItem = { name: string; id: string; isActive: boolean };
const tabList = ref<TabItem[]>([
  {
    name: '能耗较多',
    id: 'used',
    isActive: true,
  },
  {
    name: '增长较多',
    id: 'increased',
    isActive: false,
  },
  {
    name: '降低较多',
    id: 'decreased',
    isActive: false,
  },
]);

const changeTab = (item: TabItem) => {
  tabList.value = tabList.value.map((cItem) => ({
    ...cItem,
    isActive: item.name === cItem.name,
  }));
};

const currentData = computed(() => data.value[tabList.value.find((item) => item.isActive)!.id]);
// + Number(next.value || 0)
const totalNUmber = computed(() =>
  currentData.value.reduce((prev, next) => prev + Number(next.value || 0), 0)
);

const getBarWidth = (value: number) => (value / totalNUmber.value) * 100;
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="能耗对比" subTitle="(二号住院楼)">
      <div class="tab-list">
        <div
          class="tab-item"
          :class="{ 'tab-item-active': item.isActive }"
          v-for="item in tabList"
          :key="item.name"
          @click="changeTab(item)"
        >
          {{ item.name }}
        </div>
      </div>

      <div class="bar-list">
        <span class="yoy">同比</span>
        <div class="bar-item" v-for="item in currentData" :key="item.name">
          <div class="bar-info">
            <div class="bar-name">{{ item.name }}</div>
            <div class="bar-number">
              {{ item.value }} <span>{{ item.unit }}</span>
            </div>
            <rate-number :other="true" :value="item.rate" />
          </div>

          <div class="bar-box">
            <div class="bar-percent" :style="{ width: getBarWidth(item.value) + '%' }"></div>
          </div>
        </div>
      </div>
      <template #right>
        <div class="right">
          <p v-show-time="'yyyy年MM月'" class="day"></p>
        </div>
      </template>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 324px;
  width: 410px;
  pointer-events: all;
  .right {
    @include flex(flex-start, center, row);
    margin-right: -10px;
    font-size: 14px;
    font-family: OPPOSans;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    .time {
      margin-left: 8px;
    }
  }
  .tab-list {
    height: 28px;
    width: 100%;
    margin-top: 15px;
    display: flex;
    justify-content: center;

    .tab-item {
      height: 28px;
      line-height: 28px;
      width: 94px;
      text-align: center;
      font-size: 14px;
      font-family: OPPOSans;
      font-weight: 400;
      color: rgba(106, 155, 191, 1);
      background: url('@/assets/img/energy/tab-bg.png') no-repeat;
      background-size: contain;
      margin-right: 10px;
      cursor: pointer;
    }

    .tab-item-active {
      color: #ffffff;
      background: url('@/assets/img/energy/tab-bg-active.png') no-repeat;
      background-size: contain;
    }
  }

  .bar-list {
    margin-top: 12px;
    position: relative;
    .yoy {
      position: absolute;
      top: -18px;
      right: 10px;
    }

    .bar-item {
      margin-bottom: 10px;

      .bar-info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .bar-name {
          @include text-overflow;
          padding-right: 10px;
          flex: 1;
          font-size: 16px;
          font-family: OPPOSans;
          font-weight: 400;
          color: #ffffff;
        }

        .bar-number {
          font-size: 20px;
          font-family: DINPro-Light;
          font-weight: 500;
          color: #ffffff;
          margin-right: 16px;

          span {
            font-size: 14px;
          }
        }
      }

      .bar-box {
        width: 408px;
        height: 10px;
        margin-top: 5px;
        background: rgba(16, 26, 38, 0.2);

        .bar-percent {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, rgba(75, 175, 249, 0.25), rgba(75, 175, 249, 1));
          transition: width 0.35s ease-in-out;
        }
      }
    }
  }
}
</style>

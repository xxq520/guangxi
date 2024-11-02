<!--
 * @Description: 智能化设备概况
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { hexToRgba } from '@/utils/common';
import type { ComposeOption } from 'echarts';
import type { LineSeriesOption } from 'echarts/charts';
import { homeStore } from '@/store/home';
import { useTimeoutFn } from '@vueuse/core';

const home = homeStore();

const colors = [
  'rgba(24, 144, 255, 1)',
  'rgba(186, 231, 255, 1)',
  'rgba(30, 231, 231, 1)',
  'rgba(245, 179, 72, 1)',
  'rgba(238, 117, 41, 1)',
];

const data = computed(() => home.data.overviewIntelligentDevices || []);

const listData = computed(() => {
  const getdata: any[] = [];
  data.value?.map((item, index) => {
    getdata.push({
      value: item.value,
      name: item.title,
      color: colors[index],
      itemStyle: {
        color: colors[index],
      },
    });
  });
  return getdata;
});
</script>

<template>
  <div class="personnel-statistics">
    <card-module title="智能化设备概况">
      <div class="body">
        <div class="left">
          <Donut3D :grid3-d="{ boxWidth: 110, boxHeight: 15 }" :data="listData" />
        </div>
        <div class="right">
          <div class="item" v-for="(item, index) in data" :key="index">
            <div class="title-box">
              <i class="icon" :style="{ background: colors[index] }"></i>
              <span class="title">{{ item.title }}</span>
            </div>
            <p class="value">{{ item.value }}</p>
          </div>
        </div>
      </div>
      <template #right> 桃源 </template>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.personnel-statistics {
  height: 220px;
  width: 380px;
  pointer-events: all;
  .body {
    @include flex(space-between, flex-start, row);

    .left {
      width: 250px;
      height: 216px;
      margin-top: -4px;
      background: url('@/assets/img/background/home/intelligent-devices-bg.png') center center
        no-repeat;
      background-size: 200px 83px;
      background-position-y: 94px;
      background-position-x: 0px;
      .chart {
        width: 100%;
        height: 216px;
      }
    }
    .right {
      @include flex(space-between, center, row);
      flex-wrap: wrap;
      margin-right: -20px;
      padding-left: 10px;

      .item {
        width: 46%;
        margin-top: 20px;
        .title-box {
          font-size: 12px;
          font-family: OPPOSans;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          @include flex(flex-start, center, row);
          .icon {
            width: 8px;
            height: 8px;
            margin-right: 8px;
          }
          .title {
          }
        }
        .value {
          font-size: 16px;
          font-family: DINPro;
          font-weight: 400;
          color: #ffffff;
          margin-top: 9px;
          padding-left: 15px;
        }
      }
    }
  }
}
</style>

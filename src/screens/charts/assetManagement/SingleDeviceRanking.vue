<!--
 * @Description: 单设备排行
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { assetManagementStore } from '@/store/assetManagement';
import { computeToRealSize } from '@/utils/tool';
import { useTimeoutFn } from '@vueuse/core';
import type { ComposeOption } from 'echarts';
import type { PieSeriesOption } from 'echarts/charts';
const assetManagement = assetManagementStore();

const select = ref(0);

const data = computed(() => assetManagement.data?.singleDeviceRanking || []);
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="单设备排行">
      <div class="body">
        <div class="btn-list">
          <div
            class="btn-item"
            :class="{ active: index == select }"
            v-for="(item, index) in data"
            :key="index"
            @click="select = index"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in data[select]?.children || []" :key="index">
          <div class="header">
            <div class="title" :title="item.title">{{ item.title }}</div>
            <div class="type" :title="item.type">
              <span class="sub-title">类型:</span>{{ item.type }}
            </div>
            <div class="department" :title="item.department">
              <span class="sub-title">科室:</span>{{ item.department }}
            </div>
          </div>
          <div class="children">
            <div class="children-item">
              <p class="value">{{ item.useNum }}</p>
              <p class="children-title">使用次数</p>
            </div>
            <div class="children-item">
              <p class="value">{{ item.useTime }}</p>
              <p class="children-title">使用时长(小时)</p>
            </div>
            <div class="children-item">
              <p class="value">{{ item.usePercentage }}</p>
              <p class="children-title">使用率</p>
            </div>
          </div>
        </div>
      </div>
      <template #right>
        <div class="right">
          <p v-show-time="'yyyy年'" class="day"></p>
        </div>
      </template>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 330px;
  width: 410px;
  pointer-events: all;
  .body {
    position: relative;
    .btn-list {
      @include flex(center, center, row);
      margin-top: 14px;
      .btn-item {
        @include flex(center, center, row);
        width: 94px;
        height: 28px;
        border-radius: 3px;
        margin: 0 5px;
        font-size: 14px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #6a9bbf;
        cursor: pointer;
        background-image: url('@/assets/img/home/tab-bg.png');
        background-size: 100% 100%;
        &.active {
          font-size: 14px;
          font-family: OPPOSans;
          font-weight: 400;
          color: #ffffff;
          background-image: url('@/assets/img/home/tab-bg-active.png');
          background-size: 100% 100%;
        }
      }
    }
    .list {
      .item {
        background: url('@/assets/img/background/assetManagement/single-device-ranking.png') center
          center no-repeat;
        background-size: 100% 100%;
        height: 92px;
        padding: 8px 0 10px 6px;
        margin-top: 12px;
        .header {
          @include flex(space-between, center, row);
          font-size: 14px;
          font-family: OPPOSans;
          font-weight: 400;
          color: #ffffff;
          .title {
            width: 46%;
            @include text-overflow;
            margin-left: 2%;
          }
          .type {
            width: 40%;
            margin-left: 2%;
            @include text-overflow;
          }
          .sub-title {
            font-size: 14px;
            font-family: OPPOSans;
            font-weight: 400;
            color: #cbe3fd;
            padding-right: 6px;
          }
          .department {
            width: 27%;
            @include text-overflow;
          }
        }
        .children {
          @include flex(flex-start, center, row);
          margin-top: 16px;

          .children-item {
            @include flex(center, center, column);
            width: 33%;
            text-align: center;
            border-right: 1px solid rgba(84, 107, 132, 1);
            height: 34px;
            .value {
              font-size: 18px;
              font-family: DINPro;
              font-weight: 500;
              color: #ffffff;
            }
            .children-title {
              margin-top: 6px;
              font-size: 14px;
              font-family: OPPOSans;
              font-weight: 400;
              color: #cbe3fd;
            }
          }
          :last-child {
            border-right: 1px solid transparent;
          }
        }
      }
    }
  }
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
}
</style>

<!--
 * @Description: 首页顶部数据指标
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { regexHandleNum } from '@/utils/common';
import { homeStore } from '@/store/home';

const home = homeStore();
type TabItem = { title: string; value: number; percentage: number; unit: string };

const data = computed(() => home.data.topMedicalOverview || []);

const currentTabName = ref('年度总览');
</script>

<template>
  <div class="medical-overview">
    <div class="item" v-for="(item, index) in data" :key="index">
      <p class="title">{{ item.title }}</p>
      <div class="value">
        <p class="value-num">{{ regexHandleNum(item.value, 0) }}</p>
        <div v-if="item.title != '资产总数'" class="percentage">
          <span class="unit">{{ item.unit }}</span>
          <rate-number :other="item.title?.includes('能效')" :value="item.percentage" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.medical-overview {
  height: 58px;
  width: 1000px;
  pointer-events: all;
  @include flex(space-between, center, row);
  position: absolute;
  left: 50%;
  transform: translateX(-47%);
  top: 90px;
  .item {
    width: 180px;
    .title {
      font-size: 16px;
      font-family: OPPOSans;
      font-weight: 400;
      color: #ffffff;
    }
    .value {
      @include flex(flex-start, center, row);
      margin-top: 8px;
    }
    .value-num {
      font-size: 30px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
    }
    .percentage {
      @include flex(flex-start, center, row);
      .unit {
        margin-right: 12px;
      }
      margin-top: 10px;
    }
  }
}
</style>

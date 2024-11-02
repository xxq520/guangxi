<!--
 * @Description: 能效成本
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { homeStore } from '@/store/home';

const home = homeStore();
type TabName = '年度总览' | '桃源院区' | '北院区' | '星湖门诊';

const dataList = computed(() => home.data.energyEfficiencyCost || []);
</script>

<template>
  <div class="energy-efficiency-cost">
    <card-module title="能效成本">
      <energy-efficiency-cost-item v-for="item in dataList" :data="item" :key="item?.title" />
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.energy-efficiency-cost {
  height: 362px;
  width: 410px;
  margin-top: 24px;
}
</style>

<!--
 * @Description: 智慧能效-空调管理
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { autoRequest } from '@/request/autoRequest';
import { useAppStore } from '@/store';
const store = useAppStore();
</script>

<template>
  <side-bar>
    <template #left>
      <total-energy-statistics />
      <usage-trends />
      <energy-consumption-comparison />
    </template>

    <template #bottom> </template>

    <template #right>
      <realTime-alarm />
      <air-conditioning-temperature-trend />
      <energy-consumption-type-air />
      <devices-list />
    </template>
  </side-bar>
</template>

<style lang="scss" scoped></style>

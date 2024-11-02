<!--
 * @Description: 智慧能效-供水管理
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
      <energy-consumption-type />
      <devices-list />
    </template>
  </side-bar>
</template>

<style lang="scss" scoped></style>

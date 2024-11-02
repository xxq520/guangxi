<!--
 * @Description: 智慧防控-门禁系统
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { autoRequest } from '@/request/autoRequest';
import { AccessControlSystem } from '@/request/intelligentPrevention';
import { useAppStore } from '@/store';
import { IntelligentPreventionStore } from '@/store/intelligentPrevention';

const intelligentPrevention = IntelligentPreventionStore();
const store = useAppStore();

autoRequest<AccessControlSystem>(
  {
    url: '/intelligentPrevention/accessControlSystem',
    data: {
      ssdp: 'mjxt',
    },
  },
  (res) => {
    console.log(res, '智慧防控-门禁系统主题数据');
    intelligentPrevention.accessControlSystem = res;
  },
  () => null,
  'accessControlSystem'
);
</script>

<template>
  <side-bar>
    <template #left>
      <access-control-real-time-alarm />
      <access-control-equipment-statistics />
      <access-control-devices-list />
    </template>

    <template #right>
      <access-control-traffic-statistics />
      <access-controll-category-rate />
      <access-traffic-trend />
    </template>
  </side-bar>
</template>

<style lang="scss" scoped></style>

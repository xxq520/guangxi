<!--
 * @Description: 智慧防控-视频监控
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { autoRequest } from '@/request/autoRequest';
import { VideoMonitoring } from '@/request/intelligentPrevention';
import { useAppStore } from '@/store';
import { IntelligentPreventionStore } from '@/store/intelligentPrevention';
const store = useAppStore();
const intelligentPrevention = IntelligentPreventionStore();
autoRequest<VideoMonitoring>(
  {
    url: '/intelligentPrevention/videoMonitoring',
    data: {
      ssdp: 'spjk',
    },
  },
  (res) => {
    console.log(res, '智慧防控-视频监控主题数据');
    intelligentPrevention.videoMonitoring = res;
  },
  () => null,
  'videoMonitoring'
);
</script>

<template>
  <side-bar>
    <template #left>
      <video-devices-statistics />
      <video-devices-list />
    </template>

    <template #right>
      <video-monitoring-list />
    </template>
  </side-bar>
</template>

<style lang="scss" scoped></style>

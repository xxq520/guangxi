<!--
 * @Description: 资产实时报警
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { autoRequest } from '@/request/autoRequest';
import { AlarmData } from '@/request/energyMonitoring';
import { assetManagementStore } from '@/store/assetManagement';

const assetManagement = assetManagementStore();

const showModal = ref(false);

const data = ref<AlarmData | {}>({});

autoRequest<AlarmData>(
  {
    url: '/getAlarmData',
    data: {
      ssdp: 'zcgl',
    },
  },
  (res) => {
    console.log(res, '告警信息');
    data.value = res;
  },
  () => null,
  'assetManagement-getAlarmData'
);
</script>

<template>
  <real-time-alarm-public :data="data" :title="'实时报警'" />
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 190px;
  width: 410px;
  pointer-events: all;
}
</style>

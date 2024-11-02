<!--
 * @Description: 实时报警
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { autoRequest } from '@/request/autoRequest';
import { AlarmData } from '@/request/energyMonitoring';
import { useAppStore } from '@/store';

const showModal = ref(false);
const store = useAppStore();

const data = ref<AlarmData | {}>({});

autoRequest<AlarmData>(
  {
    url: '/getAlarmData',
    data: {
      ssdp: 'mj',
    },
  },
  (res) => {
    console.log(res, '告警信息');
    data.value = res;
    if (!res.alarmList) {
      data.value = {
        alarmList: [
          {
            name: '告警总数',
            value: 0,
            processed: 0,
          },
          {
            name: '紧急',
            value: 0,
            processed: 0,
          },
          {
            name: '常规',
            value: 0,
            processed: 0,
          },
        ],
        data: [],
      };
    }
  },
  () => null,
  'intelligentPrevention-getAlarmData'
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

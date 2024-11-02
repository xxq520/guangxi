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
import { energyMonitoringStore } from '@/store/energyMonitoring';

const energyMonitoring = energyMonitoringStore();

const data = ref<AlarmData | null>(null);

const store = useAppStore();
let request: any = null;

const getData = (business = '供电管理') => {
  request?.request?.destroy();
  const handle: Record<string, string> = {
    供电管理: 'gd',
    供水管理: 'gs',
    空调管理: 'kt',
  };
  request = autoRequest<AlarmData>(
    {
      url: '/getAlarmData',
      data: {
        ssdp: handle[business],
      },
    },
    (res) => {
      console.log(res, '告警信息');
      data.value = res;
    },
    () => null,
    'energyMonitoring-getAlarmData'
  );
};

watch(
  () => store.activeSubMenuInfo,
  (res: any) => {
    getData(res.title);
  },
  {
    immediate: true,
  }
);
const showModal = ref(false);
</script>

<template>
  <div class="doctor-patient-analysis">
    <real-time-alarm-public :data="data" :title="'实时报警'" />
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 190px;
  width: 410px;
  pointer-events: all;

  .alarm-btn {
    position: relative;
    bottom: 7px;
    width: 96px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: url('@/assets/img/energy/alarm-bg.png') no-repeat;
    background-size: contain;
    font-size: 12px;
    font-family: OPPOSans;
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
  }

  .alarm-box {
    display: flex;
  }

  .alarm-type {
    padding-top: 8px;

    .alarm-item {
      width: 181px;
      height: 35px;
      padding: 0 9px 0 11px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 9px;

      &:nth-child(1) {
        background-image: url('@/assets/img/energy/list-blue.png');
      }

      &:nth-child(2) {
        background-image: url('@/assets/img/energy/list-yellow.png');
      }

      &:nth-child(3) {
        background-image: url('@/assets/img/energy/list-green.png');
      }
    }

    .alarm-name {
      font-size: 14px;
      font-family: OPPOSans;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.5);
    }

    .alarm-value {
      font-size: 24px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .alarm-status-img {
    margin-left: 25px;
    width: 151px;
    height: 143px;
  }

  .alarm-status {
    margin-top: 9px;

    .status-item {
      text-align: right;
      margin-bottom: 10px;

      .status-name {
        font-size: 14px;
        height: 14px;
        line-height: 14px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.5;
      }

      .status-value {
        font-size: 20px;
        height: 20px;
        line-height: 20px;
        font-family: DINPro;
        font-weight: bold;
        color: #ffffff;
        margin-top: 5px;
      }
    }
  }
}
</style>

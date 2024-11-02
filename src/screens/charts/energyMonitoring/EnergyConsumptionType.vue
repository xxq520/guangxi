<!--
 * @Description: 能耗类型统计
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { computeToRealSize } from '@/utils/tool';
import { useTimeoutFn } from '@vueuse/core';
import type { ComposeOption } from 'echarts';
import type { PieSeriesOption } from 'echarts/charts';
import { energyMonitoringStore } from '@/store/energyMonitoring';

const energyMonitoring = energyMonitoringStore();
import { useAppStore } from '@/store';
const store = useAppStore();

const select = ref(0);

const data = computed(() => energyMonitoring?.data?.energyConsumptionType || []);

/** 表头数据 */
const columns = ref([
  {
    key: 'type',
    title: store.activeSubMenuInfo?.code == 'gongshuiguanli' ? '供水类型' : '供电类型',
    align: 'left',
    width: 100,
  },
  {
    key: 'useNum',
    title: '设备数量',
    align: 'center',
    width: 70,
  },
  {
    key: 'energy',
    title: '能耗',
    align: 'center',
    width: 120,
  },
  {
    key: 'percentage',
    title: '能耗占比',
    align: 'center',
    width: 80,
  },
]);
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="能耗类型统计" subTitle="(二号住院楼)">
      <div class="body">
        <scroll-table class="table" :data="data || []" :columns="columns" :autoPlay="true">
          <!-- <template #url="scope">
            <p class="op" @click="toggleExpand(scope.row.url, scope.row.carCode)">查看图片</p>
          </template> -->
        </scroll-table>
      </div>
      <template #right>
        <div class="right">
          <p v-show-time="'yyyy年MM月'" class="day"></p>
        </div>
      </template>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 310px;
  width: 410px;
  pointer-events: all;
  :deep(.el-table__header) {
    width: 100% !important;
  }
  :deep(.el-table__body) {
    width: 100% !important;
  }
  .body {
    position: relative;
    margin-top: 2px;
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

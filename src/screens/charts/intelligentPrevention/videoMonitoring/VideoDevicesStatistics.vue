<!--
 * @Description: 设备统计
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { computeToRealSize } from '@/utils/tool';
import { useTimeoutFn } from '@vueuse/core';
import type { ComposeOption } from 'echarts';
import type { PieSeriesOption } from 'echarts/charts';
import { IntelligentPreventionStore } from '@/store/intelligentPrevention';
const intelligentPrevention = IntelligentPreventionStore();
const data = computed(() => intelligentPrevention?.videoMonitoring?.videoDevicesStatistics || {});

/** 表头数据 */
const columns = ref([
  {
    key: 'building',
    title: '楼栋',
    align: 'left',
    width: 110,
  },
  {
    key: 'total',
    title: '总数',
    align: 'center',
    width: 80,
  },
  {
    key: 'connected',
    title: '已接入数',
    align: 'center',
    width: 114,
    className: 'line-overflow',
  },
  {
    key: 'percentage',
    title: '上线率',
    align: 'center',
    width: 58,
  },
]);
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="设备统计">
      <div class="body">
        <div class="header">
          <span>设备总数</span>
          <span class="value" v-num-rolling="data.total || 0"></span>
        </div>
        <scroll-table
          class="table"
          :data="data?.children || []"
          :columns="columns"
          :autoPlay="true"
        >
          <template #posPercentage="scope">
            <span class="green">{{ scope.row.posPercentage }}</span>
          </template>
          <template #energyPercentage="scope">
            <span class="green">{{ scope.row.energyPercentage }}</span>
          </template>
        </scroll-table>
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 520px;
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
    .header {
      height: 30px;
      @include flex(center, center, row);
      margin-top: 26px;
      background: url('@/assets/img/background/energyManagement/energy-consumption-type.png')
        no-repeat;
      background-size: 100% 100%;
      span {
        margin-top: -10px;
        margin-right: 30px;
        font-size: 16px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #ffffff;
      }
      .value {
        margin-top: -20px !important;
        font-size: 30px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .green {
      font-size: 14px;
      font-family: DINPro;
      font-weight: 400;
      @include text-overflow;
      color: #5fff94;
    }
    .table {
      margin-left: -8px;
    }
  }

  :deep(.el-table) {
    .el-table__row {
      height: 46px !important;
      min-height: 46px !important;
      padding: 0 !important;
    }

    .cell,
    .el-table__cell {
      padding: 0 !important;
    }
  }
}
</style>

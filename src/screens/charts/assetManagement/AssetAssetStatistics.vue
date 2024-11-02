<!--
 * @Description: 资产统计
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { assetManagementStore } from '@/store/assetManagement';
import { computeToRealSize } from '@/utils/tool';
import { useTimeoutFn } from '@vueuse/core';
import type { ComposeOption } from 'echarts';
import type { PieSeriesOption } from 'echarts/charts';
const assetManagement = assetManagementStore();

const data = computed(() => assetManagement.data?.assetStatistics || {});

/** 表头数据 */
const columns = ref([
  {
    key: 'type',
    title: '设备类型',
    align: 'left',
    width: 86,
  },
  {
    key: 'num',
    title: '数量',
    align: 'center',
    width: 50,
  },
  {
    key: 'positon',
    title: '定位标签',
    align: 'center',
    width: 70,
    className: 'line-overflow',
  },
  {
    key: 'posPercentage',
    title: '占比',
    align: 'center',
    width: 50,
  },
  {
    key: 'energyEfficiency',
    title: '能效标签',
    align: 'center',
    width: 65,
    className: 'line-overflow',
  },
  {
    key: 'energyPercentage',
    title: '占比',
    align: 'center',
    width: 50,
  },
]);
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="资产统计">
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
            <span class="green" :title="scope.row.posPercentage">{{
              scope.row.posPercentage
            }}</span>
          </template>
          <template #energyPercentage="scope">
            <span class="green" :title="scope.row.energyPercentage">{{
              scope.row.energyPercentage
            }}</span>
          </template>
        </scroll-table>
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 330px;
  width: 410px;
  pointer-events: all;
  margin-top: 12px;
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
      margin-top: 20px;
      background: url('@/assets/img/background/energyManagement/energy-consumption-type.png')
        no-repeat;
      background-size: 100% 100%;
      span {
        margin-top: -0px;
        margin-right: 30px;
        font-size: 16px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #ffffff;
      }
      .value {
        margin-top: -10px !important;
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
}
</style>

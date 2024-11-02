<!--
 * @Description: 实时水位
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { computeToRealSize } from '@/utils/tool';
import { useTimeoutFn } from '@vueuse/core';
import type { ComposeOption } from 'echarts';
import type { PieSeriesOption } from 'echarts/charts';
import { intelligentMonitoringStore } from '@/store/intelligentMonitoring';
const intelligentMonitoring = intelligentMonitoringStore();

const select = ref(0);

const data = computed(() => intelligentMonitoring?.data?.realTimeWaterLevel || []);

/** 表头数据 */
const columns = ref([
  {
    key: 'position',
    title: '位置',
    align: 'left',
    width: 130,
  },
  {
    key: 'waterLevel',
    title: '水位',
    align: 'center',
    width: 144,
  },
  {
    key: 'exceeding',
    title: '是否超标',
    align: 'center',
    width: 82,
  },
]);
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="实时水位">
      <div class="body">
        <scroll-table class="table" :data="data || []" :columns="columns" :autoPlay="true">
          <template #exceeding="scope">
            <p class="op" :class="{ red: scope.row.exceeding == '是' }">
              <i></i>{{ scope.row.exceeding }}
            </p>
          </template>
        </scroll-table>
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 300px;
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
    .table {
      height: 300px;
      .op {
        @include flex(center, center, row);
        color: #39d56c;
        i {
          width: 8px;
          height: 8px;
          background: #39d56c;
          border-radius: 50%;
          margin-right: 6px;
        }
        &.red {
          i {
            background: #ff5f5f;
          }

          color: #ff5f5f;
        }
      }
    }
  }
}
</style>

<!--
 * @Description: 通行统计
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { IntelligentPreventionStore } from '@/store/intelligentPrevention';

const intelligentPrevention = IntelligentPreventionStore();

const dataList = computed(
  () => intelligentPrevention?.accessControlSystem?.trafficStatistics || []
);

/** 表头数据 */
const columns = ref([
  {
    key: 'name',
    title: '',
    align: 'center',
    width: 84,
    className: 'line-overflow',
  },
  {
    key: 'yearPerson',
    title: '年度通行人员',
    align: 'center',
    width: 84,
    className: 'line-overflow',
  },
  {
    key: 'ringRatio',
    title: '环比',
    align: 'center',
    width: 58,
    className: 'line-overflow',
  },
  {
    key: 'monthPerson',
    title: '上月通行人员',
    align: 'center',
    width: 84,
    className: 'line-overflow',
  },
  {
    key: 'yearRatio',
    title: '同比',
    align: 'center',
    width: 58,
    className: 'line-overflow',
  },
]);
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="通行统计">
      <scroll-table :data="dataList || []" :columns="columns" :autoPlay="true">
        <template #ringRatio="scope">
          <rate-number :value="scope.row.ringRatio" style="left: 18px" />
        </template>
        <template #yearRatio="scope">
          <rate-number :value="scope.row.yearRatio" style="left: 18px" />
        </template>
      </scroll-table>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 314px;
  width: 420px;
  pointer-events: all;
  :deep(.el-table__header) {
    width: 100% !important;
  }
  :deep(.el-table__body) {
    width: 100% !important;
  }

  :deep(.el-table) {
    .el-table__row {
      height: 36px !important;
      min-height: 36px !important;
      padding: 0 !important;
    }

    .cell,
    .el-table__cell {
      padding: 0 !important;
    }
  }
}
</style>

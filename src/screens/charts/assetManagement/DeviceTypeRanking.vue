<!--
 * @Description: 设备类型排行
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

const select = ref(0);

const data = computed(() => assetManagement.data?.deviceTypeRanking || []);

/** 表头数据 */
const columns = ref([
  {
    key: 'type',
    title: '设备类型',
    align: 'left',
    width: 150,
    className: 'line-overflow',
  },
  {
    key: 'useNum',
    title: '使用次数',
    align: 'center',
    width: 60,
  },
  {
    key: 'useTime',
    title: '使用时长',
    align: 'center',
    width: 86,
  },
  {
    key: 'usePercentage',
    title: '使用率',
    align: 'center',
    width: 60,
  },
]);
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="设备类型排行">
      <div class="body">
        <div class="btn-list">
          <div
            class="btn-item"
            :class="{ active: index == select }"
            v-for="(item, index) in data"
            :key="index"
            @click="select = index"
          >
            {{ item.title }}
          </div>
        </div>
        <scroll-table
          class="table"
          :data="data[select]?.children || []"
          :columns="columns"
          :autoPlay="true"
        >
          <!-- <template #url="scope">
            <p class="op" @click="toggleExpand(scope.row.url, scope.row.carCode)">查看图片</p>
          </template> -->
        </scroll-table>
      </div>
      <template #right>
        <div class="right">
          <p v-show-time="'yyyy年'" class="day"></p>
        </div>
      </template>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 330px;
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
    .btn-list {
      @include flex(center, center, row);
      margin-top: 14px;
      .btn-item {
        @include flex(center, center, row);
        width: 94px;
        height: 28px;
        border-radius: 3px;
        margin: 0 5px;
        font-size: 14px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #6a9bbf;
        cursor: pointer;
        background-image: url('@/assets/img/home/tab-bg.png');
        background-size: 100% 100%;
        &.active {
          font-size: 14px;
          font-family: OPPOSans;
          font-weight: 400;
          color: #ffffff;
          background-image: url('@/assets/img/home/tab-bg-active.png');
          background-size: 100% 100%;
        }
      }
    }
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

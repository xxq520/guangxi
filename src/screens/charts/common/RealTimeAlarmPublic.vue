<!--
 * @Description: 实时报警公共组件
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { assetManagementStore } from '@/store/assetManagement';
import { percentaga } from '@/utils/common';
import { flyToTwin } from '@/utils/thingjsx';

const assetManagement = assetManagementStore();
const props = withDefaults(
  defineProps<{
    title: string | undefined;
    data: any;
  }>(),
  {
    title: '',
    data: [],
  }
);

const showModal = ref(false);
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module :title="title">
      <template #right>
        <div class="alarm-btn" @click="showModal = !showModal">当前告警列表</div>
      </template>

      <div class="alarm-box" v-if="data?.alarmList">
        <img
          class="alarm-status-img"
          v-if="data?.alarmList[0]?.value"
          src="@/assets/img/energy/error.png"
          alt=""
        />
        <img class="alarm-status-img normal" v-else src="@/assets/img/energy/normal.png" alt="" />
        <div class="alarm-type">
          <div class="table-title">
            <p class="processed">已处理数</p>
            <p class="total">总数</p>
            <p class="rate">处理率</p>
          </div>
          <div
            class="alarm-item"
            v-for="item in data?.alarmList"
            :key="item.name"
            @dblclick="flyToTwin('#' + item.twin)"
          >
            <div class="alarm-name">{{ item.name }}</div>
            <div class="alarm-processed" v-num-rolling="item.processed || 0"></div>
            <div class="alarm-value" v-num-rolling="item.value || 0"></div>
            <div class="alarm-rate">{{ percentaga(item.processed, item.value) || 0 }}%</div>
          </div>
        </div>
      </div>
    </card-module>
  </div>

  <alarm-list-modal
    v-if="data?.alarmList"
    title="当前告警列表"
    v-model="showModal"
    :alarm="data.data"
  />
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
    .table-title {
      @include flex(flex-start, center, row);
      font-size: 12px;
      font-family: OPPOSans;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.5);
      margin-left: 74px;
      text-align: center;
      padding-bottom: 3px;
      .processed {
        width: 65px;
      }
      .total {
        width: 55px;
      }
      .rate {
        width: 55px;
      }
    }
    .alarm-item {
      width: 248px;
      height: 35px;
      padding: 0 9px 0 11px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 9px;
      text-align: center;

      &:nth-child(2) {
        background-image: url('@/assets/img/energy/list-blue.png');
      }

      &:nth-child(3) {
        background-image: url('@/assets/img/energy/list-yellow.png');
      }

      &:nth-child(4) {
        background-image: url('@/assets/img/energy/list-green.png');
      }
    }

    .alarm-name {
      font-size: 14px;
      font-family: OPPOSans;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.5);
      width: 70px;
      text-align: left;
    }
    .alarm-processed {
      width: 80px;
      text-align: center;
      font-size: 24px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
    }
    .alarm-value {
      width: 70px;
      text-align: center;
      font-size: 24px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
    }
    .alarm-rate {
      width: 50px;
      text-align: center;
      font-size: 14px;
    }

    .alarm-value {
      font-size: 24px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .alarm-status-img {
    margin-right: 12px;
    width: 151px;
    height: 143px;
  }
}
</style>

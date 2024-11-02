<!--
 * @Description: 年度收入
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { regexHandleNum } from '@/utils/common';
defineProps<{
  name: string;
  data: any;
}>();
</script>

<template>
  <div class="courtyard-area-big">
    <div class="area-header">{{ name }}</div>
    <div class="area-body">
      <div class="area-item">
        <div class="area-row">
          <div class="area-label" style="color: rgba(255, 255, 255, 0.5)">总收入</div>
          <div class="area-value">
            {{ regexHandleNum(data?.zsr, 0) }} <span class="area-unit">万</span>
          </div>
        </div>
        <div class="area-row">
          <div class="area-label" style="color: rgba(255, 255, 255, 0.5)">同比</div>
          <div class="area-value">
            <rate-number :value="data?.zsrRate" style="top: 2px" />
          </div>
        </div>
      </div>

      <div class="area-item">
        <div class="area-row">
          <div class="area-label">门诊收入</div>
          <div class="area-label area-label-sub">同比</div>
        </div>
        <div class="area-row">
          <div class="area-value">
            {{ regexHandleNum(data?.mzsr, 0) }} <span class="area-unit">万</span>
          </div>
          <div class="area-value">
            <rate-number :value="data?.mzsrRate" style="top: 4px" />
          </div>
        </div>
      </div>

      <div class="area-item">
        <div class="area-row">
          <div class="area-label">急诊收入</div>
          <div class="area-label area-label-sub">同比</div>
        </div>
        <div class="area-row">
          <div class="area-value">
            {{ regexHandleNum(data?.jzsr, 0) }} <span class="area-unit">万</span>
          </div>
          <div class="area-value">
            <rate-number :value="data?.jzsrRate" style="top: 4px" />
          </div>
        </div>
      </div>

      <div class="area-item">
        <div class="area-row">
          <div class="area-label">住院收入</div>
          <div class="area-label area-label-sub">同比</div>
        </div>
        <div class="area-row">
          <div class="area-value">
            {{ regexHandleNum(data?.zysr, 0) }} <span class="area-unit">万</span>
          </div>
          <div class="area-value">
            <rate-number :value="data?.zysrRate" style="top: 4px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.courtyard-area-big {
  height: 312px;
  width: 197px;
  background: url('@/assets/img/home/box-bg-2.png') no-repeat;
  background-size: contain;
  box-sizing: border-box;

  .area-header {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    font-family: OPPOSans;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
  }

  .area-body {
    padding: 19px 6px;
    box-sizing: border-box;

    .area-item {
      margin-bottom: 26px;

      .area-row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:nth-child(1) {
          margin-bottom: 2px;
        }

        .area-label {
          font-size: 14px;
          font-family: OPPOSans;
          font-weight: 400;
          color: #ffffff;
        }

        .area-label-sub {
          color: #cbe3fd;
          position: relative;
          left: -12px;
        }

        .area-value {
          font-size: 22px;
          font-family: DINPro-Medium;
          font-weight: 500;
          color: #ffffff;

          .area-unit {
            font-size: 12px;
            padding-left: 5px;
          }
        }
      }
    }
  }
}
</style>

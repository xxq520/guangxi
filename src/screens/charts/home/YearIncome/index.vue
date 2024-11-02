<!--
 * @Description: 年度收入
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { homeStore } from '@/store/home';
import { regexHandleNum } from '@/utils/common';

const home = homeStore();
const data = computed(() => home.data.yearIncome || {});
</script>

<template>
  <div class="year-income">
    <card-module title="年度收入">
      <div class="courtyard-area">
        <courtyard-area-big name="桃源院区" :data="data['桃源院区']" />
        <courtyard-area-big name="北院区" :data="data['北院区']" />
      </div>

      <div class="courtyard-area-middle">
        <div class="area-header">星湖门诊</div>
        <div class="area-body">
          <div class="area-item" style="max-width: 188px">
            <div class="area-row">
              <div class="area-label" style="color: rgba(255, 255, 255, 0.5)">总收入</div>
              <div
                class="area-label"
                style="color: rgba(255, 255, 255, 0.5); position: relative; left: -12px"
              >
                同比
              </div>
            </div>
            <div class="area-row">
              <div class="area-value">
                {{ regexHandleNum(data['星湖门诊']?.zsr, 0) }} <span class="area-unit">万</span>
              </div>
              <div class="area-value">
                <rate-number :value="data['星湖门诊']?.zsrRate" style="top: 2px" />
              </div>
            </div>
          </div>

          <div class="split-line"></div>

          <div class="area-item">
            <div class="area-row">
              <div class="area-label" style="color: rgba(255, 255, 255, 0.5)">门诊收入</div>
              <div class="area-value" v-title-show="1">
                {{ regexHandleNum(data['星湖门诊']?.mzsr, 0) }} <span class="area-unit">万</span>
              </div>
              <div class="area-value">
                <rate-number :value="data['星湖门诊']?.mzsrRate" style="top: 4px" />
              </div>
            </div>
            <div class="area-row">
              <div class="area-label" style="color: rgba(255, 255, 255, 0.5)">急诊收入</div>
              <div class="area-value" v-title-show="1">
                {{ regexHandleNum(data['星湖门诊']?.jzsr, 0) }} <span class="area-unit">万</span>
              </div>
              <div class="area-value" v-title-show="1">
                <rate-number :value="data['星湖门诊']?.jzsrRate" style="top: 2px" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="courtyard-area-middle courtyard-area-small">
        <div class="area-header">体检中心</div>
        <div class="area-body">
          <div class="area-item">
            <div class="area-row">
              <div class="area-label" style="color: rgba(255, 255, 255, 0.5)">体检收入</div>
              <div class="area-value">
                {{ regexHandleNum(data['体检中心']?.tjsr, 0) }}<span class="area-unit">万元</span>
              </div>
            </div>
          </div>

          <div class="split-line"></div>

          <div class="area-item">
            <div class="area-row">
              <div class="area-label" style="color: rgba(255, 255, 255, 0.5)">同比</div>
              <div class="area-value">
                <rate-number :value="data['体检中心']?.tjsrRate" style="top: 4px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.year-income {
  height: 558px;
  width: 410px;

  .courtyard-area {
    margin-top: 13px;
    display: flex;
    justify-content: space-between;
  }

  .courtyard-area-middle {
    width: 405px;
    height: 100px;
    background: url('@/assets/img/home/box-bg-1.png') no-repeat;
    background-size: contain;
    margin-top: 13px;

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
      display: flex;
      justify-content: space-between;
      align-items: center;

      .area-item {
        margin-top: 12px;
        flex: 1;
        padding: 0 3px;
        align-content: center;

        .area-row {
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:nth-child(1) {
            margin-bottom: 5px;
          }

          .area-label {
            font-size: 14px;
            font-family: OPPOSans;
            font-weight: 400;
            color: #ffffff;
          }

          .area-value {
            font-size: 22px;
            font-family: DINPro-Medium;
            font-weight: 500;
            color: #ffffff;

            .area-unit {
              font-size: 12px;
              padding-left: 1px;
            }
          }
        }
      }
    }
  }

  .courtyard-area-small {
    height: 80px;
    background-size: cover;
    border-bottom: 1px solid rgba(71, 102, 141, 0.3);
  }

  .split-line {
    width: 1px;
    height: 41px;
    background: rgba(71, 102, 141, 0.3);
    position: relative;
    top: 4px;
  }
}
</style>

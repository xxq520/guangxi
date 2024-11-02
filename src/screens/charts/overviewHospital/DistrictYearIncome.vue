<!--
 * @Description: 院区年度收入
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { overviewHospitalStore } from '@/store/overviewHospital';

const overviewHospital = overviewHospitalStore();

const getNum = (num: number) => {
  const numArr = `${num}`.split('');
  while (numArr.length < 4) numArr.unshift('0');
  return numArr;
};

const data = computed(() => overviewHospital.data.districtYearIncome || []);
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="年度收入">
      <div class="body">
        <div v-for="(item, index) in data" :key="index" class="item">
          <div class="item-left">
            <p class="title">{{ item.title }}</p>
            <p class="value">
              <span v-num-rolling="item.value || 0"></span><span class="unit">{{ item.unit }}</span>
            </p>
            <p class="percentage">
              <span class="yoy">同比</span><rate-number type="decrease" :value="item.percentage" />
            </p>
          </div>
          <div class="item-right">
            <div class="item-right-item" v-for="(item, index) in item.children" :key="index">
              <p class="title">{{ item.title }}</p>
              <p class="value" :title="(item.value || 0) + item.unit">
                <span>{{ ((item.value || 0) + '').split('.')[0] }}</span
                ><span class="unit">{{ item.unit }}</span>
              </p>
              <p class="percentage">
                <span class="yoy">同比</span><rate-number :value="item.percentage" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 632px;
  width: 410px;
  pointer-events: all;
  .body {
    padding-top: 30px;
    padding-left: 10px;
  }
  .item {
    margin-top: 5px;
    @include flex(space-between, flex-start, row);
    .item-left {
      @include flex(flex-start, center, column);
      background: url('@/assets/img/background/home/district-year-income-bg.png') center center
        no-repeat;
      background-size: 120% 100%;
      width: 172px;
      height: 150px;
      .title {
        font-size: 16px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #ffffff;
        margin-top: -20px;
      }
      .value {
        margin-top: 8px;
        font-size: 24px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        .unit {
          font-size: 12px;
        }
      }
      .percentage {
        margin-top: 13px;
        @include flex(flex-start, center, row);
        .yoy {
          font-size: 12px;
          font-family: OPPOSans;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          padding-right: 3px;
        }
      }
    }
    .item-right {
      @include flex(space-between, space-between, row);
      margin-left: 20px;
      flex-wrap: wrap;
      width: 220px;
      height: 190px;
      position: relative;
      margin-right: -20px;
      &::after,
      &::before {
        content: '';
        position: absolute;
      }
      &::after {
        content: '';
        width: 192px;
        height: 1px;
        border-top: 1px solid #47668d;
        background: linear-gradient(0deg, #000000 0%, #ffffff 100%);
        opacity: 0.3;
        top: 30%;
      }
      &::before {
        content: '';
        width: 1px;
        height: 144px;
        border-right: 1px solid #47668d;
        background: linear-gradient(0deg, #000000 0%, #ffffff 100%);
        opacity: 0.3;
        left: 45%;
        top: -14px;
      }
      .item-right-item {
        width: 95px;
        height: 75px;

        .title {
          font-size: 16px;
          font-family: OPPOSans;
          font-weight: 400;
          margin-top: -20px;
          font-size: 14px;
          font-family: OPPOSans;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
        }
        .value {
          @include text-overflow;
          width: 120%;
          margin-top: 0px;
          font-size: 24px;
          font-family: DINPro;
          font-weight: 500;
          color: #ffffff;
          .unit {
            font-size: 12px;
          }
        }
        .percentage {
          margin-top: 3px;
          @include flex(flex-start, center, row);
          .yoy {
            font-size: 12px;
            font-family: OPPOSans;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.5);
            padding-right: 3px;
          }
        }
      }
    }
  }
}
</style>

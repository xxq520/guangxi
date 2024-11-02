<!--
 * @Description: 患者流量统计-年度总览
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { regexHandleNum } from '@/utils/common';
import menzhenIcon from '@/assets/img/home/menzhen.png';
import jizhenIcon from '@/assets/img/home/jizhen.png';
import zhuyuanIcon from '@/assets/img/home/zhuyuan.png';

defineProps<{
  data: any;
}>();

const getImg = (title: string) => {
  const iconMap: Record<string, string> = {
    门诊人次: menzhenIcon,
    急诊人次: jizhenIcon,
    住院人次: zhuyuanIcon,
  };

  return iconMap[title];
};
</script>

<template>
  <div class="patient-traffic-statistics-item">
    <div
      class="patient-traffic-statistics-card"
      v-for="(item, index) in data?.list"
      :key="item.title"
    >
      <div class="card-header">
        <div class="card-header-left">
          <img class="card-icon" :src="getImg(item.title)" alt="" />
          <div class="card-title">{{ item.title }}</div>
        </div>
        <div class="card-header-right">
          <span class="totals-number">总数</span>
          <span class="totals-number-value">{{ regexHandleNum(item.total, 0) }}</span>

          <p class="percentage"><span class="yoy">同比</span><rate-number :value="item.rate" /></p>
        </div>
      </div>

      <div class="card-body">
        <div class="hospital-item">
          <div class="hospital-value">{{ regexHandleNum(item.tyyq, 0) }}</div>
          <div class="hospital-name">桃源院区</div>
        </div>
        <div class="hospital-item">
          <div class="hospital-value">{{ regexHandleNum(item.byq, 0) }}</div>
          <div class="hospital-name">北院区</div>
        </div>
        <div class="hospital-item" v-if="index != 2">
          <div class="hospital-value">{{ regexHandleNum(item.xhmz, 0) }}</div>
          <div class="hospital-name">星湖门诊</div>
        </div>
      </div>
    </div>

    <div class="patient-traffic-statistics-card" style="background-position: bottom">
      <div class="card-body">
        <div class="hospital-item" v-for="item in data?.medicalExaminationData" :key="item.title">
          <div class="hospital-value">
            {{ regexHandleNum(item.value) }} &nbsp;&nbsp;
            <rate-number :value="item.rate" />
          </div>
          <div class="hospital-name">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-traffic-statistics-item {
  .patient-traffic-statistics-card {
    width: 407px;
    // height: 92px;
    background: url('@/assets/img/home/patient-traffic-statistics-card-bg.png') no-repeat;
    background-size: cover;
    margin-top: 8px;

    .card-header {
      height: 32px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      box-sizing: border-box;

      .card-header-left {
        flex: 1;
      }

      .card-header-right {
        padding-right: 20px;
      }

      .card-header-left,
      .card-header-right {
        display: flex;
        align-items: center;
      }

      .card-icon {
        width: 18px;
        height: 18px;
      }

      .card-title {
        font-size: 14px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #ffffff;
        padding-left: 10px;
      }

      .totals-number {
        font-size: 14px;
        font-family: OPPOSans;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
      }

      .totals-number-value {
        font-size: 18px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        padding-left: 10px;
        padding-right: 24px;
      }
      .percentage {
        @include flex(flex-start, center, row);
        .yoy {
          font-size: 14px;
          font-family: OPPOSans;
          font-weight: 400;
          padding-right: 3px;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }

    .card-body {
      display: flex;
      align-items: center;
      height: 60px;
      // background: linear-gradient(90deg, rgba(54, 82, 123, 1), rgba(54, 82, 123, 0));

      .hospital-item {
        flex: 1;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          height: 32px;
          width: 1px;
          background: rgba(84, 107, 132, 0.4);
          top: 5px;
          right: 0;
        }

        &:last-child {
          &:after {
            width: 0;
          }
        }

        .hospital-name {
          font-size: 14px;
          font-family: OPPOSans;
          font-weight: 400;
          color: #ffffff;
          padding-top: 7px;
          text-align: center;
        }

        .hospital-value {
          text-align: center;
          display: flex;
          justify-content: center;
          font-family: DINPro-Medium;
        }

        &:nth-child(1) {
          .hospital-value {
            color: rgba(54, 186, 255, 1);
          }
        }

        &:nth-child(2) {
          .hospital-value {
            color: rgba(233, 213, 76, 1);
          }
        }

        &:nth-child(3) {
          .hospital-value {
            color: rgba(49, 255, 253, 1);
          }
        }
      }
    }
  }
}
</style>

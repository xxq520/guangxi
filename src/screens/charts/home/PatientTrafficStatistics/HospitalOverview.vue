<!--
 * @Description: 患者流量统计-分院统计
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { regexHandleNum } from '@/utils/common';

defineProps<{
  name: '桃源院区' | '北院区' | '星湖门诊';
  data: any;
}>();

import menzhenIcon from '@/assets/img/home/menzhen.png';
import jizhenIcon from '@/assets/img/home/jizhen.png';
import zhuyuanIcon from '@/assets/img/home/zhuyuan.png';

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
    <div class="patient-traffic-statistics-card" v-for="item in data" :key="item.title">
      <div class="card-header">
        <div class="card-header-left">
          <img class="card-icon" :src="getImg(item.title)" alt="" />
          <div class="card-title">{{ item.title }}</div>
        </div>
      </div>

      <div class="card-body">
        <div class="hospital-item">
          <div class="hospital-value">
            <rate-number :value="item.syhb" />
          </div>
          <div class="hospital-name">上月环比</div>
        </div>
        <div class="hospital-item">
          <div class="hospital-value">
            <rate-number :value="item.sytb" />
          </div>
          <div class="hospital-name">上月同比</div>
        </div>
        <div class="hospital-item">
          <div class="hospital-value">
            <rate-number :value="item.nhb" />
          </div>
          <div class="hospital-name">年同比</div>
        </div>

        <div class="hospital-item">
          <div class="hospital-value">{{ regexHandleNum(item.ndzs, 0) }}</div>
          <div class="hospital-name">年度总数</div>
        </div>
        <div class="hospital-item">
          <div class="hospital-value">{{ regexHandleNum(item.syzs, 0) }}</div>
          <div class="hospital-name">上月总数</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-traffic-statistics-item {
  .patient-traffic-statistics-card {
    width: 407px;
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
    }

    .card-body {
      display: flex;
      align-items: center;
      height: 60px;

      .hospital-item {
        flex: 1;
        position: relative;

        &:nth-child(3) {
          &::after {
            content: '';
            position: absolute;
            height: 32px;
            width: 1px;
            background: rgba(84, 107, 132, 0.4);
            top: 5px;
            right: 0;
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
        }
      }
    }
  }
}
</style>

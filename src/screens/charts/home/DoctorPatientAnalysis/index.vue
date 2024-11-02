<!--
 * @Description: 医患质量分析
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { homeStore } from '@/store/home';

const home = homeStore();
const data = computed(() => home.data.doctorPatientAnalysis || {});

const getNum = (num: number) => {
  const numArr = `${num}`.split('');
  while (numArr.length < 4) numArr.unshift('0');
  return numArr;
};
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="医患质量分析">
      <div class="doctor-patient-numbers">
        <div class="doctor-patient-item">
          <span class="analysis-label">医生总数</span>
          <div class="analysis-number-list">
            <div v-for="num in getNum(data.doctor)" :key="num" class="analysis-number-item">
              <span>{{ num }}</span>
            </div>
          </div>
          <span>人</span>
        </div>

        <div class="doctor-patient-item">
          <span class="analysis-label">护士总数</span>
          <div class="analysis-number-list">
            <div v-for="num in getNum(data.nurse)" :key="num" class="analysis-number-item">
              <span>{{ num }}</span>
            </div>
          </div>
          <span>人</span>
        </div>
      </div>

      <div class="doctor-table">
        <div class="doctor-table-row">
          <div class="doctor-table-col"></div>
          <div class="doctor-table-col">医患比</div>
          <div class="doctor-table-col">医护比</div>
          <div class="doctor-table-col">护患比</div>
          <div class="doctor-table-col">床护比</div>
        </div>

        <div class="doctor-table-row body-row" v-for="item in data.list" :key="item.date">
          <div class="doctor-table-col">{{ item.date }}</div>
          <div class="doctor-table-col">{{ item.yiHuan }}</div>
          <div class="doctor-table-col">{{ item.yiHu }}</div>
          <div class="doctor-table-col">{{ item.huHuan }}</div>
          <div class="doctor-table-col">{{ item.chuangHu }}</div>
        </div>
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 232px;
  width: 410px;
  margin-top: 35px;
  pointer-events: all;

  .doctor-patient-numbers {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    margin-left: 6px;

    .doctor-patient-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-family: OPPOSans;
      font-weight: 400;
      color: #ffffff;
    }

    .analysis-number-list {
      display: flex;
      margin-left: 12px;
      margin-right: 10px;
    }

    .analysis-number-item {
      background: url('@/assets/img/home/number-card-bg.png') no-repeat;
      background-size: cover;
      width: 20px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-right: 4px;

      span {
        font-size: 20px;
        font-family: DINPro-Medium;
        font-weight: 500;
        color: #ffffff;
        text-shadow: 0px 2px 27px rgba(0, 0, 0, 0.67);

        background: linear-gradient(
          180deg,
          #ffffff 0%,
          #ffb637 50.244140625%,
          #fffcf3 53.0029296875%,
          #ffd8a1 99.365234375%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }

  .doctor-table {
    margin-top: 14px;
    margin-left: 20px;
    text-align: center;

    .doctor-table-row {
      display: flex;
      margin-bottom: 10px;
    }

    .doctor-table-col {
      flex: 1;
      font-size: 14px;
      font-family: OPPOSans;
      font-weight: 400;
      color: #ffffff;
    }

    .body-row {
      // width: 407px;
      height: 32px;
      line-height: 32px;

      background-size: cover;
      background-repeat: no-repeat;

      &:nth-child(2) {
        background-image: url('@/assets/img/home/table-row-bg-1.png');
      }

      &:nth-child(3) {
        background-image: url('@/assets/img/home/table-row-bg-2.png');
      }

      &:nth-child(4) {
        background-image: url('@/assets/img/home/table-row-bg-3.png');
      }
    }
  }
}
</style>

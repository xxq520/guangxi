<!--
 * @Description: 实时空气质量(门诊楼)
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { intelligentMonitoringStore } from '@/store/intelligentMonitoring';
const intelligentMonitoring = intelligentMonitoringStore();

const data = computed(() => intelligentMonitoring?.data?.realTimeAirQuality || []);
</script>

<template>
  <div class="real-time-air-quality">
    <card-module title="实时空气质量" subTitle="(门诊楼)">
      <div class="body">
        <div class="item" v-for="(item, index) in data" :key="index">
          <div class="title">{{ item.title }}</div>
          <div class="children">
            <div
              class="children-item"
              v-for="(subItem, subIndex) in item?.children || []"
              :key="subIndex"
            >
              <p class="children-title">{{ subItem.title }}</p>
              <p
                class="children-value"
                :class="{ red: subItem.value >= 5 }"
                v-num-rolling="subItem.value || 0"
              >
                {{ subItem.value }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.real-time-air-quality {
  height: 341px;
  width: 100%;
  pointer-events: all;
  .body {
    position: relative;
    padding: 0 4px;
    overflow: auto;
    height: 311px;
    @include scrollBar();
    .item {
      @include flex(flex-start, center, row);
      background: url('@/assets/img/background/intelligentMonitoring/border-bg.png') center center
        no-repeat;
      background-size: 100% 1px;
      background-position: 0 100%;
      padding: 11px 0;
      .title {
        background: url('@/assets/img/background/intelligentMonitoring/floor-bg.png') center center
          no-repeat;
        background-size: 100% 100%;
        width: 54px;
        height: 54px;
        @include flex(center, center, row);
        font-size: 16px;
        font-family: OPPOSans;
        font-weight: 500;
        color: #ffffff;
      }
      .children {
        flex: 1;
        @include flex(space-around, center, row);
        .children-item {
          text-align: center;
          .children-title {
            font-size: 14px;
            font-family: OPPOSans;
            font-weight: 400;
            color: #cbe3fd;
          }
          .children-value {
            margin-top: 4px;
            font-size: 20px;
            font-family: DINPro;
            font-weight: 500;
            color: #ffffff;
            &.red {
              color: #ff5f5f;
            }
          }
        }
      }
    }
  }
}
</style>

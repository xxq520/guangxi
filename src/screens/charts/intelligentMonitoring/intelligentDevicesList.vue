<!--
 * @Description: 智慧监测设备列表
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { computeToRealSize } from '@/utils/tool';
import { useTimeoutFn } from '@vueuse/core';
import type { ComposeOption } from 'echarts';
import type { PieSeriesOption } from 'echarts/charts';
import { flyToTwin } from '@/utils/thingjsx';
import { intelligentMonitoringStore } from '@/store/intelligentMonitoring';
import { getCurrentTwins } from '@/utils/common';
import { useAppStore } from '@/store';
const intelligentMonitoring = intelligentMonitoringStore();
const select = ref(0);

/** 当前页码 */
const currentPage = ref(1);

const tabData = computed(() => intelligentMonitoring?.data?.intelligentDevicesList || []);
const allData = computed(() => {
  currentPage.value = 1;
  return getCurrentTwins(tabData.value[select?.value]?.children || {});
});

const data = ref(allData.value);

/** 避免异步请求数据首次为空 */
watch(allData, () => {
  data.value = allData.value;
});

/** 搜索内容 */
const value = ref('');

/** 当前页的数据 */
const currentData = computed(() => {
  const list = data.value.slice((currentPage.value - 1) * 3, currentPage.value * 3);
  return list;
});

/** 当页数据处理 */
const toggle = (page: number) => {
  currentPage.value = page;
};

/** 搜索 */
const search = () => {
  currentPage.value = 1;
  data.value = allData.value?.filter((item) => {
    return !value.value ? true : item.name.includes(value.value || '');
  });
};

const change = (index: number) => {
  select.value = index;
  value.value = '';
  currentPage.value = 1;
};
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="设备列表">
      <div class="body">
        <div class="btn-list">
          <div
            class="btn-item"
            :class="{ active: index == select }"
            v-for="(item, index) in tabData"
            :key="index"
            @click="change(index)"
          >
            {{ item.title }}
          </div>
        </div>
        <div class="search-box">
          <input
            placeholder="请输入搜索内容"
            v-model="value"
            class="search"
            type="text"
            @keydown.enter="search"
          />
          <div class="search-btn" @click="search">
            <img src="@/assets/img/icon/search.png" alt="" />
            搜索
          </div>
        </div>
        <div class="list">
          <div class="item" v-for="(item, index) in currentData || []" :key="index">
            <div class="header">
              <div class="title">
                <img
                  src="@/assets/img/icon/position.png"
                  alt=""
                  @click="flyToTwin('#' + item.twin)"
                />
                {{ item.name }}
              </div>
              <div class="department" v-if="select == 1" :class="{ red: item.status != '在线' }">
                <span class="sub-title"></span>{{ item.status }}
              </div>
              <div class="type">{{ item.time }}</div>
            </div>
            <div class="children">
              <div class="children-item" v-for="(item, index) in item?.detail" :key="index">
                <p class="value">{{ item.value }}</p>
                <p class="children-title">{{ item.title }}</p>
              </div>
            </div>
          </div>
        </div>
        <page-toggle
          class="page"
          @toggle="toggle"
          :currentPage="currentPage"
          :total="data.length"
          :pageNum="3"
        />
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 330px;
  width: 410px;
  pointer-events: all;
  .body {
    position: relative;
    .btn-list {
      @include flex(center, center, row);
      margin-top: 10px;
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
    .search-box {
      margin-top: 10px;
      @include flex(flex-start, center, row);
      .search {
        background: url('@/assets/img/background/assetManagement/search-input.png') center center
          no-repeat;
        background-size: 100% 100%;
        border: none;
        outline: none;
        flex: 1;
        height: 27px;
        padding-left: 10px;
        color: #fff;
      }
      .search-btn {
        @include flex(center, center, row);
        background: url('@/assets/img/background/assetManagement/search-bg.png') center center
          no-repeat;
        width: 65px;
        height: 26px;
        background-size: 100% 100%;
        font-size: 12px;
        font-family: OPPOSans;
        font-weight: 500;
        color: #ffffff;
        cursor: pointer;
        margin-left: 10px;
        img {
          width: 15px;
          height: 14px;
          margin-right: 5px;
        }
      }
    }
    .list {
      .item {
        background: url('@/assets/img/home/patient-traffic-statistics-card-bg.png') no-repeat;
        background-size: 100% 100%;
        height: 83px;
        padding: 8px 0 10px 6px;
        margin-top: 14px;
        .header {
          margin-top: -6px;
          @include flex(space-between, center, row);
          font-size: 14px;
          font-family: OPPOSans;
          font-weight: 400;
          color: #ffffff;
          .title {
            width: 39%;
            margin-left: 2%;
            @include text-overflow;
            @include flex(flex-start, center, row);
            img {
              margin-right: 10px;
              width: 34px;
              height: 24px;
            }
          }
          .type {
            margin-left: 2%;
            color: rgba(255, 255, 255, 0.5);
          }
          .sub-title {
            font-size: 14px;
            font-family: OPPOSans;
            font-weight: 400;
            color: #cbe3fd;

            padding-right: 6px;
          }
          .department {
            width: 11%;
            font-size: 12px;
            font-family: OPPOSans;
            font-weight: 400;
            @include flex(flex-start, center, row);
            font-size: 12px;
            font-family: OPPOSans;
            font-weight: 400;
            color: #39d56c;

            .sub-title {
              width: 8px;
              height: 8px;
              background: #39d56c;
              border-radius: 50%;
              display: block;
              margin-right: 6px;
            }
            &.red {
              .sub-title {
                background: #ff5f5f;
              }
              color: #ff5f5f;
            }
          }
        }
        .children {
          @include flex(flex-start, center, row);
          margin-top: 16px;

          .children-item {
            @include flex(center, center, column);
            width: 33%;
            text-align: center;
            border-right: 1px solid rgba(84, 107, 132, 1);
            height: 34px;
            .value {
              font-size: 18px;
              font-family: DINPro;
              font-weight: 500;
              color: #ffffff;
              width: 80%;
              @include text-overflow;
              margin-top: -10px;
            }
            .children-title {
              margin-top: 6px;
              font-size: 14px;
              font-family: OPPOSans;
              font-weight: 400;
              color: #cbe3fd;
            }
          }
          :last-child {
            border-right: 1px solid transparent;
          }
        }
      }
    }
    .page {
      margin-top: 6px;
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

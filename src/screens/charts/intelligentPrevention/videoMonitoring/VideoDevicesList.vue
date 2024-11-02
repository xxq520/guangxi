<!--
 * @Description: 设备列表
 * @Author: xiexiangquan
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { useAppStore } from '@/store';
import { flyToTwin } from '@/utils/thingjsx';
const store = useAppStore();
import { IntelligentPreventionStore } from '@/store/intelligentPrevention';
import { getCurrentTwins } from '@/utils/common';
const intelligentPrevention = IntelligentPreventionStore();

// 当前页
const currentPage = ref(1);

const dataList = computed(() => {
  currentPage.value = 1;
  return getCurrentTwins(intelligentPrevention?.videoMonitoring?.videoDevicesList || {}) || [];
});

/** 筛选之后的数据 */
const deviceList = ref<any>(dataList.value);

watch(dataList, () => {
  deviceList.value = dataList.value;
});

// 每页条数
const pageSize = ref(5);
// 总条数
const totalPage = computed(() => deviceList.value.length);
// 关键字
const keyword = ref('');

// 当前页设备列表
const currentDeviceList = computed(() => {
  return (
    deviceList.value?.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    ) || []
  );
});

/** 当页数据处理 */
const toggle = (page: number) => (currentPage.value = page);

/** 过滤数据-关键字 */
const filterData = () => {
  deviceList.value = dataList.value?.filter((item) => item.name.includes(keyword.value));
};

// 搜索时重置分页
watch(
  () => keyword.value,
  () => (currentPage.value = 1)
);
</script>

<template>
  <div class="doctor-patient-analysis">
    <card-module title="设备列表">
      <div class="filter-input-box">
        <input
          type="text"
          class="filter-input"
          v-model="keyword"
          @keyup="filterData"
          placeholder="请输入搜索内容"
        />
        <div class="filter-btn" @click="filterData">
          <img src="@/assets/img/energy/search-icon.png" alt="" />
          搜索
        </div>
      </div>

      <div class="device-list">
        <div class="device-row" v-for="item in currentDeviceList" :key="item.name">
          <div class="device-item">
            <div class="device-name" v-title-show="1">{{ item.name }}</div>
          </div>

          <div class="device-item">
            <img
              @click="flyToTwin('#' + item.twin)"
              class="device-location-icon"
              src="@/assets/img/energy/device-location-icon.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="pagenation-box">
        <page-toggle
          @toggle="toggle"
          :currentPage="currentPage"
          :total="totalPage"
          :pageNum="pageSize"
        />
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  height: 232px;
  width: 420px;
  pointer-events: all;

  .filter-input-box {
    margin-top: 8px;
    display: flex;
    align-items: center;

    .filter-input {
      height: 27px;
      width: 320px;
      border: 1px solid rgba(153, 191, 255, 0.3);
      outline: none;
      background: transparent;
      padding-left: 10px;
      font-size: 12px;
      font-family: OPPOSans;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.5);

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    .filter-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 66px;
      height: 27px;
      line-height: 27px;
      background: url('@/assets/img/energy/search-btn.png');
      background-size: cover;
      background-repeat: no-repeat;
      font-size: 12px;
      font-family: OPPOSans;
      font-weight: 500;
      color: #ffffff;
      margin-left: 10px;
      cursor: pointer;

      img {
        margin-right: 5px;
      }
    }
  }

  .device-list {
    height: 380px;
  }

  .device-row {
    width: 412px;
    height: 59px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: url(@/assets/img/intelligent-prevention/device-list-bg.png) no-repeat;
    background-size: contain;

    .device-name {
      @include text-overflow;
      padding-left: 16px;
      box-sizing: border-box;
      max-width: 233px;
      font-size: 16px;
      font-family: OPPOSans;
      font-weight: 400;
      color: #ffffff;
      text-align: left;
    }

    .device-item {
      display: flex;
      flex-direction: column;

      .device-location-icon {
        width: 38px;
        height: 28px;
        margin-right: 6px;
        cursor: pointer;
      }
    }
  }

  .pagenation-box {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>

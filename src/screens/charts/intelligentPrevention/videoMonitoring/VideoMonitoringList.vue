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

type VideoItem = { name: string; url: string };

// 当前页
const currentPage = ref(1);

const dataList = computed(() => {
  currentPage.value = 1;
  return getCurrentTwins(intelligentPrevention?.videoMonitoring?.videoMonitoringList || {}) || {};
});

const showModal = ref(false);
const currentVideo = ref({
  name: '',
  url: '',
});

// 每页条数
const pageSize = ref(4);
// 总条数
const totalPage = computed(() => dataList.value.length);

// 当前页监控列表
const videoList = computed(() => {
  return (
    dataList.value?.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    ) || []
  );
});

/** 当页数据处理 */
const toggle = (page: number) => (currentPage.value = page);

const openModal = (video: VideoItem) => {
  currentVideo.value = video;
  showModal.value = true;
};
</script>

<template>
  <div class="doctor-patient-analysis">
    <div class="video-list">
      <div class="video-item" v-for="item in videoList" :key="item.name">
        <div class="video-item-header">
          <div class="video-item-name">{{ item.name }}</div>
          <div class="video-item-operator">
            <img
              @click="flyToTwin(item.twin)"
              src="@/assets/img/intelligent-prevention/location-icon.png"
            />
            <img
              @click="openModal(item)"
              src="@/assets/img/intelligent-prevention/fullscreen-icon.png"
            />
          </div>
        </div>

        <div class="video-item-body">
          <iframe :src="item.url" />
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
  </div>

  <video-monitoring-modal v-model="showModal" :url="currentVideo.url" :title="currentVideo.name" />
</template>

<style lang="scss" scoped>
.doctor-patient-analysis {
  width: 400px;
  pointer-events: all;
  position: relative;

  .video-list {
    height: 965px;

    .video-item {
      width: 401px;
      height: 228px;
      padding: 6px;
      box-sizing: border-box;
      margin-bottom: 8px;
      background: url('@/assets/img/intelligent-prevention/video-bg.png') no-repeat;
      background-size: contain;

      .video-item-header {
        display: flex;
        align-items: center;
        height: 27px;
        font-size: 14px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #ffffff;

        .video-item-name {
          flex: 1;
          padding-left: 5px;
        }

        .video-item-operator {
          padding-right: 10px;

          img {
            margin-left: 18px;
            cursor: pointer;
          }
        }
      }

      .video-item-body {
        height: 188px;

        iframe {
          height: 100%;
          width: 100%;
          border: 0;
        }
      }
    }
  }

  .pagenation-box {
    position: absolute;
    left: -6px;
    bottom: 0px;
  }
}
</style>

<script lang="ts" setup>
import type { ComposeOption } from 'echarts';
import type { GaugeSeriesOption } from 'echarts/charts';
import { useTimeoutFn, useWindowSize } from '@vueuse/core';
import { useAppStore } from '@/store/index';
const store = useAppStore();

const { width } = useWindowSize();
const isMounted = ref(false);
const percent = computed(() => store.loadingProgress);
store.setShowLoading(true);

const eChartsOption = computed(() => {
  const radius = (188.5 / 1920) * width.value;
  if (percent.value >= 100) {
    store.setShowLoading(false);
  }
  const eChartsOption: ComposeOption<GaugeSeriesOption> = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        radius: radius,
        center: ['50%', '50%'],
        progress: {
          show: true,
          overlap: false,
          roundCap: false,
          clip: true,
          itemStyle: {
            color: 'rgba(28, 158, 255, 0.30)',
            borderWidth: 2,
            borderColor: 'rgba(28, 158, 255, 1)',
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 20,
            color: [[1, 'rgba(75, 175, 249, 0.30)']],
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: [
          {
            value: percent.value,
          },
        ],
        title: {
          show: false,
        },
        detail: {
          show: false,
        },
      },
    ],
  };
  return eChartsOption;
});

useTimeoutFn(() => {
  isMounted.value = true;
}, 100);
</script>

<template>
  <Teleport to="body">
    <div class="page-loading">
      <div class="page-loading-circle">
        <base-chart class="loading-circle" :option="eChartsOption" v-if="isMounted" />
        <div class="loading-percent">
          <div class="loading-name">加载中</div>
          <div class="loading-value">{{ percent }}<span>%</span></div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.page-loading {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99999;
  background: url('@/assets/img/background/login/login-bg.png') center top no-repeat;
  background-size: cover;
  pointer-events: all;

  .page-loading-circle {
    position: relative;
    width: 405px;
    height: 405px;
    margin: 0 auto;
    margin-top: 291px;
    border: 1px solid rgba(75, 175, 249, 0.2);
    border-radius: 50%;

    .loading-circle {
      width: 100%;
      height: 100%;
    }

    .loading-percent {
      position: absolute;
      top: 142px;
      left: 0;
      width: 100%;
      text-align: center;

      .loading-name {
        font-size: 20px;
        font-family: OPPOSans;
        font-weight: 500;
        color: #ecf7fe;
      }

      .loading-value {
        font-size: 60px;
        font-family: OPPOSans;
        font-weight: 500;
        color: #ecf7fe;
        margin-top: 26px;

        span {
          font-size: 20px;
        }
      }
    }
  }
}
</style>

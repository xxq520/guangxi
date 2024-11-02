<!--
 * @Description: 能效成本
 * @Author: xiaojun.xiong
 * @Date: 2023-08-28 10:59:11
 * @LastEditTime: 2023-08-28 10:59:11
-->

<script lang="ts" setup>
import { hexToRgba } from '@/utils/common';
import { computeToRealSize } from '@/utils/tool';
import type { ComposeOption } from 'echarts';
import type { LineSeriesOption } from 'echarts/charts';
import { overviewHospitalStore } from '@/store/overviewHospital';
import { useTimeoutFn } from '@vueuse/core';

const overviewHospital = overviewHospitalStore();

const colorList = ['#4BAFF9', '#F9DA4B', '#4BF3F9', '#A3D8FF'];

const data = computed(() => overviewHospital.data.energyEfficiencyCost || []);

const eChartsOption = computed(() => {
  let charts: any = [];
  data.value?.map((item) => {
    const list = [
      { name: '去年', data: item.yAxisPrev },
      { name: '今年', data: item.yAxis },
    ];
    let max = Math.max(...[...list[0].data, ...list[1].data]);
    max = max + max / 5;
    const series: LineSeriesOption[] = list.map((item, idx) => {
      return {
        name: `${item.name}`,
        type: 'line',
        showSymbol: false,
        smooth: true,
        // areaStyle: {
        //   color: {
        //     type: 'linear',
        //     x: 0,
        //     y: 0,
        //     x2: 0,
        //     y2: 1,
        //     colorStops: [
        //       {
        //         offset: 0,
        //         color: hexToRgba(colorList[idx], 0.2),
        //       },
        //       {
        //         offset: 1,
        //         color: hexToRgba(colorList[idx], 0),
        //       },
        //     ],
        //     global: false,
        //   },
        // },
        label: {
          show: false,
        },
        itemStyle: {
          color: colorList[idx],
          borderWidth: 1,
        },
        data: item.data,
      };
    });

    const eChartsOption: ComposeOption<LineSeriesOption> = {
      // backgroundColor: 'red',
      tooltip: {
        showContent: true,
        trigger: 'axis',
        backgroundColor: 'rgba(15, 25, 39, 0.8)',
        borderColor: 'rgba(145, 161, 180, 0.8)',
        textStyle: {
          color: '#fff',
        },
      },
      legend: {
        show: true,
        // icon: 'rect',
        top: 0,
        // right: computeToRealSize(100),
        itemGap: 40,
        itemWidth: 12,
        itemHeight: 4,
        textStyle: {
          color: '#fff',
          fontSize: 12,
          fontFamily: 'OPPOSans',
          fontWeight: 400,
          padding: [0, 0, 0, 0],
        },
      },
      grid: {
        top: '22%',
        left: '1.5%',
        right: '0%',
        bottom: '16%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: item.xAxis,
        axisLabel: {
          fontSize: computeToRealSize(11),
          padding: [0, 0, 0, 0],
          fontFamily: 'DINPro',
          color: 'rgba(123, 157, 190, 1)',
          interval: 0, //代表显示所有x轴标签显示
        },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      yAxis: {
        type: 'value',
        name: '',
        // nameGap: 30,
        interval: Math.ceil(max / 3),
        axisLabel: {
          padding: [0, 0, 0, 0],
          fontSize: 14,
          fontFamily: 'DINPro',
          color: 'rgba(123, 157, 190, 1)',
        },
        splitLine: {
          lineStyle: {
            width: 1,
            color: 'rgba(123, 157, 190, 0.3)',
          },
        },
      },
      series,
    };
    charts.push(eChartsOption);
  });

  return charts;
});
</script>

<template>
  <div class="personnel-statistics">
    <card-module title="能效成本">
      <div class="item" v-for="(item, index) in data" :key="index">
        <div class="header">
          <p class="title">{{ item.title }}</p>
          <p class="value">
            <span v-num-rolling="item.value || 0"></span>
            <span class="unit">{{ item.unit }}</span>
          </p>
          <p class="percentage">
            <rate-number :other="true" type="increase" :value="item.percentage" />
          </p>
        </div>
        <div class="chart-unit">{{ item.chartUnit }}</div>
        <base-chart class="chart" :option="eChartsOption[index]" />
      </div>
    </card-module>
  </div>
</template>

<style lang="scss" scoped>
.personnel-statistics {
  height: 430px;
  width: 410px;
  pointer-events: all;
  .item {
    margin-top: 16px;
    position: relative;
    .chart-unit {
      position: absolute;
      left: 4px;
      top: 24px;
      font-size: 14px;
    }
    .header {
      @include flex(space-between, flex-end, row);
      position: relative;
      .title {
        font-size: 16px;
        font-family: OPPOSans;
        font-weight: 400;
        color: #ffffff;
      }
      .value {
        position: absolute;
        right: 20%;
        font-size: 20px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        .unit {
          font-size: 12px;
        }
      }
      .percentage {
      }
    }
    .chart {
      margin-top: 4px;
      width: 100%;
      height: 100px;
      background: rgba(54, 82, 123, 0.3);
    }
  }
}
</style>

<script lang="ts" setup>
import 'echarts-gl';
import * as echarts from 'echarts';
import { kMaxLength } from 'buffer';

/** 图表所需数据 */
const props = defineProps<{
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  grid3D?: {
    boxWidth?: number;
    boxHeight?: number;
    boxDepth?: number;
  };
}>();

const emits = defineEmits(['chartMouseover']);
/** 声明全局echart对象 */
let chart: any;
/** 图表的容器 */
const chartDom = ref<HTMLElement>();
/** 图表的options */
const options = {
  xAxis3D: {
    min: -0.8,
    max: 0.8,
  },
  yAxis3D: {
    min: -0.8,
    max: 0.8,
  },
  zAxis3D: {
    min: -1,
    max: 1,
  },
  grid3D: {
    show: false,
    boxWidth: props.grid3D?.boxWidth || 125,
    boxHeight: 40,
    // boxHeight: props.grid3D?.boxHeight || 10, // 三维笛卡尔坐标系在三维场景中的高度
    boxDepth: props.grid3D?.boxDepth || 80,
    // boxDepth: props.grid3D?.boxDepth || 165,
    left: 0,
    right: 0,
    top: 0,
    viewControl: {
      projection: 'orthographic', // 投影方式 透视投影'perspective' 正交投影'orthographic'
      orthographicSize: 270,
      alpha: 30, // 视角 绕x轴
      // alpha: 30, // 视角 绕x轴
      beta: 0, // 视角 绕y轴
      // beta: 20, // 视角 绕y轴
      center: [0, 0, 0], // 调整视角中心点距离
      distance: 150, // 调整视角到主体的距离，类似调整zoom
      rotateSensitivity: 0, // 设置为0无法旋转
      zoomSensitivity: 0, // 设置为0无法缩放
      panSensitivity: 0, // 设置为0无法平移
      autoRotate: false, // 自动旋转
    },
    environment: 'none',
    light: {
      main: {
        intensity: 0.3,
        shadow: false,
        alpha: 50,
        beta: 90,
      },
      ambient: {
        color: '#f3f3f3',
        intensity: 0.15,
      },
    },
    postEffect: {
      enable: true,
      bloom: {
        enable: true,
        bloomIntensity: 1,
      },
      SSAO: {
        enable: true,
        quality: 'high',
        radius: 2,
        intensity: 0.3,
      },
      FXAA: {
        enable: true,
      },
    },
  },
  series: [],
};

/**
 * @description: 计算图表每一瓣的样式
 * @param {*} startRatio 起始点
 * @param {*} endRatio 终点
 * @param {*} isSelected 是否被选择
 * @param {*} isHovered 是否鼠标移入
 * @param {*} k 比率
 * @param {*} h 高度
 * @return {*}
 */
const getParametricEquation = (
  startRatio: number,
  endRatio: number,
  isSelected: boolean,
  isHovered: boolean,
  k: number,
  h: number
) => {
  // 计算
  const midRatio = (startRatio + endRatio) / 2;
  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;
  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) isSelected = false;
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = 0.3;
  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.02 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1;
  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },
    x(u: any, v: any) {
      if (u < startRadian)
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;

      if (u > endRadian) return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;

      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y(u: any, v: any) {
      if (u < startRadian)
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;

      if (u > endRadian) return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;

      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z(u: any, v: any) {
      if (u < -Math.PI * 0.5) return Math.sin(u);

      if (u > Math.PI * 2.5) return Math.sin(u) * h * 0.1;

      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
};

/**
 * @description: 构建图表所需的options
 * @param {*} pieData 图表的驱动数据
 * @param {*} internalDiameterRatio 透明空心占比
 * @return {*}
 */
const getPie3D = (pieData: any[], internalDiameterRatio: any) => {
  const series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const legendData = [];
  const k =
    typeof internalDiameterRatio !== 'undefined'
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;
  // const parameter = 1 - internalDiameterRatio;
  // const k = 1 - internalDiameterRatio;
  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i += 1) {
    sumValue += Number(pieData[i].value);
    const seriesItem = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true, // 是否绘制曲面
      wireframe: {
        show: false, // 是否开启网格线
      },
      pieData: pieData[i],
      pieStatus: {
        selected: true,
        hovered: true,
        // ratio: parameter,
        k,
      },
      itemStyle: {
        color: pieData[i].color,
      },
      parametricEquation: {},
    };

    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i += 1) {
    endValue = startValue + Number(series[i].pieData.value);
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    const percentag = Number(series[i].pieData.value / sumValue) * 70;
    console.log(percentag, 996633);
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      true,
      true,
      k,
      percentag
    );
    startValue = endValue;
    legendData.push(series[i].name);
  }
  return series;
};

/**
 * @description: hover时图表参数调整
 * @param {*} resetHover
 * @param {*} hight
 * @param {*} index
 * @return {*}
 */
const resetPieStatus = (resetHover: boolean, hight: number, index: number) => {
  const tempSeries: any = options.series[index] as any;
  if (tempSeries) {
    (options.series[index] as any).parametricEquation = getParametricEquation(
      tempSeries.pieData.startRatio,
      tempSeries.pieData.endRatio,
      tempSeries.pieStatus.selected,
      resetHover,
      tempSeries.pieStatus.ratio,
      hight
    ) as any;
    (options.series[index] as any).pieStatus.hovered = resetHover;
  }
};

/**
 * @description: 注册图表事件
 * @param {*} chart echarts实例
 * @return {*}
 */
const bindChart = (chart: echarts.ECharts) => {
  let hoverIndex = -1;
  chart &&
    chart.on('mouseover', (params) => {
      if (hoverIndex !== params.seriesIndex) {
        // if (hoverIndex === -1) {
        //   // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
        //   resetPieStatus(true, 20, params.seriesIndex as number);
        //   // 记录上次高亮的扇形对应的系列号 seriesIndex
        //   hoverIndex = params.seriesIndex as number;
        // }
        // emits('chartMouseover', { selected: params.seriesName as string });
        // chart.setOption(options);
      }
    });
  // globalout事件下面的mouseout 事件却一不可
  chart &&
    chart.on('globalout', (params) => {
      if (hoverIndex !== params.seriesIndex) {
        if (hoverIndex !== -1) {
          resetPieStatus(false, 10, hoverIndex);
          hoverIndex = -1;
        }
        emits('chartMouseover', { selected: props.data[0].name });
        chart.setOption(options);
      }
    });
  // 需要针对mouseout事件进行声明
  chart &&
    chart.on('mouseout', (params) => {
      if (hoverIndex !== (params.seriesIndex as number)) {
        if (hoverIndex !== -1) {
          resetPieStatus(false, 10, hoverIndex);
          hoverIndex = -1;
        }
        emits('chartMouseover', { selected: props.data[0].name });
        chart.setOption(options);
      }
    });
};

/**
 * @description: 绘制图表
 * @param {*} data 图表的驱动数据
 * @return {*}
 */
const drawChart = (data: any) => {
  const series = getPie3D(data, 0.5);
  options.series = series as any;
  nextTick(() => {
    if (!chart) {
      chart = echarts.init(chartDom.value as HTMLElement);
      bindChart(chart);
    }
    chart && chart.setOption(options);
  });
};

// 挂载的时候创建。
onMounted(() => {
  if (props.data) drawChart(props.data);
});

onUnmounted(() => {
  chart?.dispose();
  chart = null;
});

// 监听数据变化更新数据
watch(
  () => props.data,
  (newV) => {
    drawChart(newV);
  },
  { deep: true }
);
</script>

<template>
  <div ref="chartDom" class="pie-chart" />
</template>

<style scoped lang="scss">
.pie-chart {
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss">
.pie-chart {
  canvas {
    // background-image: url('@/assets/images/industrial-brain/level2/donutBg.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 0% 100%;
  }
}
</style>

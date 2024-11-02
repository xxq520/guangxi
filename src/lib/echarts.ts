import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  PictorialBarChart,
  CustomChart,
  RadarChart
} from 'echarts/charts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  GraphicComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

/** 图表容器初始化配置 */
interface EChartsInitOpts {
  /** 图表宽度 */
  width?: number;
  /** 图表高度 */
  height?: number;
  [k: string]: any;
}

// 注册必须的组件
echarts.use([
  CustomChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  GraphicComponent,
  LegendComponent,

  LabelLayout,
  UniversalTransition,
  CanvasRenderer,

  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  PictorialBarChart,
  RadarChart
]);

export { echarts, EChartsInitOpts };

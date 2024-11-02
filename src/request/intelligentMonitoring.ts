/**
 * 智慧监测主题图表数据
 */
export interface IntelligentMonitoring {
  /**
   * 空气质量趋势(门诊楼)
   */
  airQualityTrends: AirQualityTrends;
  /**
   * 设备统计
   */
  equipmentStatistics: EquipmentStatistics;
  /**
   * 设备列表
   */
  intelligentDevicesList: IntelligentDevicesList[];
  /**
   * 实时空气质量(门诊楼)
   */
  realTimeAirQuality: RealTimeAirQuality[];
  /**
   * 实时水位
   */
  realTimeWaterLevel: RealTimeWaterLevel[];
  [property: string]: any;
}

/**
 * 空气质量趋势(门诊楼)
 */
export interface AirQualityTrends {
  /**
   * y轴数据列表
   */
  dataList: DataList[];
  /**
   * x轴月份时间
   */
  date: string[];
  [property: string]: any;
}

export interface DataList {
  /**
   * 图表数据
   */
  data: number[];
  /**
   * 数据标题类型
   */
  name: string;
  [property: string]: any;
}

/**
 * 设备统计
 */
export interface EquipmentStatistics {
  /**
   * 数据列表
   */
  children: EquipmentStatisticsChild[];
  /**
   * 标题
   */
  title: string;
  /**
   * 数值
   */
  value: number;
  [property: string]: any;
}

export interface EquipmentStatisticsChild {
  /**
   * 占比
   */
  percentage: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 数值
   */
  value: number;
  [property: string]: any;
}

export interface IntelligentDevicesList {
  /**
   * 数据列表
   */
  children: IntelligentDevicesListChild[];
  /**
   * 内涝监测/空气监测
   */
  title: string;
  [property: string]: any;
}

export interface IntelligentDevicesListChild {
  /**
   * 明细指标
   */
  detail: Detail[];
  /**
   * 设备名称
   */
  name: string;
  /**
   * 状态
   */
  status: string;
  /**
   * 时间
   */
  time: string;
  /**
   * 孪生体编码
   */
  twin: string;
  [property: string]: any;
}

export interface Detail {
  /**
   * 标题
   */
  title: string;
  /**
   * 数值
   */
  value: number;
  [property: string]: any;
}

export interface RealTimeAirQuality {
  /**
   * 明细指标
   */
  children: RealTimeAirQualityChild[];
  /**
   * 楼层标题
   */
  title: string;
  [property: string]: any;
}

export interface RealTimeAirQualityChild {
  /**
   * 标题
   */
  title: string;
  /**
   * 数值
   */
  value: number;
  [property: string]: any;
}

export interface RealTimeWaterLevel {
  /**
   * 是否超标(是、否)
   */
  exceeding: string;
  /**
   * 位置
   */
  position: string;
  /**
   * 水位
   */
  waterLevel: string;
  [property: string]: any;
}

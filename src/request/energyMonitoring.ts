/**
 * 能耗监测主题图表数据
 */

export interface EnergyMonitoring {
  /**
   * 空调温度趋势
   */
  airTemperatureTrend: AirTemperatureTrend;
  /**
   * 设备列表
   */
  devicesList: Array<DevicesList>;
  /**
   * 能耗对比
   */
  energyConsumption: EnergyConsumption;
  /**
   * 能耗类型统计
   */
  energyConsumptionType: EnergyConsumptionType[];
  /**
   * 能耗类型统计（空调）
   */
  energyTypeAir: EnergyTypeAir;
  /**
   * 总能效统计
   */
  totalEnergyStatistics: TotalEnergyStatistic[];
  /**
   * 使用趋势
   */
  usageTrends: UsageTrends;
}

/**
 * 空调温度趋势
 */
export interface AirTemperatureTrend {
  /**
   * 数据
   */
  dataList: number[];
  /**
   * x轴的月份
   */
  date: string[];
}

export interface DevicesList {
  /**
   * 明细指标
   */
  detail?: Detail[];
  /**
   * 名称标题
   */
  name?: string;
  /**
   * 状态
   */
  status?: string;
  /**
   * 时间
   */
  time?: string;
  /**
   * 孪生体编码
   */
  twin?: string;
}

export interface Detail {
  /**
   * 标题
   */
  title: string;
  /**
   * 数值
   */
  value: string;
}

/**
 * 能耗对比
 */
export interface EnergyConsumption {
  /**
   * 降低较多
   */
  decreased: Decreased[];
  /**
   * 增长较多
   */
  increased: Increased[];
  /**
   * 能耗较多
   */
  used: Used[];
}

export interface Decreased {
  /**
   * 楼层名称
   */
  name: string;
  /**
   * 环比
   */
  rate: number;
  /**
   * 单位
   */
  unit: string;
  /**
   * 数值
   */
  value: number;
}

export interface Increased {
  /**
   * 楼层名称
   */
  name: string;
  /**
   * 环比
   */
  rate: number;
  /**
   * 单位
   */
  unit: string;
  /**
   * 数值
   */
  value: number;
}

export interface Used {
  /**
   * 楼层名称
   */
  name: string;
  /**
   * 环比
   */
  rate: number;
  /**
   * 单位
   */
  unit: string;
  /**
   * 数值
   */
  value: number;
}

export interface EnergyConsumptionType {
  energy: string;
  percentage: string;
  type: string;
  useNum: number;
}

/**
 * 能耗类型统计（空调）
 */
export interface EnergyTypeAir {
  /**
   * 标题
   */
  title: string;
  /**
   * 数量
   */
  value: number;
}

export interface TotalEnergyStatistic {
  /**
   * 第一季度、第二季度...
   */
  name: string;
  /**
   * 环比
   */
  rate: number;
  /**
   * 单位
   */
  unit: string;
  /**
   * 数值
   */
  value: number;
}

/**
 * 使用趋势
 */
export interface UsageTrends {
  /** 图表单位 */
  chartUnit: string;
  /**
   * 数据列表
   */
  dataList: DataList[];
  /**
   * x轴的月份时间
   */
  date: string[];
}

export interface DataList {
  /**
   * 数据
   */
  data: number[];
  /**
   * 去年、今年
   */
  name: string;
}

/**
 * 实时告警数据的刷新
 */
export interface AlarmData {
  /**
   * 告警总数、紧急、常规
   */
  alarmList: AlarmList[];
  /**
   * 告警状态的统计
   */
  alarmStatus: AlarmStatus[];
  /**
   * 告警具体的信息列表
   */
  data: Datum[];
}

export interface AlarmList {
  /**
   * 告警总数、紧急、常规
   */
  name: string;
  /**
   * 告警类型的总数数量
   */
  value: number;
}

export interface AlarmStatus {
  /**
   * 已处理、未处理、处理率
   */
  name: string;
  /**
   * 数值
   */
  value: number;
}

export interface Datum {
  /**
   * 告警时间
   */
  date: string;
  /**
   * 告警的描述
   */
  description: string;
  /**
   * 告警设备的名称
   */
  deviceName: string;
  /**
   * 告警的级别
   */
  level: string;
  /**
   * 告警的孪生体编号
   */
  twin: string;
}

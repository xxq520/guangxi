/**
 * 智慧防控
 */
export interface IntelligentPrevention {}

/** 门禁系统 */
export interface AccessControlSystem {
  /**
   * 类别占比
   */
  categoryRate: CategoryRate[];
  /**
   * 设备列表
   */
  devicesList: DevicesList[];
  /**
   * 设备统计
   */
  equipmentStatistics: EquipmentStatistic[];
  /**
   * 通行统计
   */
  trafficStatistics: TrafficStatistic[];
  /**
   * 通行趋势
   */
  trafficTrend: TrafficTrend;
  [property: string]: any;
}

export interface CategoryRate {
  /**
   * 类别名称
   */
  name: string;
  /**
   * 数值
   */
  value: number;
  [property: string]: any;
}

export interface DevicesList {
  /**
   * 标题
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

export interface EquipmentStatistic {
  /**
   * 标题名称
   */
  name: string;
  /**
   * 占比
   */
  percent: number;
  /**
   * 数值
   */
  value: number;
  [property: string]: any;
}

export interface TrafficStatistic {
  /**
   * 上月通行人员
   */
  monthPerson: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 环比
   */
  ringRatio: number;
  /**
   * 年度通行人员
   */
  yearPerson: number;
  /**
   * 同比
   */
  yearRatio: number;
  [property: string]: any;
}

/**
 * 通行趋势
 */
export interface TrafficTrend {
  /**
   * 图表单位
   */
  chartUnit: string;
  /**
   * 数据列表
   */
  dataList: AccessDataList[];
  /**
   * x轴的时间
   */
  date: string[];
  [property: string]: any;
}

export interface AccessDataList {
  /**
   * 类别对应的数据
   */
  data: number[];
  /**
   * 类别名称
   */
  name: string;
  [property: string]: any;
}

/** 视频监控 */
export interface VideoMonitoring {
  /**
   * 设备列表
   */
  videoDevicesList: VideoDevicesList[];
  /**
   * 设备统计
   */
  videoDevicesStatistics: VideoDevicesStatistics;
  /**
   * 视频列表
   */
  videoMonitoringList: VideoMonitoringList[];
  [property: string]: any;
}

export interface VideoDevicesList {
  /**
   * 设备名称
   */
  name: string;
  /**
   * 孪生体编码
   */
  twin: string;
  [property: string]: any;
}

/**
 * 设备统计
 */
export interface VideoDevicesStatistics {
  /**
   * 表格数据
   */
  children: Child[];
  /**
   * 总数
   */
  total: number;
  [property: string]: any;
}

export interface Child {
  /**
   * 楼栋
   */
  building: string;
  /**
   * 已接入数
   */
  connected: number;
  /**
   * 占比
   */
  percentage: string;
  /**
   * 总数
   */
  total: number;
  [property: string]: any;
}

export interface VideoMonitoringList {
  /**
   * 视频名称
   */
  name: string;
  /**
   * 孪生体编码
   */
  twin: string;
  /**
   * 监控画面地址
   */
  url: string;
  [property: string]: any;
}

/** 消防系统 */
export interface FireProtectionSystem {}

/** 巡更系统 */
export interface PatrolSystem {}

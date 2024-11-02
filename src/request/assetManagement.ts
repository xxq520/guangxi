/**
 * 资产管理主题图表数据
 */
export interface AssetManagement {
  /**
   * 资产统计
   */
  assetStatistics: AssetStatistics;
  /**
   * 每日盘点
   */
  dailyInventory: DailyInventory[];
  /**
   * 设备列表
   */
  devicesList: DevicesList[];
  /**
   * 设备类型排行
   */
  deviceTypeRanking: DeviceTypeRanking[];
  /**
   * 单设备排行
   */
  singleDeviceRanking: SingleDeviceRanking[];
}

/**
 * 资产统计
 */
export interface AssetStatistics {
  children: AssetStatisticsChild[];
  /**
   * 设备总数
   */
  total: number;
}

export interface AssetStatisticsChild {
  /**
   * 能效占比
   */
  energyEfficiency: number;
  /**
   * 占比
   */
  energyPercentage: string;
  /**
   * 数量
   */
  num: number;
  /**
   * 定位标签
   */
  positon: string;
  /**
   * 占比
   */
  posPercentage: string;
  /**
   * 设备类型
   */
  type: string;
}

export interface DailyInventory {
  /**
   * 已盘点、未盘点
   */
  name: string;
  /**
   * 数值
   */
  value: number;
}

export interface DeviceTypeRanking {
  children: DeviceTypeRankingChild[];
  /**
   * 热门、冷门
   */
  title: string;
}

export interface DeviceTypeRankingChild {
  /**
   * 设备类型
   */
  type: string;
  /**
   * 使用次数
   */
  useNum: number;
  /**
   * 使用率
   */
  usePercentage: string;
  /**
   * 使用时长
   */
  useTime: string;
}

export interface DevicesList {
  /**
   * 编码
   */
  code: string;
  /**
   * 所属组织
   */
  organization: string;
  /**
   * 状态
   */
  status: string;
  /**
   * 时间
   */
  time: string;
  /**
   * 设备名称
   */
  title: string;
  /**
   * 孪生体编号
   */
  twin: string;
  /**
   * 设备类型
   */
  type: string;
}

export interface SingleDeviceRanking {
  children: SingleDeviceRankingChild[];
  /**
   * 热门、冷门
   */
  title: string;
}

export interface SingleDeviceRankingChild {
  /**
   * 科室
   */
  department: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 类型
   */
  type: string;
  /**
   * 使用次数
   */
  useNum: number;
  /**
   * 使用率
   */
  usePercentage: string;
  /**
   * 使用时长
   */
  useTime: number;
}

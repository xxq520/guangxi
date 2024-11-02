/**
 * 社区管理主题图表数据
 */
export interface Home {
  /**
   * 院内总资产统计
   */
  assetStatistics: AssetStatistic[];
  /**
   * 医患质量分析
   */
  doctorPatientAnalysis: DoctorPatientAnalysis;
  /**
   * 能效成本
   */
  energyEfficiencyCost: EnergyEfficiencyCost[];
  /**
   * 智能化设备概况
   */
  overviewIntelligentDevices: OverviewIntelligentDevice[];
  /**
   * 患者流量统计
   */
  patientTraffic: PatientTraffic;
  /**
   * 人员分时段统计
   */
  personnelStatistics: PersonnelStatistics;
  /**
   * 顶部指标
   */
  topMedicalOverview: TopMedicalOverview[];
  /**
   * 年度收入
   */
  yearIncome: YearIncome;
}

export interface AssetStatistic {
  /**
   * 名称
   */
  name: string;
  /**
   * 数值
   */
  value: number;
}

/**
 * 医患质量分析
 */
export interface DoctorPatientAnalysis {
  /**
   * 医生总数
   */
  doctor: number;
  /**
   * 每一年的数据
   */
  list: DoctorPatientAnalysisList[];
  /**
   * 护士总数
   */
  nurse: number;
}

export interface DoctorPatientAnalysisList {
  /**
   * 床护比
   */
  chuangHu: string;
  /**
   * 时间
   */
  date: string;
  /**
   * 护患比
   */
  huHuan: string;
  /**
   * 医护比
   */
  yiHu: string;
  /**
   * 医患比
   */
  yiHuan: string;
}

export interface EnergyEfficiencyCost {
  /**
   * 年度用电
   */
  ndyd: number;
  /**
   * 年度用电环比
   */
  ndydRate: number;
  /**
   * 年度用水
   */
  ndys: number;
  /**
   * 年度用水环比
   */
  ndysRate: number;
  /**
   * 标题
   */
  title: string;
}

export interface OverviewIntelligentDevice {
  /**
   * 标题
   */
  title: string;
  /**
   * 数值
   */
  value: number;
}

/**
 * 患者流量统计
 */
export interface PatientTraffic {
  北院区: 北院区_Element[];
  年度总览: 年度总览;
  星湖门诊: 星湖门诊_Element[];
  桃源院区: 桃源院区_Element[];
}

export interface 北院区_Element {
  /**
   * 年度总数
   */
  ndzs: number;
  /**
   * 年环比
   */
  nhb: number;
  /**
   * 上月环比
   */
  syhb: number;
  /**
   * 上月同比
   */
  sytb: number;
  /**
   * 上月总数
   */
  syzs: number;
  /**
   * 标题
   */
  title: string;
}

export interface 年度总览 {
  /**
   * 列表数据
   */
  list: 年度总览_List[];
  /**
   * 体检数据
   */
  medicalExaminationData: MedicalExaminationDatum[];
}

export interface 年度总览_List {
  /**
   * 北院区人次
   */
  byq: number;
  /**
   * 环比
   */
  rate: number;
  /**
   * 门诊人次
   */
  title: string;
  /**
   * 总数
   */
  total: number;
  /**
   * 桃源院区人次
   */
  tyyq: number;
  /**
   * 星湖门诊人次
   */
  xhmz: number;
}

export interface MedicalExaminationDatum {
  /**
   * 环比
   */
  rate: number;
  /**
   * 体检人次
   */
  title: string;
  /**
   * 人次数量
   */
  value: number;
}

export interface 星湖门诊_Element {
  /**
   * 年度总数
   */
  ndzs: number;
  /**
   * 年环比
   */
  nhb: number;
  /**
   * 上月环比
   */
  syhb: number;
  /**
   * 上月同比
   */
  sytb: number;
  /**
   * 上月总数
   */
  syzs: number;
  /**
   * 标题
   */
  title: string;
}

export interface 桃源院区_Element {
  /**
   * 年度总数
   */
  ndzs: number;
  /**
   * 年环比
   */
  nhb: number;
  /**
   * 上月环比
   */
  syhb: number;
  /**
   * 上月同比
   */
  sytb: number;
  /**
   * 上月总数
   */
  syzs: number;
  /**
   * 标题
   */
  title: string;
}

/**
 * 人员分时段统计
 */
export interface PersonnelStatistics {
  /** 单位 */
  unit: string;
  /**
   * 数据列表
   */
  dataList: DataList[];
  /**
   * x轴时间标题
   */
  date: string[];
}

export interface DataList {
  /**
   * 数据
   */
  data: number[];
  /**
   * 名称
   */
  name: string;
}

export interface TopMedicalOverview {
  /**
   * 环比
   */
  percentage: number;
  /**
   * 标题
   */
  title: string;
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
 * 年度收入
 */
export interface YearIncome {
  体检中心: 体检中心;
  北院区: YearIncome北院区;
  星湖门诊: YearIncome星湖门诊;
  桃源院区: YearIncome桃源院区;
}

export interface 体检中心 {
  /**
   * 体验收入
   */
  tjsr: number;
  /**
   * 体验收入环比
   */
  tjsrRate: number;
}

export interface YearIncome北院区 {
  /**
   * 急诊收入
   */
  jzsr: number;
  /**
   * 急诊收入环比
   */
  jzsrRate: number;
  /**
   * 门诊收入
   */
  mzsr: number;
  /**
   * 门诊收入环比
   */
  mzsrRate: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 总收入
   */
  zsr: number;
  /**
   * 环比
   */
  zsrRate: number;
  /**
   * 住院收入
   */
  zysr: number;
  /**
   * 住院收入环比
   */
  zysrRate: number;
}

export interface YearIncome星湖门诊 {
  /**
   * 急诊收入
   */
  jzsr: number;
  /**
   * 急诊收入环比
   */
  jzsrRate: number;
  /**
   * 门诊收入
   */
  mzsr: number;
  /**
   * 门诊收入环比
   */
  mzsrRate: number;
  /**
   * 总收入
   */
  zsr: number;
  /**
   * 总收入环比
   */
  zsrRate: number;
}

export interface YearIncome桃源院区 {
  /**
   * 急诊收入
   */
  jzsr: number;
  /**
   * 急诊收入环比
   */
  jzsrRate: number;
  /**
   * 门诊收入
   */
  mzsr: number;
  /**
   * 门诊收入环比
   */
  mzsrRate: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 总收入
   */
  zsr: number;
  /**
   * 环比
   */
  zsrRate: number;
  /**
   * 住院收入
   */
  zysr: number;
  /**
   * 住院收入环比
   */
  zysrRate: number;
}

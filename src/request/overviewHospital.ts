/**
 * 院区总览主题图表数据
 */

export interface OverviewHospital {
  /**
   * 年度收入
   */
  districtYearIncome: DistrictYearIncome[];
  /**
   * 医患质量分析
   */
  doctorPatientAnalysis: DoctorPatientAnalysis;
  /**
   * 能效成本
   */
  energyEfficiencyCost: EnergyEfficiencyCost[];
  /**
   * top指标
   */
  medicalOverview: MedicalOverview[];
  /**
   * 患者流量统计
   */
  patientTrafficStatistics: PatientTrafficStatistic[];
  /**
   * 人员分时段统计
   */
  personnelStatistics: PersonnelStatistics;
}

export interface DistrictYearIncome {
  /**
   * 季度数据
   */
  children: Child[];
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
   * 收入
   */
  value: number;
}

export interface Child {
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
   * 收入
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
   * 年度数据
   */
  list: List[];
  /**
   * 护士总数
   */
  nurse: number;
}

export interface List {
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
  /** 图表单位 */
  chartUnit: string;

  /**
   * 电量
   */
  value: number;
  /**
   * x轴的月份
   */
  xAxis: string[];
  /**
   * 今年的数值
   */
  yAxis: number[];
  /**
   * 去年的数值
   */
  yAxisPrev: number[];
}

export interface MedicalOverview {
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

export interface PatientTrafficStatistic {
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
  /** 图表单位 */
  chartUnit: string;
  /**
   * 人次数量
   */
  value: number;
  /**
   * x轴的月份时间轴
   */
  xAxis: string[];
  /**
   * 今年的数值
   */
  yAxis: number[];
  /**
   * 去年的数值
   */
  yAxisPrev: number[];
}

/**
 * 人员分时段统计
 */
export interface PersonnelStatistics {
  /** 图表单位 */
  unit: string;
  /**
   * 数据列表
   */
  dataList: DataList[];
  /**
   * x轴的时间
   */
  date: string[];
}

export interface DataList {
  /**
   * 数据值
   */
  data: number[];
  /**
   * 标题
   */
  name: string;
}

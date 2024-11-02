/** 首页模拟数据 */

(function (global) {
  const time = 1000 * 60 * 10;
  global.requestMockData = {
    ...(global.requestMockData || {}),
    '/home/getPageData': {
      method: 'POST',
      proxyUrl: config.requestUrl,
      staticData: true,
      time,
      request: (query) => {
        if (query.ssdp == 'home') {
          return {
            /** 患者流量统计 */
            patientTraffic: {
              年度总览: {
                medicalExaminationData: [
                  {
                    rate: -11,
                    title: '体检人次',
                    value: 121436,
                  },
                  {
                    rate: 0,
                    title: '未完成体检人数',
                    value: 33664,
                  },
                  {
                    rate: 0,
                    title: '已完成体检人数',
                    value: 87772,
                  },
                ],
                list: [
                  {
                    total: '763225.00',
                    rate: 'NaN',
                    xhmz: '100822.00',
                    tyyq: '1665751.00',
                    byq: '93718.00',
                    title: '门诊人次',
                  },
                  {
                    total: '51351.00',
                    rate: 'NaN',
                    xhmz: '1619.00',
                    tyyq: '122216.00',
                    byq: '16351.00',
                    title: '急诊人次',
                  },
                  {
                    total: '39578.00',
                    rate: 0,
                    xhmz: '0.00',
                    tyyq: '85746.00',
                    byq: '15219.00',
                    title: '住院人次',
                  },
                ],
              },
              桃源院区: [
                {
                  sytb: '0.13',
                  syhb: '-0.15',
                  nhb: '-0.01',
                  syzs: '181857.00',
                  title: '门诊人次',
                  ndzs: '1665751.00',
                },
                {
                  sytb: '0.42',
                  syhb: '0.24',
                  nhb: '0.19',
                  syzs: '14219.00',
                  title: '急诊人次',
                  ndzs: '122216.00',
                },
                {
                  sytb: 0,
                  syhb: 0,
                  nhb: 0,
                  syzs: '8714.00',
                  title: '住院人次',
                  ndzs: '85746.00',
                },
              ],
              北院区: [
                {
                  sytb: '0.42',
                  syhb: '0.12',
                  nhb: '0.15',
                  syzs: '12181.00',
                  title: '门诊人次',
                  ndzs: '93718.00',
                },
                {
                  sytb: '0.46',
                  syhb: '0.15',
                  nhb: '0.12',
                  syzs: '1947.00',
                  title: '急诊人次',
                  ndzs: '16351.00',
                },
                {
                  sytb: 0,
                  syhb: 0,
                  nhb: 0,
                  syzs: '1644.00',
                  title: '住院人次',
                  ndzs: '15219.00',
                },
              ],
              星湖门诊: [
                {
                  sytb: '0.47',
                  syhb: '0.03',
                  nhb: '-0.06',
                  syzs: '14737.00',
                  title: '门诊人次',
                  ndzs: '100822.00',
                },
                {
                  sytb: '-0.97',
                  syhb: '1.60',
                  nhb: '-0.74',
                  syzs: '13.00',
                  title: '急诊人次',
                  ndzs: '1619.00',
                },
                {
                  sytb: 0,
                  syhb: 0,
                  nhb: 0,
                  syzs: '0.00',
                  title: '住院人次',
                  ndzs: '0.00',
                },
              ],
            },
            /** 人员分时段统计 */
            personnelStatistics: {
              unit: '人次',
              dataList: [
                {
                  name: '桃源院区',
                  data: [20, 7, 1260, 120, 789, 35, 24],
                },
                {
                  name: '北院区',
                  data: [1, 0, 105, 10, 56, 0, 0],
                },
                {
                  name: '星湖门诊',
                  data: [0, 0, 132, 4, 70, 0, 0],
                },
                /**{
                name: '体检中心',
                data: [76, 56, 66, 46, 36, 46, 86],
              },**/
              ],
              date: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '00:00'],
            },
            /** 医患质量分析 */
            doctorPatientAnalysis: {
              doctor: 1450,
              nurse: 2245,
              list: [
                {
                  date: '2023年',
                  yiHuan: '1:1205',
                  yiHu: '1:1.55',
                  huHuan: '1:778',
                  chuangHu: '1:0.7',
                },
                {
                  date: '2022年',
                  yiHuan: '1:950',
                  yiHu: '1:1.42',
                  huHuan: '1:988',
                  chuangHu: '1:0.69',
                },
                {
                  date: '2021年',
                  yiHuan: '1:420',
                  yiHu: '1:1.26',
                  huHuan: '1:437',
                  chuangHu: '1:0.56',
                },
              ],
            },
            /** 年度收入 */
            yearIncome: {
              桃源院区: {
                name: '桃源院区',
                zsr: 198740.33,
                zsrRate: 12.35,
                mzsr: 55770.66,
                mzsrRate: 22.83,
                jzsr: 1236,
                jzsrRate: -13.21,
                zysr: 141733,
                zysrRate: 8.97,
              },
              北院区: {
                name: '北院区',
                zsr: 20443.44,
                zsrRate: 15.03,
                mzsr: 1785,
                mzsrRate: -7.47,
                jzsr: 227,
                jzsrRate: 58.59,
                zysr: 18345,
                zysrRate: 16.86,
              },
              星湖门诊: {
                zsr: 1059,
                zsrRate: -47.21,
                mzsr: 1044,
                mzsrRate: -38.05,
                jzsr: 15,
                jzsrRate: -57.41,
                zysr: 33,
                zysrRate: 10,
              },
              体检中心: {
                tjsr: 262,
                tjsrRate: 3,
              },
            },
            /** 能效成本 */
            energyEfficiencyCost: [
              {
                title: '桃源院区',
                ndyd: 1242,
                ndydRate: 13.89,
                ndys: 25.33,
                ndysRate: 57.4,
              },
              {
                title: '北院区',
                ndyd: 231,
                ndydRate: 17.58,
                ndys: 25.45,
                ndysRate: 30.86,
              },
              {
                title: '星湖门诊',
                ndyd: 7,
                ndydRate: 0.67,
                ndys: 6.98,
                ndysRate: -1.29,
              },
              {
                title: '体检中心',
                ndyd: 0,
                ndydRate: 0,
                ndys: 0,
                ndysRate: 0,
              },
            ],
            /** 院内总资产统计 */
            assetStatistics: [
              {
                name: '医疗设备',
                value: 20039,
              },
              {
                name: '信息技术设备',
                value: 7685,
              },
              {
                name: '物资设备',
                value: 4903,
              },
              {
                name: '其他设备',
                value: 50000,
              },
            ],
            /** 智能化设备概况 */
            overviewIntelligentDevices: [
              {
                title: '消防',
                value: 2438,
              },
              {
                title: '安防',
                value: 1548,
              },
              {
                title: '能耗',
                value: 200,
              },
              {
                title: '监测',
                value: 18,
              },
              {
                title: '资产标签',
                value: 2000,
              },
            ],
            /** top指标 */
            topMedicalOverview: [
              {
                title: '年度患者总人数',
                value: '1748468.00',
                percentage: 2.96,
                unit: '万',
              },
              {
                title: '年度医疗总收入',
                value: 220505,
                percentage: 12,
                unit: '万',
              },
              {
                title: '年度能效总成本',
                value: 1538,
                percentage: 15,
                unit: '万',
              },
              {
                title: '资产总数',
                value: 82627,
                percentage: 0,
                unit: '',
              },
            ],
          };
        }
      },
    },
  };
})(this);

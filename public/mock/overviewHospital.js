/** 院区总览模拟数据 */

(function (global) {
  const time = 1000 * 60 * 10;
  global.requestMockData = {
    ...(global.requestMockData || {}),
    '/overviewHospital/getPageData': {
      method: 'POST',
      staticData: true,
      proxyUrl: config.requestUrl,
      time,
      request: (query) => {
        if (query.ssdp == 'yqzl') {
          return {
            /** 患者流量统计 */
            patientTrafficStatistics: [
              {
                title: '门诊人次',
                value: 1391532,
                percentage: 1.72,
                unit: '人',
                chartUnit: '人次',
                yAxisPrev: [128451, 155623, 185012, 168524, 183125, 169023, 190033, 213721],
                yAxis: [167344, 125116, 177281, 156357, 174053, 183253, 192400, 194094],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
              },
              {
                title: '急诊人次',
                value: 100211,
                percentage: 24.28,
                unit: '人',
                chartUnit: '人次',
                yAxisPrev: [7485, 6646, 13558, 17603, 16819, 15116, 11498, 11486],
                yAxis: [10577, 7351, 10696, 9999, 11209, 13733, 8949, 8119],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
              },
              {
                title: '住院人次',
                value: 72120,
                percentage: 13.42,
                unit: '人',
                chartUnit: '人次',
                yAxisPrev: [7292, 8295, 9632, 8036, 9728, 9004, 9732, 10401],
                yAxis: [7165, 6836, 8049, 7040, 8194, 8209, 9106, 8983],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
              },
            ],
            /** 人员分时段统计 */
            personnelStatistics: {
              unit: '人次',
              dataList: [
                {
                  name: '门诊',
                  data: [
                    2, 2, 2, 1, 0, 1, 1, 43, 1213, 1302, 1185, 789, 95, 19, 548, 946, 715, 230, 10,
                    8, 6, 6, 9, 10,
                  ],
                },
                {
                  name: '急诊',
                  data: [
                    15, 14, 5, 10, 7, 7, 6, 5, 29, 17, 15, 15, 18, 18, 15, 9, 12, 14, 24, 28, 27,
                    38, 19, 13,
                  ],
                },
                {
                  name: '住院',
                  data: [
                    3, 1, 0, 0, 0, 0, 2, 0, 18, 29, 41, 29, 7, 2, 15, 110, 62, 20, 8, 7, 2, 2, 1, 1,
                  ],
                },
              ],
              date: [
                '0:00',
                '1:00',
                '2:00',
                '3:00',
                '4:00',
                '5:00',
                '6:00',
                '7:00',
                '8:00',
                '9:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00',
                '21:00',
                '22:00',
                '23:00',
              ],
            },
            /** 医患质量分析 */
            doctorPatientAnalysis: {
              doctor: 1229,
              nurse: 1806,
              list: [
                {
                  date: '2023年',
                  yiHuan: '1:1274',
                  yiHu: '1:1.46',
                  huHuan: '1:867',
                  chuangHu: '1:0.84',
                },
                {
                  date: '2022年',
                  yiHuan: '-',
                  yiHu: '-',
                  huHuan: '-',
                  chuangHu: '-',
                },
                {
                  date: '2021年',
                  yiHuan: '-',
                  yiHu: '-',
                  huHuan: '-',
                  chuangHu: '-',
                },
              ],
            },
            /** 年度收入 */
            districtYearIncome: [
              {
                title: '门诊年度收入',
                value: 55770,
                unit: '万元',
                percentage: 22.83,
                children: [
                  {
                    title: '第一季度',
                    value: 22235,
                    unit: '万元',
                    percentage: 12.36,
                  },
                  {
                    title: '第二季度',
                    value: 23821,
                    unit: '万元',
                    percentage: 7.14,
                  },
                  {
                    title: '第三季度',
                    value: 9713,
                    unit: '万元',
                    percentage: -59.22,
                  },
                  {
                    title: '第四季度',
                    value: 0,
                    unit: '万元',
                    percentage: 0,
                  },
                ],
              },
              {
                title: '急诊年度收入',
                value: 2852,
                unit: '万元',
                percentage: -13.21,
                children: [
                  {
                    title: '第一季度',
                    value: 1095,
                    unit: '万元',
                    percentage: -1.58,
                  },
                  {
                    title: '第二季度',
                    value: 1371,
                    unit: '万元',
                    percentage: 25.25,
                  },
                  {
                    title: '第三季度',
                    value: 385,
                    unit: '万元',
                    percentage: -71.91,
                  },
                  {
                    title: '第四季度',
                    value: 0,
                    unit: '万元',
                    percentage: 0,
                  },
                ],
              },
              {
                title: '住院年度收入',
                value: 141733,
                unit: '万元',
                percentage: 8.98,
                children: [
                  {
                    title: '第一季度',
                    value: 54917,
                    unit: '万元',
                    percentage: 10.95,
                  },
                  {
                    title: '第二季度',
                    value: 55295,
                    unit: '万元',
                    percentage: 0.69,
                  },
                  {
                    title: '第三季度',
                    value: 31307,
                    unit: '万元',
                    percentage: 43.38,
                  },
                  {
                    title: '第四季度',
                    value: 0,
                    unit: '万元',
                    percentage: 0,
                  },
                ],
              },
            ],
            /** 能效成本 */
            energyEfficiencyCost: [
              {
                title: '年度用电',
                value: 1242,
                percentage: 12,
                unit: '万',
                chartUnit: '万',
                yAxisPrev: [548, 539, 0, 0],
                yAxis: [538, 701, 0, 0],
                xAxis: ['第一季度', '第二季度', '第三季度', '第四季度'],
              },
              {
                title: '年度用水',
                value: 25.33,
                percentage: 12,
                unit: '万',
                chartUnit: '万',
                yAxisPrev: [6.37, 9.21, 0, 0],
                yAxis: [11.97, 13.35, 0, 0],
                xAxis: ['第一季度', '第二季度', '第三季度', '第四季度'],
              },
            ],
            // top指标
            medicalOverview: [
              {
                title: '年度患者总人数',
                value: 1566119,
                percentage: 3.44,
                unit: '万',
              },
              {
                title: '年度医疗总收入',
                value: 198740,
                percentage: 12.35,
                unit: '万',
              },
              {
                title: '年度能效总成本',
                value: 1267,
                percentage: 14.57,
                unit: '万',
              },
              {
                title: '资产总数',
                value: 225518,
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

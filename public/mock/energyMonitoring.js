/** 能耗监测模拟数据 */

(function (global) {
  const time = 1000 * 60 * 10;
  global.requestMockData = {
    ...(global.requestMockData || {}),
    '/energyMonitoring/getPageData': {
      method: 'POST',
      staticData: true,
      proxyUrl: config.requestUrl,
      time,
      request: (query) => {
        if (query.ssdp == 'ktgl') {
          return {
            /** 总能效统计 */
            totalEnergyStatistics: [
              {
                name: '第一季度',
                value: 7452292,
                unit: 'kwh',
                rate: -0.21,
              },
              {
                name: '第二季度',
                value: 9743078,
                unit: 'kwh',
                rate: 11,
              },
              {
                name: '第三季度',
                value: 0,
                unit: 'kwh',
                rate: 0,
              },
              {
                name: '第四季度',
                value: 0,
                unit: 'kwh',
                rate: 0,
              },
            ],
            /** 使用趋势 */
            usageTrends: {
              chartUnit: 'kwh',
              dataList: [
                {
                  name: '去年',
                  data: [244993, 270874, 276633, 280792, 372940, 385449, 386231, 383852],
                },
                {
                  name: '今年',
                  data: [261742, 336076, 317224, 365936, 333122, 359552, 411267, 451166],
                },
              ],
              date: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
            },
            /** 能耗对比 */
            energyConsumption: {
              increased: [
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '11',
                  value: '66833.73',
                },
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '9',
                  value: '71002.9',
                },
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '10',
                  value: '85844.7',
                },
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '16',
                  value: '0',
                },
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '13',
                  value: '25383.77',
                },
              ],
              decreased: [
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '11',
                  value: '66833.73',
                },
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '9',
                  value: '71002.9',
                },
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '10',
                  value: '85844.7',
                },
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '16',
                  value: '0',
                },
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '13',
                  value: '25383.77',
                },
              ],
              used: [
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '12',
                  value: '109442.22',
                },
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '14',
                  value: '88659.97',
                },
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '10',
                  value: '85844.7',
                },
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '7',
                  value: '77366.23',
                },
                {
                  unit: 'kWh',
                  rate: '0',
                  name: '9',
                  value: '71002.9',
                },
              ],
            },
            /** 空调温度趋势 */
            airTemperatureTrend: {
              dataList: [19.3, 21.4, 25.2, 27.8, 28.5, 27.2, 28.1, 28.5],
              date: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
            },
            /** 空调能耗类型统计 */
            energyTypeAir: {
              title: '空调温控器',
              value: 434,
            },
            /** 设备列表 */
            devicesList: {
              '-': {
                '-': [
                  {
                    name: '7F-25-27 床',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26.3,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '1 号楼 2F-电梯厅 1',
                    status: '通信正常',
                  },
                  {
                    name: '7F-28-29 床',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26.2,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '1 号楼 2F-电梯厅 2',
                    status: '通信正常',
                  },
                  {
                    name: '7F-30-30 床',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26.6,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '7F-护士站',
                    detail: [
                      {
                        title: '室内温度',
                        value: 27.1,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '8F-配药',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26.3,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '6F 会议室',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26,
                      },
                      {
                        title: '当前档位',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-07-2312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '7F 会议室',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26,
                      },
                      {
                        title: '当前档位',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-07-2312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '8F 会议室',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26,
                      },
                      {
                        title: '当前档位',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-07-2312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                ],
              },
            },
          };
        } else if (query.ssdp == 'gdgl') {
          return {
            /** 总能效统计 */
            totalEnergyStatistics: [
              {
                name: '第一季度',
                value: 7452292,
                unit: 'kwh',
                rate: -0.21,
              },
              {
                name: '第二季度',
                value: 9743078,
                unit: 'kwh',
                rate: 11.11,
              },
              {
                name: '第三季度',
                value: 0,
                unit: 'kwh',
                rate: 0,
              },
              {
                name: '第四季度',
                value: 0,
                unit: 'kwh',
                rate: 0,
              },
            ],
            /** 使用趋势 */
            usageTrends: {
              chartUnit: 'kwh',
              dataList: [
                {
                  name: '去年',
                  data: [244993, 280792, 372940, 385449, 386231, 383852],
                },
                {
                  name: '今年',
                  data: [261742, 365936, 333122, 359552, 411267, 451166],
                },
              ],
              date: ['1月', '4月', '5月', '6月', '7月', '8月'],
            },
            /** 能耗对比 */
            energyConsumption: {
              used: [
                {
                  name: '2F.重症医学科三区',
                  value: 39600,
                  unit: 'kwh',
                  rate: 18.85,
                },
                {
                  name: '3F.第二介入.DSA',
                  value: 24760,
                  unit: 'kwh',
                  rate: 31.14,
                },
                {
                  name: '5F.国际医疗部.超声科',
                  value: 20280,
                  unit: 'kwh',
                  rate: -20.1,
                },
              ],
              increased: [
                {
                  name: '11F.结直肠.肛门外科一区',
                  value: 8049,
                  unit: 'kwh',
                  rate: 265,
                },
                {
                  name: '14F.移植科',
                  value: 5828,
                  unit: 'kwh',
                  rate: 103,
                },
                {
                  name: '25F.国际医疗部二区',
                  value: 8619,
                  unit: 'kwh',
                  rate: 102,
                },
              ],
              decreased: [
                {
                  name: '9F.神内重症.口腔外科',
                  value: 10854,
                  unit: 'kwh',
                  rate: -49.55,
                },
                {
                  name: '5F.国际医疗部.超声科',
                  value: 20280,
                  unit: 'kwh',
                  rate: -20.09,
                },
                {
                  name: '19F.手术室二区',
                  value: 6008,
                  unit: 'kwh',
                  rate: -14.02,
                },
              ],
            },
            /** 能耗类型统计 */
            energyConsumptionType: [
              {
                type: '总数',
                useNum: 103,
                energy: '369507.13kwh',
                percentage: '100%',
              },
              {
                type: '照明插座',
                useNum: 49,
                energy: '66018.9kwh',
                percentage: '18%',
              },
              {
                type: '空调',
                useNum: 24,
                energy: '161581.93kwh',
                percentage: '44%',
              },
              {
                type: '医疗设备',
                useNum: 13,
                energy: '134062.8kwh',
                percentage: '36%',
              },
              {
                type: '电热开水器',
                useNum: 17,
                energy: '7843.5kwh',
                percentage: '2%',
              },
            ],
            /** 设备列表 */
            devicesList: {
              '-': {
                '-': [
                  {
                    name: '7F-25-27 床',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26.3,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '1 号楼 2F-电梯厅 1',
                    status: '通信正常',
                  },
                  {
                    name: '7F-28-29 床',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26.2,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '1 号楼 2F-电梯厅 2',
                    status: '通信正常',
                  },
                  {
                    name: '7F-30-30 床',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26.6,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '7F-护士站',
                    detail: [
                      {
                        title: '室内温度',
                        value: 27.1,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '8F-配药',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26.3,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '6F 会议室',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26,
                      },
                      {
                        title: '当前档位',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-07-2312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '7F 会议室',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26,
                      },
                      {
                        title: '当前档位',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-07-2312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '8F 会议室',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26,
                      },
                      {
                        title: '当前档位',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-07-2312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                ],
              },
            },
          };
        } else if (query.ssdp == 'gsgl') {
          return {
            /** 总能效统计 */
            totalEnergyStatistics: [
              {
                name: '第一季度',
                value: 2600,
                unit: 'kwh',
                rate: 10,
              },
              {
                name: '第二季度',
                value: 2500,
                unit: 'kwh',
                rate: -12,
              },
              {
                name: '第三季度',
                value: 2500,
                unit: 'kwh',
                rate: 10,
              },
              {
                name: '第四季度',
                value: 1500,
                unit: 'kwh',
                rate: -10,
              },
            ],
            /** 使用趋势 */
            usageTrends: {
              chartUnit: 'm³',
              dataList: [
                {
                  name: '去年',
                  data: [7, 60, 20, 50, 55, 90, 54, 22],
                },
                {
                  name: '今年',
                  data: [33, 43, 73, 53, 83, 23, 63, 73],
                },
              ],
              date: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
            },
            /** 能耗对比 */
            energyConsumption: {
              used: [
                {
                  name: '1层',
                  value: 5.5,
                  unit: 'm³',
                  rate: -15,
                },
                {
                  name: '2层',
                  value: 4.5,
                  unit: 'm³',
                  rate: 5,
                },
                {
                  name: '3层',
                  value: 3.5,
                  unit: 'm³',
                  rate: -15,
                },
                {
                  name: '4层',
                  value: 2.5,
                  unit: 'm³',
                  rate: 20,
                },
                {
                  name: '5层',
                  value: 1.5,
                  unit: 'm³',
                  rate: -5,
                },
              ],
              increased: [
                {
                  name: '1层',
                  value: 5.5,
                  unit: 'm³',
                  rate: -5,
                },
                {
                  name: '2层',
                  value: 24.5,
                  unit: 'm³',
                  rate: -5,
                },
                {
                  name: '3层',
                  value: 3.5,
                  unit: 'm³',
                  rate: -5,
                },
                {
                  name: '4层',
                  value: 22.5,
                  unit: 'm³',
                  rate: -5,
                },
                {
                  name: '5层',
                  value: 1.5,
                  unit: 'm³',
                  rate: -5,
                },
              ],
              decreased: [
                {
                  name: '1层',
                  value: 15.5,
                  unit: 'm³',
                  rate: -5,
                },
                {
                  name: '2层',
                  value: 4.5,
                  unit: 'm³',
                  rate: -5,
                },
                {
                  name: '3层',
                  value: 3.5,
                  unit: 'm³',
                  rate: -5,
                },
                {
                  name: '4层',
                  value: 22.5,
                  unit: 'm³',
                  rate: -5,
                },
                {
                  name: '5层',
                  value: 1.5,
                  unit: 'm³',
                  rate: -5,
                },
              ],
            },
            /** 能耗类型统计 */
            energyConsumptionType: [
              {
                type: '总数',
                useNum: 150,
                energy: '100kwh',
                percentage: '100%',
              },
              {
                type: '照明插座',
                useNum: 150,
                energy: '100kwh',
                percentage: '25%',
              },
              {
                type: '空调',
                useNum: 150,
                energy: '100kwh',
                percentage: '25%',
              },
              {
                type: '医疗设备',
                useNum: 150,
                energy: '100kwh',
                percentage: '25%',
              },
              {
                type: '电热开水器',
                useNum: 150,
                energy: '100kwh',
                percentage: '25%',
              },
            ],
            /** 设备列表 */
            devicesList: {
              '-': {
                '-': [
                  {
                    name: '7F-25-27 床',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26.3,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '1 号楼 2F-电梯厅 1',
                    status: '通信正常',
                  },
                  {
                    name: '7F-28-29 床',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26.2,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '1 号楼 2F-电梯厅 2',
                    status: '通信正常',
                  },
                  {
                    name: '7F-30-30 床',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26.6,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '7F-护士站',
                    detail: [
                      {
                        title: '室内温度',
                        value: 27.1,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '8F-配药',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26.3,
                      },
                      {
                        title: '设定温度',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-09-0312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '6F 会议室',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26,
                      },
                      {
                        title: '当前档位',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-07-2312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '7F 会议室',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26,
                      },
                      {
                        title: '当前档位',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-07-2312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                  {
                    name: '8F 会议室',
                    detail: [
                      {
                        title: '室内温度',
                        value: 26,
                      },
                      {
                        title: '当前档位',
                        value: 26,
                      },
                      {
                        title: '开关状态',
                        value: '开',
                      },
                    ],
                    time: '2023-07-2312:25:23',
                    twin: '孪生体编码定位',
                    status: '通信正常',
                  },
                ],
              },
            },
          };
        }
      },
    },
  };
})(this);

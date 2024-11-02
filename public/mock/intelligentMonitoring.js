/** 资产管理模拟数据 */

(function (global) {
  const time = 1000 * 60 * 10;
  global.requestMockData = {
    ...(global.requestMockData || {}),
    '/intelligentMonitoring/getPageData': {
      method: 'POST',
      staticData: true,
      proxyUrl: config.requestUrl,
      time,
      request: (query) => {
        if (query.ssdp == 'zhjczt') {
          return {
            /** 实时空气质量 */
            realTimeAirQuality: [
              {
                title: '1F',
                children: [
                  {
                    title: 'PM2.5',
                    value: 4,
                  },
                  {
                    title: 'PM1.0',
                    value: 5,
                  },
                  {
                    title: 'PM10',
                    value: 4,
                  },
                  {
                    title: 'TVOC',
                    value: 10,
                  },
                ],
              },
              {
                title: '2F',
                children: [
                  {
                    title: 'PM2.5',
                    value: 4,
                  },
                  {
                    title: 'PM1.0',
                    value: 5,
                  },
                  {
                    title: 'PM10',
                    value: 4,
                  },
                  {
                    title: 'TVOC',
                    value: 10,
                  },
                ],
              },
              {
                title: '3F',
                children: [
                  {
                    title: 'PM2.5',
                    value: 4,
                  },
                  {
                    title: 'PM1.0',
                    value: 5,
                  },
                  {
                    title: 'PM10',
                    value: 4,
                  },
                  {
                    title: 'TVOC',
                    value: 10,
                  },
                ],
              },
              {
                title: '4F',
                children: [
                  {
                    title: 'PM2.5',
                    value: 4,
                  },
                  {
                    title: 'PM1.0',
                    value: 5,
                  },
                  {
                    title: 'PM10',
                    value: 4,
                  },
                  {
                    title: 'TVOC',
                    value: 10,
                  },
                ],
              },
              {
                title: '5F',
                children: [
                  {
                    title: 'PM2.5',
                    value: 4,
                  },
                  {
                    title: 'PM1.0',
                    value: 5,
                  },
                  {
                    title: 'PM10',
                    value: 4,
                  },
                  {
                    title: 'TVOC',
                    value: 10,
                  },
                ],
              },
            ],
            /** 空气质量趋势 */
            airQualityTrends: {
              dataList: [
                {
                  name: 'PM2.5',
                  data: [600, 700, 600, 580, 570, 600, 570, 850, 800, 780, 580, 610],
                },
                {
                  name: 'PM1.0',
                  data: [600, 700, 600, 580, 300, 600, 570, 850, 800, 780, 580, 610],
                },
                {
                  name: 'PM10',
                  data: [600, 700, 600, 580, 570, 300, 570, 850, 800, 780, 580, 610],
                },
                {
                  name: 'TVOC',
                  data: [600, 700, 600, 580, 570, 400, 570, 850, 800, 780, 580, 610],
                },
              ],
              date: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月',
              ],
            },
            /** 实时水位 */
            realTimeWaterLevel: [
              {
                position: '门诊楼楼顶',
                waterLevel: '150',
                exceeding: '是',
              },
              {
                position: '门诊楼楼顶',
                waterLevel: '150',
                exceeding: '否',
              },
              {
                position: '门诊楼楼顶',
                waterLevel: '150',
                exceeding: '是',
              },
              {
                position: '门诊楼楼顶',
                waterLevel: '150',
                exceeding: '否',
              },
              {
                position: '门诊楼楼顶',
                waterLevel: '150',
                exceeding: '否',
              },
              {
                position: '门诊楼楼顶',
                waterLevel: '150',
                exceeding: '是',
              },
              {
                position: '门诊楼楼顶',
                waterLevel: '150',
                exceeding: '否',
              },
              {
                position: '门诊楼楼顶',
                waterLevel: '150',
                exceeding: '否',
              },
            ],
            /** 设备统计 */
            equipmentStatistics: {
              children: [
                {
                  percentage: 33.33,
                  title: '智慧监测-电子水尺',
                  value: 6,
                },
                {
                  percentage: 33.33,
                  title: '智慧检测-液位计',
                  value: 6,
                },
                {
                  percentage: 33.33,
                  title: '智慧监测-雨量计',
                  value: 6,
                },
              ],
              title: '设备总数',
              value: 18,
            },
            /** 设备列表 */
            intelligentDevicesList: [
              {
                title: '内涝监测',
                children: {
                  '-': {
                    '-': [
                      {
                        name: '智慧监测-电子水尺',
                        time: '2023-08-30 01:45:00',
                        detail: [
                          {
                            title: '当前降雨量',
                          },
                          {
                            title: '时段降雨量',
                          },
                          {
                            title: '累计降雨量',
                          },
                        ],
                        twin: '2450100013',
                        status: '-',
                      },
                      {
                        name: '智慧监测-雨量计',
                        time: '2023-08-30 04:00:00',
                        detail: [
                          {
                            title: '当前降雨量',
                            value: '0',
                          },
                          {
                            title: '时段降雨量',
                            value: '0',
                          },
                          {
                            title: '累计降雨量',
                            value: '420',
                          },
                        ],
                        twin: '2450100007',
                        status: '-',
                      },
                      {
                        name: '智慧监测-电子水尺',
                        time: '2023-08-30 01:45:00',
                        detail: [
                          {
                            title: '当前降雨量',
                          },
                          {
                            title: '时段降雨量',
                          },
                          {
                            title: '累计降雨量',
                          },
                        ],
                        twin: '2450100013',
                        status: '-',
                      },
                      {
                        name: '智慧监测-雨量计',
                        time: '2023-08-30 04:00:00',
                        detail: [
                          {
                            title: '当前降雨量',
                            value: '0',
                          },
                          {
                            title: '时段降雨量',
                            value: '0',
                          },
                          {
                            title: '累计降雨量',
                            value: '420',
                          },
                        ],
                        twin: '2450100007',
                        status: '-',
                      },
                    ],
                  },
                },
              },
              {
                title: '空气监测',
                children: {
                  '-': {
                    '-': [
                      {
                        name: '智慧监测-电子水尺',
                        time: '2023-08-30 01:45:00',
                        detail: [
                          {
                            title: '当前降雨量',
                          },
                          {
                            title: '时段降雨量',
                          },
                          {
                            title: '累计降雨量',
                          },
                        ],
                        twin: '2450100013',
                        status: '-',
                      },
                      {
                        name: '智慧监测-雨量计',
                        time: '2023-08-30 04:00:00',
                        detail: [
                          {
                            title: '当前降雨量',
                            value: '0',
                          },
                          {
                            title: '时段降雨量',
                            value: '0',
                          },
                          {
                            title: '累计降雨量',
                            value: '420',
                          },
                        ],
                        twin: '2450100007',
                        status: '-',
                      },
                      {
                        name: '智慧监测-电子水尺',
                        time: '2023-08-30 01:45:00',
                        detail: [
                          {
                            title: '当前降雨量',
                          },
                          {
                            title: '时段降雨量',
                          },
                          {
                            title: '累计降雨量',
                          },
                        ],
                        twin: '2450100013',
                        status: '-',
                      },
                      {
                        name: '智慧监测-雨量计',
                        time: '2023-08-30 04:00:00',
                        detail: [
                          {
                            title: '当前降雨量',
                            value: '0',
                          },
                          {
                            title: '时段降雨量',
                            value: '0',
                          },
                          {
                            title: '累计降雨量',
                            value: '420',
                          },
                        ],
                        twin: '2450100007',
                        status: '-',
                      },
                    ],
                  },
                },
              },
            ],
          };
        }
      },
    },
  };
})(this);

/** 登录模拟数据 */

(function (global) {
  global.requestMockData = {
    ...(global.requestMockData || {}),
    '/humanResources': {
      method: 'POST',
      staticData: true,
      time: 1000 * 10000000000,
      proxyUrl: config.requestUrl,
      request: (query) => {
        if (query.ssdp == 'echarts') {
          return {
            employeeTypes: {
              total: 2300,
              totalTitle: '总人数',
              list: [
                {
                  title: '医技人员',
                  value: 264,
                  ratio: '30%',
                },
                {
                  title: '后勤职能',
                  value: 264,
                  ratio: '30%',
                },
                {
                  title: '医师',
                  value: 264,
                  ratio: '30%',
                },
                {
                  title: '护士',
                  value: 264,
                  ratio: '30%',
                },
              ],
            },
            professionalTitles: {
              titles: [
                {
                  title: '正高',
                  value: 300,
                },
                {
                  title: '副高',
                  value: 300,
                },
                {
                  title: '中级',
                  value: 300,
                },
                {
                  title: '初级',
                  value: 300,
                },
                {
                  title: '其他',
                  value: 300,
                },
              ],
              title: '近五年正高趋势',
              line: [
                {
                  title: '正高数',
                  yData: ['40', '60', '70', '60', '90'],
                },
              ],
              xData: ['2020', '2021', '2022', '2023', '2024'],
            },
            degreeDistribution: {
              titles: [
                {
                  title: '博士',
                  value: 300,
                },
                {
                  title: '硕士',
                  value: 300,
                },
                {
                  title: '本科',
                  value: 300,
                },
                {
                  title: '其他',
                  value: 300,
                },
              ],
              title: '近五年博士趋势',
              line: [
                {
                  title: '博士数',
                  yData: ['40', '60', '70', '60', '90'],
                },
              ],
              xData: ['2020', '2021', '2022', '2023', '2024'],
            },
            ageDistribution: {
              unit: '人',
              xData: ['25岁以下', '26-35岁', '36-45岁', '46-55岁', '56-60岁', '60岁以上'],
              yData: [50, 30, 10, 50, 30, 50],
            },
            afterRetirement: [
              {
                title: '博士',
                value: 3,
                unit: '名',
                ratio: '4%',
                state: 'down',
              },
              {
                title: '硕士',
                value: 15,
                unit: '名',
                ratio: '16%',
                state: 'down',
              },
              {
                title: '本科',
                value: 20,
                unit: '名',
                ratio: '20%',
                state: 'down',
              },
              {
                title: '其他',
                value: 40,
                unit: '名',
                ratio: '40%',
                state: 'down',
              },
            ],
            nextTwoYears: {
              xData: ['医生', '医技', '药剂', '护理', '行政后勤'],
              yData: [65, 18, 20, 60, 95],
              title: '退休人数',
            },
          };
        }
      },
    },
  };
})(this);

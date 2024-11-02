/*
 * @Description:
 * @Version: 1.0
 * @Autor: yls
 * @Date: 2023-02-28 15:53:43
 * @LastEditors: jiangzhikun
 * @LastEditTime: 2023-03-02 09:36:14
 */
const config = {
  /** thingjsx的iframe地址(开发图表时节省资源调试用) */
  // thingjsX:
  //   'http://10.100.33.143:1662/thing/auth/login.html?beforeUrl=http%3A%2F%2F10.100.33.143%3A1662%2Fthing%2Fdtwin%2Findex.html',
  /** thingjsx的iframe地址 */
  thingjsX: 'http://10.100.33.143:1662/thing/share/j7a17pondvib0ydm',
  /** 项目标题 */
  title: '智慧医院运营指挥中心',
  /** 接口统一的请求地址 */
  requestUrl: 'http://10.100.30.90:10029/http/rest',
  /** 菜单（暂时都用静态的菜单，后期与thingjsx数据互通） */
  menu: [
    {
      title: '桃源概览',
      code: 'overviewHospital',
      router: 'overviewHospital',
    },

    {
      title: '智慧能效',
      code: 'energyMonitoring',
      router: 'energyMonitoring',
      children: [
        {
          title: '空调管理',
          code: 'kongtiaoguanli',
        },
        {
          title: '供电管理',
          code: 'gongdianguanli',
        },
        {
          title: '供水管理',
          code: 'gongshuiguanli',
        },
        {
          title: '照明管理',
          code: 'zhaomingguanli',
        },
      ],
    },
    {
      title: '智慧防控',
      code: 'intelligentPrevention',
      router: 'intelligentPrevention',
      children: [
        {
          title: '消防系统',
          code: 'xiaofangxitong',
        },
        {
          title: '门禁系统',
          code: 'menjinxitong',
        },
        {
          title: '视频监控',
          code: 'shipinjiankong',
        },
        {
          title: '巡更系统',
          code: 'xungengxitong',
        },
      ],
    },
    {
      title: '智慧资产',
      code: 'assetManagement',
      router: 'assetManagement',
    },
    {
      title: '智慧设施',
      code: 'facilityManagement',
      router: 'facilityManagement',
      children: [
        {
          title: '电梯管理',
          code: 'menjinxitong',
        },
        {
          title: '机房管理',
          code: 'jifangguanli',
        },
        {
          title: '医疗气体',
          code: 'yiliaoqiti',
        },
      ],
    },
    {
      title: '智慧监测',
      code: 'intelligentMonitoring',
      router: 'intelligentMonitoring',
    },
    {
      title: '智慧医疗运营',
      code: 'medicalOperations',
      router: 'http://192.168.218.105:8089/bigscreen1/#/?key=tyyq',
    },
    {
      title: '智慧人力',
      code: 'humanResources',
      router: 'http://192.168.218.105:8089/bigscreen2/#/quHospital?key=tyyq',
    },
  ],
  showProcess: false,
};

window.config = config;

window.uino = {
  app: null,
  map: null,
};

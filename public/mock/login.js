/** 登录模拟数据 */

(function (global) {
  global.requestMockData = {
    ...(global.requestMockData || {}),
    '/login': {
      method: 'POST',
      staticData: true,
      time: 1000 * 10000000000,
      proxyUrl: config.requestUrl,
      request: (query) => {
        if (query.ssdp == 'login') {
          return {
            admin: 'admin',
            shizuli: 'shizuli',
          };
        }
      },
    },
  };
})(this);

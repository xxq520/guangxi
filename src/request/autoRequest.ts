import axios from 'axios';
import { AxiosResponse } from 'axios';
import { getCurrentInstance } from 'vue';

/**
 * @author xiexiangquan
 * @date 2022/10/09
 * @Description: 生成随机字符串
 * @param {number} len 字符串长度
 */
const randomString = (len: number) => {
  len = len || 32;
  let $chars =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/** 接口响应结构 */
interface ResponseData<T> {
  /** 响应编码 */
  code: number;
  /** 响应数据 */
  data: T;
  /** 响应状态 */
  status: string;
  /** 返回的文字提示 */
  msg: string;
}

interface ErrorMessage {
  [propName: number]: string;
}

/** mock数据 */
declare const requestMockData: Record<
  string,
  {
    /** 请求的刷新时间 -1为不自动刷新 */
    time: number;
    /** 请求的方式 */
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    /** 是否使用静态数据，可以单独控制某个接口使用接口数据 */
    staticData: boolean;
    /** 代理转发的地址 */
    proxyUrl: string;
    request: (query?: any) => any;
  }
>;

const errorMessage: ErrorMessage = {
  401: '您的登录已超时，请重新登录',
  403: '请求方式或路径错误',
  404: '请求路径不存在',
  500: '请求服务器出错',
  502: '请求服务器失败',
};

(window as any).requestMockDataList = [];
const httpRequest = axios.create({
  baseURL: window.config.requestUrl,
  timeout: 1000 * 10,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

httpRequest.interceptors.request.use(
  (config) => {
    // 获取 Token
    // const token = 'Token';
    return {
      ...config,
      headers: {
        ...config.headers,
        // Authorization: token,
      },
    };
  },
  (error) => Promise.reject(error)
);

httpRequest.interceptors.response.use(
  ({ data }) => {
    const responseData = data as ResponseData<any>;

    if (responseData.code !== 200) {
      console.log(errorMessage[responseData.code] || '网络请求失败');
      return Promise.reject(responseData);
    }

    return responseData.data || responseData.msg;
  },
  (error) => {
    const { data, url } = error.config;
    const mockFn = requestMockData[url];
    if (mockFn) {
      const params = JSON.parse(data || '{}') || {};
      const responseData = mockFn.request(params);
      (window as any).requestMockDataList.push({ url, query: data, data: responseData });
      console.log('--------模拟数据--------', '\n', url, '\n', data, '\n', responseData);
      return responseData;
    }

    console.log('网络请求失败');
    return Promise.reject(error);
  }
);

interface OptionsType<k = any> {
  /** 接口的路径(不需要域名) */
  url: string;
  /** 请求的头部信息 */
  header?: Record<string, any>;
  /** 请求的参数 */
  data?: k & Record<string, any>;
  /** 自定义的请求域名（当项目需要请求不同域名接口时有用） */
  baseURL?: string;
  /** 请求自动刷新的时间 -1为不自动刷新 */
  time?: number;
  /** 是否立即执行，默认为true 即可执行 */
  immediate?: boolean;
  /** 是否组件销毁自动清除定时器，代表组件销毁后不会继续请求,默认为true即为组件销毁请求也跟着销毁 */
  AutoDestroy?: boolean;
}

/** 请求回调函数 */
type RequestCallBack<K> = (
  /** 请求请求完成回调的函数 */
  e: K
) => void;

/** 失败请求回调函数 */
type ErrCallBack = (
  /** 请求请求完成回调的函数 */
  e: Record<string, any>
) => void;

/** 校验传入的参数 */
const checkParmas = <T>(
  /** 请求完成的回调函数 */
  callback: RequestCallBack<T>,
  /** 请求的可配置项 */
  options: OptionsType
): string | boolean => {
  /** 回调函数必填校验 */
  if (!callback) return '请求缺少callback!';
  if (options) {
    const { header, data, time } = options;
    /** 校验 */
    const handle: Record<
      string,
      {
        condition: boolean | any;
        msg: string;
      }
    > = {
      /** 自动刷新时间检验 */
      time: {
        condition: time && isNaN(time),
        msg: '自动刷新时间格式有误!',
      },
      /** 请求头检验 */
      header: {
        condition: header && typeof header !== 'object',
        msg: '请求头需为Object类型!',
      },
      /** 请求数据校验 */
      data: {
        condition: data && typeof data !== 'object',
        msg: '数据需为Object类型!',
      },
    };
    for (const i in handle) {
      if (handle[i].condition) {
        return handle[i].msg;
      }
    }
    /** 设置默认的选项 */
    options.immediate = options.immediate ?? true;
    /** 组件销毁自动销毁请求定时器 */
    options.AutoDestroy = options.AutoDestroy ?? true;
  }
  return true;
};

class RequestHandle {
  /** 请求的可配置项 */
  options: OptionsType;
  /** 请求完成的回调函数 */
  callback: (param?: any) => void;
  /** 请求失败的回调函数 */
  errback: (param?: any) => void;
  /** 请求的标签，可根据该标签进行查询、销毁、暂停请求操作 */
  tag: string;
  /** 组件实例 */
  component: any;
  /** 请求的定时器 */
  timer: any;
  /** 是否已经销毁 */
  isDestroy = false;
  /** 是否在暂停中 */
  isStop = false;
  constructor(
    options: OptionsType,
    callback: (param?: any) => void,
    errback: (param?: any) => void,
    tag: string,
    component?: any
  ) {
    this.options = options;
    this.callback = callback;
    this.errback = errback;
    this.tag = tag;
    this.component = component;
    /** 立即执行一次 */
    if (options.immediate) this.request();
    /** 开始请求任务 */
    this.setTimer();
  }

  /** 判断vue组件是否已经销毁 */
  isDestroyRequest() {
    return (
      this.component?.isUnmounted || findRequestItem(this.tag)?.route !== history.state.current
    );
  }

  /** 定时器设置 */
  setTimer() {
    /** 在配置文件中查询接口的配置信息（接口地址、自动刷新时间） */
    const time = this.options.time || requestMockData[this.options.url].time;
    /** 不需要开启定时任务 */
    if (time && time <= -1) return;
    /** 不在暂停状态 */
    this.isStop = false;
    /** 清除上一个定时器 */
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      /** 组件已经销毁 */
      if (this.isDestroyRequest()) return this.destroy();
      this.request().then(() => this.setTimer());
    }, time);
  }

  /** 销毁请求的定时器 */
  destroy() {
    this.isDestroy = true;
    const finIndex = requestList.findIndex((item) => item.request === this);
    if (finIndex !== -1) requestList.splice(finIndex, 1);
    clearTimeout(this.timer);
  }

  /** 暂停请求的定时器 */
  stop() {
    this.isStop = true;
    clearTimeout(this.timer);
  }

  /** 恢复定时器 */
  recovery() {
    this.setTimer();
  }

  /** 开始请求 */
  request() {
    return new Promise((resolve, reject) => {
      /** 在配置文件中查询接口的配置信息（接口地址、自动刷新时间） */
      if (!requestMockData[this.options.url]) return console.log(this.options.url, '接口没有定义');
      let { method, staticData, proxyUrl } = requestMockData[this.options.url];
      let requestRemote: Promise<AxiosResponse<any, any>> | null = null;
      method = method || 'POST';
      const options = {
        params: this.options.data,
        headers: this.options.header,
        baseURL: staticData ? '/' : this.options?.baseURL || window.config.requestUrl,
      };
      // !this.options.baseURL && delete options.baseURL;
      switch (method) {
        case 'POST':
          requestRemote = httpRequest.post(
            !staticData ? proxyUrl : this.options.url,
            this.options.data,
            options
          );
          break;
        case 'GET':
          requestRemote = httpRequest.get(staticData ? proxyUrl : this.options.url, options);
          break;
      }
      /** 回调 */
      requestRemote
        ?.then((res) => {
          resolve(res);
          this.callback(res);
        })
        .catch((err) => {
          reject(err);
          this.errback(err);
        });
    });
  }
}

/** 自动间隔请求的实例 */
export interface RequestItemType {
  /** tag标签，可根据该标签进行删除等操作 */
  tag: string;
  /** 请求的封装实例 */
  request: RequestHandle;
  /** 请求所属的页面路由 */
  route: string;
}
[];

/** 存储请求的列表 */
const requestList: RequestItemType[] = [];

/**
 * 间隔某个时间自动请求(泛型T为成功的数据回调格式，K为传入的参数格式)
 * @param options 请求的配置项
 * @param callback 请求响应触发的回调函数
 * @param tag 请求的标签
 * @override
 */
export const autoRequest = <T, k = any>(
  /** 请求的可配置项 */
  options: OptionsType<k>,
  /** 请求完成的回调函数 */
  callback: RequestCallBack<T>,
  /** 请求失败的回调函数 */
  errback: ErrCallBack = () => {
    console.log(11);
  },
  /** 请求的标签，可根据该标签进行查询、销毁、暂停请求操作 */
  tag?: string
): RequestItemType => {
  const component = getCurrentInstance();
  const check = checkParmas<T>(callback, options);
  /** 参数没有验证通过 */
  if (check !== true) return console.error(check) as any;
  /** 设置tag */
  tag = tag || randomString(10);
  /** 请求的操作方法 */
  const requestItem = {
    tag,
    /** 存储当前请求所属的路由 */
    route: history.state.current,
    request: new RequestHandle(options, callback, errback, tag, component),
  };
  requestList.push(requestItem);
  return requestItem;
};

/**
 * 查询某一个请求项
 * @param {String} tag 请求项的标签
 * @return void
 */
export const findRequestItem = (tag: string): RequestItemType | undefined =>
  requestList.find((item) => item.tag === tag);

/**
 * 暂停所有的请求项
 * @return void
 */
export const stopAllRequest = () => requestList.map((item) => item.request.stop());

/**
 * 恢复所有的请求项
 * @return void
 */
export const recoveryAllRequest = () => requestList.map((item) => item.request.recovery());

/**
 * 销毁所有的请求项
 * @return void
 */
export const destroyAllRequest = () => requestList.map((item) => item.request.destroy());

export interface Events {
  /** 摄像头告警 */
  cameraAlarmPanel: {
    arg: {
      /** 孪生体编码 */
      twin: string;
      /** 是否打开面板 */
      show: boolean;
    };
  };
  /** 打开预警面板 */
  earlyWarningPanel: {
    arg: {
      /** 孪生体编码 */
      twin: string;
      /** 是否打开面板 */
      show: boolean;
      flyTo: boolean;
    };
  };
  /** 打开应急处置流程图 */
  emergencyResponse: {
    arg: {
      /** 流程图对应的编号，就是从左到右的的下标 1-7 */
      index: number;
    };
  };
  /** 重置主题状态 */
  refreshPage: {
    arg: {
      /** 主题编码 */
      menu: Record<string, any>;
    };
  };
  [proName: string]: any;
}

export type Handler<T = unknown> = (event: T) => any;
export type WildcardHandler<T = Record<string, unknown>> = (
  type: keyof T,
  event: T[keyof T]
) => void;

export type EventHandlerList<T = unknown> = Array<Handler<T>>;

export type EventHandlerMap = Map<
  keyof Events | '*',
  {
    tag: Events[keyof Events]['tag'] | null;
    handler: Handler<Events[keyof Events]['arg']>;
  }[]
>;

export interface Emitter {
  all: EventHandlerMap;
  log: boolean;

  reOn<Key extends keyof Events>(
    type: Key,
    handler: Handler<Events[Key]['arg']>,
    tag?: Events[Key]['tag']
  ): void;

  on<Key extends keyof Events>(
    type: Key,
    handler: Handler<Events[Key]['arg']>,
    tag?: Events[Key]['tag']
  ): void;
  on(type: '*', handler: Handler<any>): void;

  off<Key extends keyof Events>(type: Key, tag?: Events[Key]['tag']): void;

  emit<Key extends keyof Events>(
    type: Key,
    event?: Events[Key]['arg'],
    tag?: Events[Key]['tag']
  ): void;
}

export default function mitt(all?: EventHandlerMap): Emitter {
  // type GenericEventHandler = Handler<Events[keyof Events]> | WildcardHandler<Events>;
  all = all || new Map();

  return {
    /**
     * A Map of event names to registered handler functions.
     */
    all,
    log: false,
    reOn<Key extends keyof Events>(
      type: Key,
      handler: Handler<Events[Key]['arg']>,
      tag?: Events[Key]['tag']
    ) {
      const handlers = all!.get(type);
      if (handlers) {
        handlers.push({ tag: tag ?? null, handler: handler });
      } else {
        all!.set(type, [{ handler: handler, tag: tag ?? null }]);
      }
    },

    on<Key extends keyof Events>(
      type: Key,
      handler: Handler<Events[Key]['arg']>,
      tag?: Events[Key]['tag']
    ) {
      const handlers = all!.get(type);
      if (handlers) {
        handlers.push({ tag: tag ?? null, handler: handler });
      } else {
        all!.set(type, [{ handler: handler, tag: tag ?? null }]);
      }
    },

    off<Key extends keyof Events>(type: Key, tag?: Events[Key]['tag']) {
      const handlers = all!.get(type);
      if (handlers) {
        if (tag) {
          handlers.splice(handlers.findIndex((item) => item.tag === tag) >>> 0, 1);
        } else {
          all!.set(type, []);
        }
      }
    },

    emit<Key extends keyof Events>(
      type: Key,
      evt?: Events[Key]['arg'],
      tag?: Events[Key]['tag'] | null
    ) {
      let handlers = all!.get(type);
      if (handlers) {
        handlers.slice().map((item) => {
          if (tag) {
            if (item.tag && tag === item.tag) {
              item.handler(evt!);
            }
          }
          if (!item.tag) {
            item.handler(evt!);
          }
        });
      }

      handlers = all!.get('*');
      if (handlers) {
        handlers.slice().map((item) => {
          item.handler(evt!);
        });
      }
    },
  };
}

export const eventBus = mitt();

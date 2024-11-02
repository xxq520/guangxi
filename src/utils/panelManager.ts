import {
  createVNode, render, RendererNode, VueElement
} from 'vue';

/*
 * @Description: 面板管理器
 * @Version: 1.0
 * @Autor: hasaiki
 * @Date: 2023-02-22 16:51:57
 * @LastEditors: jiangzhikun
 * @LastEditTime: 2023-03-03 10:02:14
 */
export type InitOptions = {
    app: THING.App,
    scale?: number
}

export type DraggbleOption = {
    enable: boolean,
    selector: string
}

export type DragPanelOptions = {
    position: THING.BaseObject | Array<number>,
    vue: VueElement,
    userData?: any,
    lineOption?: any,
    draggable?: DraggbleOption,
    pivot?: PIVOT_2D,
    offset?: Array<number>
}

export type PanelLine = {
    uuid: string,
    isShow: boolean,
    pivPos: Array<number>,
}

export type PanelObject = {
    instance: RendererNode,
    panel?: THING.Marker | THING.UIAnchor,
    line?: PanelLine,
}

export enum PIVOT_2D {
    AUTO = 0,
    LEFT_TOP = 1,
    LEFT_BOTTOM = 2,
    RIGHT_TOP = 3,
    RIGHT_BOTTOM = 4,
    CENTER_BOTTOM = 5,
}

export class PanelHelper {
  static close(props: any) {
    const { _pm, _pmid } = props;
    _pm.close({
      instance: null,
      line: {
        uuid: _pmid
      },
    });
  }

  static hide(props: any) {
    const { _pm, _pmid } = props;
    _pm.hide({
      instance: null,
      line: {
        uuid: _pmid
      },
    });
  }
}

export class PanelManager {
  app = null as unknown as THING.App;

  panelsDom = null as unknown as HTMLDivElement;

  lineStatus = false;

  PIVOT_2D = PIVOT_2D;

  lines = [] as Array<PanelLine>;

  offsetLeft = 0;

  offsetTop = 0;

  scale = 1;

  constructor(options: InitOptions) {
    this.app = options.app;
    this.scale = options.scale || 1;
    const div = document.createElement('div');
        this.app.domElement.parentNode!.append(div);
        this.panelsDom = div;
        this.getDomInfo();
        window.addEventListener('resize', () => { this.getDomInfo(); });
  }

  CreateMarker(options: any) {
    if (options.type === 'Marker') {
      const cb = options.complete;
      const ops = options;
      delete ops.complete;
      ops.complete = (e:any) => {
        const obj = e.object;
        if (options.scaleOptions && options.scaleOptions.scope.length) {
          const time = options.scaleOptions.time || 1000;
          obj.on('update', () => {
            options.scaleOptions.scope.forEach((o: { min: number; max: number; scale: number; }) => {
              if (this.app.camera.distance >= o.min && this.app.camera.distance < o.max) {
                obj.scaleTo({ scale: [o.scale, o.scale, 1], time });
              }
            });
          }, '自动缩放marker');
        }
        if (cb) {
          cb(e);
        }
      };
      this.app.create(ops);
    }
  }

  getDomInfo() {
    const { domElement } = this.app;
    const div = this.panelsDom;
    div.style.width = `${domElement.offsetWidth}px`;
    div.style.height = `${domElement.offsetHeight}px`;
    div.style.position = 'absolute';
    this.offsetLeft = domElement.offsetLeft;
    this.offsetTop = domElement.offsetTop;
    div.style.top = `${this.offsetTop}px`;
    div.style.left = `${this.offsetLeft}px`;
    div.style.pointerEvents = 'none';
    div.style.overflow = 'hidden';
  }

  /**
     * @description 创建面板
     * @param {*} parent 绑定的物体
     * @param {*} vue 显示的vue
     * @param {*} userData 面板属性
     * @param {*} localPosition 相对定位
     * @param {*} pivot 锚点
     * @param {*} isMarker 是否是marker
     *
     * 1.根据position直接定位,需要指定parent为scene
     * 2.仅UIAnchor支持通过属性实时数据更新dom,marker需要找到dom节点来更新
     */
  loadPanel(parent: THING.BaseObject, vue: VueElement, userData: any, position?: Array<number>, pivot = [0, 0], isMarker = false) {
    return new Promise<PanelObject>((resolve) => {
      const uuid = `_pm_${this._uuid(8, 16)}`;
      const div = document.createElement('div');
      if (isMarker) {
        div.style.display = 'none';
      }
      this.panelsDom.append(div);
      const instance = createVNode(vue, { ...userData });
      render(instance, div);
      div.id = uuid;
      if (instance.el) {
        instance.el.style.position = 'absolute';
        instance.el.style.pointerEvents = 'all';
      }
      const panel = this.app.create({
        type: isMarker ? 'Marker' : 'UIAnchor',
        // @ts-ignore
        element: instance.el,
        parent,
        position: position || parent.position,
        pivot,
        name: uuid,
        complete: () => {
          // resolve({ instance, panel });
          // 某个版本开始不回调complete,估计变成同步了
        }
      });
      if (instance.component) {
        instance.component.props._pm = this;
        instance.component.props._pmid = uuid;
        // instance.component.props._vNode = div;
      }
      resolve({ instance, panel });
    });
  }

  /**
     * @Author: caoyuxiang
     * @description: 拖拽面板
     * @param {DragPanelOptions} option
     * @return {*}
     */
  load2DPanel(option: DragPanelOptions) {
    return new Promise<PanelObject>((resolve) => {
      if (!this.lineStatus) this._initLineThreed();
      const {
        userData, vue, draggable, position, pivot, offset, lineOption
      } = option;
      const div = document.createElement('div');
      this.panelsDom.append(div);
      const instance = createVNode(vue, { ...userData });
      render(instance, div);
      const pos = position instanceof THING.BaseObject ? position.position : position;
      let piv = pivot || 0;
      const dis = offset || [30, 30];
      const width = instance.el?.offsetWidth;
      const height = instance.el?.offsetHeight;
      const lWidth = this.panelsDom.offsetWidth;
      const lHeight = this.panelsDom.offsetHeight;
      const initPos = this._caclPosition(pos, piv, dis, width, height, lWidth, lHeight);
      piv = initPos[2];
      if (instance.el) {
        instance.el.style.position = 'absolute';
        instance.el.style.pointerEvents = 'all';
        instance.el.style.left = `${initPos[0]}px`;
        instance.el.style.top = `${initPos[1]}px`;
      }
      const pivPos = this._calcPivotPostion(initPos[0], initPos[1], piv, width, height);
      const uuid = `_pm_${this._uuid(8, 16)}`;
      const lop = {
        ...{
          type: 'Line',
          color: '#ff0000',
          points: [pos, this.app.camera.screenToWorld(pivPos[0], pivPos[1])],
          style: {
            alwaysOnTop: true,
          }
        },
        ...lineOption,
        ...{ name: uuid }
      };
      this.app.create(lop);
      const line = {
        uuid,
        isShow: true,
        pivPos
      };
      this.lines.push(line);
      if (draggable?.enable) {
        const handles = instance.el!.querySelectorAll(draggable.selector);
        handles.forEach((handle: HTMLDivElement) => {
          handle.onmousedown = (e) => {
            const targetEle = instance.el;
            const limitEle = this.panelsDom;
            if (targetEle && limitEle) {
              const targetLeft = targetEle.offsetLeft;
              const targetTop = targetEle.offsetTop;
              const targetWidth = targetEle.offsetWidth;
              const targetHeight = targetEle.offsetHeight;

              // const limitLeft = limitEle.offsetLeft;
              // const limitTop = limitEle.offsetTop;
              const limitWidth = limitEle.offsetWidth;
              const limitHeight = limitEle.offsetHeight;
              const desX = limitWidth - targetWidth;
              const desY = limitHeight - targetHeight;

              const beginX = e.clientX;
              const beginY = e.clientY;
              document.onmousemove = (ev) => {
                const moveX = ev.clientX - beginX;
                const moveY = ev.clientY - beginY;
                let nowLeft = 0;
                let nowTop = 0;

                if (targetLeft + moveX / this.scale < 0) {
                  nowLeft = 0;
                } else if (targetLeft + moveX / this.scale >= desX) {
                  nowLeft = desX;
                } else {
                  nowLeft = moveX / this.scale + targetLeft;
                }
                // 处理Y轴
                if (targetTop + moveY / this.scale < 0) {
                  nowTop = 0;
                } else if (targetTop + moveY / this.scale >= desY) {
                  nowTop = desY;
                } else {
                  nowTop = moveY / this.scale + targetTop;
                }
                targetEle.style.left = `${nowLeft}px`;
                targetEle.style.top = `${nowTop}px`;
                this.lines.some((line) => {
                  if (line.uuid === uuid) {
                    line.pivPos = this._calcPivotPostion(nowLeft, nowTop, piv, width, height);
                    return true;
                  }
                  return false;
                });
              };
              document.onmouseup = () => {
                document.onmousemove = null;
              };
            }
          };
        });
      }
      if (instance.component) {
        instance.component.props._pm = this;
        instance.component.props._pmid = uuid;
      }
      div.id = uuid;
      resolve({ instance, line });
    });
  }

  _caclPosition(position: Array<number>, pivot: number, offset: Array<number>, width: number, height: number, limitWidth: number, limitHeight: number) {
    let left = 0;
    let top = 0;
    let piv = pivot;
    const pos = this.app.camera.worldToScreen(position);
    // pos[0] -= this.offsetLeft;
    // pos[1] -= this.offsetTop;
    if (piv === 0) {
      const halfWidth = limitWidth / 2;
      const halfHeight = limitHeight / 2;
      if (pos[0] <= halfWidth && pos[1] <= halfHeight) {
        piv = this.PIVOT_2D.LEFT_TOP;
      } else if (pos[0] <= halfWidth && pos[1] >= halfHeight) {
        piv = this.PIVOT_2D.LEFT_BOTTOM;
      } else if (pos[0] >= halfWidth && pos[1] <= halfHeight) {
        piv = this.PIVOT_2D.RIGHT_TOP;
      } else {
        piv = this.PIVOT_2D.RIGHT_BOTTOM;
      }
    }
    switch (piv) {
      case this.PIVOT_2D.LEFT_TOP:
        left = pos[0] + offset[0];
        top = pos[1] + offset[1];
        break;
      case this.PIVOT_2D.LEFT_BOTTOM:
        left = pos[0] + offset[0];
        top = pos[1] - offset[1] - height;
        break;
      case this.PIVOT_2D.RIGHT_TOP:
        left = pos[0] - offset[0] - width;
        top = pos[1] + offset[1];
        break;
      case this.PIVOT_2D.RIGHT_BOTTOM:
        left = pos[0] - offset[0] - width;
        top = pos[1] - offset[1] - height;
        break;
      case this.PIVOT_2D.CENTER_BOTTOM:
        left = pos[0] - width / 2;
        top = pos[1] - offset[1] - height;
        break;
    }
    if (left < 0) {
      left = 0;
    } else if (left + width > limitWidth) {
      left = limitWidth - width;
    }
    if (top < 0) {
      top = 0;
    } else if (top + height > limitHeight) {
      top = limitHeight - height;
    }
    return [left, top, piv];
  }

  _calcPivotPostion(domLeft: number, domTop: number, pivot: number, domWidth: number, domHeight: number) {
    let left = 0;
    let top = 0;
    switch (pivot) {
      case this.PIVOT_2D.LEFT_TOP:
        left = domLeft;
        top = domTop;
        break;
      case this.PIVOT_2D.LEFT_BOTTOM:
        left = domLeft;
        top = domTop + domHeight;
        break;
      case this.PIVOT_2D.RIGHT_TOP:
        left = domLeft + domWidth;
        top = domTop;
        break;
      case this.PIVOT_2D.RIGHT_BOTTOM:
        left = domLeft + domWidth;
        top = domTop + domHeight;
        break;
      case this.PIVOT_2D.CENTER_BOTTOM:
        left = domLeft + domWidth / 2;
        top = domTop + domHeight;
        break;
    }
    return [left, top];
  }

  _initLineThreed() {
    this.app.on('update', () => {
      this.lines.forEach((line) => {
        const lineObj = this.app.query(line.uuid)[0];
        if (lineObj) {
          // @ts-ignore
          lineObj.setPoint(1, this.app.camera.screenToWorld(line.pivPos[0], line.pivPos[1]));
        }
      });
    }, '面板拖动线程');
  }

  _uuid(len: number, radix: number) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = []; let
      i;
    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  }

  _checkClearThreed() {
    if (this.lines.length <= 0 || this.lines.filter((l) => l.isShow).length <= 0) {
      this.app.off('update', null, '面板拖动线程');
      this.lineStatus = false;
    }
  }

  _visible(panelObject: PanelObject, visible: boolean) {
    if (panelObject.line) {
      const { uuid } = panelObject.line;
      const line = this.app.query(uuid)[0];
      if (line) {
        line.visible = visible;
      }
      const dom = <HTMLDivElement> this.panelsDom.querySelector(`#${uuid}`);
      if (dom) {
        dom.style.display = visible ? 'block' : 'none';
      }
    } else if (panelObject.panel) {
      panelObject.panel.visible = visible;
    }
  }

  _clearEmptyNode() {
    this.panelsDom.childNodes.forEach((node) => {
      if (node.childNodes.length <= 0) {
        node.remove();
      }
    });
  }

  close(panelObject: PanelObject) {
    console.log(panelObject);
    let uuid: string | RegExp | null = null;
    if (panelObject.line) {
      uuid = panelObject.line.uuid;
      const line = this.app.query(uuid)[0];
      line?.destroy();
      const index = this.lines.findIndex((l) => l.uuid === uuid);
      this.lines.splice(index, 1);
    } else if (panelObject.panel) {
      // @ts-ignore
      uuid = panelObject.panel.name;
      panelObject.panel.destroy();
    }
    const dom = this.panelsDom.querySelector(`#${uuid}`);
    if (dom) {
      render(null, dom);
    }
    this._clearEmptyNode();
    this._checkClearThreed();
  }

  closeAll() {
    this.panelsDom.childNodes.forEach((node) => {
      if (node.childNodes.length > 0) {
        const html = node as HTMLElement;
        const uuid = html.id;
        const obj = this.app.query(uuid)[0];
        obj?.destroy();
        render(null, html);
      }
    });
    this._clearEmptyNode();
  }

  hide(panelObject: PanelObject) {
    this._visible(panelObject, false);
  }

  show(panelObject: PanelObject) {
    this._visible(panelObject, true);
  }
}

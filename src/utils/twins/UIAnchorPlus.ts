/**
 * @author zhangwenquan
 * @time  2022.02.21
 * @edition  v0.0.1.220221_beta
 * @description ：层级跳转生命周期扩展插件
 */

//注册该类到THING中
export const registerUIAnchorPlus = () => {
  const helpVec2 = new THREE.Vector2();
  const Utils = THING.Utils;
  /**
   * @description UIAnchorPlus，具备原UIAnchor的功能上，增加创建时的visible设置，keepSize设置，成功回调，可使用app.query查询到
   */
  class UIAnchorPlus extends THING.BaseObject {
    constructor(app) {
      const _this = super(app);

      this.app = app;

      _this._element = null;
      _this._autoUpdateVisible = true;
      _this._autoRemoveElement = true;

      _this._pivot = [0.5, 1];
      _this._offset = [0, 0, 0];

      _this._zIndex = null;

      _this._customWidth = 0;
      _this._customHeight = 0;

      return _this;
    }

    _updateVisible(obj, style, screenPosition) {
      const sz = this.app.renderer.getSize(helpVec2);
      // 获得 UI 坐标
      const x = screenPosition[0];
      const y = screenPosition[1];
      const z = screenPosition[2];

      // 判断是否在摄像机背后,是否在屏幕外边

      if (obj.visible == false || z > 1 || x < 0 || x > sz.width || y < 0 || y > sz.height) {
        if (style.visibility != 'hidden') {
          style.visibility = 'hidden';
        }

        return false;
      }

      if (style.visibility != 'visible') {
        style.visibility = 'visible';
      }

      return true;
    }

    customSetup(param) {
      // _BaseObject.prototype.setup.call(this, param);
      this._element = param['container'] || param['el'] || param['element'];
      this.initY = this._element?.offsetHeight ?? 0;
      this._position = param['position'];
      this._offset = param['offset'] || param['localPosition'] || [0, 0, 0];
      this._element && (this._element.style.position = 'absolute');
      /**实时偏移设置 */
      this.offsetLeft = param['offsetLeft'] ?? 0;
      this.offsetTop = param['offsetTop'] ?? 0;
      /**存储初始偏移设置 */
      this._offsetLeft = param['offsetLeft'] ?? 0;
      this._offsetTop = param['offsetTop'] ?? 0;
      this._keepSize = param['keepSize'] || true;
      this._scaleSize = param['scaleSize'] ?? 1;

      if (typeof param['visible'] === 'boolean') {
        this.visible = param['visible'];
        //如果未定义则设置初始显示状态为true
      } else if (!this._parent.visible) {
        this.initVisible = true;
      }
      this._customWidth = param['width'];
      this._customHeight = param['height'];

      this.pivot = param['pivot'] || this.pivot;

      let pivotPixel = param['pivotPixel'];
      if (pivotPixel) {
        this.pivotPixel = pivotPixel;
      }

      this.tickable = true;
      this.update();
    }

    update() {
      this.synSize();
      const elem = this._element;
      if (!elem) {
        return false;
      }

      // console.log(this.visible)

      // if(this.visible && this.parent.visible){

      // }
      // 获取绑定物体
      let obj = this._parent;
      if (obj == null) {
        obj = this.app.root.defaultCampus;
      }

      // 如果物体已经被删除，则也一并删除自身
      if (obj.destroyed) {
        this.destroy();
        return false;
      }

      //如果物体显示且初始状态为显示
      if (obj.visible && this.initVisible) {
        delete this.initVisible;
        this.visible = true;
      }

      // 如果父物体是从隐藏->显示状态，并且 UI 是显示状态，那么就要同步显示处理
      if (this._prevParentVisible === false && obj.visible && this.visible) {
        delete this._prevParentVisible;
        this._autoUpdateVisible = true;
      }

      // 获取屏幕坐标
      const pos = this._position || obj.boundingBox.center;
      const offset = this._offset;
      const screenPosition = this.app.camera.worldToScreen([
        pos[0] + offset[0],
        pos[1] + offset[1],
        pos[2] + offset[2],
      ]);

      // 更新可见状态
      const style = elem.style;
      // console.log("gx",this._autoUpdateVisible)
      if (this._autoUpdateVisible) {
        if (!this._updateVisible(obj, style, screenPosition)) {
          return true;
        }
      }

      if (Utils.isNull(this._zIndex)) {
        //  2d时候会变成10000+ 强制设置成0
        if (this.app.camera.viewMode == 'topview') {
          style.zIndex = 10;
        } else {
          // 设置ui排序 zindex 1000 以内
          style.zIndex = 1000 - Math.ceil(screenPosition[2] * 10000 - 9900);
        }
      }

      // return

      // 计算轴心点
      const pivotOffset = [0, 0];
      // let width = elem.offsetWidth;
      // let height = elem.offsetHeight;

      // offsetWidth与offsetHeight 在屏幕缩放情况下会抖动
      // clientWidth与clientHeight 经测试同样出现这种情况
      let width = elem.clientWidth;
      let height = elem.clientHeight;

      // 下面采用设置宽高改动阈值的方案
      // 如果移动小于4个像素，使用cache的宽高，防止抖动bug
      // console.log("elem.cacheWidth - width",elem.cacheWidth,width)
      if (Math.abs(elem.cacheWidth - width) < 4 && Math.abs(elem.cacheHeight - height) < 4) {
        width = elem.cacheWidth;
        height = elem.cacheHeight;
      } else {
        elem.cacheWidth = width;
        elem.cacheHeight = height;
      }

      // 继续修正宽高
      width = width || this._customWidth;
      height = height || this._customHeight;

      // 轴心点 设置到 左下 中间位置
      pivotOffset[0] = Math.ceil(width * this._pivot[0]);
      pivotOffset[1] = Math.ceil(height * this._pivot[1]);
      // 如果用户的 3d标签不在 左上角,需要处理边缘 的差值
      var offsetWidth =
        this.app.domElement.offsetLeft - (elem.parentElement ? elem.parentElement.offsetLeft : 0);
      var offsetHeight =
        this.app.domElement.offsetTop - (elem.parentElement ? elem.parentElement.offsetTop : 0);
      var left = Math.floor(screenPosition[0] - pivotOffset[0] + offsetWidth);
      var top = Math.floor(screenPosition[1] - pivotOffset[1] + offsetHeight);
      if (elem.cacheLeft != left) {
        elem.cacheLeft = left;
        style.left = left + this.offsetLeft + 'px';
      }
      if (elem.cacheTop != top) {
        elem.cacheTop = top;
        style.top = top + this.offsetTop + 'px';
      }
      return true;
    }

    synSize() {
      // if (!this._keepSize) {
      //   /** 根据摄像机与物体的距离计算缩放比例，以及left和top的偏移比例 */
      //   let distance = Utils.parseVector3(this.app.camera.position).distanceTo(Utils.parseVector3(this.parent.position));
      //   //   distance = Math.floor(distance)
      //   if (this._element) {
      //     let scale = 84 / distance / 3;
      //     if (scale < 0.1) this._element.style.display = 'none';
      //     else this._element.style.display = 'block';
      //     if (scale > 1.6) scale = 1.6;
      //     // else if (scale < 0.3) scale = 0.3;
      //     // console.log(this._scaleSize);
      //     this._element.style.transform = `scale(${this._scaleSize * scale})`;
      //     // this._element.style.transformOrigin = `${x} ${y}`;
      //     if (scale > 1) {
      //       this.offsetTop = this._offsetTop - scale * 10;
      //       this.offsetLeft = this._offsetLeft - scale * 15;
      //     } else if (scale <= 0.3) {
      //       this.offsetTop = this._offsetTop - scale * 30 - 10;
      //       this.offsetLeft = this._offsetLeft - scale * 45 - 20;
      //     } else if (scale <= 0.15) {
      //       this.offsetTop = this._offsetTop - scale * 100;
      //       this.offsetLeft = this._offsetLeft - scale * 200;
      //     } else {
      //       this.offsetTop = this._offsetTop - scale * 10;
      //       this.offsetLeft = this._offsetLeft - scale * 15;
      //     }
      //   }
      // } else {
      /** 需要计算keepSize为true时，缩放后顶牌要保持的位置 */
      // if (this._element) {
      //   let distance = Utils.parseVector3(this.app.camera.position).distanceTo(Utils.parseVector3(this.parent.position));
      //   let scale = 84 / distance / 3;
      //   this.offsetTop = this._offsetTop - scale * 100;
      // }
      // }
    }

    /**
     * 销毁 UIAnchorPlus
     * @example
     * uiAnchor.destroy();
     */
    destroy() {
      if (this._element) {
        if (this._autoRemoveElement) {
          var parentNode = this._element.parentNode;
          if (parentNode) {
            parentNode.removeChild(this._element);
          }
        } else {
          this._element._setVisible(false);
        }
      }

      super.destroy.call(this);
    }

    set zIndex(value) {
      this._zIndex = value;

      if (!Utils.isNull(value)) {
        if (this._element) {
          this._element.style.zIndex = value;
        }
      }
    }

    get zIndex() {
      if (!Utils.isNull(this._zIndex)) {
        return this._zIndex;
      }

      if (this._element) {
        return this._element?.style.zIndex;
      }

      return null;
    }

    /**
     * 设置/获取 锚点位置
     * @type {Array<Number>}
     */
    set pivot(value) {
      this._pivot = value;
    }
    get pivot() {
      return this._pivot.concat();
    }

    /**
     * 设置/获取 锚点像素位置
     * @type {Array<Number>}
     */
    set pivotPixel(value) {
      var elem = this._element;
      var width = elem.offsetWidth;
      var height = elem.offsetHeight;

      this._pivot = [value[0] / width, value[1] / height];
    }
    get pivotPixel() {
      var elem = this._element;
      var width = elem.offsetWidth;
      var height = elem.offsetHeight;

      return [Math.floor(this._pivot[0] * width), Math.floor(this._pivot[1] * height)];
    }

    /**
     * 设置/获取 世界坐标位置
     * @private
     * @type {Array<Number>}
     */
    set position(value) {
      this._position = value;
    }
    get position() {
      return this._position.concat();
    }

    /**
     * 设置/获取 偏移量
     * @private
     * @type {Array<Number>}
     */
    set offset(value) {
      this._offset = value;
    }
    get offset() {
      return this._offset.concat();
    }

    /**
     * 设置/获取 是否自动删除 element 元素
     * @private
     * @type {Boolean}
     */
    set autoRemoveElement(value) {
      this._autoRemoveElement = value;
    }
    get autoRemoveElement() {
      return this._autoRemoveElement;
    }

    /**
     * 设置/获取 是否显示/隐藏
     * @type {Boolean}
     * @example
     * UIAnchorPlus.visible = false;
     */
    set visible(value) {
      var obj = this._parent;
      if (!obj) {
        return;
      }
      // 在父物体隐藏的情况下，单独控制 UI 控件的显示
      if (value && !obj.visible) {
        this._prevParentVisible = false;
        this._autoUpdateVisible = false;
      } else {
        this._autoUpdateVisible = value;
      }
      setTimeout(() => {
        if (this.initVisible && !obj.visible) {
          this._element.style.visibility = 'hidden';
          if (obj.visible) {
            delete this.initVisible;
          }
        } else {
          this._element.style.visibility = value ? 'visible' : 'hidden';
        }
      }, 0);
    }
    get visible() {
      return this._element?.style.visibility == 'visible';
    }
    set opacity(value) {
      console.log('设置', value);
      this._style.opacity = value;
    }

    get scaleSize() {
      return this._scaleSize;
    }

    set scaleSize(value) {
      this._scaleSize = value;
    }
  }
  THING.factory.registerClass('UIAnchor', UIAnchorPlus);
};

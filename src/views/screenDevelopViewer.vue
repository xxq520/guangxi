<template>
  <div
    ref="container"
    class="dz-viewer-container"
    @mousedown="setMoveStart($event)"
    @mousemove="setMoveAfter($event)"
    @mouseup="cancelMoving"
    @wheel="scaleScroll($event)"
    @click="showHelper = false"
  >
    <div ref="transformer" class="dz-viewer-transformer" :style="transformStyle">
      <div ref="sizer" class="dz-viewer-sizer">
        <screenAgent />
      </div>
    </div>
    <div v-if="showMask" class="dz-viewer-mask"></div>
    <div class="dz-viewer-zoom-bar">
      <a title="放大" @click="scaleButton(1)">
        <svg
          t="1618110673618"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2200"
          width="20"
          height="20"
        >
          <path
            d="M697.40544 581.55008l179.712 179.73248a81.92 81.92 0 1 1-115.83488 115.83488l-179.73248-179.712A305.80736 305.80736 0 0 1 430.08 737.28c-169.65632
            0-307.2-137.54368-307.2-307.2 0-169.65632 137.54368-307.2 307.2-307.2 169.65632 0 307.2 137.54368 307.2 307.2 0 55.0912-14.49984 106.76224-39.87456
            151.47008zM430.08 655.36c124.416 0 225.28-100.864 225.28-225.28s-100.864-225.28-225.28-225.28-225.28 100.864-225.28 225.28 100.864 225.28 225.28
            225.28z m-40.96-266.24v-61.44a40.96 40.96 0 1 1 81.92 0v61.44h61.44a40.96 40.96 0 1 1 0 81.92h-61.44v61.44a40.96 40.96 0 1 1-81.92 0v-61.44h-61.44a40.96
            40.96 0 1 1 0-81.92h61.44z"
            p-id="2201"
            fill="#ffffff"
          />
        </svg>
      </a>
      <a title="缩小" @click="scaleButton(-1)">
        <svg
          t="1618110781677"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3897"
          width="20"
          height="20"
        >
          <path
            d="M697.40544 581.55008l179.712 179.73248a81.92 81.92 0 1 1-115.83488 115.83488l-179.73248-179.712A305.80736 305.80736 0 0 1 430.08
          737.28c-169.65632 0-307.2-137.54368-307.2-307.2 0-169.65632 137.54368-307.2 307.2-307.2 169.65632 0 307.2 137.54368 307.2 307.2 0 55.0912-14.49984
          106.76224-39.87456 151.47008zM430.08 655.36c124.416 0 225.28-100.864 225.28-225.28s-100.864-225.28-225.28-225.28-225.28 100.864-225.28 225.28
          100.864 225.28 225.28 225.28z m102.4-266.24a40.96 40.96 0 1 1 0 81.92H327.68a40.96 40.96 0 1 1 0-81.92h204.8z"
            p-id="3898"
            fill="#ffffff"
          />
        </svg>
      </a>
      <div class="dz-viewer-scale-text">x {{ scaleRecord }}</div>
    </div>
    <a class="dz-viewer-reset" title="重置到适应屏幕大小" @click="resetMatrix">
      <svg
        t="1618110565038"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2031"
        width="20"
        height="20"
      >
        <path
          d="M672 144v64H832v96h64v-160zM192 720H128v160h224v-64H192zM128 304h64v-96h160v-64H128zM832 816h-160v64H896v-160h-64z"
          fill="#ffffff"
          p-id="2032"
        />
      </svg>
    </a>
    <a class="dz-viewer-helper" title="帮助" @click.stop="showHelper = true">
      <n-icon size="20">
        <QuestionCircle16Filled />
      </n-icon>
    </a>
    <transition name="fade">
      <div v-if="showHelper" class="dz-viewer-helper-content" @click.stop="showHelper = true">
        <h2>快捷键操作说明</h2>
        <p>
          <span>放大缩小</span> <span><i>ctrl + 滚动鼠标滚轮</i></span>
        </p>
        <p>
          <span>放大缩小<sup>speed+</sup></span>
          <span><i>shift + 滚动鼠标滚轮</i></span>
        </p>
        <p>
          <span>移动屏幕</span> <span><i>space + 移动鼠标</i></span>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import { compose, fromObject, scale, toCSS, translate } from 'transformation-matrix';
import { provide, ref } from 'vue';

import QuestionCircle16Filled from '@vicons/fluent//QuestionCircle16Filled';
import { screenAgent } from '../screenCore';
let isSpacePress = false;
let isMoving = false;

export default {
  name: 'screenDevelopViewer',
  components: {
    screenAgent,
    QuestionCircle16Filled,
  },
  inject: ['updateScreenDevStyle'],
  setup() {
    const screenBox = ref({});
    provide('extendScreenBox', (name, value) => {
      screenBox.value[name] = value;
    });
    return {
      screenBox,
    };
  },
  data() {
    return {
      matrix: fromObject({
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0,
      }),
      transformStyle: {
        transformOrigin: '50% 50%',
        transform: `matrix(${[1, 0, 0, 1, 0, 0].join()})`,
      },
      adjustScreenTop: 0,
      adjustScreenLeft: 0,
      beforeMovingMatrix: null,
      movingBefore: {
        top: 0,
        left: 0,
      },
      movingAfter: {
        top: 0,
        left: 0,
      },
      moveOrigin: [],
      moveTimestamp: 0,
      moveRecordTop: 0,
      moveRecordLeft: 0,
      scaleRecord: 1,
      showHelper: false,
      showMask: false,
    };
  },
  watch: {
    transformStyle: {
      deep: true,
      handler() {
        this.updateScreenDevStyle && this.updateScreenDevStyle(this.transformStyle);
      },
    },
  },
  mounted() {
    this.initMatrix();
    window.addEventListener('resize', () => {
      this.$nextTick(() => {
        const topDistance = Math.ceil((window.innerHeight - this.$refs.sizer.offsetHeight) / 2);
        const leftDistance = Math.ceil((window.innerWidth - this.$refs.sizer.offsetWidth) / 2);
        if (
          this.moveRecordTop === this.adjustScreenTop &&
          this.moveRecordLeft === this.adjustScreenLeft
        ) {
          this.matrix = compose(
            fromObject({
              a: 1,
              b: 0,
              c: 0,
              d: 1,
              e: 0,
              f: 0,
            }),
            scale(this.scaleRecord)
            // translate(leftDistance, topDistance)
          );
          this.transformStyle.transform = toCSS(this.matrix);
          this.moveRecordTop = topDistance;
          this.moveRecordLeft = leftDistance;
        }
        this.adjustScreenLeft = leftDistance;
        this.adjustScreenTop = topDistance;
      });
    });
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        isSpacePress = true;
        if (this.$refs.container && !isMoving) {
          this.$refs.container.style.cursor = 'grab';
        } else if (this.$refs.transformer && isMoving) {
          this.$refs.container.style.cursor = 'grabbing';
        }
        this.showMask = true;
      }
      if (e.key === 'Control') {
        if (this.$refs.container) {
          this.$refs.container.style.cursor = 'zoom-in';
        }
        this.showMask = true;
      }
    });
    window.addEventListener('keyup', () => {
      isSpacePress = false;
      if (this.$refs.transformer) {
        this.$refs.container.style.cursor = 'default';
      }
      this.cancelMoving();
      this.showMask = false;
    });
    document.body.style.backgroundColor = '#131313';
  },
  methods: {
    initMatrix() {
      this.matrix = compose(this.matrix, translate(0, 0));
      this.transformStyle.transform = toCSS(this.matrix);
      this.adjustScreenLeft = 0;
      this.adjustScreenTop = 0;
      this.moveRecordTop = 0;
      this.moveRecordLeft = 0;
      setTimeout(() => {
        this.$refs.transformer.style.transition = 'transform 0.2s';
      }, 300);
    },
    resetMatrix() {
      this.matrix = compose(
        fromObject({
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: 0,
          f: 0,
        }),
        translate(this.adjustScreenLeft, this.adjustScreenTop)
      );
      this.transformStyle.transform = toCSS(this.matrix);
      this.scaleRecord = 1;
    },
    setMoveStart(e) {
      if (!isSpacePress) return;
      this.movingBefore.top = e.clientY;
      this.movingBefore.left = e.clientX;
      isMoving = true;
      this.beforeMovingMatrix = this.matrix;
    },
    setMoveAfter(e) {
      if (!isSpacePress) return;
      if (!isMoving) return;
      this.$refs.container.style.cursor = 'grabbing';
      if (this.moveTimestamp && Date.now() - this.moveTimestamp < 50) return;
      this.moveTimestamp = Date.now();
      this.movingAfter.top = e.clientY;
      this.movingAfter.left = e.clientX;
      this.matrix = compose(
        this.beforeMovingMatrix,
        translate(
          (this.movingAfter.left - this.movingBefore.left) / this.scaleRecord,
          (this.movingAfter.top - this.movingBefore.top) / this.scaleRecord
        )
      );
      this.transformStyle.transform = toCSS(this.matrix);
    },
    cancelMoving() {
      isMoving = false;
      if (this.moveTimestamp) {
        this.moveRecordLeft -= this.movingBefore.left - this.movingAfter.left;
        this.moveRecordTop -= this.movingBefore.top - this.movingAfter.top;
        this.moveTimestamp = null;
        this.beforeMovingMatrix = null;
      }
    },
    scaleScroll(e) {
      if (!e.ctrlKey && !e.shiftKey) return;
      e.preventDefault();
      const scaleTimes = e.shiftKey ? 0.2 : 0.05;
      const ps = e.wheelDelta > 0 ? 1 : -1;
      const resetNum = 1 / this.scaleRecord;
      this.scaleRecord = Number((this.scaleRecord + ps * scaleTimes).toFixed(5));
      this.matrix = compose(this.matrix, scale(Number((this.scaleRecord * resetNum).toFixed(5))));
      this.transformStyle.transform = toCSS(this.matrix);
    },
    scaleButton(ps) {
      const resetNum = 1 / this.scaleRecord;
      this.scaleRecord = Number((this.scaleRecord + ps * 0.1).toFixed(5));
      this.matrix = compose(this.matrix, scale(Number((this.scaleRecord * resetNum).toFixed(5))));
      this.transformStyle.transform = toCSS(this.matrix);
    },
  },
};
</script>

<style lang="scss" scoped>
.dz-viewer-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .dz-viewer-transformer {
    pointer-events: all;
  }

  .dz-viewer-mask {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .dz-viewer-zoom-bar {
    position: absolute;
    right: 25px;
    bottom: 40px;
    width: 30px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    display: flex;
    padding-top: 5px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    opacity: 0.15;
    transition: opacity 0.2s;
  }

  &:hover {
    opacity: 1;
  }

  a {
    cursor: pointer;
    display: block;
    transition: opacity 0.2s;
    &:active {
      opacity: 0.5;
    }
  }

  .dz-viewer-scale-text {
    width: 50px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
    text-align: center;
    font-size: 18px;
    color: #fff;
  }

  .dz-viewer-reset {
    position: absolute;
    right: 25px;
    bottom: 150px;
    width: 30px;
    display: block;
    text-align: center;
    opacity: 0.15;
    transition: opacity 0.2s;
    &:hover {
      opacity: 1;
    }

    &:active {
      opacity: 0.5;
    }
  }

  .dz-viewer-helper {
    position: absolute;
    right: 25px;
    bottom: 190px;
    width: 30px;
    display: block;
    text-align: center;
    font-size: 25px;
    opacity: 0.15;
    transition: opacity 0.2s;
    color: #fff;
    &:hover {
      opacity: 1;
    }

    &:active {
      opacity: 0.5;
    }
  }

  .dz-viewer-helper-content {
    position: absolute;
    width: 25vw;
    height: 20vh;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.23);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 5px;
    p {
      width: 100%;
      font-size: 16px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      span {
        width: 50%;
      }

      span:nth-of-type(2) {
        text-align: right;
      }
    }

    h2 {
      font-size: 18px;
      color: #ddd;
      position: relative;
    }
  }
}
</style>

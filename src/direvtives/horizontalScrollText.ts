import {DirectiveBinding} from 'vue';

export const vHorizontalScrollText = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const container = el; // 滚动容器
    const content = document.createElement('span'); // 滚动内容
    content.innerText = binding.value;
    content.style.display = 'block';
    el.style.overflow = 'hidden';
    el.style.whiteSpace = 'nowrap';
    el.append(content);
    const speed = Number(binding.arg) || 50; // 获取滚动的速度（如果未传递，默认为 50）

    if (!hasKeyframesAnimation('directiveHorizontalScrollAnimate')) {
      const style = document.createElement('style');
      style.innerText = `
        @keyframes directiveHorizontalScrollAnimate {
          0% {
              transform: translateX(0);
            }
          100% {
              transform: translateX(-100%);
          }
        }
      `;
      document.head.append(style);
    }
    // 获取容器和内容的宽度
    const containerWidth = container.clientWidth;
    const contentWidth = content.scrollWidth;
    // 如果内容宽度大于容器宽度，实现滚动效果
    if (contentWidth > containerWidth) {
      // 动态设置滚动动画的时长
      content.style.animationDuration = `${contentWidth / speed}s`;
      // 设置滚动动画
      content.style.animationName = 'directiveHorizontalScrollAnimate';
      // 设置滚动动画的重复模式
      content.style.animationIterationCount = 'infinite';
      // 设置动画曲线，这里用线性效果
      content.style.animationTimingFunction = 'linear';
    }
  },
};

function hasKeyframesAnimation(animationName: string) {
  const styleSheets = document.styleSheets;
  const styleSheetArray = Array.from(styleSheets) as CSSStyleSheet[];

  if (styleSheets) {
    for (const styleSheet of styleSheetArray) {
      try {
        const rules = styleSheet.rules || styleSheet.cssRules;
        if (rules) {
          const rulesArray = Array.from(rules) as CSSStyleRule[];
          for (const rule of rulesArray) {
            if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === animationName) {
              return true;
            }
          }
        }
      } catch (error) {
        console.error("Error accessing CSS rules:", error);
      }
    }
  }
  return false;
}

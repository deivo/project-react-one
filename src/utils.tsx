/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// 上拉加载
export function loadMore(element: HTMLDivElement, callback: Function) {
  function _loadMore() {
    const clientHeight = element.clientHeight; // 容器高度
    const scrollTop = element.scrollTop; // 内容卷去的高度
    const scrollHeight = element.scrollHeight; // 内容的高度
    if (clientHeight + scrollTop + 10 >= scrollHeight) {
      callback();
    }
  }
  element.addEventListener('scroll', debounce(_loadMore, 300));
}

// 防抖
export function debounce(callback: Function, wait: number) {
  let timeout: any;
  return function () {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!timeout) clearTimeout(timeout);
    timeout = setTimeout(callback, wait);
  }
}

// 下拉刷新
export function downRefresh(element: HTMLDivElement, callback: Function) {
  let startY: number;//变量，存放下拉时候起始坐标
  let distance: number; // 本次下拉的距离
  const originalTop = element.offsetTop;
  let startTop: number;
  element.addEventListener('touchstart', (event: TouchEvent) => {
    startTop = element.offsetTop; // 元素初始top值
    startY = event.touches[0].pageY; // 开始按下的时候的纵坐标
    const touchMove = throttle(_touchMove, 300);
    element.addEventListener('touchmove', touchMove);
    element.addEventListener('touchend', touchEnd);
    function _touchMove(event: TouchEvent) {
      const pageY = event.touches[0].pageX; // 移动过程中最新的纵坐标
      if (pageY > startY) {
        distance = pageY - startY;
        element.style.top = startTop + distance + 'px';
      } else {
        element.removeEventListener('touchmove', touchMove);
        element.removeEventListener('touchend', touchEnd);
      }
    }
    function touchEnd(event: TouchEvent) {
      element.removeEventListener('touchmove', touchMove);
      element.removeEventListener('touchend', touchEnd);
      if (distance > 50) {
        callback();
      }
      function _back() {
        const currentTop = element.offsetTop;
        if (currentTop - originalTop >= 1) {
          element.style.top = (currentTop - 1) + 'px';
          requestAnimationFrame(_back);
        } else {
          element.style.top = '';
        }
      }
      requestAnimationFrame(_back)
    }
  })
}

// 节流
export function throttle(func: Function, delay: number) {
  let prev = Date.now();
  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now(); // 每次执行节流函数的时候，取出最新的时间
    if (now - prev >= delay) { // 减去上次执行的时候，如果已经超过delay，就在执行一次
      // eslint-disable-next-line no-debugger
      // debugger
      func.apply(context, args);
      prev = now;
    }
  }
}
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// 下拉更新
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
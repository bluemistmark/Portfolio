/**
 * debounce.js
 * 연속 호출을 지연시켜 마지막 호출만 실행
 *
 * @param {Function} fn - 실행할 함수
 * @param {number} delay - 지연 시간 (ms)
 * @returns {Function}
 *
 * 사용 예시:
 * import { debounce } from '../utils/debounce.js';
 * window.addEventListener('resize', debounce(() => { ... }, 200));
 */
export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

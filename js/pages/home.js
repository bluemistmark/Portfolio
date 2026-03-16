/**
 * home.js
 * 홈 페이지 전용 초기화
 */
import { initTheme, toggleTheme, initHeaderScroll, observeFadeUp, initCountUp, initScrollSpy, initScrollToTop } from '../utils/common.js';
import { CodeSlider } from '../modules/codeSlider.js';

document.addEventListener('DOMContentLoaded', () => {
  // 테마 초기화
  initTheme();

  // 헤더 스크롤 감지
  initHeaderScroll();

  // 스크롤 진입 애니메이션
  observeFadeUp();

  // Hero 숫자 카운팅
  initCountUp();

  // 테마 토글 버튼
  const $themeToggle = document.querySelector('.header__theme-toggle');
  if ($themeToggle) {
    $themeToggle.addEventListener('click', toggleTheme);
  }

  // Before/After 드래그 슬라이더
  CodeSlider.init({ selector: '[data-slider]', initial: 50 });

  // 스크롤 스파이 (nav active 상태)
  initScrollSpy();

  // 스크롤 투 톱 버튼
  initScrollToTop();
});

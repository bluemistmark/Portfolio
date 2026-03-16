/**
 * common.js
 * 전역 공통 유틸 함수
 */

/**
 * 스크롤 진입 감지 — IntersectionObserver
 * .fade-up 요소에 .is-visible 클래스를 추가해 진입 애니메이션 실행
 *
 * 사용 예시:
 * import { observeFadeUp } from '../utils/common.js';
 * observeFadeUp();
 */
export function observeFadeUp() {
  const targets = document.querySelectorAll('.fade-up');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // 한 번 보이면 더 이상 관찰 불필요
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

/**
 * 테마 토글 (다크 ↔ 라이트)
 * data-theme 속성을 html 루트에 설정하고 localStorage에 저장
 *
 * 사용 예시:
 * import { initTheme, toggleTheme } from '../utils/common.js';
 * initTheme();
 * document.querySelector('.header__theme-toggle').addEventListener('click', toggleTheme);
 */
/**
 * 토글 버튼 aria-label 업데이트
 * 현재 테마에 따라 "라이트/다크 모드로 전환" 문구를 변경
 */
function updateToggleLabel(theme) {
  const $btn = document.querySelector('.header__theme-toggle');
  if (!$btn) return;
  $btn.setAttribute(
    'aria-label',
    theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'
  );
}

export function initTheme() {
  // localStorage에 저장된 테마 적용 (없으면 dark 기본)
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateToggleLabel(saved);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleLabel(next);
}

/**
 * 헤더 스크롤 감지 — .is-scrolled 클래스 토글
 *
 * 사용 예시:
 * import { initHeaderScroll } from '../utils/common.js';
 * initHeaderScroll();
 */
export function initHeaderScroll() {
  const $header = document.querySelector('.header');
  if (!$header) return;

  const handler = () => {
    $header.classList.toggle('is-scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', handler, { passive: true });
  handler(); // 초기 실행
}

/**
 * 숫자 카운팅 애니메이션 (Hero 수치용)
 * data-count 속성의 최종값까지 카운팅
 *
 * 사용 예시:
 * import { initCountUp } from '../utils/common.js';
 * initCountUp();
 */
export function initCountUp() {
  const targets = document.querySelectorAll('[data-count]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const end = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1200;
        const startTime = performance.now();

        const tick = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // easeOutExpo
          const eased = 1 - Math.pow(2, -10 * progress);
          el.textContent = Math.floor(eased * end) + suffix;

          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = end + suffix;
        };

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  targets.forEach((el) => observer.observe(el));
}

/**
 * 스크롤 스파이 — 현재 뷰포트에 보이는 섹션의 nav 링크에 .is-active 적용
 */
export function initScrollSpy() {
  const $navLinks = document.querySelectorAll('.header__nav-link');
  if (!$navLinks.length) return;

  const sections = Array.from($navLinks).map(($link) => {
    const id = $link.getAttribute('href')?.replace('#', '');
    return { $link, $section: id ? document.getElementById(id) : null };
  }).filter(({ $section }) => $section);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const matched = sections.find(({ $section }) => $section === entry.target);
        if (!matched) return;
        if (entry.isIntersecting) {
          $navLinks.forEach(($l) => $l.classList.remove('is-active'));
          matched.$link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-10% 0px -60% 0px', threshold: 0 }
  );

  sections.forEach(({ $section }) => observer.observe($section));
}

/**
 * 스크롤 투 톱 버튼 — 300px 이상 스크롤 시 노출
 */
export function initScrollToTop() {
  const $btn = document.querySelector('.scroll-top');
  if (!$btn) return;

  const handler = () => {
    $btn.classList.toggle('is-visible', window.scrollY > 300);
  };

  window.addEventListener('scroll', handler, { passive: true });
  handler();

  $btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

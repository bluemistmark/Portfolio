/**
 * tab.js
 * 탭 컴포넌트
 *
 * 사용 예시:
 * import { Tab } from '../modules/tab.js';
 * Tab.init({ selector: '.tab' });
 *
 * HTML 구조:
 * <div class="tab">
 *   <ul class="tab__list" role="tablist">
 *     <li><button class="tab__btn is-active" role="tab" aria-selected="true" data-tab="panel-1">탭1</button></li>
 *     <li><button class="tab__btn" role="tab" aria-selected="false" data-tab="panel-2">탭2</button></li>
 *   </ul>
 *   <div class="tab__panel is-active" id="panel-1" role="tabpanel">내용1</div>
 *   <div class="tab__panel" id="panel-2" role="tabpanel">내용2</div>
 * </div>
 */
export const Tab = {
  /**
   * @param {Object} config
   * @param {string} config.selector - 탭 래퍼 선택자 (기본값: '.tab')
   */
  init({ selector = '.tab' } = {}) {
    const $tabs = document.querySelectorAll(selector);
    if (!$tabs.length) return;

    $tabs.forEach(($tab) => {
      const $btns = $tab.querySelectorAll('.tab__btn');

      $btns.forEach(($btn) => {
        $btn.addEventListener('click', () => {
          const targetId = $btn.getAttribute('data-tab');

          // 버튼 상태 갱신
          $btns.forEach((b) => {
            b.classList.remove('is-active');
            b.setAttribute('aria-selected', 'false');
          });
          $btn.classList.add('is-active');
          $btn.setAttribute('aria-selected', 'true');

          // 패널 상태 갱신
          $tab.querySelectorAll('.tab__panel').forEach((panel) => {
            panel.classList.remove('is-active');
          });
          $tab.querySelector(`#${targetId}`)?.classList.add('is-active');
        });
      });
    });
  },
};

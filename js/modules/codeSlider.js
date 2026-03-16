/**
 * codeSlider.js
 * Before / After 코드 비교 드래그 슬라이더
 *
 * 사용 예시:
 * import { CodeSlider } from '../modules/codeSlider.js';
 * CodeSlider.init();
 *
 * HTML 구조:
 * <div class="code-slider" data-slider>
 *   <div class="code-slider__pane code-slider__pane--before"> ... </div>
 *   <div class="code-slider__pane code-slider__pane--after"> ... </div>
 *   <div class="code-slider__handle" role="separator" tabindex="0" aria-label="슬라이더 핸들">
 *     <div class="code-slider__handle-line"></div>
 *     <div class="code-slider__handle-icon"> ... </div>
 *   </div>
 * </div>
 */
export const CodeSlider = {
  /**
   * @param {Object} config
   * @param {string} config.selector - 슬라이더 래퍼 선택자 (기본값: '[data-slider]')
   * @param {number} config.initial  - 초기 분할 위치 % (기본값: 50)
   */
  init({ selector = '[data-slider]', initial = 50 } = {}) {
    const $sliders = document.querySelectorAll(selector);
    if (!$sliders.length) return;
    $sliders.forEach(($slider) => this._bind($slider, initial));
  },

  _bind($slider, initial) {
    const $handle = $slider.querySelector('.code-slider__handle');
    if (!$handle) return;

    let isDragging = false;

    // CSS Custom Property로 분할 위치 제어
    const setPosition = (percent) => {
      const clamped = Math.min(Math.max(percent, 0), 100);
      $slider.style.setProperty('--split', `${clamped}%`);
    };

    const getPercent = (clientX) => {
      const rect = $slider.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    };

    // 초기 위치 설정
    setPosition(initial);

    // S: 마우스 이벤트
    $handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      $slider.classList.add('is-dragging');
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setPosition(getPercent(e.clientX));
    });

    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      $slider.classList.remove('is-dragging');
    });
    // E: 마우스 이벤트

    // S: 터치 이벤트
    $handle.addEventListener('touchstart', (e) => {
      isDragging = true;
      $slider.classList.add('is-dragging');
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setPosition(getPercent(e.touches[0].clientX));
    }, { passive: true });

    document.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      $slider.classList.remove('is-dragging');
    });
    // E: 터치 이벤트

    // S: 키보드 접근성 (←/→ 5%씩 이동)
    $handle.addEventListener('keydown', (e) => {
      const current = parseFloat(
        getComputedStyle($slider).getPropertyValue('--split')
      ) || initial;

      if (e.key === 'ArrowLeft')  setPosition(current - 5);
      if (e.key === 'ArrowRight') setPosition(current + 5);
    });
    // E: 키보드 접근성
  },
};

# Portfolio — Front-end Publisher

> 유지보수 가능한 코드 구조를 만드는 퍼블리셔

## 소개

저축은행중앙회 디지털뱅킹시스템을 5년 6개월간 1인으로 리딩한 프리랜서 퍼블리셔 포트폴리오입니다.
단순 작업물 나열이 아닌, 어떤 문제를 어떻게 판단하고 해결했는지를 보여줍니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| 마크업 | HTML5 (웹 표준·접근성 준수) |
| 스타일 | SCSS (7-1 패턴) |
| 스크립트 | Vanilla JS (ES Modules, export/import) |
| 배포 | GitHub Pages |

## 프로젝트 구조

```
portfolio/
├── css/
│   └── scss/
│       ├── abstracts/       # 변수, 믹스인, 함수 (코드 출력 없음)
│       ├── base/            # 리셋, 타이포그래피, 전역 공통
│       ├── components/      # 재사용 UI 컴포넌트 (버튼, 카드 등)
│       ├── layout/          # 헤더, 푸터, 그리드
│       ├── modules/         # 컴포넌트 조립 단위
│       ├── pages/           # 페이지별 전용 스타일
│       ├── themes/          # 다크/라이트 모드 CSS Custom Properties
│       ├── vendors/         # 외부 라이브러리 커스텀
│       └── main.scss        # 최종 Import 파일
├── fonts/
├── html/
├── img/
├── js/
│   ├── modules/             # 공통 UI 기능 모듈 (tab, accordion 등)
│   ├── pages/               # 페이지별 초기화
│   └── utils/               # 공통 유틸 (debounce, 테마, 스크롤 등)
└── index.html
```

## SCSS 설계 원칙

- **7-1 패턴** 적용: 역할별 폴더 분리로 코드 간 간섭 차단
- **중첩 최대 3단**: 과도한 특이성(specificity) 방지
- **속성 작성 순서 통일**: 믹스인 → 레이아웃 → 타이포 → 배경 → 기타
- **CSS Custom Properties**: 다크/라이트 테마 변수 분리 관리

## JS 설계 원칙

- **ES Modules**: 역할별 파일 분리, export/import 명시적 관리
- **선택자 캐싱**: 반복 DOM 탐색 방지
- **config 객체**: 모듈 호출 시 옵션을 객체로 전달해 유연성 확보

## 로컬 실행

SCSS 컴파일이 필요합니다.

```bash
# sass 설치
npm install -g sass

# 감시 모드로 컴파일
sass --watch css/scss/main.scss css/main.css
```

## 라이선스

© 2025 Lee. All rights reserved.

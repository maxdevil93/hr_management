# ERP System

종합적인 기업 자원 관리 시스템입니다.

## 기능

### 핵심 모듈
- **재고 관리** - 상품 재고를 효율적으로 관리
- **판매 관리** - 주문과 판매를 체계적으로 관리
- **구매 관리** - 구매 프로세스 및 공급업체 관리
- **재무 관리** - 재무 현황과 회계 관리
- **인사관리** - 직원 정보와 조직 현황 관리
- **인사정보** - 개인 프로필과 이력 관리
- **사내공지** - 회사 전체 공지사항 관리
- **부서공지** - 부서별 공지사항 관리
- **일정관리** - 프로젝트별 인원 배치와 일정 관리
- **결재관리** - 결재 요청 및 승인 프로세스 관리

### 추가 기능
- **대시보드** - 전체 비즈니스 현황을 한눈에 확인
- **채팅** - 실시간 팀 커뮤니케이션
- **즐겨찾기** - 자주 사용하는 페이지 빠른 액세스
- **반응형 디자인** - 데스크톱과 모바일 지원

## 기술 스택

- **Frontend**: React 18, TypeScript
- **UI Framework**: Tailwind CSS v4
- **UI Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build Tool**: Vite
- **Animation**: Motion (Framer Motion)

## 폴더 구조

```
├── components/
│   ├── approval/          # 결재관리
│   ├── auth/             # 인증
│   ├── chat/             # 채팅
│   ├── hr/               # 인사 관련
│   ├── notices/          # 공지사항
│   ├── schedule/         # 일정관리
│   └── ui/               # UI 컴포넌트
├── styles/               # 스타일시트
├── guidelines/           # 가이드라인
└── App.tsx              # 메인 애플리케이션
```

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

## 개발 가이드

### 컴포넌트 구조
- 각 모듈별로 폴더 구분
- UI 컴포넌트는 `/components/ui`에 위치
- 재사용 가능한 컴포넌트 우선 설계

### 스타일링
- Tailwind CSS v4 사용
- 커스텀 CSS 변수로 테마 관리
- 다크모드 지원

### 타입스크립트
- 엄격한 타입 검사 적용
- 인터페이스 기반 데이터 모델링
- 타입 안정성 보장

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 라이선스

MIT License
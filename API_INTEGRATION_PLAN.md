# Maru 프론트엔드 - FamTalk 백엔드 API 연동 계획

## 🎯 바로 연동 가능한 기능들

### 1. **가족 코드 관리** ⭐ (가장 간단)
**위치**: `pages/main/index.tsx`
- 현재: 클라이언트에서 랜덤 생성
- API 연동:
  - `POST /api/family/code` - 가족 코드 생성
  - `GET /api/family/code/:code` - 가족 코드 검증
  - `POST /api/family/join` - 가족 코드로 가족 참여

### 2. **가족 구성원 관리** ⭐⭐ (중요)
**위치**: `pages/profile/index.tsx`, `pages/setup/InitialSetupPage*.tsx`
- 현재: localStorage에만 저장
- API 연동:
  - `GET /api/family/members` - 가족 구성원 목록 조회
  - `POST /api/family/members` - 가족 구성원 추가
  - `PUT /api/family/members/:id` - 가족 구성원 수정
  - `DELETE /api/family/members/:id` - 가족 구성원 삭제

### 3. **추억(메모리) 관리** ⭐⭐⭐ (핵심 기능)
**위치**: `pages/feed/index.tsx`
- 현재: 메모리 상태로만 관리 (새로고침 시 사라짐)
- API 연동:
  - `GET /api/memories` - 추억 목록 조회 (전체/가족/인기)
  - `POST /api/memories` - 추억 추가
  - `PUT /api/memories/:id` - 추억 수정
  - `DELETE /api/memories/:id` - 추억 삭제
  - `POST /api/memories/:id/like` - 좋아요
  - `POST /api/memories/:id/comments` - 댓글 추가
  - `DELETE /api/memories/:id/comments/:commentId` - 댓글 삭제

### 4. **질문 카드** ⭐ (간단)
**위치**: `pages/cards/QuestionCards.tsx`
- 현재: 하드코딩된 질문 배열
- API 연동:
  - `GET /api/questions` - 질문 목록 조회
  - `GET /api/questions/random` - 랜덤 질문 조회

### 5. **공통 취향 분석** ⭐⭐
**위치**: `pages/profile/index.tsx` (공통 취향 발견)
- 현재: 클라이언트에서 계산
- API 연동:
  - `GET /api/family/common-tastes` - 공통 취향 분석

## 🚀 우선순위별 구현 순서

### Phase 1: 기본 기능 (가장 빠르게)
1. ✅ 가족 코드 생성/검증
2. ✅ 질문 카드 조회

### Phase 2: 핵심 기능
3. ✅ 가족 구성원 CRUD
4. ✅ 추억 CRUD (추가, 조회)

### Phase 3: 상호작용 기능
5. ✅ 좋아요/댓글
6. ✅ 공통 취향 분석


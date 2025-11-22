# 쉽게 구현 가능한 API 목록

## 🟢 가장 쉬운 API (우선 추천)

### 1. **질문 카드 API** ⭐ (매우 쉬움)
**현재 상태:**
- `pages/cards/questions.ts`에 하드코딩된 4개 질문만 있음
- 클라이언트에서 직접 배열 사용

**구현할 API:**
```
GET /api/questions
- 모든 질문 목록 반환

GET /api/questions/random
- 랜덤 질문 1개 반환

GET /api/questions/:id
- 특정 질문 조회
```

**구현 난이도:** ⭐ (매우 쉬움)
- 단순히 질문 배열을 반환하면 됨
- 나중에 DB 연동 시 확장 가능

---

### 2. **공통 취향 분석 API** ⭐⭐ (쉬움)
**현재 상태:**
- `pages/Interests/utils/findInterests.ts`에 이미 계산 로직 있음
- 클라이언트에서 계산 중

**구현할 API:**
```
POST /api/family/common-interests
- Request Body: { members: [{ id, name, interests: [] }] }
- Response: { commonInterests: [], topInterest: {...} }
```

**구현 난이도:** ⭐⭐ (쉬움)
- 기존 로직을 서버로 옮기기만 하면 됨
- findInterests.ts의 함수들을 서버에서 사용

---

## 🟡 중간 난이도 API

### 3. **추억(메모리) 관리 API** ⭐⭐⭐ (중간)
**현재 상태:**
- `pages/feed/index.tsx`에서 메모리 상태로만 관리
- 새로고침 시 사라짐

**구현할 API:**
```
GET /api/memories?familyCode=XXX&type=all|family|popular
- 추억 목록 조회

POST /api/memories
- 추억 추가

PUT /api/memories/:id
- 추억 수정

DELETE /api/memories/:id
- 추억 삭제

POST /api/memories/:id/like
- 좋아요 토글

POST /api/memories/:id/comments
- 댓글 추가

DELETE /api/memories/:id/comments/:commentId
- 댓글 삭제
```

**구현 난이도:** ⭐⭐⭐ (중간)
- CRUD 작업 필요
- 좋아요/댓글 기능 포함

---

## 📊 구현 우선순위 추천

1. **질문 카드 API** (가장 빠름, 10분)
2. **공통 취향 분석 API** (쉬움, 20분)
3. **추억 관리 API** (중간, 1-2시간)

---

## 💡 추가 아이디어

### 4. **가족 구성원 취향 업데이트 API**
```
PUT /api/family/:code/members/:memberId/interests
- 특정 구성원의 취향 업데이트
```

### 5. **추천 추억 생성 API**
```
POST /api/memories/recommend
- 공통 취향 기반 추억 추천
```


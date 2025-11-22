const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());

// CORS 허용 (프론트엔드와 연동을 위해)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // 개발 환경에서는 모든 origin 허용
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ============================================
// 가족 코드 관리 (메모리 기반 저장)
// ============================================
const families = new Map(); // { code: { code, createdAt, members: [] } }

// 가족 코드 생성 함수
function generateFamilyCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ============================================
// API 엔드포인트
// ============================================

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.post("/result", (req, res) => {
  const { answer } = req.body;
  res.json({ result: `당신의 답변은 ${answer} 입니다.` });
});

// 가족 코드 생성
app.post("/api/family/code", (req, res) => {
  let code;
  let attempts = 0;
  
  // 중복되지 않는 코드 생성
  do {
    code = generateFamilyCode();
    attempts++;
    if (attempts > 100) {
      return res.status(500).json({ error: "코드 생성 실패" });
    }
  } while (families.has(code));

  // 가족 그룹 생성
  families.set(code, {
    code,
    createdAt: new Date().toISOString(),
    members: [],
  });

  res.json({
    success: true,
    code,
    message: "가족 코드가 생성되었습니다.",
  });
});

// 가족 코드 검증
app.get("/api/family/code/:code", (req, res) => {
  const { code } = req.params;
  const family = families.get(code.toUpperCase());

  if (!family) {
    return res.status(404).json({
      success: false,
      error: "유효하지 않은 가족 코드입니다.",
    });
  }

  res.json({
    success: true,
    code: family.code,
    createdAt: family.createdAt,
    memberCount: family.members.length,
    message: "유효한 가족 코드입니다.",
  });
});

// 가족 코드로 가족 참여
app.post("/api/family/join", (req, res) => {
  const { code, member } = req.body;

  if (!code || !member) {
    return res.status(400).json({
      success: false,
      error: "가족 코드와 구성원 정보가 필요합니다.",
    });
  }

  const family = families.get(code.toUpperCase());

  if (!family) {
    return res.status(404).json({
      success: false,
      error: "유효하지 않은 가족 코드입니다.",
    });
  }

  // 구성원 추가
  const newMember = {
    id: family.members.length + 1,
    name: member.name,
    role: member.role,
    avatar: member.avatar || "👤",
    joinedAt: new Date().toISOString(),
  };

  family.members.push(newMember);

  res.json({
    success: true,
    message: "가족에 성공적으로 참여했습니다.",
    member: newMember,
    family: {
      code: family.code,
      memberCount: family.members.length,
    },
  });
});

// 가족 구성원 목록 조회
app.get("/api/family/:code/members", (req, res) => {
  const { code } = req.params;
  const family = families.get(code.toUpperCase());

  if (!family) {
    return res.status(404).json({
      success: false,
      error: "유효하지 않은 가족 코드입니다.",
    });
  }

  res.json({
    success: true,
    members: family.members,
    memberCount: family.members.length,
  });
});

// 정적 파일 서빙은 API 라우트 뒤에 배치 (API가 우선 처리되도록)
app.use(express.static(__dirname));

app.listen(3000, () => console.log("Server running on port 3000"));

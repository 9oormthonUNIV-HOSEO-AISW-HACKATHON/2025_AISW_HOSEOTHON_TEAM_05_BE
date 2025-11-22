const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());

// 정적 파일 서빙 (HTML 파일을 서버에서 제공)
app.use(express.static(__dirname));

// CORS 허용
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.post("/result", (req, res) => {
  const { answer } = req.body;
  res.json({ result: `당신의 답변은 ${answer} 입니다.` });
});

app.listen(3000, () => console.log("Server running on port 3000"));

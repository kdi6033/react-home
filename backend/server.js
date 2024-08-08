// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000' // 프론트엔드가 실행되는 주소
}));

app.get('/youtube', (req, res) => {
  const youtubeVideos = [
    { no: '0-1-0', title: '김동일 사이트 설명', link: 'https://youtu.be/8Hng5GouKKY' },
    // 다른 데이터...
  ];

  res.json(youtubeVideos);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

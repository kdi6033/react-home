//mongo-client.js
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const xlsx = require('xlsx');

const app = express();
const port = 5001; // 포트를 5001로 변경
const url = 'mongodb://127.0.0.1:27000';
const dbName = 'local';
const collectionName = 'localRecord';
const youtubeCollectionName = 'youtube';

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.get('/records', async (req, res) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const records = await collection.find({}).toArray();
    res.json(records);
  } catch (err) {
    res.status(500).send('Error connecting to MongoDB');
  } finally {
    await client.close();
  }
});

app.post('/record', async (req, res) => {
  const client = new MongoClient(url);
  const { email, mac } = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const record = await collection.findOne({ email, mac });
    res.json(record);
  } catch (err) {
    res.status(500).send('Error connecting to MongoDB');
  } finally {
    await client.close();
  }
});

app.post('/upsert', async (req, res) => {
  const client = new MongoClient(url);
  const { email, mac, temp } = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(
      { email, mac },
      { $set: { temp } },
      { upsert: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).send('Error connecting to MongoDB');
  } finally {
    await client.close();
  }
});

app.get('/youtube', async (req, res) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(youtubeCollectionName);
    const videos = await collection.find({}).toArray();
    res.json(videos);
  } catch (err) {
    res.status(500).send('Error connecting to MongoDB');
  } finally {
    await client.close();
  }
});

// 엑셀 파일 업로드 처리
app.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  const workbook = xlsx.read(file.data, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0]; // 첫 번째 시트 이름을 가져옴
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  if (data.length === 0) {
    return res.status(400).send('No data found in the uploaded file.');
  }

  // 첫 번째 행을 헤더로 사용하여 객체 배열로 변환
  const headers = data[0];
  const rows = data.slice(1);
  const formattedData = rows.map((row) => {
    return {
      no: row[0],
      title: row[1],
      link: row[2],
    };
  });

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(youtubeCollectionName);

    // 기존 데이터를 삭제하고 새 데이터를 삽입
    await collection.deleteMany({});
    await collection.insertMany(formattedData);
    res.send('File uploaded and data saved to MongoDB');
  } catch (error) {
    res.status(500).send('Error saving data to MongoDB');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

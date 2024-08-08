// mqtt-client.js
const mqtt = require('mqtt');
const { MongoClient } = require('mongodb');

const mqttBrokerUrl = 'mqtt://ai.doowon.ac.kr:1883';
const inTopic = 'i2r/kdi6033@gmail.com/out';
const mongoUrl = 'mongodb://127.0.0.1:27000';
const dbName = 'local';
const collectionName = 'localRecord';

// MQTT 클라이언트 설정
const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT Broker');
  mqttClient.subscribe(inTopic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${inTopic}`);
    } else {
      console.error(`Subscription error: ${err}`);
    }
  });
});

mqttClient.on('message', async (inTopic, message) => {
  const client = new MongoClient(mongoUrl);

  try {
    const payload = JSON.parse(message.toString());
    console.log(`Received message: ${message.toString()}`);

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // MongoDB에 데이터 삽입 또는 업데이트
    const result = await collection.updateOne(
      { email: payload.email, mac: payload.mac },
      { $set: payload },
      { upsert: true }
    );
    console.log('Data inserted or updated:', result);
  } catch (err) {
    console.error('Error processing message:', err);
  } finally {
    await client.close();
  }
});

mqttClient.on('error', (err) => {
  console.error('MQTT Client error:', err);
});
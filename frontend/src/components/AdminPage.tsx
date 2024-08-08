// AdminPage.tsx
import React, { useState, useEffect } from 'react';

function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [records, setRecords] = useState<any[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      console.log('Selected file:', selectedFile.name); // 파일 이름 출력
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        setIsUploaded(true); // 업로드 성공 시 상태 업데이트
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    if (isUploaded) {
      // 업로드 후 상태를 다시 false로 설정하여 데이터 재로딩
      setIsUploaded(false);
      fetchAllData(); // 업로드 후 데이터 재로딩
    }
  }, [isUploaded]);

  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    try {
      const response = await fetch('http://localhost:5001/records');
      const data = await response.json();
      console.log('모든 데이터:', data);
      setRecords(data);
    } catch (error) {
      console.error('모든 데이터를 가져오는 중 오류 발생:', error);
    }
  }

  async function fetchSingleData() {
    try {
      const response = await fetch('http://localhost:5001/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'kdi6033@gmail.com', mac: 'B0:A7:32:1D:4C:B6' })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('1개 데이터:', data);
      setRecords([data]);
    } catch (error) {
      console.error('1개 데이터를 가져오는 중 오류 발생:', error);
    }
  }

  async function insertOrUpdateData() {
    try {
      const response = await fetch('http://localhost:5001/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'kdi6033@gmail.com', mac: 'B0:A7:32:1D:4C:B6', temp: '50' })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('업데이트 또는 삽입된 데이터:', data);
      fetchAllData(); // 업데이트 후 모든 데이터를 다시 가져와서 화면에 표시
    } catch (error) {
      console.error('데이터를 삽입 또는 업데이트하는 중 오류 발생:', error);
    }
  }

  return (
    <div>
      <h2>관리자 페이지</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Save to MongoDB</button>
      <div>
        <h2>MongoDB에서 가져온 레코드</h2>
        <ul>
          {records.map((record, index) => (
            <li key={index}>{JSON.stringify(record)}</li>
          ))}
        </ul>
        <button onClick={fetchAllData}>모든 데이터 가져오기</button>
        <button onClick={fetchSingleData}>1개 데이터 가져오기</button>
        <button onClick={insertOrUpdateData}>데이터 삽입 또는 업데이트</button>
      </div>
    </div>
  );
}

export default AdminPage;

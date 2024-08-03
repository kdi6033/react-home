import React, { useState } from 'react';
import './App.css';
import ImageGallery from './components/ImageGallery';
import YoutubeGallery from './components/YoutubeGallery';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './assets/512.png'; // 로고 이미지 경로
import settingsIcon from './assets/settings.png'; // 설정 아이콘 이미지 경로
import AdminPage from './components/AdminPage'; // AdminPage 임포트

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogin = () => {
    if (name === 'admin' && password === '1234') {
      // 로그인 성공 시 관리자 페이지로 이동
      navigate('/admin');
      setShowLogin(false);
    } else {
      alert('로그인 실패: 올바른 이름과 비밀번호를 입력하세요.');
    }
  };

  const handleCancel = () => {
    setShowLogin(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <img src={logo} alt="iTR logo" className="App-logo" />
          <h1>Data Science, AI Science</h1>
          <img src={settingsIcon} alt="Settings" className="settings-icon" onClick={() => setShowLogin(true)} /> {/* 설정 아이콘 */}
        </div>
        <ImageGallery />
        <YoutubeGallery />
      </header>
      {showLogin && (
        <div className="login-modal">
          <h2>로그인</h2>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>로그인</button>
          <button className="cancel-button" onClick={handleCancel}>취소</button>
        </div>
      )}
    </div>
  );
}

export default function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

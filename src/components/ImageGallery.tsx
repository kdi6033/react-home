import React from 'react';
import purchaseIcon from '../assets/purchase.png'; // 구매 아이콘 경로

const images = [
  { src: '/images/i2r-01.jpg', 
    name: '[i2r-01] RS232, RS485, WiFi, BLE 통신모듈', 
    description: '와이파이, 블루투스, RS232, RS485 를 조합해서 사용 입력전압: 5~30V',
    link: 'https://smartstore.naver.com/i2r/products/8284829279'
  },
  { src: '/images/i2r-02.jpg', 
    name: '[i2r-02] IoT PLC (4채널 릴레이)', 
    description: '와이파이 블루투스 통신을 이용해 2접점 릴레이 제어 입력전압: 5~30V, 30A 릴레이 1개, 10A 릴레이 3개',
    link: 'https://smartstore.naver.com/i2r/products/8285060920'
  },
  { src: '/images/i2r-03.jpg', 
    name: '[i2r-03] IoT PLC (4채널 릴레이)', 
    description: '와이파이 블루투스 통신을 이용해 2접점 릴레이 제어, 온도 습도 센서 내장 입력전압: 5~30V, 30A 릴레이 1개, 10A 릴레이 3개',
    link: 'https://smartstore.naver.com/i2r/products/8285011211'
  },
  { src: '/images/i2r-04.jpg', 
    name: '[i2r-04] IoT PLC (8채널 릴레이)', 
    description: '와이파이 블루투스 통신을 이용해 2접점 릴레이 제어 입력전압: 5~30V, 10A 릴레이 8개',
    link: 'https://smartstore.naver.com/i2r/products/8285011211'
  }
];

const ImageGallery: React.FC = () => {
  return (
    <div>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image.src} alt={image.name} className="image" />
            <div className="image-name">{image.name}</div>
            <div className="image-description">
              {image.description}
            </div>
            <div className="image-link">
              구매
              {image.link && (
                <a href={image.link} target="_blank" rel="noopener noreferrer">
                  <img src={purchaseIcon} alt="구매" className="purchase-icon" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

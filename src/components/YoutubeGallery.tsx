import React, { useState, useEffect } from 'react';
import './YoutubeGallery.css';

interface Video {
  _id: string;
  no: string;
  title: string;
  link: string | null;
}

const YoutubeGallery: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:5000/youtube');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched videos:', data);
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Youtube 링크</h2>
      <table className="youtube-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video._id} className={!video.link || video.link === "null" ? 'no-link' : ''}>
              <td>{video.no}</td>
              <td>
                {video.link && video.link !== "null" ? (
                  <a href={video.link} target="_blank" rel="noopener noreferrer">
                    {video.title}
                  </a>
                ) : (
                  <span>{video.title}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YoutubeGallery;

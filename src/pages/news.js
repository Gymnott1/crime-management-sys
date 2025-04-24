import React from 'react';
import './pageStyles.css'; // Optional: Create a common CSS file for pages

// Mock data directly in the component (or import from a mockData.js)
const mockNewsData = [
  { id: 1, title: "Community Policing Initiative Launched", date: "2024-01-15", summary: "New program aims to strengthen ties between officers and residents." },
  { id: 2, title: "Traffic Advisory: Main Street Closure", date: "2024-01-14", summary: "Main Street will be closed between Elm and Oak from 10 AM to 2 PM for event setup." },
  { id: 3, title: "Recent Arrests Update", date: "2024-01-12", summary: "Details on recent law enforcement activities in the area." },
];

function News() {
  return (
    <div>
      <h1>Latest News</h1>
      <div className="news-list">
        {mockNewsData.length > 0 ? (
          mockNewsData.map(item => (
            <div key={item.id} className="news-item card"> {/* Add card style */}
              <h2>{item.title}</h2>
              <p className="news-date"><em>{item.date}</em></p>
              <p>{item.summary}</p>
            </div>
          ))
        ) : (
          <p>No news items available at this time.</p>
        )}
      </div>
    </div>
  );
}

export default News;
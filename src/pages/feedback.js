import React, { useState } from 'react';

function Feedback() {
   const [feedbackText, setFeedbackText] = useState('');

   const handleSubmit = (e) => {
     e.preventDefault();
     console.log('Feedback submitted:', feedbackText);
     // Add logic to send feedback (e.g., to Firebase or an API)
     alert('Feedback submission logic goes here.'); // Placeholder
     setFeedbackText('');
   }

  return (
    <div style={{ padding: '80px 20px 20px 20px', minHeight: 'calc(100vh - 160px)' }}>
      <h1>Submit Feedback</h1>
       <form onSubmit={handleSubmit}>
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Enter your feedback..."
          rows="8"
          cols="50"
          required
           style={{display: 'block', marginBottom: '10px', width: '100%', boxSizing: 'border-box'}}
        />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
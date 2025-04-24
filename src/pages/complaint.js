import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './pageStyles.css';

function Complaint() {
  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    location: '',
    date: '',
    details: '',
    attachments: null
  });
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const { user } = useAuth();

  // Complaint types for dropdown
  const complaintTypes = [
    'Theft',
    'Noise Disturbance',
    'Assault',
    'Property Damage',
    'Traffic Violation',
    'Harassment',
    'Fraud',
    'Missing Person',
    'Drug-related Activity',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachments') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.type || !formData.subject || !formData.details) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate submission with generated ID
    const newId = 'C' + Math.floor(100000 + Math.random() * 900000);
    console.log(`Complaint ${newId} submitted by ${user?.email}:`, formData);
    
    setSubmissionId(newId);
    setSubmitted(true);
    
    // Reset form
    setFormData({
      type: '',
      subject: '',
      location: '',
      date: '',
      details: '',
      attachments: null
    });
    
    // Hide success message after a few seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="page-container">
      <h1>File a Complaint</h1>
      
      <div className="info-message">
        <strong>Important:</strong> Filing a false police complaint is a criminal offense.
        Please ensure all information provided is accurate and truthful.
      </div>
      
      {submitted && (
        <div className="success-message card">
          <h3>Complaint Submitted Successfully</h3>
          <p>Your complaint has been filed with ID: <strong>{submissionId}</strong></p>
          <p>We will review your complaint and contact you within 48 hours.</p>
        </div>
      )}
      
      <div className="card">
        <h2>Complaint Information</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="type">Complaint Type*</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">-- Select Type --</option>
              {complaintTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject*</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Brief subject of your complaint"
              required
              className="form-input"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Where did this incident take place?"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Date of Incident</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="details">Complaint Details*</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Please provide detailed information about your complaint..."
              rows="10"
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="attachments">Attachments (Optional)</label>
            <input
              type="file"
              id="attachments"
              name="attachments"
              onChange={handleChange}
              className="form-input"
            />
            <small>Upload photos, videos, or documents related to your complaint (max 5MB)</small>
          </div>
          
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="declaration"
              required
              className="form-checkbox"
            />
            <label htmlFor="declaration">
              I declare that the information provided is true to the best of my knowledge
            </label>
          </div>
          
          <button type="submit" className="submit-button">Submit Complaint</button>
        </form>
      </div>
      
      <div className="card">
        <h3>What happens after you file a complaint?</h3>
        <ol>
          <li>Your complaint will be reviewed by our department within 48 hours</li>
          <li>You will receive a confirmation email with your complaint details</li>
          <li>An officer may contact you for additional information if needed</li>
          <li>You can track the status of your complaint in your Dashboard</li>
        </ol>
      </div>
    </div>
  );
}

export default Complaint;
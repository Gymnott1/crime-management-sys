import React, { useState } from 'react';
import './pageStyles.css';

function Missingperson() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportFormData, setReportFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    lastSeenDate: '',
    lastSeenLocation: '',
    description: '',
    contactInfo: '',
    relationship: '',
    photo: null
  });

  // Mock data for missing persons
  const missingPersonsData = [
    {
      id: 'MP1001',
      name: 'James Wilson',
      age: 34,
      gender: 'Male',
      lastSeen: '2025-04-12',
      location: 'Downtown Central Park',
      region: 'Central',
      description: 'Approximately 5\'10", medium build with brown hair and green eyes. Last seen wearing a blue jacket and jeans.',
      photo: '/api/placeholder/250/300',
      status: 'Active',
      reportedDate: '2025-04-14'
    },
    {
      id: 'MP1002',
      name: 'Sarah Reynolds',
      age: 17,
      gender: 'Female',
      lastSeen: '2025-04-10',
      location: 'Near Westfield High School',
      region: 'West',
      description: 'Approximately 5\'4", slim build with long blonde hair. Last seen wearing a red hoodie and black backpack.',
      photo: '/api/placeholder/250/300',
      status: 'Active',
      reportedDate: '2025-04-11'
    },
    {
      id: 'MP1003',
      name: 'Michael Chang',
      age: 42,
      gender: 'Male',
      lastSeen: '2025-04-05',
      location: 'Eastside Shopping Mall',
      region: 'East',
      description: 'Approximately 5\'9", athletic build with short black hair. Last seen wearing glasses, a gray shirt and black pants.',
      photo: '/api/placeholder/250/300',
      status: 'Found',
      reportedDate: '2025-04-06'
    },
    {
      id: 'MP1004',
      name: 'Emily Johnson',
      age: 28,
      gender: 'Female',
      lastSeen: '2025-04-08',
      location: 'North Station Transit Center',
      region: 'North',
      description: 'Approximately 5\'6", average build with shoulder-length brown hair. Last seen wearing a white blouse and navy skirt.',
      photo: '/api/placeholder/250/300',
      status: 'Active',
      reportedDate: '2025-04-09'
    },
    {
      id: 'MP1005',
      name: 'David Martinez',
      age: 56,
      gender: 'Male',
      lastSeen: '2025-04-02',
      location: 'South Harbor Park',
      region: 'South',
      description: 'Approximately 5\'11", heavy build with gray hair and beard. Last seen wearing a brown coat and hat.',
      photo: '/api/placeholder/250/300',
      status: 'Found',
      reportedDate: '2025-04-03'
    }
  ];

  // Available regions for filter
  const regions = ['Central', 'North', 'South', 'East', 'West'];

  // Filter missing persons based on search term and region
  const filteredPersons = missingPersonsData.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          person.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === '' || person.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (e) => {
    setFilterRegion(e.target.value);
  };

  const handleReportFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setReportFormData({ ...reportFormData, [name]: files[0] });
    } else {
      setReportFormData({ ...reportFormData, [name]: value });
    }
  };

  const handleReportFormSubmit = (e) => {
    e.preventDefault();
    console.log('Missing person report submitted:', reportFormData);
    alert('Report submitted successfully. An officer will contact you shortly.');
    setReportFormData({
      fullName: '',
      age: '',
      gender: '',
      lastSeenDate: '',
      lastSeenLocation: '',
      description: '',
      contactInfo: '',
      relationship: '',
      photo: null
    });
    setShowReportForm(false);
  };

  return (
    <div className="page-container">
      <h1>Missing Persons</h1>
      
      <div className="info-message">
        <strong>Important:</strong> If you have immediate information about a missing person, please call our emergency line at <strong>911</strong>.
      </div>
      
      <div className="action-bar">
        <button className="report-button" onClick={() => setShowReportForm(!showReportForm)}>
          {showReportForm ? 'Close Report Form' : 'Report a Missing Person'}
        </button>
      </div>
      
      {showReportForm && (
        <div className="card report-form">
          <h2>Report a Missing Person</h2>
          <form onSubmit={handleReportFormSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name*</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={reportFormData.fullName}
                  onChange={handleReportFormChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="age">Age*</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={reportFormData.age}
                  onChange={handleReportFormChange}
                  required
                  min="0"
                  max="120"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="gender">Gender*</label>
                <select
                  id="gender"
                  name="gender"
                  value={reportFormData.gender}
                  onChange={handleReportFormChange}
                  required
                  className="form-select"
                >
                  <option value="">-- Select --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lastSeenDate">Last Seen Date*</label>
                <input
                  type="date"
                  id="lastSeenDate"
                  name="lastSeenDate"
                  value={reportFormData.lastSeenDate}
                  onChange={handleReportFormChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastSeenLocation">Last Seen Location*</label>
                <input
                  type="text"
                  id="lastSeenLocation"
                  name="lastSeenLocation"
                  value={reportFormData.lastSeenLocation}
                  onChange={handleReportFormChange}
                  required
                  placeholder="Address or area description"
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={reportFormData.description}
                onChange={handleReportFormChange}
                required
                placeholder="Include height, build, hair color, eye color, distinguishing features, and what they were wearing"
                rows="5"
                className="form-input"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactInfo">Your Contact Information*</label>
                <input
                  type="text"
                  id="contactInfo"
                  name="contactInfo"
                  value={reportFormData.contactInfo}
                  onChange={handleReportFormChange}
                  required
                  placeholder="Phone number or email"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="relationship">Your Relationship to Missing Person*</label>
                <input
                  type="text"
                  id="relationship"
                  name="relationship"
                  value={reportFormData.relationship}
                  onChange={handleReportFormChange}
                  required
                  placeholder="Family member, friend, etc."
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="photo">Upload Photo (if available)</label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleReportFormChange}
                accept="image/*"
                className="form-input"
              />
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
            
            <button type="submit" className="submit-button">Submit Report</button>
          </form>
        </div>
      )}
      
      <div className="search-filter-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="filter-box">
          <select
            value={filterRegion}
            onChange={handleRegionChange}
            className="filter-select"
          >
            <option value="">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region} Region</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="missing-persons-list">
        {filteredPersons.length > 0 ? (
          filteredPersons.map(person => (
            <div key={person.id} className={`card missing-person-card ${person.status.toLowerCase()}`}>
              <div className="missing-person-image">
                <img src={person.photo} alt={`${person.name}`} />
                {person.status === 'Found' && (
                  <div className="status-overlay">Found</div>
                )}
              </div>
              <div className="missing-person-info">
                <h3>{person.name}</h3>
                <p><strong>Age:</strong> {person.age}</p>
                <p><strong>Gender:</strong> {person.gender}</p>
                <p><strong>Last Seen:</strong> {person.lastSeen}</p>
                <p><strong>Location:</strong> {person.location}</p>
                <p><strong>Description:</strong> {person.description}</p>
                <p><strong>Reported:</strong> {person.reportedDate}</p>
                {person.status === 'Active' && (
                  <div className="card-actions">
                    <button className="info-button">Contact Police</button>
                    <button className="share-button">Share</button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="card empty-state">
            <p>No matching missing persons found.</p>
          </div>
        )}
      </div>
      
      <div className="card info-card">
        <h3>Contact Information</h3>
        <p>If you have any tips or information, please contact the local authorities or email us at <a href="mailto:tips@missingpersons.org">tips@missingpersons.org</a>.</p>
        <p>You can also visit your nearest police station or call our non-emergency line at <strong>+1 (800) 555-HELP</strong>.</p>
      </div>
    </div>
  );
}

export default Missingperson;

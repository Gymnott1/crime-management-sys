import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './pageStyles.css';

function Dashboard() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for user's complaints
  const complaintData = [
    { 
      id: 'C78945', 
      date: '2025-04-10', 
      type: 'Noise Complaint',
      subject: 'Loud construction work during night hours',
      status: 'Under Investigation',
      officer: 'Officer Johnson',
      lastUpdate: '2025-04-15'
    },
    { 
      id: 'C65412', 
      date: '2025-03-25', 
      type: 'Property Damage',
      subject: 'Vandalism to front yard fence',
      status: 'Assigned',
      officer: 'Officer Martinez',
      lastUpdate: '2025-04-02'
    },
    { 
      id: 'C54321', 
      date: '2025-02-18', 
      type: 'Theft',
      subject: 'Bicycle stolen from garage',
      status: 'Resolved',
      officer: 'Officer Williams',
      lastUpdate: '2025-03-01'
    }
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 'N1001',
      date: '2025-04-22',
      message: 'Your complaint C78945 has been assigned to Officer Johnson.',
      read: false
    },
    {
      id: 'N1002',
      date: '2025-04-15',
      message: 'New safety advisory published for your neighborhood.',
      read: true
    },
    {
      id: 'N1003',
      date: '2025-04-02',
      message: 'Your feedback ID F12345 has been received. Thank you!',
      read: true
    }
  ];

  // Mock data for reports
  const reports = [
    {
      id: 'R5001',
      date: '2025-04-01',
      type: 'Police Report',
      case: 'Case #23-456789',
      description: 'Traffic Accident Report',
      status: 'Available',
      downloadable: true
    },
    {
      id: 'R5002',
      date: '2025-03-15',
      type: 'Investigation Report',
      case: 'Case #23-123456',
      description: 'Property Theft Investigation',
      status: 'Processing',
      downloadable: false
    }
  ];

  // Stats for quick overview
  const stats = [
    { label: 'Active Cases', value: 2, icon: '📊' },
    { label: 'Resolved Cases', value: 1, icon: '✓' },
    { label: 'Pending Feedback', value: 1, icon: '⏳' },
    { label: 'New Notifications', value: 1, icon: '🔔' }
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Tab content components
  const renderOverview = () => (
    <>
      <div className="greeting-section">
        <h2>Welcome back, {user?.name || user?.email?.split('@')[0]}</h2>
        <p>Here's a summary of your activity with the Police Department</p>
      </div>
      
      <div className="stats-overview">
        <div className="grid-container">
          {stats.map((stat, index) => (
            <div key={index} className="card stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="card activity-card">
          <div className="timeline">
            {notifications.slice(0, 3).map((notification, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-date">{notification.date}</div>
                <div className="timeline-content">
                  <p>{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="button-group">
          <Link to="/complaint" className="action-button">File New Complaint</Link>
          <Link to="/feedback" className="action-button">Submit Feedback</Link>
        </div>
      </div>
    </>
  );

  const renderComplaints = () => (
    <>
      <h2>Your Complaints</h2>
      {complaintData.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date Filed</th>
                  <th>Type</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody>
                {complaintData.map(complaint => (
                  <tr key={complaint.id}>
                    <td>{complaint.id}</td>
                    <td>{complaint.date}</td>
                    <td>{complaint.type}</td>
                    <td>{complaint.subject}</td>
                    <td>
                      <span className={`status-badge ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td>{complaint.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="complaint-details">
            <h3>Selected Complaint Details</h3>
            <div className="card">
              <p><strong>Complaint ID:</strong> {complaintData[0].id}</p>
              <p><strong>Type:</strong> {complaintData[0].type}</p>
              <p><strong>Subject:</strong> {complaintData[0].subject}</p>
              <p><strong>Date Filed:</strong> {complaintData[0].date}</p>
              <p><strong>Status:</strong> {complaintData[0].status}</p>
              <p><strong>Assigned Officer:</strong> {complaintData[0].officer}</p>
              <p><strong>Last Updated:</strong> {complaintData[0].lastUpdate}</p>
              
              <h4>Case Notes</h4>
              <div className="case-notes">
                <div className="note">
                  <div className="note-header">
                    <span className="note-author">Officer Johnson</span>
                    <span className="note-date">2025-04-15</span>
                  </div>
                  <p>Site visit conducted. Gathered evidence and spoke with neighbors about the noise complaint. Further investigation in progress.</p>
                </div>
                <div className="note">
                  <div className="note-header">
                    <span className="note-author">System</span>
                    <span className="note-date">2025-04-10</span>
                  </div>
                  <p>Complaint received and registered in the system. Case assigned to Officer Johnson.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="card empty-state">
          <p>You haven't filed any complaints yet.</p>
          <Link to="/complaint" className="action-button">File a Complaint</Link>
        </div>
      )}
    </>
  );

  const renderReports = () => (
    <>
      <h2>Your Reports</h2>
      {reports.length > 0 ? (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.date}</td>
                  <td>{report.type}</td>
                  <td>{report.description}</td>
                  <td>
                    <span className={`status-badge ${report.status.toLowerCase()}`}>
                      {report.status}
                    </span>
                  </td>
                  <td>
                    {report.downloadable ? (
                      <button className="small-button">Download</button>
                    ) : (
                      <span className="muted-text">Not available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card empty-state">
          <p>No reports available.</p>
        </div>
      )}
    </>
  );

  const renderNotifications = () => (
    <>
      <h2>Notifications</h2>
      <div className="notifications-list">
        {notifications.map((notification, index) => (
          <div 
            key={notification.id} 
            className={`card notification-card ${!notification.read ? 'unread' : ''}`}
          >
            <div className="notification-header">
              <span className="notification-date">{notification.date}</span>
              {!notification.read && <span className="unread-badge">New</span>}
            </div>
            <div className="notification-content">
              <p>{notification.message}</p>
            </div>
            <div className="notification-actions">
              <button className="small-button">Mark as Read</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="page-container dashboard-container">
      <h1>Your Dashboard</h1>
      
      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      ) : (
        <>
          <div className="dashboard-tabs">
            <button 
              className={`tab-button ${selectedTab === 'overview' ? 'active' : ''}`}
              onClick={() => setSelectedTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-button ${selectedTab === 'complaints' ? 'active' : ''}`}
              onClick={() => setSelectedTab('complaints')}
            >
              Complaints
            </button>
            <button 
              className={`tab-button ${selectedTab === 'reports' ? 'active' : ''}`}
              onClick={() => setSelectedTab('reports')}
            >
              Reports
            </button>
            <button 
              className={`tab-button ${selectedTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setSelectedTab('notifications')}
            >
              Notifications {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-count">{notifications.filter(n => !n.read).length}</span>
              )}
            </button>
          </div>
          
          <div className="dashboard-content">
            {selectedTab === 'overview' && renderOverview()}
            {selectedTab === 'complaints' && renderComplaints()}
            {selectedTab === 'reports' && renderReports()}
            {selectedTab === 'notifications' && renderNotifications()}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
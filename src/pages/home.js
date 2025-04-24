import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../pages/pageStyles.css';

function Home() {
  const { user } = useAuth();
  
  // Mock data for recent complaints
  const recentComplaints = [
    { id: 'C12345', date: '2025-04-20', status: 'Under Investigation', type: 'Noise Complaint' },
    { id: 'C12346', date: '2025-04-15', status: 'Resolved', type: 'Traffic Violation' }
  ];
  
  // Stats for quick view
  const stats = [
    { label: 'Active Complaints', value: 2 },
    { label: 'Resolved Issues', value: 5 },
    { label: 'Police Stations Nearby', value: 3 },
    { label: 'Emergency Alerts', value: 0 }
  ];

  return (
    <div className="page-container">
      <h1>Welcome to Your Dashboard{user ? `, ${user.name || user.email.split('@')[0]}` : ''}!</h1>
      
      <div className="info-message">
        <strong>Community Safety Tip:</strong> Stay alert to your surroundings and report any suspicious activities promptly.
      </div>
      
      {/* Quick Stats */}
      <h2>At a Glance</h2>
      <div className="grid-container">
        {stats.map((stat, index) => (
          <div key={index} className="card stat-card">
            <div className="stat-number">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Recent Complaints */}
      <h2>Your Recent Complaints</h2>
      {recentComplaints.length > 0 ? (
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px' }}>Complaint ID</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Date Filed</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentComplaints.map(complaint => (
                <tr key={complaint.id}>
                  <td style={{ padding: '10px' }}>{complaint.id}</td>
                  <td style={{ padding: '10px' }}>{complaint.type}</td>
                  <td style={{ padding: '10px' }}>{complaint.date}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ 
                      backgroundColor: complaint.status === 'Resolved' ? '#d4edda' : '#fff3cd',
                      color: complaint.status === 'Resolved' ? '#155724' : '#856404',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.85rem'
                    }}>
                      {complaint.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card">
          <p>You haven't filed any complaints yet.</p>
        </div>
      )}
      
      {/* Quick Actions */}
      <h2>Quick Actions</h2>
      <div className="grid-container">
        <Link to="/complaint" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>File a Complaint</h3>
          <p>Report an incident or file a new complaint with the police department.</p>
        </Link>
        
        <Link to="/feedback" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>Submit Feedback</h3>
          <p>Share your experience or suggestions to help us improve our services.</p>
        </Link>
        
        <Link to="/missingperson" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>Missing Persons</h3>
          <p>View or report missing person information to help locate them.</p>
        </Link>
        
        <Link to="/policestation" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3>Find Nearest Station</h3>
          <p>Locate the closest police station to your current location.</p>
        </Link>
      </div>
      
      {/* Recent Updates */}
      <h2>Recent Community Updates</h2>
      <div className="card">
        <h3>Community Policing Initiative</h3>
        <p>Join our upcoming community policing seminar on May 5, 2025, at the Central Community Center.</p>
        <Link to="/news" style={{ color: '#1a237e', textDecoration: 'none', fontWeight: 'bold' }}>
          Learn More →
        </Link>
      </div>
    </div>
  );
}

export default Home;
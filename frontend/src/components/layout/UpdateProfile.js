import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Overview from './Overview';
import Appointments from './Appointments';
import Profile from './Profile';
import './updateprofile.css'

const UpdateProfile = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const renderRightComponent = () => {
    switch (selectedTab) {
      case 'overview':
        return <Overview />;
      case 'appointments':
        return <Appointments />;
      case 'profile':
        return <Profile />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="update-profile-container">
      <div className="update-profile-left-component">
        <div className="vertical-card">
          <Link to="#" onClick={() => setSelectedTab('overview')}>
            Overview
          </Link>
          <Link to="#" onClick={() => setSelectedTab('appointments')}>
            Appointments
          </Link>
          <Link to="#" onClick={() => setSelectedTab('profile')}>
            Profile
          </Link>
        </div>
        <button className="logout-button">Logout</button>
      </div>
      <div className="update-profile-right-component">{renderRightComponent()}</div>
    </div>
  );
};

export default UpdateProfile;

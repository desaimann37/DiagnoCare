import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Overview from './Overview';
import Appointments from './Appointments';
import Profile from './Profile';
import './updateprofile.css';

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
          <Link
            to="#"
            onClick={() => setSelectedTab('overview')}
            className={selectedTab === 'overview' ? 'selected-tab' : ''}
          >
            Overview
          </Link>
          <Link
            to="#"
            onClick={() => setSelectedTab('appointments')}
            className={selectedTab === 'appointments' ? 'selected-tab' : ''}
          >
            Appointments
          </Link>
          <Link
            to="#"
            onClick={() => setSelectedTab('profile')}
            className={selectedTab === 'profile' ? 'selected-tab' : ''}
          >
            Profile
          </Link>
        </div>
          <br/>
          <br/>
          <br/>
        <button className="logout-button">Logout</button>
      </div>
      <div className="update-profile-right-component">{renderRightComponent()}</div>
    </div>
  );
};

export default UpdateProfile;

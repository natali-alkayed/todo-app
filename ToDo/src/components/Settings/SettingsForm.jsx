import React, { useState } from 'react';
import { useSettingsContext } from '../../Context/Setings/SettingsContext';
import { Card, Grid } from '@mantine/core';
import './setting.scss';

const SettingsForm = () => {
  const { settings, setSettings } = useSettingsContext();
  const [newSettings, setNewSettings] = useState(settings);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const updatedValue = type === 'checkbox' ? checked : parseInt(value);
  
    setNewSettings((prevSettings) => ({
      ...prevSettings,
      [name]: name === 'hideCompleted' ? checked : updatedValue,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSettings(newSettings);
  };

  return (
    <div className="settings-container">
      <div className="settings-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <span>Show completed items:</span>
              <input
                type="checkbox"
                name="hideCompleted"
                checked={newSettings.hideCompleted}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <span>Items per page:</span>
              <input
                type="number"
                name="maxItemsPerPage"
                value={newSettings.maxItemsPerPage}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button type="submit" onSubmit={handleSubmit}> Save Settings</button>
        </form>
      </div>
      <div className="settings-preview">
        <Card shadow="sm">
          <h2>Updated Settings</h2>
          <p>Show completed items: {newSettings.hideCompleted.toString()}</p>
          <p>Items per page: {newSettings.maxItemsPerPage}</p>
        </Card>
      </div>
    </div>
  );
};

export default SettingsForm;

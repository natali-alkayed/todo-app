import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const defaultSettings = {
    maxItemsPerPage: 3,
    hideCompleted: true,
    defaultSort: 'difficulty',
  };

  const [settings] = useState(defaultSettings);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  return useContext(SettingsContext);
};

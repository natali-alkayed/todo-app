import React from 'react';
import ToDo from './components/Todo/Todo';
import { SettingsProvider } from './Context/Setings/SettingsContext';
import Header from './components/Header/index';
import Footer from './components/Footer/index';

export default function App() {
  return (
    <SettingsProvider>
      <Header/>
      <ToDo />
      <Footer/>
    </SettingsProvider>
  );
}

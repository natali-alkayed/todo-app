import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ToDo from './components/Todo/Todo';
import { SettingsProvider } from './Context/Setings/SettingsContext';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import SettingsForm from './components/Settings/SettingsForm'; 
import LoginProvider from './Context/ Auth/index'; 
import Auth from './components/Auth/index';
import Login from './components/Login/index';

export default function App() {
  return (
    <SettingsProvider>
      <LoginProvider>
        <Auth>
          <div>Any valid user can see this</div>
        </Auth>

        <Auth capability="create">
          <div>Users with create access can see this</div>
        </Auth>

        <Auth capability="update">
          <div>Users with update access can see this</div>
        </Auth>

        <Auth capability="delete">
          <div>Users with delete access can see this</div>
        </Auth>

        <Header />
        <Router>
        <Routes>
          <Route path="/" element={<ToDo />} />
          <Route path="/settings" element={<SettingsForm />} />
          <Route path="/logIn" element={<Login />} />
        </Routes>
        <Footer />
        </Router>
      </LoginProvider> 
      
    </SettingsProvider>
  );
}

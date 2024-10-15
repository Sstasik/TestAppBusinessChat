import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/Login_Register';
import Chat from './components/Chat';

const App: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<LoginRegister/>}/>
          <Route path='/chat' element={<Chat/>}/>
        </Routes>
      </Router>
    );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ExamPapersPage from './components/ExamPapersPage';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/ExamsPaper" element={<ExamPapersPage />} />
            </Routes>
        </div>
    );
}

export default App;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';


const LoginForm = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5001/users/login', {name, password})
            .then(response => {
                // Enregistrer le JWT dans le localStorage
                localStorage.setItem('authToken', response.data.token);
                navigate('/ExamsPaper');
            })
            .catch(error => {
                console.error(error);
            });

    }





    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-field">
                    <label>Utilisateur:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="input-field">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;

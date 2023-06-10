import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "./ExamPapersPage.css";
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const ExamPapersPage = () => {

    const [papers, setPapers] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [date, setDate] = useState(''); // Ajouter cette ligne
    const navigate = useNavigate();

    function openModal() {
        setIsOpen(true);
    }
    function Logout() {
        navigate('/login');
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleFileUpload = () => {
        // Récupérer le token du localStorage
        const token = localStorage.getItem('authToken');
        // Décoder le JWT pour obtenir les informations de l'utilisateur
        const user = jwt(token);
        // Vérifier si l'utilisateur est un administrateur
        if (user.role !== 'admin') {
            // Si l'utilisateur n'est pas un administrateur, afficher un message d'erreur
            alert('Vous n\'avez pas les permissions nécessaires pour ajouter un fichier.');
            return;
        }

        // Si l'utilisateur est un administrateur, procéder à l'ajout du fichier...
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Récupérer le JWT depuis le localStorage
        const token = localStorage.getItem('authToken');

        axios({
            method: 'post',
            url: 'http://localhost:5000/examPapers/',
            headers: {
                'Authorization': `Bearer ${token}` // Inclure le JWT dans le header d'autorisation
            },
            data: {name, url , date}
        })
            .then(response => {
                console.log(response);
                closeModal();
            })
            .catch(error => {
                console.error(error);
            });
    };


    useEffect(() => {
        const token = localStorage.getItem('authToken');

        axios({
            method: 'get',
            url: 'http://localhost:5000/examPapers',
            headers: {
                'Authorization': `Bearer ${token}` // Inclure le JWT dans le header d'autorisation
            },
        })
            .then(response => {
                setPapers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    if (!papers) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={openModal}>Upload</button>
            <button onClick={Logout}>Déconnexion</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2>Upload Exam Paper</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        URL:
                        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
                    </label>
                    <label>
                        Date:
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </label>
                    <button onClick={handleFileUpload}>Ajouter un fichier</button>
                </form>
                <button onClick={closeModal}>Close</button>
            </Modal>
            <h1>Exam Papers</h1>
            {papers.map((paper, index) => (
                <div key={index}>
                    <h2>{paper.name}</h2>
                    <a href={paper.url}>Consulter</a>
                    <p>Created at: {paper.date}</p>
                </div>
            ))}
        </div>
    );
};

export default ExamPapersPage;

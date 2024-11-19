import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';

import logoImg from '../images/logo.png';
import '../styles/pages/landing.css';

function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Cartas para o Papai Noel" />
                <main>
                    <h1>O Papai Noel aguarda seu pedido</h1>
                    <Link to="/app" className="enter-app">
                        <FiArrowRight size={24} color="rgba(0, 0, 0, 0.6)" />
                    </Link>
                </main>
            </div>
        </div>
    );
}



export default Landing;
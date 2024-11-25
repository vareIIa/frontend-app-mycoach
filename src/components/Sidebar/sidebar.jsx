import React, { useState } from 'react';
import './sidebar.scss';
import Logo from '../../assets/logo.jpg';

const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };

    return (
        <div className="custom-sidebar">
            <div className="sidebar-header">
                <a href="https://apps.projetodesenvolve.online/learner-dashboard/">
                    <img src={Logo} alt="Logo" className="sidebar-logo" />
                </a>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <a href="https://apps.projetodesenvolve.online/learner-dashboard/" className="nav-link">
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a href="https://apps.projetodesenvolve.online/account/" className="nav-link">
                            Configurações da Conta
                        </a>
                    </li>
                    <li>
                        <button
                            className={`dropdown-toggle ${openDropdown ? 'active' : ''}`}
                            onClick={toggleDropdown}
                        >
                            Matérias
                        </button>
                        {openDropdown && (
                            <ul className="dropdown-menu">
                                <li>
                                    <a href="#action1" className="dropdown-item">
                                        Action 1
                                    </a>
                                </li>
                                <li>
                                    <a href="#action2" className="dropdown-item">
                                        Action 2
                                    </a>
                                </li>
                                <li>
                                    <a href="#action3" className="dropdown-item">
                                        Action 3
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <a href="https://ajuda-projetodesenvolve.freshdesk.com/support/login" className="nav-link">
                            Ajuda
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;

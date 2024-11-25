import React, { useState } from 'react';
import './sidebar.scss';
import Logo from '../../assets/logo.jpg';
import { Home, Settings, Help  } from '@openedx/paragon/icons';

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
                <Home className="icon" /> Inicio
            </a>
                    </li>
                    <li>
                        <a href="https://apps.projetodesenvolve.online/account/" className="nav-link">
                          <Settings className="icon" />  Configurações
                        </a>
                    </li>
                    <li>
                    
                    
                    </li>
                    <li>
                        <a href="https://ajuda-projetodesenvolve.freshdesk.com/support/login" className="nav-link">
                        <Help className="icon" />  Ajuda
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;

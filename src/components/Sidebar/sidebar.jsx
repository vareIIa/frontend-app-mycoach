import React, { useState } from 'react';
import './sidebar.scss';
import Logo from '../../assets/logo.jpg';
import { Home, Settings, Help, Info, NewReleases  } from '@openedx/paragon/icons';

const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
    const [currentPage, setCurrentPage] = useState(1); // Página atual

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };

    const openInfoModal = () => {
        setShowModal(true); // Abrir o modal
    };

    const closeInfoModal = () => {
        setShowModal(false); // Fechar o modal
    };

    const goToPage = (page) => {
        setCurrentPage(page); // Navegar entre as páginas
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
                        <a href="#" onClick={openInfoModal} className="nav-info">
                            <NewReleases className="icon" /> Lançamento
                        </a>
                    </li>
                    <li>
                        <a href="https://apps.projetodesenvolve.online/learner-dashboard/" className="nav-link">
                            <Home className="icon" /> Inicio
                        </a>
                    </li>
                    <li>
                        <a href="https://apps.projetodesenvolve.online/account/" className="nav-link">
                            <Settings className="icon" /> Configurações
                        </a>
                    </li>
                    <li>
                        <a href="https://ajuda-projetodesenvolve.freshdesk.com/support/login" className="nav-link">
                            <Help className="icon" /> Ajuda
                        </a>
                    </li>
                    
                </ul>
            </nav>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Informações - My Coach</h2>

                        {/* Páginas do Modal */}
                        {currentPage === 1 && (
                            <div>
                                <div style={{marginBottom: 130, display: 'fixed'}}>
                                <p>My Coach, Seu Mentor Virtual Inteligente e Interativo!</p>
                                <p>Estamos entusiasmados em revelar o <strong>My Coach</strong>, a mais nova evolução da nossa inteligência artificial para transformar a experiência de aprendizado.</p>
                                <p> Criado para ser muito mais que uma ferramenta, o My Coach é o seu mentor virtual, disponível 24 horas por dia, pronto para ajudar a alcançar todo o seu potencial.</p>
                                </div>
                                <div className="buttons-container">
                                    <button onClick={() => goToPage(2)}>Próxima Página</button>
                                </div>
                            </div>
                        )}

                        {currentPage === 2 && (
                            <div>
                                <p>Como o My Coach pode ajudar você?</p>
                                <ul>
                                    <li><strong>Dúvidas instantâneas:</strong> Sempre que surgir uma dúvida sobre as matérias que você está estudando, o My Coach estará lá para oferecer respostas claras, rápidas e completas. É como ter um tutor particular ao seu lado!</li>
                                    <li><strong>Interação personalizada:</strong> Cada interação é única. O My Coach aprende com suas necessidades, adaptando-se ao seu estilo de estudo para oferecer orientações que realmente fazem a diferença.</li>
                                    <li>
<strong>Foco no seu futuro:</strong> Em breve, o My Coach será capaz de analisar suas respostas em avaliações, identificar pontos a melhorar e sugerir conteúdos específicos para reforço. Tudo pensado para seu crescimento e sucesso.
</li>
                                </ul>
                                <div className="buttons-container">
                                    <button onClick={() => goToPage(1)}>Página Anterior</button>
                                    <button onClick={() => goToPage(3)}>Próxima Página</button>
                                    
                                </div>
                            </div>
                        )}

                        {currentPage === 3 && (
                            <div>
                                <p>Por que o My Coach é especial?</p>
                                <ul>
                                    <li><strong>Tecnologia de ponta:</strong> Projetado com as mais recentes inovações em inteligência artificial, o My Coach traz uma experiência envolvente e humana, capaz de aproximar você dos seus objetivos.</li>
                                    <li><strong>Apoio contínuo:</strong> Seja para esclarecer dúvidas ou oferecer encorajamento, ele está sempre pronto para ajudar. É como ter um guia confiável e empático ao seu alcance.</li>
                                    <li><strong>Prepare-se para um novo nível de aprendizado!</strong> Com o My Coach, você terá um mentor que não apenas responde, mas entende, orienta e capacita. A evolução está apenas começando, e você é o protagonista dessa transformação.

Conecte-se, pergunte e explore. O futuro do seu aprendizado está aqui.</li>
                                </ul>
                                <div className="buttons-container">
                                <button onClick={() => goToPage(2)}>Página Anterior</button>
                                    <button onClick={closeInfoModal}>Fechar</button>
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;

import React, { useState, useEffect } from 'react';
import { Button, Spinner, Alert, Input, Dropdown } from '@edx/paragon';
import { AccountCircle, Message, Announcement } from '@openedx/paragon/icons';
import Sidebar from '../Sidebar/sidebar';
import ChatSuporte from '../Chatsuporte/ChatSuporte';
import './Chatbot.scss';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [topics, setTopics] = useState([]);
  const [showOptions, setShowOptions] = useState(true); // Controla se mostramos opções ou o chat
  const toggleChatbot = () => {
    setIsChatbotVisible((prev) => !prev);
  };
  useEffect(() => {
    fetch('api.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o arquivo JSON.');
        }
        return response.json();
      })
      .then((data) => setTopics(data))
      .catch((error) => console.error(error));
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) {
      alert('Por favor, insira uma mensagem.');
      return;
    }

    setMessages((prev) => [...prev, { type: 'user', text: input }]);
    setLoading(true);

    const payload = { message: input };

    try {
      const response = await fetch('https://mycoach.projetodesenvolve.online/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'b7fe1fd2-7074-4ae0-95ec-23f637695b87',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setLoading(false);
        alert('Falha na comunicação com o chatbot.');
        return;
      }

      const data = await response.json();
      const botResponse = data.response || 'Sem resposta';
      setMessages((prev) => [...prev, { type: 'bot', text: botResponse }]);
    } catch (error) {
      alert('Erro ao processar sua mensagem. Tente novamente.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleSelectContext = (context) => {
    setMessages((prev) => [
      ...prev,
      { type: 'bot', text: `${context}` },
    ]);
    setShowOptions(false);
  };

  return (
    <div style={{ display: 'flex', width: '105vw', flexDirection: 'column', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ position: 'absolute' }}>
        <Sidebar />
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
          height: '80vh',
        }}
      >
        <h1 style={{ marginBottom: '20px' }}>My Coach</h1>

        <div
          style={{
            height: '60vh',
            width: '65vw',
            overflowY: 'auto',
            marginBottom: '16px',
            border: '2px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#f7f7f7',
          }}
        >
          {messages.length === 0 && (
            <Alert variant="info"><strong>Bem vindo ao My Coach! </strong></Alert>
          )}
          {messages.length === 0 && (
            <Alert variant="info"><strong>Envie uma mensagem para começar, caso precise, aqui estão algumas dicas:</strong></Alert>
          )}
          {showOptions ? (
            <div>
              <Alert variant="info">
                <strong>Aprenda sobre as suas matérias:</strong>
                <div style={{ padding: 1, marginTop: 5, display: 'flex', flexWrap:'wrap' , justifyContent: 'center',}}>
                  {topics.map((item, index) => (
                    <Dropdown key={index} placement="bottom-end">
                      <Dropdown.Toggle class='materias' variant="outline-primary" className="materias">
                        {item.name}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href={item.link} target="_blank">
                          <strong>Acessar curso</strong>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelectContext(item.contexto)}>
                          <strong>Aprender sobre matéria!</strong>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ))}
                </div>
              </Alert>
            </div>
          ) : (
            <Button
              variant="outline-primary"
              onClick={() => setShowOptions(true)}
              style={{ marginBottom: '10px' }}
            >
              Voltar para opções
            </Button>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '8px',
                backgroundColor: msg.type === 'user' ? '#b3e3ff' : '#d4ffe4',
                borderRadius: '8px',
                padding: '8px',
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  marginRight: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  fontWeight: 'bold',
                }}
              >
                {msg.type === 'user' ? (
                  <AccountCircle style={{ color: '#007bff', fontSize: '24px' }} />
                ) : (
                  <Message style={{ color: '#28a745', fontSize: '24px' }} />
                )}
              </div>
              <p style={{ margin: 0, wordBreak: 'break-word' }}>{msg.text}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', width: '65vw', marginTop: '1vh' }}>
          <Input
            className="text-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tire uma dúvida com o Coach..."
            disabled={loading}
            style={{ flex: 1, borderRadius: '12px' }}
          />
          <Button
            className="button"
            onClick={handleSendMessage}
            variant="primary"
            style={{ marginLeft: '16px', borderRadius: '12px' }}
            disabled={loading}
          >
            {loading ? 'Enviar' : 'Enviar'}
          </Button>
        </div>
      </div>
      <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '80px',
            width: '350px',
            maxHeight: isChatbotVisible ? '400px' : '0',
            overflow: 'hidden',
            backgroundColor: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            zIndex: 50,
            transition: 'max-height 0.3s ease-in-out',
          }}
        >
          {isChatbotVisible && (
            <ChatSuporte
              closeChat={() => setIsChatbotVisible(false)}
              messages={messages}
              setMessages={setMessages}
              loading={loading}
              setLoading={setLoading}
            />
          )}
        </div>

        <button
          onClick={toggleChatbot}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '2px',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            background: '#8c44ff'
          }}
        >
          <Announcement style={{ fontSize: '24px', color: '#fff' }} />
        </button>
      <div style={{ marginLeft: '20vw', fontSize: '13px', color: 'rgba(0, 0, 0, 0.5)', textAlign: 'center', display: 'flex', justifyContent: 'center', padding: '10px', marginTop: '2vh', maxWidth: '65vw' }}>
        Estamos empolgados em apresentar o My Coach, uma ferramenta baseada em inteligência artificial que visa auxiliar os alunos no processo de aprendizado através de interações personalizadas. O My Coach está sendo testado para fornecer feedback em tempo real e suporte em várias disciplinas. Essa é uma fase experimental, onde estamos aprimorando a precisão e a relevância das respostas fornecidas.
      </div>
    </div>
    
  );
};

export default App;

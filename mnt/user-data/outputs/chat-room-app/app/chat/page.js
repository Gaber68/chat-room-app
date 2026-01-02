'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const user = sessionStorage.getItem('username');
    
    if (!loggedIn || !user) {
      router.push('/');
      return;
    }
    
    setUsername(user);
    fetchMessages();
    fetchOnlineUsers();

    const interval = setInterval(() => {
      fetchMessages();
      fetchOnlineUsers();
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const fetchOnlineUsers = async () => {
    try {
      const response = await fetch('/api/online-users');
      const data = await response.json();
      setOnlineUsers(data.users || []);
    } catch (err) {
      console.error('Failed to fetch online users:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          message: newMessage,
        }),
      });

      if (response.ok) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('username');
    router.push('/');
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: '#f5f5f5'
    }}>
      <div style={{
        width: '250px',
        background: '#2c2f33',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h2 style={{
          fontSize: '1.2rem',
          marginBottom: '1rem',
          paddingBottom: '0.5rem',
          borderBottom: '2px solid #444'
        }}>
          Online Users ({onlineUsers.length})
        </h2>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {onlineUsers.map((user, index) => (
            <div key={index} style={{
              padding: '0.5rem',
              marginBottom: '0.5rem',
              background: user === username ? '#667eea' : '#23272a',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#43b581',
                marginRight: '0.5rem'
              }}></div>
              {user} {user === username && '(You)'}
            </div>
          ))}
        </div>

        <button
          onClick={handleLogout}
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#ed4245',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'white'
      }}>
        <div style={{
          padding: '1rem',
          background: '#667eea',
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          Chat Room
        </div>

        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem'
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              background: msg.username === username ? '#e3f2fd' : '#f5f5f5',
              borderRadius: '8px',
              borderLeft: msg.username === username ? '4px solid #667eea' : '4px solid #999'
            }}>
              <div style={{
                fontWeight: 'bold',
                color: '#667eea',
                marginBottom: '0.25rem'
              }}>
                {msg.username}
              </div>
              <div style={{ color: '#333' }}>
                {msg.message}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#999',
                marginTop: '0.25rem'
              }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} style={{
          padding: '1rem',
          borderTop: '1px solid #ddd',
          display: 'flex',
          gap: '0.5rem'
        }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem 2rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

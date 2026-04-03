import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WebSocketContextType {
  connected: boolean;
  sendMessage: (message: object) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    
    socket.onopen = () => {
      setConnected(true);
      console.log('WebSocket connected');
    };
    
    socket.onclose = () => {
      setConnected(false);
      console.log('WebSocket disconnected');
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    setWs(socket);
    
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (message: object) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  };

  return (
    <WebSocketContext.Provider value={{ connected, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

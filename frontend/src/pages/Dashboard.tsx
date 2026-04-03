import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Agent, Ticket, Mission } from '../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ agents: 0, tickets: 0, missions: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [agents, tickets, missions] = await Promise.all([
          api.get('/agents'),
          api.get('/tickets'),
          api.get('/missions')
        ]);
        setStats({
          agents: agents.data.length,
          tickets: tickets.data.length,
          missions: missions.data.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>Active Agents</h3>
          <p style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827' }}>{stats.agents}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>Open Tickets</h3>
          <p style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827' }}>{stats.tickets}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>Active Missions</h3>
          <p style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827' }}>{stats.missions}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

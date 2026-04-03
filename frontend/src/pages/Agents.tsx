import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Agent } from '../types';

const Agents: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await api.get('/agents');
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Agents</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {agents.map((agent) => (
          <div key={agent.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{agent.name}</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>{agent.description || 'No description'}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', backgroundColor: agent.is_active ? '#dcfce7' : '#fee2e2', color: agent.is_active ? '#166534' : '#dc2626', padding: '0.25rem 0.5rem', borderRadius: '9999px' }}>
                {agent.is_active ? 'Active' : 'Inactive'}
              </span>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{agent.provider_name || 'Custom'}</span>
            </div>
          </div>
        ))}
      </div>
      {agents.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>No agents found. Create your first agent to get started.</p>
      )}
    </div>
  );
};

export default Agents;

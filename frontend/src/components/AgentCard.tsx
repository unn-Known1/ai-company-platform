import React from 'react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{agent.name}</h3>
      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
        {agent.description || 'No description'}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '9999px',
            backgroundColor: agent.is_active ? '#dcfce7' : '#fee2e2',
            color: agent.is_active ? '#166534' : '#dc2626',
          }}
        >
          {agent.is_active ? 'Active' : 'Inactive'}
        </span>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          {agent.provider_name || 'Custom'}
        </span>
      </div>
    </div>
  );
};

export default AgentCard;

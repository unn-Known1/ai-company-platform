import React from 'react';
import { Ticket } from '../types';

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#fef3c7';
      case 'assigned': return '#dbeafe';
      case 'in_progress': return '#e0e7ff';
      case 'resolved': return '#dcfce7';
      case 'closed': return '#f3f4f6';
      default: return '#f3f4f6';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h3 style={{ fontWeight: '500', fontSize: '1rem' }}>{ticket.title}</h3>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getPriorityColor(ticket.priority), marginTop: '0.25rem' }} />
      </div>
      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
        {ticket.description || 'No description'}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', backgroundColor: getStatusColor(ticket.status) }}>
          {ticket.status.replace('_', ' ')}
        </span>
        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
          {new Date(ticket.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default TicketCard;

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Ticket } from '../types';

const Tickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get('/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

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

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Tickets</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {tickets.map((ticket) => (
          <div key={ticket.id} style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <h3 style={{ fontWeight: '500', fontSize: '1rem' }}>{ticket.title}</h3>
              <span style={{ fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', backgroundColor: getStatusColor(ticket.status) }}>
                {ticket.status.replace('_', ' ')}
              </span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{ticket.description || 'No description'}</p>
          </div>
        ))}
      </div>
      {tickets.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>No tickets found.</p>
      )}
    </div>
  );
};

export default Tickets;

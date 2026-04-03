import React from 'react';
import { Ticket } from '../types';
import TicketCard from './TicketCard';

interface KanbanBoardProps {
  tickets: Ticket[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tickets }) => {
  const columns = [
    { id: 'open', title: 'Open', color: '#fef3c7' },
    { id: 'assigned', title: 'Assigned', color: '#dbeafe' },
    { id: 'in_progress', title: 'In Progress', color: '#e0e7ff' },
    { id: 'resolved', title: 'Resolved', color: '#dcfce7' },
    { id: 'closed', title: 'Closed', color: '#f3f4f6' },
  ];

  return (
    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
      {columns.map((column) => {
        const columnTickets = tickets.filter((t) => t.status === column.id);
        return (
          <div key={column.id} style={{ minWidth: '280px', flex: '0 0 280px' }}>
            <div style={{ backgroundColor: column.color, padding: '0.75rem', borderRadius: '0.5rem 0.5rem 0 0', fontWeight: '600', fontSize: '0.875rem' }}>
              {column.title} ({columnTickets.length})
            </div>
            <div style={{ backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '0 0 0.5rem 0.5rem', minHeight: '200px' }}>
              {columnTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;

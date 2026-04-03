import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { OrgNode } from '../types';

const OrgChart: React.FC = () => {
  const [nodes, setNodes] = useState<OrgNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await api.get('/org');
        setNodes(response.data);
      } catch (error) {
        console.error('Error fetching org chart:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNodes();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Organization Chart</h1>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {nodes.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {nodes.map((node) => (
              <div key={node.id} style={{ padding: '1rem', borderLeft: '3px solid #2563eb', paddingLeft: '1rem' }}>
                <h3 style={{ fontWeight: '600' }}>{node.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{node.title}</p>
                {node.department && <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{node.department}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>No organization nodes found.</p>
        )}
      </div>
    </div>
  );
};

export default OrgChart;

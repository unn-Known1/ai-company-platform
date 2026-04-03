import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Mission } from '../types';

const Missions: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await api.get('/missions');
        setMissions(response.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMissions();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Missions</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {missions.map((mission) => (
          <div key={mission.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: '600' }}>{mission.title}</h3>
              <span style={{ fontSize: '0.875rem', color: mission.completed ? '#166534' : '#6b7280' }}>
                {mission.completed ? 'Completed' : 'In Progress'}
              </span>
            </div>
            <div style={{ backgroundColor: '#f3f4f6', borderRadius: '9999px', height: '0.5rem', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#2563eb', height: '100%', width: `${mission.progress}%`, transition: 'width 0.3s' }} />
            </div>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>{mission.progress}% complete</p>
          </div>
        ))}
      </div>
      {missions.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>No missions found.</p>
      )}
    </div>
  );
};

export default Missions;

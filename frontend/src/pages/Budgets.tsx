import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Budget } from '../types';

const Budgets: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await api.get('/budgets');
        setBudgets(response.data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBudgets();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Budgets</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {budgets.map((budget) => {
          const percentSpent = (budget.spent_amount / budget.total_budget) * 100;
          return (
            <div key={budget.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{budget.agent_name || 'Unknown Agent'}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>{budget.month_year}</p>
              <div style={{ backgroundColor: '#f3f4f6', borderRadius: '9999px', height: '0.5rem', overflow: 'hidden', marginBottom: '0.5rem' }}>
                <div 
                  style={{ 
                    backgroundColor: percentSpent > 90 ? '#dc2626' : percentSpent > 70 ? '#d97706' : '#2563eb',
                    height: '100%', 
                    width: `${Math.min(percentSpent, 100)}%`, 
                    transition: 'width 0.3s' 
                  }} 
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>${budget.spent_amount.toFixed(2)} spent</span>
                <span style={{ color: '#6b7280' }}>${budget.total_budget.toFixed(2)} total</span>
              </div>
            </div>
          );
        })}
      </div>
      {budgets.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>No budgets found.</p>
      )}
    </div>
  );
};

export default Budgets;

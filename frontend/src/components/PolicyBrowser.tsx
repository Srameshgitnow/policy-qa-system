import React, { useState, useEffect } from 'react';
import { getPolicies } from '../api/policies';
import { Policy } from '../types';

export const PolicyBrowser: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchPolicies();
  }, [selectedCategory]);

  const fetchPolicies = async () => {
    setIsLoading(true);
    try {
      const data = await getPolicies({ category: selectedCategory || undefined });
      setPolicies(data.policies);
    } catch (error) {
      console.error('Failed to fetch policies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold mb-4">Browse Policies</h1>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="benefits">Benefits</option>
            <option value="taxes">Taxes</option>
            <option value="passports">Passports</option>
            <option value="education">Education</option>
            <option value="healthcare">Healthcare</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading policies...</p>
        </div>
      ) : policies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No policies found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {policies.map((policy: Policy) => (
            <div key={policy.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">
                    <a href={policy.url} target="_blank" rel="noopener noreferrer">
                      {policy.title} →
                    </a>
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {policy.category}
                    </span>
                    {' '}
                    <span className="text-gray-500">from {policy.source}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

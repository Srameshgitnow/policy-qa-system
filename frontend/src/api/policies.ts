import axios from 'axios';
import { Policy } from '../types';

const API_BASE = '/api';

interface GetPoliciesOptions {
  category?: string;
  limit?: number;
  offset?: number;
}

export async function getPolicies(options?: GetPoliciesOptions) {
  const response = await axios.get(`${API_BASE}/policies`, { params: options });
  return response.data;
}

export async function getPolicy(id: number): Promise<Policy> {
  const response = await axios.get(`${API_BASE}/policies/${id}`);
  return response.data;
}

export async function getPolicyCategories() {
  const response = await axios.get(`${API_BASE}/policies/categories/list`);
  return response.data;
}

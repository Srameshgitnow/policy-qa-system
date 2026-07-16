import axios from 'axios';

const API_BASE = '/api';

export async function getQuestionAnalytics(period = '7d') {
  const response = await axios.get(`${API_BASE}/analytics/questions`, { params: { period } });
  return response.data;
}

export async function getPopularQuestions(limit = 10) {
  const response = await axios.get(`${API_BASE}/analytics/popular-questions`, { params: { limit } });
  return response.data;
}

export async function getPolicyCoverage() {
  const response = await axios.get(`${API_BASE}/analytics/policy-coverage`);
  return response.data;
}

export async function getCategoryAnalytics() {
  const response = await axios.get(`${API_BASE}/analytics/categories`);
  return response.data;
}

export async function getFeedbackStats() {
  const response = await axios.get(`${API_BASE}/feedback/stats`);
  return response.data;
}

import axios from 'axios';
import { Question } from '../types';

const API_BASE = '/api';

export async function askQuestion(query: string): Promise<Question> {
  const response = await axios.post(`${API_BASE}/questions`, { query });
  return response.data;
}

export async function getQuestion(id: number): Promise<Question> {
  const response = await axios.get(`${API_BASE}/questions/${id}`);
  return response.data;
}

export async function listQuestions(limit = 10, offset = 0) {
  const response = await axios.get(`${API_BASE}/questions`, { params: { limit, offset } });
  return response.data;
}

export async function submitFeedback(questionId: number, helpful: boolean, feedback?: string) {
  const response = await axios.post(`${API_BASE}/feedback`, {
    questionId,
    helpful,
    feedback
  });
  return response.data;
}

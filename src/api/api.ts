import axios from 'axios';

// Везде относительные пути — nginx проксирует
export const api = axios.create({
  baseURL: '/api/application',
});

export const dasApi = axios.create({
  baseURL: '/api/loan-applications',
});

export const scoringApi = axios.create({
  baseURL: '/api/scoring',
});
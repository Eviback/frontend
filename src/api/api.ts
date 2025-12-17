import axios from 'axios';

export const api = axios.create({
  baseURL: '',  // всегда относительный
});

export const dasApi = axios.create({
  baseURL: '',  // то же самое
});

export const scoringApi = axios.create({
  baseURL: '',  // и здесь
});
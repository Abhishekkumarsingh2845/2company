// apiService.js

import axios from 'axios';
var Buffer = require('buffer/').Buffer
const BASE_URL = 'https://json.astrologyapi.com/v1/';
const userId = '625837';
const apiKey = 'cde561a5a3703e809fd43a365ca8cd9c';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Basic ' + Buffer.from(`${userId}:${apiKey}`).toString('base64'),
    'Content-Type': 'application/json',
  },
});

export const fetchKundliData = async (chartId, kundliData) => {
  try {
    const response = await axiosInstance.post(`${chartId}`, kundliData);

    if (!response.data) {
      throw new Error('No data received from the server');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching Kundli data:', error);
    throw error;
  }
};

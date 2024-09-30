import axios from 'axios';

export const api = axios.create({
  // baseURL: 'https://tools-snitch.yellowbush-cadc3844.centralindia.azurecontainerapps.io',
  baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});
 
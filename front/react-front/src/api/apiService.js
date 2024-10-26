// src/api/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';  // URL del backend

// Función para obtener todos los vehículos añadidos
export const getVehicles = async () => {
  return await axios.get(`${API_URL}/anadirVehiculo`);  // Tu backend usa /anadirVehiculo
};

// Función para obtener todos los CITVs
export const getCitvs = async () => {
  return await axios.get(`${API_URL}/citvs`);
};

// Función para obtener todos los SOATs
export const getSoats = async () => {
  return await axios.get(`${API_URL}/soats`);
};

// Función para obtener todas las revisiones técnicas
export const getRevisionesTecnicas = async () => {
  return await axios.get(`${API_URL}/revision-tecnica`);
};

// Función para obtener todas las multas SAT
export const getSats = async () => {
  return await axios.get(`${API_URL}/sats`);
};

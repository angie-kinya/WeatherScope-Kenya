import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api/',
    headers: {
        'X-CSRFToken': window.CSRF_TOKEN, // Use CSRF token for secure requests
    },
});

export const fetchWeather = (city, region) => {
    return axiosInstance.post('weather/', { city, region });
};

export const fetchFilteredQueries = (filters) => {
    return axiosInstance.get('queries/', { params: filters });
};

export const exportToCsv = () => {
    return axiosInstance.get('queries/export/', { responseType: 'blob' });
};

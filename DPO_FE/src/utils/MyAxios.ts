// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
let watchrunUrl = "http://localhost:5041/api"
let debugUrl = 'https://localhost:7294/api'
const instance = axios.create({
    // .. where we make our configurations
    baseURL: watchrunUrl
});
instance.interceptors.response.use(
    response => {
        // Return the response if successful
        return response;
    },
    async error => {
        // Check if it's a network error or a 5xx server error
        if (error.config && !error.response && error.config.baseURL === debugUrl) {
            console.warn('Debug URL failed, retrying with watchrunUrl...');

            // Change the baseURL to watchrunUrl for the retry
            error.config.baseURL = debugUrl;
            try {
                // Retry the request with updated baseURL
                return await axios.request(error.config);
            } catch (retryError) {
                // Handle retry error (if needed)
                return Promise.reject(retryError);
            }
        }

        // If the error isn't related to debugUrl, or the retry also fails, reject
        return Promise.reject(error);
    }
);
export default instance;

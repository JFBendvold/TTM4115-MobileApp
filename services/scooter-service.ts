import axios from "axios";

// Fetch scooter data from the API
export async function GetScooterData() {
    return axios.get(process.env.EXPO_PUBLIC_API_URL + '/get_scooter')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching scooter data:', error);
            throw error;
        });
}
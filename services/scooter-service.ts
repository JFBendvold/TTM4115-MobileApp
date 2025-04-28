import axios from "axios";

// Fetch scooter data from the API
export async function GetScooterData() {
    return axios.get(process.env.EXPO_PUBLIC_API_URL + '/get_scooters')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching scooter data:', error);
            throw error;
        });
}

// Unlock a scooter
export async function UnlockScooter(scooterId: number, username: string) {
    return axios.post(process.env.EXPO_PUBLIC_API_URL + '/unlock', {
        "user": username,
        "scooter_id": scooterId,
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error unlocking scooter:', error);
        throw error;
    });
}

// Lock a scooter
export async function LockScooter(scooterId: number, username: string) {
    return axios.post(process.env.EXPO_PUBLIC_API_URL + '/lock', {
        "user": username,
        "scooter_id": scooterId,
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error locking scooter:', error);
        throw error;
    });
}
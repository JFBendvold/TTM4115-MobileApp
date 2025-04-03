import axios from "axios";

// Fetch tasks from the API
export async function GetTasks() {
    return axios.get(process.env.EXPO_PUBLIC_API_URL + '/get_tasks')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
            throw error;
        });
}
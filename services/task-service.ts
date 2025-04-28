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

// Take a task
export async function TakeTask(taskId: string, username: string) {
    return axios.post(process.env.EXPO_PUBLIC_API_URL + '/take_task', {
        "user": username,
        "task_id": taskId,
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error taking task:', error);
        throw error;
    });
}

// Verify a task
export async function VerifyTask(taskId: string, username: string, latitude: number, longitude: number) {
    return axios.post(process.env.EXPO_PUBLIC_API_URL + '/verify_task_completion', {
        "user": username,
        "task_id": taskId,
        "latitude": latitude,
        "longitude": longitude,
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error verifying task:', error);
        throw error;
    });
}
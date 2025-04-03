import axios from "axios";

// Register a new user
export async function RegisterUser(username: string, password: string) {
    return axios.post(process.env.EXPO_PUBLIC_API_URL + '/register', {
        "user": username,
        'password': password,
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
}

// Verify the user with a verification code
export async function VerifyUser(username: string, code: string) {
    return axios.post(process.env.EXPO_PUBLIC_API_URL + '/verify_code', {
        "user": username,
        'code': code,
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
}

// Get a new code for the user
export async function GetNewCode(username: string) {
    return axios.post(process.env.EXPO_PUBLIC_API_URL + '/get_verification_code', {
        "user": username,
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
}

// Get the reward for the user
export async function GetReward(username: string) {
    return axios.post(process.env.EXPO_PUBLIC_API_URL + '/get_user_reward', {
        "user": username,
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });
}
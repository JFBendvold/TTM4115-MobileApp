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
        console.error('Registration error:', error);
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
        console.error('Verification error:', error);
        throw error;
    });
}
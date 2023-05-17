import axios from "axios";
import { encrypt, decrypt } from "./crypto";
import logController from "./logController";

logController()

axios.defaults.withCredentials = true
const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
console.log('SERVER_BASE_URL -->', SERVER_BASE_URL);

const API_URL = {
    REGISTER: `${SERVER_BASE_URL}/user/register`,
    LOGIN: `${SERVER_BASE_URL}/user/login`,
    USER_BASE_URL: `${SERVER_BASE_URL}/user`,
    VERIFY_TOKEN: `${SERVER_BASE_URL}/verify-token`,
}

const message = {
    logout: "logout",
    server_error: "server",
}

const registerApiCall = async ({ email, password, firstName, lastName }) => {
    try {
        console.log(API_URL.REGISTER);
        const result = await axios.post(API_URL.REGISTER, {
            email: encrypt(email),
            password: encrypt(password),
            firstName: encrypt(firstName),
           lastName: encrypt(lastName),
        })
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

const loginApiCall = async ({ email, password }) => {
        try {
            console.log(`${API_URL.LOGIN}/${email}/${password}`);
            const result = await axios.get(`${API_URL.LOGIN}/${encrypt(email)}/${encrypt(password)}`);
            const {userData} = result.data;
            const userId = JSON.parse(decrypt(userData.userId));
            const firstName = decrypt(userData.firstName);
            const lastName = decrypt(userData.lastName);
            const resumeIdArray = userData.resumeIdArray;
            for (let index = 0; index < resumeIdArray.length; index++) {
                const resumeId = resumeIdArray[index];
                resumeIdArray[index] = JSON.parse(decrypt(resumeId));
            }
            return {userId, firstName, lastName, resumeIdArray, status: result.status};
        } catch (error) {
            console.log(error);
            throw(error);
        }
}

const verifyTokenApiCall = async () => {
    try {
        const result = await axios.get(API_URL.VERIFY_TOKEN);
        const { status, data } = result;
        const decryptedResult = {};
        decryptedResult.status = status;
        decryptedResult.resumeIdArray = data.resumeIdArray.map((resumeId) => decrypt(resumeId))
        decryptedResult.userId = decrypt(data.userId);
        return decryptedResult;
    } catch (error) {
        console.log(error);
        console.log(error.response)
        throw error;
    }
}

const createResumeApiCall = async (userId) => {
    try {
        if (!userId) {
            alert(`${userId}`);
        }
        const result = await axios.post(`${API_URL.USER_BASE_URL}/${encrypt(userId)}/resume/`)
        const newResumeIdArray = [];
        for (let index = 0; index < result.data.resumeIdArray.length; index++) {
            const resumeId = decrypt(result.data.resumeIdArray[index]);
            newResumeIdArray.push(resumeId);
        }
        return newResumeIdArray;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getResumeData = async (userId, resumeId) => {
    try {
        if (!userId || !resumeId) {
            alert(`${userId} ${resumeId}`);
        }
        const result = await axios.get(`${API_URL.USER_BASE_URL}/${encrypt(userId)}/resume/${encrypt(resumeId)}`)
        // Object containing all CV state data as properties
        return result;

    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getResumeTemplateData = async () => {
    try {
        const result = await axios.get(`${API_URL.USER_BASE_URL}/resume/template`)
        return result;

    } catch (err) {
        console.log(err);
        throw err;
    }
}

const saveResumeData = async (userId, resumeId, body) => {
    try {
        if (!userId || !resumeId) {
            alert(`${userId} ${resumeId}`);
        }
        const result = await axios.put(`${API_URL.USER_BASE_URL}/${encrypt(userId)}/resume/${encrypt(resumeId)}`,{
            ...body
        })
        // Object containing all CV state data as properties
        return result;

    } catch (err) {
        console.log(err);
        throw err;
    }
}

const logoutApiCall = async () => {
    return await axios.get(`${API_URL.USER_BASE_URL}/logout`)
}

export {
    message,
    createResumeApiCall,
    getResumeData,
    logoutApiCall,
    registerApiCall,
    loginApiCall,
    verifyTokenApiCall,
    saveResumeData,
    getResumeTemplateData,
}

import axios from "axios";
import { encrypt, decrypt } from "./crypto";

axios.defaults.withCredentials = true

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
console.log('SERVER_BASE_URL -->', SERVER_BASE_URL);
console.log(process.env);
const API_URL = {
    REGISTER: `${SERVER_BASE_URL}/user/register`,
    LOGIN: `${SERVER_BASE_URL}/user/login`,
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
            const result = await axios.get(`${API_URL.LOGIN}/${encrypt(email)}/${encrypt(password)}`)
            const {userData} = result.data;
            const userId = decrypt(userData.userId);
            const firstName = decrypt(userData.firstName);
            const lastName = decrypt(userData.lastName);
            const resumeIdArray = userData.resumeIdArray;
            for (let index = 0; index < resumeIdArray.length; index++) {
                const resumeId = resumeIdArray[index];
                resumeIdArray[index] = decrypt(resumeId);
            }
            return {userId, firstName, lastName, resumeIdArray, status: result.status};
        } catch (error) {
            console.log(error);
            throw(error);
        }
}

const getResume = async () => {
    const userId = localStorage.getItem("%su!I#d");

    if (!userId) {
        return message.logout
    }
    return await axios
        .get(`${process.env.REACT_APP_URL}/resume/${userId}`)
        .then((res) => {
            //console.log(res)
            if (res && res.data && res.data && res.status && res.status === 200) {
                // localStorage.setItem("%ru!I#d", res.data.id);
            }
        })
        .catch((err) => {
            if (err && err.response && err.response.status) {
                const status = err.response.status
                if (status === 500) {
                    return message.server_error
                }
                else if (status === 401) {
                    return message.logout
                }
            }


        });
}
const getResumeData = async () => {
    const userId = localStorage.getItem("%su!I#d");
    const resumeId = localStorage.getItem("%ru!I#d");

    if (!userId && !resumeId) {
        return message.logout
    }
    return await axios
        .get(`${process.env.REACT_APP_URL}/resume/${userId}/${resumeId}`)
        .then((res) => {
            //console.log(res.data[0])
            if (res && res.data && res.data && res.status && res.status === 200) {
                // Object containing all CV state data as properties
                return res.data[0]
            }
        })
        .catch((err) => {
            if (err && err.response && err.response.status) {
                const status = err.response.status
                if (status === 500) {
                    return message.server_error
                }
                else if (status === 401) {
                    return message.logout
                } else if (status === 404) {
                    return message.server_error
                }
            }


        });
}
const logout_Api_Call = async () => {
    const userId = localStorage.getItem("%su!I#d");

    if (!userId) {
        return message.logout
    }
    return await axios
        .get(`${process.env.REACT_APP_URL}/logout}`)
        .then((res) => {
            //console.log(res)
            if (res && res.status && res.status === 200) {
                return res.status
            }
        })
        .catch((err) => {
            if (err && err.response && err.response.status) {
                const status = err.response.status
                if (status === 500) {
                    return message.server_error
                }
                else if (status === 401) {
                    return message.logout
                }
            }


        });
}

export {
    message,
    getResume,
    getResumeData,
    logout_Api_Call,
    registerApiCall,
    loginApiCall,
}

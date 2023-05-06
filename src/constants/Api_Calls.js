import axios from "axios";

export { message, getResume, getResumeData, logout_Api_Call }
const message = {
    logout: "logout",
    server_error: "server",
    logout: "logout",
    logout: "logout",
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
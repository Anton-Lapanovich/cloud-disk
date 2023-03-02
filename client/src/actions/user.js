// used for making asynchronous HTTP requests to a server
import axios from 'axios'
import {setUser} from "../reducers/userReducer";
import {API_URL} from "../config";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, { // await for sequential execution
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

/* Redux-thunk is used because a request to a server is an asynchronous function.
Redux-thunk implies that an action will return a new function, which we pass dispatch as a parameter */

export const login =  (email, password) => {
    return async dispatch => {
        // Store user data in the state, and indicate that the user is logged in
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

// The authentication is based on a token and no additional parameters are needed
export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/auth`,
                // to retrieve a token from local storage
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            // To remove the token from local storage if a request to revoke a token fails
            localStorage.removeItem('token')
        }
    }
}

export const uploadAvatar =  (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${API_URL}api/files/avatar`, formData,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteAvatar =  () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}
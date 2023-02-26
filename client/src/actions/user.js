// request functions
import axios from 'axios' // async http requests to the server
import {setUser} from "../reducers/userReducer";
export const registration = async (email, password) => { // async requests to the server
    try {
        // await for sequential execution
        const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

/* request to the server is an async function. need redux-thunk
to return a new function, в которую параметром мы передаём dispatch */

export const login =  (email, password) => {
    return async dispatch => { //  save user data in a state, indicate the user is logged in
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
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

export const auth =  () => { //   parameter-free, authorization with token
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}} // local storage token
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
            localStorage.removeItem('token') // remove token if failed request
        }
    }
}

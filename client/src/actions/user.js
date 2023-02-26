// request functions
import axios from 'axios' // async http requests to the server

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

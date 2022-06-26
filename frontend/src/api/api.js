import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class. 
 * 
 * Static class tying together methods used to get/send to the API
 * There shouldn't be any frontend-specific stuff here, and there
 * shouldn't be any API-aware stuff elsewhere in the frontend.
*/


class NeuralNetworkApi {
    static token;

    static async request(endpoint, data = {}, method = 'get') {
        console.debug("API Call:", endpoint, data, method);

        // there are multiple ways to pass an auth token, this is how
        // you pass it in the header.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${NeuralNetworkApi.token}` };

        const params = (method === 'get') ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Post neuralNet Architecture to API */
    static async postNeuralNetworkStructure(neuralNetworkStructure) {
        let res = await this.request(`nnroutes/train`, neuralNetworkStructure, 'post');
        console.log(res)
        return res;
    }

    /** Get token for login from username, password */
    static async login(data) {
        let res = await this.request(`auth/token`, data, 'post');
        return res.token
    }

    /** Signup for sit. */
    static async signup(data) {
        let res = await this.request(`auth/register`, data, 'post');
        return res.token;
    }

    /** Get current user */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`)
        return res.user;
    }
}

// for now, put token ("testuser" / "password" on class)
NeuralNetworkApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default NeuralNetworkApi;
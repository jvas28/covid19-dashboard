import axios from 'axios';
const client = axios.create({
    baseURL: "https://coronavirus-monitor.p.rapidapi.com/coronavirus",
    headers: {
        "x-rapidapi-host": process.env.REACT_APP_API_HOST,
	    "x-rapidapi-key": process.env.REACT_APP_API_KEY
    }
})
export default client;
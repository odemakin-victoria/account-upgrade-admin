    import axios from "axios"

    export const axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
    })
    export const adminInstance = axios.create({
        baseURL: `http://localhost:5214/api/admin`,
    })



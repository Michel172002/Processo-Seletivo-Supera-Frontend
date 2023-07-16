import axios from "axios"

const apiFetch = axios.create({
    baseURL: "http://localhost:8080/tranferencias",
    headers: {
        "Content-Type": "application/json",
    }
})

export default apiFetch
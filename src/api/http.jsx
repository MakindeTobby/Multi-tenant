import axios from "axios";

const baseURL = "https://profitmax-001-site10.ctempurl.com/api"

const http = axios.create({
    baseURL: baseURL,
    // headers:{
    // 'Authorization': `Bearer ${localstorage.getItem("access_token")}`
    // }
})

export default http;
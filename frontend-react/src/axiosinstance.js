import axios, { Axios } from "axios";
const baseURL=import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance = axios.create({
    baseURL:baseURL,
    headers: {
        'Content-Type': 'application/json'

    }
    
})


axiosInstance.interceptors.request.use(
  function (config) {
    console.log("request without header ===>", config);
    const accessToken= localStorage.getItem("accessToken")
    if (accessToken){
        config.headers["Authorization"]= `Bearer  ${accessToken}`
    }
    return config;
  },

 function(error){
    return Promise.reject(error);
 }
)

// Response interceptors

axiosInstance.interceptors.response.use(
    function(response){
        return response;

    },

    //Handle fail response

    
    async function(error){
         const originalRequest =error.config;
         if (error.response.status === 401 && !originalRequest._retry) {
             originalRequest._retry = true;
             const refreshToken=localStorage.getItem('refreshToken');

             try{
                const response= await axiosInstance.post("/token/refresh/",{refresh: refreshToken})
                console.log("new access token ===>",response.data.access)
                console.log("response response==>",response.data);
                localStorage.setItem('accessToken',response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstance(originalRequest)
             }
             catch(error){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                window.location.href="/login"

             }

  // handle unauthorized (refresh token or redirect)
}
         return Promise.reject(error);
    }
)
export default axiosInstance
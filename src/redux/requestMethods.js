import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


const BASE_URL = "http://localhost:5000/api/";




export const getToken = () => localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;
  

  


export const getAuthorizationHeader = () => `Bearer ${getToken()}`;





export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token: getAuthorizationHeader()},
});



export const LoginRedirect = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    console.log("working!!!!!!!!!!")
    if(location.state?.from){
        navigate(location.state.from.pathname);
    }
};
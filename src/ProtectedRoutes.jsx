import { CloudDone } from "@mui/icons-material";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";

const useAuth = () =>{
    
    const user = useSelector((state)=> state.persistedReducer.user.currentUser);
    
    const admin = useSelector((state)=> state.persistedReducer.user.currentUser?.isAdmin);
    console.log(user)
    console.log(useSelector((state)=> state.persistedReducer.user.currentUser?.isAdmin))
    console.log( JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.isAdmin)
    

    
    console.log(admin)

    

    
    console.log(admin)
    return user && admin;
};

const ProtectedRoutes = () => {
    const location = useLocation();
    const isAuth = useAuth();
    console.log(isAuth);

  return isAuth ? (<Outlet/>): (<Navigate to="/login" replace state={{from: location}}/>);
}

export default ProtectedRoutes
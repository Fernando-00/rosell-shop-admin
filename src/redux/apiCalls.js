
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addClientFailure, addClientStart, addClientSuccess, deleteClientFailure, deleteClientStart, deleteClientSuccess, getClientFailure, getClientStart, getClientSuccess, updateClientFailure, updateClientStart, updateClientSuccess } from "./clientRedux";
import { addOrderFailure, addOrderStart, deleteOrderStart, deleteOrderSuccess, getOrderFailure, getOrderStart, getOrderSuccess, updateOrderFailure, updateOrderStart, updateOrderSuccess } from "./orderRedux";
import { 
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    getProductFailure,
    getProductStart, 
    getProductSuccess,
    updateProductStart, 
    updateProductFailure, 
    updateProductSuccess,
    addProductStart, 
    addProductFailure, 
    addProductSuccess } 
    from "./productRedux";
import { LoginRedirect, publicRequest, userRequest } from "./requestMethods";
import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux"



export const login = async (dispatch, user, navigate)=>{
    dispatch(loginStart());
    
    try {
        const res = await publicRequest.post("/auth/login", user);

        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
        console.log(res.data.accessToken)
        console.log("SHOULD BE WORKING")
        
        dispatch(loginSuccess(res.data));
        navigate("/");

        
        
        
    } catch (err) {
        dispatch(loginFailure());
    }
};

//ALL PRODUCT API CALLS ----------------------------------------------------------

export const getProducts = async (dispatch)=>{
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products");
        
        dispatch(getProductSuccess(res.data));
        
    } catch (err) {
        dispatch(getProductFailure());

        if(err.response?.status == 403){
            console.log(err.response)
            console.log("Token has expired...")
            console.log("Dispatching Logout...")
            dispatch(logout());
        }
    }
};

export const deleteProduct = async (id, dispatch)=>{
    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/products/${id}`);
        
        dispatch(deleteProductSuccess(id));
        
    } catch (err) {
        dispatch(deleteProductFailure());

        if(err.response?.status == 403){
            console.log(err.response)
            console.log("Token has expired...")
            console.log("Dispatching Logout...")
            dispatch(logout());
        }
    }
};

export const updateProduct = async (id, product, dispatch, navigate)=>{
    dispatch(updateProductStart());
    try {
        // update using acios userRequest in FUTURE
        // const res = await userRequest.post(`/products/`, {product});
        const res = await userRequest.put(`/products/${id}`,product);
        
        
        dispatch(updateProductSuccess({id, product}));
        navigate("/products");
        
    } catch (err) {
        dispatch(updateProductFailure());

        if(err.response?.status == 403){
            console.log(err.response)
            console.log("Token has expired...")
            console.log("Dispatching Logout...")
            dispatch(logout());
        }
        
    }
};

export const addProduct = async (product, dispatch, navigate)=>{
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/products/`, product);
        
        dispatch(addProductSuccess(res.data));
        navigate("/products");
        
    } catch (err) {
        dispatch(addProductFailure());

        if(err.response?.status == 403){
            console.log(err.response)
            console.log("Token has expired...")
            console.log("Dispatching Logout...")
            dispatch(logout());
        }
    }
};
//----------------------------------------------------------------------

//ALL CLIENT CALLS


export const getClients = async (dispatch)=>{
    dispatch(getClientStart());
    try {
        const res = await userRequest.get("/users");
        
        dispatch(getClientSuccess(res.data));
        
    } catch (err) {
        dispatch(getClientFailure());

        if(err.response?.status == 403){
            console.log(err.response)
            console.log("Token has expired...")
            console.log("Dispatching Logout...")
            dispatch(logout());
        }
    }
};

export const deleteClient = async (id, dispatch)=>{
    dispatch(deleteClientStart());
    try {
        const res = await userRequest.delete(`/users/${id}`);
        console.log("PASSED THE API")
        
        dispatch(deleteClientSuccess(id));
        
    } catch (err) {
        dispatch(deleteClientFailure());
        console.log("ERROR IN DELETING CLIENT")
        if(err.response?.status == 403){
            console.log(err.response)
            console.log("Token has expired...")
            console.log("Dispatching Logout...")
            dispatch(logout());
        }
    }
};

export const updateClient = async (id, client, dispatch, navigate)=>{
    dispatch(updateClientStart());
    try {
        // update using acios userRequest in FUTURE
        // const res = await userRequest.post(`/products/`, {product});
        console.log(client)
        const res = await userRequest.put(`/users/${id}`,client);
        
        
        dispatch(updateClientSuccess({id, client}));
        navigate("/users");
        
    } catch (err) {
        dispatch(updateClientFailure());

        if(err.response?.status == 403){
            console.log(err.response)
            console.log("Token has expired...")
            console.log("Dispatching Logout...")
            dispatch(logout());
        }
        
    }
};

export const addClient = async (client, dispatch, navigate)=>{
    dispatch(addClientStart());
    try {
        const res = await userRequest.post(`/auth/register`, client);
        
        dispatch(addClientSuccess(res.data));
        navigate("/users");
        
    } catch (err) {
        dispatch(addClientFailure());

        if(err.response?.status == 403){
            console.log(err.response)
            console.log("Token has expired...")
            console.log("Dispatching Logout...")
            dispatch(logout());
        }
    }
};



// -------------------------------------------


//----------------------------------------------------------------------

//ALL ORDER CALLS


export const getOrders = async (dispatch)=>{
    dispatch(getOrderStart());
    try {
        const res = await userRequest.get("/orders");
        
        dispatch(getOrderSuccess(res.data));
        
    } catch (err) {
        dispatch(getOrderFailure());

        if(err.response?.status == 403){
            console.log(err.response)
            console.log("Token has expired...")
            console.log("Dispatching Logout...")
            dispatch(logout());
        }
    }
};

export const deleteOrder = async (id, dispatch)=>{
    dispatch(deleteOrderStart());
    try {
        const res = await userRequest.delete(`/orders/${id}`);
        console.log("PASSED THE API")
        
        dispatch(deleteOrderSuccess(id));
        
    } catch (err) {
        dispatch(deleteClientFailure());
        console.log("ERROR IN DELETING CLIENT")
        if(err.response?.status == 403){
            console.log(err.response)
            console.log("Token has expired...")
            console.log("Dispatching Logout...")
            dispatch(logout());
        }
    }
};

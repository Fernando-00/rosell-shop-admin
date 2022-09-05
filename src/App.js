import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css"
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./ProtectedRoutes";
import Transactions from "./pages/transactionsList/TransactionsList";




function App() {

  const admin = useSelector((state)=> state.persistedReducer.user.currentUser?.isAdmin);
  
  
  return (
    <Router >
      
      
      <Routes>
      <Route path="/login" element={admin ? <Navigate to="/" replace/> :<Login/>}/>
      
        
      <Route element={<ProtectedRoutes/>}>

      

        <Route exact path="/" element={
        <>
          <Topbar/>
          <div className="container">
            <Sidebar/>
            <Home/> 
          </div>
        </>}/>

        <Route path="/users" element={
        <>
          <Topbar/>
          <div className="container">
          <Sidebar/>
          <UserList/> 
          </div>
        </>}/>
        <Route path="/user/:userId" element={
        <>
          <Topbar/>
          <div className="container">
          <Sidebar/>
          <User/> 
        </div>
        </>}/>
        <Route path="/newUser" element={
        <>
          <Topbar/>
          <div className="container">
          <Sidebar/>
          <NewUser/> 
          </div>
        </>}/>
        <Route path="/products" element={
        <>
        <Topbar/>
        <div className="container">
          
          <Sidebar/>
          <ProductList/> 
        </div>
        </>}/>
          <Route path="/product/:productId" element={
          <>
          <Topbar/>
        <div className="container">
          
          <Sidebar/>
          <Product/> 
        </div>
        </>}/>

        <Route exact path="/transactions" element={
        <>
          <Topbar/>
          <div className="container">
            <Sidebar/>
            <Transactions/> 
          </div>
        </>}/>
        
          


    </Route>


      
      </Routes>
    </Router>
  );
}

export default App;

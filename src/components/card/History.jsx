import React, { useEffect, useState } from "react";
import authService from "../../authentication/auth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function History() {
  const navigate=useNavigate()
  const [product,setProduct]=useState([{
    title:"",
    organizer:"",
    destination:"",
    price:0,
  }])
  // useEffect(()=>{
  //   const fetchSavedUser=async()=>{
  //     try {
  //       const token = localStorage.getItem("jwtToken");
  //     if (!token) return navigate("/orglogin");

  //     const { exp } = jwtDecode(token);
  //     if (exp * 1000 < Date.now()) {
  //       await authService.logoutUser();
  //       return navigate("/orglogin");
  //     }
  //     const response=axios.get(`http://localhost:8080/savedProduct`,{
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     if((await response).status===200)
  //     {
  //       response.map((product)=>(setProduct(prev)=>(prev)))
  //     }
  //     } catch (error) {
  //       console.log(error);
        
  //     }
  //   }
  // })
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 mt-6 space-y-10">
      <Card type="Purchased" />
      <Card type="Saved" />
    </div>
  );
}

export default History;

import React, { useEffect, useState } from "react";
import authService from "../../authentication/auth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Card from "./Card";

function History() {
  const navigate = useNavigate();
  const [savedproduct, setSavedProduct] = useState([]);
  const [purchasedProduct, setPurchasedProduct] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) navigate("/login");

    const { exp } = jwtDecode(token);
    if (exp * 1000 < Date.now()) {
      authService.logoutUser();
      navigate("/login");
    }
    fetchSavedProduct(token);
    fetchPurchasedProduct(token);
  }, [navigate]);
  const fetchPurchasedProduct = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/purchasedProduct`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        if (response.data != null) {
          const data = response.data.map((item) => ({
            id: item.id,
            title: item.title,
            organizer: item.organizer,
            destination: item.place,
            price: item.price,
          }));
          setPurchasedProduct(data);
        } else {
          setPurchasedProduct([]);
        }
        console.log("Hi");
      }
    } catch (error) {
      console.error("Failed to fetch purchased products", error);
    }
  };
  const fetchSavedProduct = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/savedProduct`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        if (response.data != null) {
          const data = response.data.map((item) => ({
            id: item.id,
            title: item.title,
            organizer: item.organizer,
            destination: item.place,
            price: item.price,
          }));
          setSavedProduct(data);
        }
      } else {
        setSavedProduct([]);
      }
    } catch (error) {
      console.error("Failed to fetch saved products", error);
    }
  };

  const refresh = async (id, type) => {
    if (type === "Saved") {
      setSavedProduct((prev) => prev.filter((prod) => prod.id !== id));
    } else {
      setPurchasedProduct((prev) => prev.filter((prod) => prod.id !== id));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 mt-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">Purchased History</h1>
      {purchasedProduct.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {purchasedProduct.map((product) => (
            <Card
              key={product.id}
              type="Purchased"
              product={product}
              onDelete={refresh}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-xl mt-3">No Purchased Product Available</h1>
      )}

      <h1 className="text-3xl font-bold text-center mt-10">Saved History</h1>
      {savedproduct.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {savedproduct.map((product) => (
            <Card
              key={product.id}
              type="Saved"
              product={product}
              onDelete={refresh}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-xl mt-3">No Saved Product Available</h1>
      )}
    </div>
  );
}

export default History;

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
    if (!token) return navigate("/login");

    const { exp } = jwtDecode(token);
    if (exp * 1000 < Date.now()) {
      authService.logoutUser();
      return navigate("/login");
    }

    const fetchSavedProduct = async () => {
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

    const fetchPurchasedProduct = async () => {
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

    fetchSavedProduct();
    fetchPurchasedProduct();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 mt-6 space-y-10">
      {purchasedProduct.length > 0 && (
        <>
          {purchasedProduct.map((product) => (
            <Card key={product.id} type="Purchased" product={product} />
          ))}
        </>
      )}

      {savedproduct.length > 0 && (
        <>
          {savedproduct.map((product) => (
            <Card key={product.id} type="Saved" product={product} />
          ))}
        </>
      )}
    </div>
  );
}

export default History;

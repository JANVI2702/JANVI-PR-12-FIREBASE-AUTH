import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { handleAuthError, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { db } from "../firebase"; 
import AddProduct from "./AddProduct";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products")); 

        const productList = querySnapshot.docs.map((doc) => ({
         
          id: doc.id,
          ...doc.data(),
        }));
        setProduct(productList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  });

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert(handleAuthError(error));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-green-500 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-800">My Website</h1>
        <div className="flex items-center space-x-4">
          <User size={32} className="text-green-600" />
          <p className="text-green-800 font-medium">{currentUser?.email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-8">
        <h2 className="text-3xl font-semibold text-green-800 text-center mb-6">Product List</h2>

        {/* Product List Grid */}
        <div className="dashboard">
          <h2>Add product</h2>
          <AddProduct />

          <h2>Product List</h2>
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id}>
                {product.name} -${product.price}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

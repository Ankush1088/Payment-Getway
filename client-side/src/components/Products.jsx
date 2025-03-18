import React, { useState } from "react";
import axios from "axios";

const products = [
  { id: 1, name: "Product 1", price: 10, image: "/box1_image.jpg" },
  { id: 2, name: "Product 2", price: 20, image: "/box2_image.jpg" },
  { id: 3, name: "Product 3", price: 30, image: "/box3_image.jpg" },
];

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || "https://payment-getway-api.vercel.app";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const loadRazorpay = async () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const checkoutHandler = async (amount) => {
    try {
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        alert("Failed to load Razorpay. Check network connection.");
        return;
      }

      const { data: keyData } = await axios.get(`${BASE_URL}/api/payment/getKey`);
      const { key } = keyData;

      const { data: orderData } = await axios.post(`${BASE_URL}/api/payment/paymentprocess`, { amount });
      const { order } = orderData;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Ankush Enterprise",
        description: "Razorpay Integration",
        order_id: order.id,
        callback_url: `${BASE_URL}/api/payment/paymentVerification`,
        prefill: {
          name: "Ankush",
          email: "ankush.kumar@example.com",
          contact: "9999999999",
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error.response?.data || error.message);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <header className="p-4 flex justify-between items-center bg-gray-200">
        <h1 className="text-2xl font-bold">My Shopping Website</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 rounded border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <main className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="rounded-lg shadow-md p-4 text-center bg-white">
              <img src={product.image} alt={product.name} className="w-64 h-64 object-cover rounded-md" />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => checkoutHandler(product.price)}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Products;

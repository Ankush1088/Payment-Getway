import React, { useState } from "react";
import axios from "axios";

const products = [
  { id: 1, name: "Product 1", price: 10, image: "/box1_image.jpg" },
  { id: 2, name: "Product 2", price: 20, image: "/box2_image.jpg" },
  { id: 3, name: "Product 3", price: 30, image: "/box3_image.jpg" },
  { id: 4, name: "Product 4", price: 40, image: "/box4_image.jpg" },
  { id: 5, name: "Product 5", price: 50, image: "/box5_image.jpg" },
  { id: 6, name: "Product 6", price: 60, image: "/box6_image.jpg" },
];

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const checkoutHandler = async (amount) => {
    try {
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

  // ... (बाकी का कोड)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* ... (बाकी का कोड) */}
      <main className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <div key={product.id} className={`rounded-lg shadow-md p-4 text-center ${isDarkTheme ? "bg-gray-800" : "bg-white"} flex flex-col items-center w-full h-full`}>
              <img src={product.image} alt={product.name} className="w-64 h-64 object-cover rounded-md" />
              <h2 className="text-lg font-semibold mt-2 w-full">{product.name}</h2>
              <p className="text-gray-600 w-full">${product.price}</p>
              <button
                onClick={() => checkoutHandler(product.price)}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition w-full"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* ... (बाकी का कोड) */}
    </div>
  );
}

export default Products;

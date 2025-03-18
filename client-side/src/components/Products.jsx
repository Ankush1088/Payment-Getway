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

 // const BASE_URL = import.meta.env.VITE_API_URL || "https://payment-getway-2o97.onrender.com";
    const BASE_URL = import.meta.env.VITE_API_URL ||  "https://payment-getway-api.vercel.app"
const checkoutHandler = async (amount) => {
  try {
        console.log("Checking API Key Fetch...");
    const { data: keyData } = await axios.get(`${BASE_URL}/api/payment/getKey`);
    const { key } = keyData;
    console.log("Received Key Data:", keyData); // Debugging API key fetch
   console.log("Creating Order...");
    const { data: orderData } = await axios.post(`${BASE_URL}/api/payment/paymentprocess`, { amount });
    const { order } = orderData;
    console.log("Received Order Data:", orderData);

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
    console.log("Initializing Razorpay...");

    const rzp = new Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment Error:", error.response?.data || error.message);
  }
};


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <header className={`p-4 flex flex-wrap justify-between items-center ${isDarkTheme ? "bg-gray-800" : "bg-gray-200"}`}>
        <div className="flex items-center w-full sm:w-auto space-x-4">
          <img src="https://via.placeholder.com/50" alt="Logo" />
          <h1 className="text-2xl font-bold">My Shopping Website</h1>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          className={`p-2 w-full sm:w-64 rounded border ${isDarkTheme ? "border-gray-600 bg-gray-700" : "border-gray-300"}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-gray-700 text-white p-2 rounded flex items-center">
          <span className="mr-1">🛒</span>
          <span>{cartCount}</span>
        </button>
        <button onClick={() => setIsDarkTheme(!isDarkTheme)} className="ml-4 p-2 rounded bg-gray-300 dark:bg-gray-600">
          {isDarkTheme ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      
      <div className="text-center my-4">
        <h2 className={`text-3xl font-semibold ${isDarkTheme ? "text-gray-200" : "text-gray-800"}`}>Explore Our Exclusive Products</h2>
        <p className="text-lg mt-2 text-gray-500">Find the best deals on your favorite products.</p>
      </div>

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

      <footer className={`text-center p-6 mt-6 ${isDarkTheme ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}>
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
    
    {/* Customer Service */}
    <div>
      <h3 className="font-semibold text-lg mb-2">Customer Service</h3>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Help Center</a></li>
        <li><a href="#" className="hover:underline">Shipping & Delivery</a></li>
        <li><a href="#" className="hover:underline">Return Policy</a></li>
        <li><a href="#" className="hover:underline">Track Your Order</a></li>
      </ul>
    </div>

    {/* Company Info */}
    <div>
      <h3 className="font-semibold text-lg mb-2">Company</h3>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">About Us</a></li>
        <li><a href="#" className="hover:underline">Careers</a></li>
        <li><a href="#" className="hover:underline">Investor Relations</a></li>
        <li><a href="#" className="hover:underline">Affiliate Program</a></li>
      </ul>
    </div>

    {/* Social Media */}
    <div>
      <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
      <div className="flex justify-center space-x-4 text-xl">
        <a href="#" className="hover:text-blue-500">📘</a>
        <a href="#" className="hover:text-blue-400">🐦</a>
        <a href="#" className="hover:text-red-500">📸</a>
        <a href="#" className="hover:text-red-600">▶</a>
      </div>
    </div>

    {/* Newsletter Signup */}
    <div>
      <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
      <p className="text-sm mb-2">Subscribe to our newsletter for the latest offers.</p>
      <div className="flex">
        <input type="email" placeholder="Your Email" className="p-2 w-full border rounded-l" />
        <button className="bg-green-500 text-white p-2 rounded-r hover:bg-green-600">Subscribe</button>
      </div>
    </div>

  </div>

  <hr className="my-4 border-gray-500" />
  
  <p>&copy; 2025 My Shopping Website. All rights reserved.</p>
  <div className="mt-2">
    <a href="#" className="mx-2 hover:underline">Privacy Policy</a> |
    <a href="#" className="mx-2 hover:underline">Terms of Service</a> |
    <a href="#" className="mx-2 hover:underline">Contact Us</a>
  </div>

</footer>

    </div>
  );
}

export default Products;
 
